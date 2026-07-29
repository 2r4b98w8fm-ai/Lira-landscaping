import { describe, expect, it } from "vitest";
import { computeTeamScoreDistribution } from "@/lib/simulation/teamScore";
import type { RosterPlayer } from "@/types/domain";

let nextId = 1;
function player(partial: Partial<RosterPlayer>): RosterPlayer {
  return {
    espnPlayerId: nextId++,
    name: partial.name ?? "Player",
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

const SLOTS = { QB: 1, RB: 2, WR: 2, TE: 1, FLEX: 1, K: 1, DST: 1 };

describe("computeTeamScoreDistribution", () => {
  it("starts only the top N players at each position and sums their weekly means", () => {
    const roster = [
      player({ name: "RB1", position: "RB", restOfSeasonProjection: 140 }), // 14/wk over 10 weeks
      player({ name: "RB2", position: "RB", restOfSeasonProjection: 120 }), // 12/wk
      player({ name: "RB3", position: "RB", restOfSeasonProjection: 60 }), // bench, 6/wk
    ];
    const result = computeTeamScoreDistribution(roster, { RB: 2 }, 10, {});
    // Only the top 2 RBs start: 14 + 12 = 26/wk. RB3 excluded.
    expect(result.mean).toBeCloseTo(26, 5);
  });

  it("fills FLEX from the best remaining RB/WR/TE after position starters are set", () => {
    const roster = [
      player({ name: "RB1", position: "RB", restOfSeasonProjection: 100 }), // 10/wk, starts at RB
      player({ name: "RB2", position: "RB", restOfSeasonProjection: 80 }), // 8/wk, flex candidate
      player({ name: "WR1", position: "WR", restOfSeasonProjection: 50 }), // 5/wk, flex candidate
    ];
    const result = computeTeamScoreDistribution(roster, { RB: 1, WR: 0, FLEX: 1 }, 10, {});
    // RB1 starts at RB (10/wk). FLEX picks the better of RB2 (8) vs WR1 (5) -> RB2.
    expect(result.mean).toBeCloseTo(18, 5);
  });

  it("combines real per-position variance across starters as independent (sqrt of summed variances)", () => {
    const roster = [player({ position: "RB", restOfSeasonProjection: 100 }), player({ position: "WR", restOfSeasonProjection: 100 })];
    const result = computeTeamScoreDistribution(
      roster,
      { RB: 1, WR: 1 },
      10,
      { RB: { meanPpr: 10, stdevPpr: 3 }, WR: { meanPpr: 10, stdevPpr: 4 } }
    );
    expect(result.stdev).toBeCloseTo(Math.sqrt(3 * 3 + 4 * 4), 5);
  });

  it("falls back to a documented fixed spread for K/DST, which nflverse has no player-level variance for", () => {
    const roster = [player({ position: "K", restOfSeasonProjection: 80 })];
    const result = computeTeamScoreDistribution(roster, { K: 1 }, 10, {});
    expect(result.stdev).toBeGreaterThan(0);
  });
});
