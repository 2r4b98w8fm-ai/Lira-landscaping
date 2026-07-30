import { describe, expect, it } from "vitest";
import { computeLeagueAvgValuePerStarter, computeTeamNeeds } from "@/lib/trade/needs";
import { findTradeTargets } from "@/lib/trade/targets";
import { buildOffer } from "@/lib/trade/offers";
import { computeTradeValue } from "@/lib/trade/value";
import type { RosterPlayer, TradeValue } from "@/types/domain";

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

function tv(partial: Partial<RosterPlayer>, replacementLevel = 50): TradeValue {
  return computeTradeValue(player(partial), replacementLevel, { avgRank: null, gamesFound: 0 });
}

const STARTING_SLOTS = { QB: 1, RB: 2, WR: 2, TE: 1, K: 1, DST: 1 };

describe("computeTeamNeeds", () => {
  it("flags a position as surplus when rostered value well exceeds the league-average starting corps", () => {
    const deepTeam = [
      tv({ name: "RB1", position: "RB", restOfSeasonProjection: 150 }),
      tv({ name: "RB2", position: "RB", restOfSeasonProjection: 140 }),
      tv({ name: "RB3", position: "RB", restOfSeasonProjection: 120 }), // depth beyond the 2 starters
    ];
    const thinTeam = [tv({ name: "OnlyRB", position: "RB", restOfSeasonProjection: 60 })];
    const avg = computeLeagueAvgValuePerStarter([deepTeam, thinTeam], 2, STARTING_SLOTS);

    const profile = computeTeamNeeds(1, "Deep RB Team", deepTeam, STARTING_SLOTS, avg);
    const rb = profile.needs.find((n) => n.position === "RB");
    expect(rb?.surplus).toBeGreaterThan(0);
    expect(rb?.rosteredCount).toBe(3);
  });

  it("flags a position as a real need when a team has no rostered players there at all", () => {
    const otherTeam = [
      tv({ name: "RB1", position: "RB", restOfSeasonProjection: 150 }),
      tv({ name: "RB2", position: "RB", restOfSeasonProjection: 140 }),
    ];
    const avg = computeLeagueAvgValuePerStarter([[], otherTeam], 2, STARTING_SLOTS);

    const profile = computeTeamNeeds(1, "Thin Team", [], STARTING_SLOTS, avg);
    const rb = profile.needs.find((n) => n.position === "RB");
    expect(rb?.surplus).toBeLessThan(0);
  });
});

describe("findTradeTargets", () => {
  it("ranks a mutually complementary team above a one-directional fit", () => {
    const myRoster = [
      tv({ name: "MyRB1", position: "RB", restOfSeasonProjection: 200 }),
      tv({ name: "MyRB2", position: "RB", restOfSeasonProjection: 180 }),
      tv({ name: "MyRB3", position: "RB", restOfSeasonProjection: 160 }), // RB surplus, no WR at all
    ];
    const mutualFitRoster = [
      tv({ name: "TheirWR1", position: "WR", restOfSeasonProjection: 200 }),
      tv({ name: "TheirWR2", position: "WR", restOfSeasonProjection: 180 }),
      tv({ name: "TheirWR3", position: "WR", restOfSeasonProjection: 160 }), // WR surplus, no RB at all
    ];
    const oneWayFitRoster = [
      tv({ name: "TheirRB1", position: "RB", restOfSeasonProjection: 60 }),
      tv({ name: "TheirRB2", position: "RB", restOfSeasonProjection: 55 }),
    ]; // thin RB but not empty, and no surplus anywhere to help me back

    const avg = computeLeagueAvgValuePerStarter([myRoster, mutualFitRoster, oneWayFitRoster], 3, STARTING_SLOTS);

    const myTeam = computeTeamNeeds(1, "Me", myRoster, STARTING_SLOTS, avg);
    const mutualFit = computeTeamNeeds(2, "Mutual Fit", mutualFitRoster, STARTING_SLOTS, avg);
    const oneWayFit = computeTeamNeeds(3, "One Way", oneWayFitRoster, STARTING_SLOTS, avg);

    const results = findTradeTargets(myTeam, [oneWayFit, mutualFit]);
    expect(results[0]?.team.teamName).toBe("Mutual Fit");
  });
});

describe("buildOffer", () => {
  it("builds a give/receive package from complementary surplus positions", () => {
    const myRoster = [
      tv({ name: "MyRB1", position: "RB", restOfSeasonProjection: 200 }),
      tv({ name: "MyRB2", position: "RB", restOfSeasonProjection: 180 }),
      tv({ name: "MyRB3", position: "RB", restOfSeasonProjection: 130 }), // tradeable RB depth
    ];
    const targetRoster = [
      tv({ name: "TheirWR1", position: "WR", restOfSeasonProjection: 200 }),
      tv({ name: "TheirWR2", position: "WR", restOfSeasonProjection: 180 }),
      tv({ name: "TheirWR3", position: "WR", restOfSeasonProjection: 128 }), // tradeable WR depth, close in value
    ];

    const avg = computeLeagueAvgValuePerStarter([myRoster, targetRoster], 2, STARTING_SLOTS);
    const myNeeds = computeTeamNeeds(1, "Me", myRoster, STARTING_SLOTS, avg);
    const targetNeeds = computeTeamNeeds(2, "Them", targetRoster, STARTING_SLOTS, avg);

    const offer = buildOffer({
      myRoster,
      myNeeds,
      myStartingSlotCounts: STARTING_SLOTS,
      targetTeamId: 2,
      targetTeamName: "Them",
      targetRoster,
      targetNeeds,
      targetStartingSlotCounts: STARTING_SLOTS,
    });

    expect(offer).not.toBeNull();
    expect(offer?.give[0]?.player.position).toBe("RB");
    expect(offer?.receive[0]?.player.position).toBe("WR");
    expect(offer?.fairnessGapPct).toBeLessThan(15);
  });

  it("returns null when there's no real surplus to build an offer from", () => {
    const myRoster = [tv({ name: "OnlyRB", position: "RB", restOfSeasonProjection: 100 })]; // no depth beyond 2 starters
    const targetRoster = [tv({ name: "OnlyWR", position: "WR", restOfSeasonProjection: 100 })];
    const avg = computeLeagueAvgValuePerStarter([myRoster, targetRoster], 2, STARTING_SLOTS);
    const myNeeds = computeTeamNeeds(1, "Me", myRoster, STARTING_SLOTS, avg);
    const targetNeeds = computeTeamNeeds(2, "Them", targetRoster, STARTING_SLOTS, avg);

    const offer = buildOffer({
      myRoster,
      myNeeds,
      myStartingSlotCounts: STARTING_SLOTS,
      targetTeamId: 2,
      targetTeamName: "Them",
      targetRoster,
      targetNeeds,
      targetStartingSlotCounts: STARTING_SLOTS,
    });

    expect(offer).toBeNull();
  });
});
