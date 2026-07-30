import { describe, expect, it } from "vitest";
import { rankWaiverWire, suggestFaabBid } from "@/lib/waiver/engine";
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

  it("attaches a real-budget FAAB bid suggestion when FAAB state is passed", () => {
    const myRoster = [player({ position: "RB", restOfSeasonProjection: 100 }), player({ position: "RB", restOfSeasonProjection: 80 })];
    const freeAgents = [player({ name: "Big Upgrade", position: "RB", restOfSeasonProjection: 110 })];

    const [rec] = rankWaiverWire(myRoster, freeAgents, SLOTS, { totalBudget: 100, spent: 40 });
    // valueAdded = 110 - 80 = 30; percent = clamp(30*0.02, 0.01, 0.4) = 0.4 (capped); remaining = 60; bid = round(60*0.4) = 24.
    expect(rec?.faabBid?.suggestedBid).toBe(24);
    expect(rec?.faabBid?.percentOfRemaining).toBeCloseTo(0.4, 5);
  });

  it("leaves faabBid null when the league doesn't use FAAB", () => {
    const myRoster = [player({ position: "RB", restOfSeasonProjection: 80 })];
    const freeAgents = [player({ name: "Add", position: "RB", restOfSeasonProjection: 110 })];

    const [rec] = rankWaiverWire(myRoster, freeAgents, SLOTS);
    expect(rec?.faabBid).toBeNull();
  });
});

describe("suggestFaabBid", () => {
  it("scales the bid with value added, capped at 40% of remaining budget", () => {
    const bid = suggestFaabBid(30, { totalBudget: 100, spent: 40 });
    expect(bid?.suggestedBid).toBe(24); // 60 remaining * 40% cap
    expect(bid?.percentOfRemaining).toBeCloseTo(0.4, 5);
    expect(bid?.reasoning).toContain("$60 remaining of a $100 budget");
  });

  it("scales down for a smaller value-add, floored at 1%", () => {
    const bid = suggestFaabBid(0.1, { totalBudget: 100, spent: 40 });
    // percent = clamp(0.1*0.02=0.002, 0.01, 0.4) = 0.01 floor; bid = max(1, round(60*0.01)) = 1
    expect(bid?.suggestedBid).toBe(1);
    expect(bid?.percentOfRemaining).toBeCloseTo(0.01, 5);
  });

  it("returns null for a player that isn't a real upgrade", () => {
    expect(suggestFaabBid(0, { totalBudget: 100, spent: 0 })).toBeNull();
    expect(suggestFaabBid(-5, { totalBudget: 100, spent: 0 })).toBeNull();
  });

  it("returns null once the budget is fully spent", () => {
    expect(suggestFaabBid(50, { totalBudget: 100, spent: 100 })).toBeNull();
  });

  it("assumes the full budget remains and says so when ESPN didn't report spend", () => {
    const bid = suggestFaabBid(30, { totalBudget: 100, spent: null });
    expect(bid?.reasoning).toContain("assuming your full $100 budget remains");
  });
});
