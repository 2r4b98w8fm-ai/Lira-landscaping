import { describe, expect, it } from "vitest";
import { computeOptimalLineup } from "@/lib/startsit/optimalLineup";
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

const SLOTS = { QB: 1, RB: 2, WR: 2, TE: 1, FLEX: 1, K: 1, DST: 1 };

describe("computeOptimalLineup", () => {
  it("fills required slots with the top projected player at each position, then FLEX with the best leftover", () => {
    const roster = [
      player({ name: "QB1", position: "QB", weekProjection: 20 }),
      player({ name: "RB1", position: "RB", weekProjection: 25 }),
      player({ name: "RB2", position: "RB", weekProjection: 20 }),
      player({ name: "RB3", position: "RB", weekProjection: 15 }), // best leftover RB — should win FLEX
      player({ name: "WR1", position: "WR", weekProjection: 18 }),
      player({ name: "WR2", position: "WR", weekProjection: 16 }),
      player({ name: "WR3", position: "WR", weekProjection: 10 }),
      player({ name: "TE1", position: "TE", weekProjection: 12 }),
      player({ name: "K1", position: "K", weekProjection: 8 }),
      player({ name: "DST1", position: "DST", weekProjection: 7 }),
    ];

    const lineup = computeOptimalLineup(roster, SLOTS);
    const flexSlot = lineup.starters.find((s) => s.slot === "FLEX");
    expect(flexSlot?.player?.name).toBe("RB3");

    const benchNames = lineup.bench.map((p) => p.name);
    expect(benchNames).toEqual(["WR3"]);

    // 20+25+20+15+18+16+12+8+7 = 141
    expect(lineup.totalProjectedPoints).toBe(141);
  });

  it("never starts an OUT or IR player even if their raw projection is highest", () => {
    const roster = [
      player({ name: "Hurt RB", position: "RB", weekProjection: 30, injuryStatus: "OUT" }),
      player({ name: "Healthy RB1", position: "RB", weekProjection: 15 }),
      player({ name: "Healthy RB2", position: "RB", weekProjection: 12 }),
    ];
    const slots = { RB: 2 };

    const lineup = computeOptimalLineup(roster, slots);
    const startedNames = lineup.starters.filter((s) => s.player).map((s) => s.player!.name);
    expect(startedNames).toEqual(["Healthy RB1", "Healthy RB2"]);
    expect(lineup.bench.map((p) => p.name)).toContain("Hurt RB");
  });

  it("leaves a slot unfilled rather than fabricating a starter when nobody healthy is available", () => {
    const roster = [player({ name: "Only RB", position: "RB", injuryStatus: "IR" })];
    const lineup = computeOptimalLineup(roster, { RB: 1 });
    const rbSlot = lineup.starters.find((s) => s.slot === "RB");
    expect(rbSlot?.player).toBeNull();
  });

  it("flags exactly the players that need to move between bench and starting lineup", () => {
    const roster = [
      player({ name: "ShouldStart", position: "RB", lineupSlot: "BE", weekProjection: 25 }),
      player({ name: "CurrentlyStarting", position: "RB", lineupSlot: "RB", weekProjection: 5 }),
    ];
    const lineup = computeOptimalLineup(roster, { RB: 1 });
    expect(lineup.changesFromCurrent).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ player: expect.objectContaining({ name: "CurrentlyStarting" }), action: "sit" }),
        expect.objectContaining({ player: expect.objectContaining({ name: "ShouldStart" }), action: "start" }),
      ])
    );
    expect(lineup.changesFromCurrent).toHaveLength(2);
  });

  it("reports no changes when the current lineup is already optimal", () => {
    const roster = [player({ name: "Starter", position: "RB", lineupSlot: "RB", weekProjection: 20 })];
    const lineup = computeOptimalLineup(roster, { RB: 1 });
    expect(lineup.changesFromCurrent).toEqual([]);
  });
});
