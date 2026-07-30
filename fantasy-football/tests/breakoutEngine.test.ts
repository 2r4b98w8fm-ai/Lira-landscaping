import { describe, expect, it } from "vitest";
import { computeBreakoutScore, recommendationFor, type OpportunityGameLogEntry, type SnapGameLogEntry } from "@/lib/breakouts/engine";

function game(week: number, touches: number, points: number): OpportunityGameLogEntry {
  return { week, fantasyPointsPpr: points, carries: 0, targets: touches };
}

function snap(week: number, pct: number): SnapGameLogEntry {
  return { week, offensePct: pct };
}

describe("computeBreakoutScore", () => {
  it("scores a player with rising snaps, rising touches, and production lagging the role highly", () => {
    const gameLog = [
      game(1, 5, 8),
      game(2, 6, 9),
      game(3, 7, 7),
      game(4, 12, 12),
      game(5, 13, 13),
      game(6, 14, 11),
    ];
    const snapLog = [snap(1, 0.3), snap(2, 0.32), snap(3, 0.28), snap(4, 0.55), snap(5, 0.6), snap(6, 0.65)];

    const result = computeBreakoutScore({ gameLog, snapLog, positionAvgPointsPerTouch: 1.0 });

    expect(result).not.toBeNull();
    expect(result!.breakoutScore).toBeGreaterThan(80);
    expect(result!.snapShareTrend?.delta).toBeCloseTo(0.3, 5);
    expect(result!.touchesTrend.delta).toBeCloseTo(7, 5);
    expect(result!.reasoning.some((l) => l.includes("Snap share"))).toBe(true);
    expect(result!.reasoning.some((l) => l.includes("pre-breakout sign"))).toBe(true);
  });

  it("scores a player with declining role and touches low", () => {
    const gameLog = [
      game(1, 14, 20),
      game(2, 13, 18),
      game(3, 12, 17),
      game(4, 7, 8),
      game(5, 6, 6),
      game(6, 5, 5),
    ];
    const result = computeBreakoutScore({ gameLog, snapLog: [], positionAvgPointsPerTouch: 1.5 });

    expect(result).not.toBeNull();
    expect(result!.breakoutScore).toBeLessThan(40);
    expect(result!.touchesTrend.delta).toBeLessThan(0);
  });

  it("returns null without enough game history to trust a trend", () => {
    const gameLog = [game(1, 5, 8), game(2, 6, 9), game(3, 7, 7), game(4, 8, 10)];
    expect(computeBreakoutScore({ gameLog, snapLog: [], positionAvgPointsPerTouch: 1.0 })).toBeNull();
  });

  it("still scores from touches/efficiency alone when no snap-count data exists", () => {
    const gameLog = [game(1, 5, 5), game(2, 5, 5), game(3, 5, 5), game(4, 10, 10), game(5, 10, 10), game(6, 10, 10)];
    const result = computeBreakoutScore({ gameLog, snapLog: [], positionAvgPointsPerTouch: 1.0 });

    expect(result).not.toBeNull();
    expect(result!.snapShareTrend).toBeNull();
    expect(result!.reasoning.some((l) => l.includes("No snap-count data"))).toBe(true);
  });
});

describe("recommendationFor", () => {
  it("recommends picking up an unrostered free agent", () => {
    expect(recommendationFor(null, false)).toBe("pick_up");
  });
  it("recommends trading for a player rostered on another team", () => {
    expect(recommendationFor(42, false)).toBe("trade_for");
  });
  it("recommends starting a player already on my own roster more", () => {
    expect(recommendationFor(1, true)).toBe("start_more");
  });
});
