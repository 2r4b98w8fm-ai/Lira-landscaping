import { describe, expect, it } from "vitest";
import { rankWaiverWire } from "@/lib/waiver/engine";
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
    projectionBreakdown: null,
    ...partial,
  };
}

const SLOTS = { QB: 1, RB: 2, WR: 2, TE: 1, K: 1, DST: 1 };

describe("rankWaiverWire", () => {
  it("ranks a free agent above the worst current starter as a real upgrade", () => {
    const myRoster = [
      player({ name: "RB1", position: "RB", restOfSeasonProjection: 150 }),
      player({ name: "RB2 (worst starter)", position: "RB", restOfSeasonProjection: 80 }),
    ];
    const freeAgents = [player({ name: "Waiver Add", position: "RB", restOfSeasonProjection: 110 })];

    const [rec] = rankWaiverWire(myRoster, freeAgents, SLOTS);
    expect(rec?.myWorstStarterValue).toBe(80);
    expect(rec?.valueAdded).toBe(30);
    expect(rec?.reasoning.some((r) => r.includes("real upgrade"))).toBe(true);
  });

  it("flags a free agent as not an upgrade when it's below the worst starter", () => {
    const myRoster = [
      player({ name: "RB1", position: "RB", restOfSeasonProjection: 150 }),
      player({ name: "RB2", position: "RB", restOfSeasonProjection: 120 }),
    ];
    const freeAgents = [player({ name: "Marginal Add", position: "RB", restOfSeasonProjection: 90 })];

    const [rec] = rankWaiverWire(myRoster, freeAgents, SLOTS);
    expect(rec?.valueAdded).toBe(-30);
    expect(rec?.reasoning.some((r) => r.includes("Not an upgrade"))).toBe(true);
  });

  it("treats the bar as 0 when you don't even roster enough starters at the position", () => {
    const myRoster: RosterPlayer[] = []; // no RBs at all, need 2
    const freeAgents = [player({ name: "Any Warm Body", position: "RB", restOfSeasonProjection: 20 })];

    const [rec] = rankWaiverWire(myRoster, freeAgents, SLOTS);
    expect(rec?.myWorstStarterValue).toBe(0);
    expect(rec?.valueAdded).toBe(20);
  });

  it("never fabricates value added for a free agent with no projection, and sorts it last", () => {
    const myRoster = [player({ position: "RB", restOfSeasonProjection: 100 }), player({ position: "RB", restOfSeasonProjection: 90 })];
    const freeAgents = [
      player({ name: "Known", position: "RB", restOfSeasonProjection: 95 }),
      player({ name: "Unknown", position: "RB", restOfSeasonProjection: null, restOfSeasonSource: null }),
    ];

    const ranked = rankWaiverWire(myRoster, freeAgents, SLOTS);
    expect(ranked[0]?.player.name).toBe("Known");
    expect(ranked[1]?.player.name).toBe("Unknown");
    expect(ranked[1]?.valueAdded).toBeNull();
    expect(ranked[1]?.reasoning).toContain("No rest-of-season projection available for this player.");
  });
});
