import { describe, expect, it } from "vitest";
import { computeReplacementLevels } from "@/lib/trade/scarcity";
import { computeRestOfSeasonSOS } from "@/lib/trade/schedule";
import { computeTradeValue } from "@/lib/trade/value";
import { analyzeTrade } from "@/lib/trade/analyze";
import type { DefenseRanking, RosterPlayer } from "@/types/domain";

function player(partial: Partial<RosterPlayer>): RosterPlayer {
  return {
    espnPlayerId: 1,
    name: "Test Player",
    position: "RB",
    nflTeam: "BUF",
    lineupSlot: "RB",
    injuryStatus: "ACTIVE",
    opponent: "NE",
    seasonPoints: 50,
    weekProjection: 10,
    restOfSeasonProjection: 100,
    restOfSeasonSource: "espn",
    ...partial,
  };
}

describe("computeReplacementLevels", () => {
  it("finds the value of the last startable player at a position", () => {
    // 2 teams, 1 starting RB each + shared FLEX (RB/WR/TE) -> RB replacement index = 2 + (1/3 flex share)
    const roster: RosterPlayer[] = [
      player({ espnPlayerId: 1, position: "RB", restOfSeasonProjection: 200 }),
      player({ espnPlayerId: 2, position: "RB", restOfSeasonProjection: 150 }),
      player({ espnPlayerId: 3, position: "RB", restOfSeasonProjection: 50 }),
    ];
    const levels = computeReplacementLevels(roster, 2, { RB: 1, FLEX: 1 });
    // replacementIndex = round(2*1 + 2*1/3) = round(2.67) = 3 -> index 2 (0-based), clamped to last (50)
    expect(levels.RB).toBe(50);
  });

  it("returns 0 for a position with no rostered players", () => {
    const levels = computeReplacementLevels([], 10, { QB: 1 });
    expect(levels.QB).toBe(0);
  });
});

describe("computeRestOfSeasonSOS", () => {
  const defenses: DefenseRanking[] = [
    { team: "NE", position: "RB", rank: 30, avgPointsAllowedPpr: 25, weeksSampled: 4 },
    { team: "MIA", position: "RB", rank: 5, avgPointsAllowedPpr: 8, weeksSampled: 4 },
  ];

  it("averages defense rank across remaining opponents", () => {
    const result = computeRestOfSeasonSOS("RB", ["NE", "MIA"], defenses);
    expect(result.avgRank).toBe(17.5);
    expect(result.gamesFound).toBe(2);
  });

  it("returns null (not a guess) when there's no matchup data at all", () => {
    const result = computeRestOfSeasonSOS("RB", ["XYZ"], defenses);
    expect(result.avgRank).toBeNull();
    expect(result.gamesFound).toBe(0);
  });
});

describe("computeTradeValue", () => {
  it("values a healthy player above replacement with a neutral schedule", () => {
    const p = player({ restOfSeasonProjection: 150, injuryStatus: "ACTIVE" });
    const value = computeTradeValue(p, 100, { avgRank: null, gamesFound: 0 });
    expect(value.vorp).toBe(50);
    expect(value.injuryMultiplier).toBe(1);
    expect(value.scheduleMultiplier).toBe(1);
    expect(value.finalValue).toBe(50);
  });

  it("floors VORP so a below-replacement player still has some value, not zero", () => {
    const p = player({ restOfSeasonProjection: 20 });
    const value = computeTradeValue(p, 100, { avgRank: null, gamesFound: 0 });
    expect(value.vorp).toBe(0.5);
  });

  it("discounts value for an OUT player", () => {
    const p = player({ restOfSeasonProjection: 150, injuryStatus: "OUT" });
    const value = computeTradeValue(p, 100, { avgRank: null, gamesFound: 0 });
    expect(value.finalValue).toBeCloseTo(50 * 0.4, 5);
  });

  it("boosts value for a favorable rest-of-season schedule and discounts for a tough one", () => {
    const p = player({ restOfSeasonProjection: 150 });
    const easy = computeTradeValue(p, 100, { avgRank: 30, gamesFound: 5 });
    const hard = computeTradeValue(p, 100, { avgRank: 3, gamesFound: 5 });
    expect(easy.finalValue).toBeGreaterThan(50);
    expect(hard.finalValue).toBeLessThan(50);
  });

  it("never fabricates value for a player with no rest-of-season projection", () => {
    const p = player({ restOfSeasonProjection: null, restOfSeasonSource: null });
    const value = computeTradeValue(p, 100, { avgRank: null, gamesFound: 0 });
    expect(value.vorp).toBe(0.5);
    expect(value.reasoning[0]).toContain("No rest-of-season projection available");
  });
});

describe("analyzeTrade", () => {
  it("calls a near-even trade fair", () => {
    const a = computeTradeValue(player({ restOfSeasonProjection: 150 }), 100, { avgRank: null, gamesFound: 0 });
    const b = computeTradeValue(player({ restOfSeasonProjection: 148 }), 100, { avgRank: null, gamesFound: 0 });
    const result = analyzeTrade({ id: 1, name: "Team A" }, [a], { id: 2, name: "Team B" }, [b]);
    expect(result.verdict).toMatch(/Fair/);
  });

  it("flags a lopsided trade and names who it favors", () => {
    const a = computeTradeValue(player({ restOfSeasonProjection: 300 }), 100, { avgRank: null, gamesFound: 0 });
    const b = computeTradeValue(player({ restOfSeasonProjection: 105 }), 100, { avgRank: null, gamesFound: 0 });
    const result = analyzeTrade({ id: 1, name: "Team A" }, [a], { id: 2, name: "Team B" }, [b]);
    expect(result.favors).toBe("A");
    expect(result.verdict).toMatch(/Team A/);
  });
});
