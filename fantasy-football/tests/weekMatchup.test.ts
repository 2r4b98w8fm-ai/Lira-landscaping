import { describe, expect, it } from "vitest";
import { computeMatchupPreview, computeWeekScoreDistribution } from "@/lib/simulation/weekMatchup";
import type { RosterPlayer } from "@/types/domain";

let nextId = 1;
function player(partial: Partial<RosterPlayer>): RosterPlayer {
  return {
    espnPlayerId: nextId++,
    name: partial.name ?? "Player",
    position: "RB",
    nflTeam: "BUF",
    lineupSlot: "BE",
    injuryStatus: "ACTIVE",
    opponent: "NE",
    seasonPoints: 50,
    weekProjection: 10,
    restOfSeasonProjection: 100,
    restOfSeasonSource: "espn",
    projectionBreakdown: null,
    ...partial,
  };
}

const SLOTS = { QB: 1, RB: 1 };

describe("computeMatchupPreview", () => {
  it("gives an even 50% when both teams project identically with the same spread", () => {
    const result = computeMatchupPreview({ mean: 100, stdev: 10 }, { mean: 100, stdev: 10 });
    expect(result.winProbabilityPct).toBeCloseTo(50, 5);
  });

  it("favors the team with the higher mean", () => {
    const result = computeMatchupPreview({ mean: 120, stdev: 10 }, { mean: 100, stdev: 10 });
    expect(result.winProbabilityPct).toBeGreaterThan(50);
  });

  it("is symmetric — swapping sides flips the probability around 50%", () => {
    const a = computeMatchupPreview({ mean: 120, stdev: 15 }, { mean: 100, stdev: 12 });
    const b = computeMatchupPreview({ mean: 100, stdev: 12 }, { mean: 120, stdev: 15 });
    expect(a.winProbabilityPct + b.winProbabilityPct).toBeCloseTo(100, 5);
  });

  it("handles a zero-variance edge case deterministically", () => {
    const win = computeMatchupPreview({ mean: 100, stdev: 0 }, { mean: 90, stdev: 0 });
    expect(win.winProbabilityPct).toBe(100);
    const lose = computeMatchupPreview({ mean: 90, stdev: 0 }, { mean: 100, stdev: 0 });
    expect(lose.winProbabilityPct).toBe(0);
    const tie = computeMatchupPreview({ mean: 100, stdev: 0 }, { mean: 100, stdev: 0 });
    expect(tie.winProbabilityPct).toBe(50);
  });
});

describe("computeWeekScoreDistribution", () => {
  it("uses the optimal lineup's total as the mean", () => {
    const roster = [
      player({ position: "QB", weekProjection: 20 }),
      player({ position: "RB", weekProjection: 15 }),
    ];
    const dist = computeWeekScoreDistribution(roster, SLOTS, {});
    expect(dist.mean).toBe(35);
  });

  it("uses real position variance when available, falling back for K/DST", () => {
    const roster = [player({ position: "RB", weekProjection: 15 })];
    const withVariance = computeWeekScoreDistribution(roster, { RB: 1 }, { RB: { meanPpr: 12, stdevPpr: 7 } });
    expect(withVariance.stdev).toBe(7);

    const dstRoster = [player({ position: "DST", weekProjection: 8 })];
    const dstDist = computeWeekScoreDistribution(dstRoster, { DST: 1 }, {});
    expect(dstDist.stdev).toBe(4); // documented fallback
  });
});
