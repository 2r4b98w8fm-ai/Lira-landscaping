import { describe, expect, it } from "vitest";
import { computeLeagueAvgValuePerStarter, computeTeamNeeds } from "@/lib/trade/needs";
import { computeTradeValue } from "@/lib/trade/value";
import { recommendTrades, type CandidateTeam } from "@/lib/trade/recommend";
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

function tv(partial: Partial<RosterPlayer>): TradeValue {
  return computeTradeValue(player(partial), 50, { avgRank: null, gamesFound: 0 });
}

const STARTING_SLOTS = { QB: 1, RB: 2, WR: 2, TE: 1, K: 1, DST: 1 };

describe("recommendTrades", () => {
  it("ranks a real mutual-fit trade above a team with nothing to offer, and excludes teams with no viable trade", () => {
    const myRoster = [
      tv({ name: "MyRB1", position: "RB", restOfSeasonProjection: 200 }),
      tv({ name: "MyRB2", position: "RB", restOfSeasonProjection: 180 }),
      tv({ name: "MyRB3", position: "RB", restOfSeasonProjection: 160 }), // RB surplus, no WR at all
    ];
    const goodPartnerRoster = [
      tv({ name: "TheirWR1", position: "WR", restOfSeasonProjection: 200 }),
      tv({ name: "TheirWR2", position: "WR", restOfSeasonProjection: 180 }),
      tv({ name: "TheirWR3", position: "WR", restOfSeasonProjection: 155 }), // WR surplus, close in value, no RB
    ];
    const noFitRoster = [
      tv({ name: "TheirOnlyRB", position: "RB", restOfSeasonProjection: 100 }),
      tv({ name: "TheirOnlyWR", position: "WR", restOfSeasonProjection: 100 }),
    ]; // balanced, no real surplus anywhere

    const avg = computeLeagueAvgValuePerStarter([myRoster, goodPartnerRoster, noFitRoster], 3, STARTING_SLOTS);
    const myNeeds = computeTeamNeeds(1, "Me", myRoster, STARTING_SLOTS, avg);
    const goodPartnerNeeds = computeTeamNeeds(2, "Good Partner", goodPartnerRoster, STARTING_SLOTS, avg);
    const noFitNeeds = computeTeamNeeds(3, "No Fit", noFitRoster, STARTING_SLOTS, avg);

    const otherTeams: CandidateTeam[] = [
      { teamId: 2, teamName: "Good Partner", roster: goodPartnerRoster, needs: goodPartnerNeeds, startingSlotCounts: STARTING_SLOTS },
      { teamId: 3, teamName: "No Fit", roster: noFitRoster, needs: noFitNeeds, startingSlotCounts: STARTING_SLOTS },
    ];

    const recommendations = recommendTrades(myRoster, myNeeds, STARTING_SLOTS, otherTeams);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0]?.targetTeamName).toBe("Good Partner");
    expect(recommendations[0]?.give[0]?.player.position).toBe("RB");
    expect(recommendations[0]?.receive[0]?.player.position).toBe("WR");
  });

  it("returns an empty list when no other team has a viable trade", () => {
    const myRoster = [tv({ name: "OnlyRB", position: "RB", restOfSeasonProjection: 100 })];
    const otherRoster = [tv({ name: "OnlyWR", position: "WR", restOfSeasonProjection: 100 })];
    const avg = computeLeagueAvgValuePerStarter([myRoster, otherRoster], 2, STARTING_SLOTS);
    const myNeeds = computeTeamNeeds(1, "Me", myRoster, STARTING_SLOTS, avg);
    const otherNeeds = computeTeamNeeds(2, "Them", otherRoster, STARTING_SLOTS, avg);

    const recommendations = recommendTrades(myRoster, myNeeds, STARTING_SLOTS, [
      { teamId: 2, teamName: "Them", roster: otherRoster, needs: otherNeeds, startingSlotCounts: STARTING_SLOTS },
    ]);

    expect(recommendations).toEqual([]);
  });
});
