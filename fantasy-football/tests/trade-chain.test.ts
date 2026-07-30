import { describe, expect, it } from "vitest";
import { computeTradeValue } from "@/lib/trade/value";
import { computeLeagueAvgValuePerStarter, computeTeamNeeds } from "@/lib/trade/needs";
import { planTradeChain } from "@/lib/trade/chain";
import type { CandidateTeam } from "@/lib/trade/recommend";
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

const SLOTS = { QB: 1, RB: 2, WR: 2, TE: 1, K: 1, DST: 1 };

describe("planTradeChain", () => {
  it("plans a second, different trade against a different team using the post-step-1 roster", () => {
    // I have deep RB surplus (4 rostered, 2 tradeable beyond my starters)
    // but real needs at WR and TE. Team A is stacked at WR but needs RB;
    // Team B is stacked at TE but also needs RB. A single-hop tool could
    // only ever fix one of my two needs — the chain should fix both,
    // trading a *different* RB to each team.
    const myRoster: TradeValue[] = [
      tv({ name: "MyRB1", position: "RB", restOfSeasonProjection: 300 }),
      tv({ name: "MyRB2", position: "RB", restOfSeasonProjection: 290 }),
      tv({ name: "MyRB3", position: "RB", restOfSeasonProjection: 130 }),
      tv({ name: "MyRB4", position: "RB", restOfSeasonProjection: 120 }),
      tv({ name: "MyWR1", position: "WR", restOfSeasonProjection: 60 }),
      tv({ name: "MyWR2", position: "WR", restOfSeasonProjection: 55 }),
      tv({ name: "MyTE1", position: "TE", restOfSeasonProjection: 30 }),
    ];
    const teamARoster: TradeValue[] = [
      tv({ name: "A_RB1", position: "RB", restOfSeasonProjection: 40 }),
      tv({ name: "A_RB2", position: "RB", restOfSeasonProjection: 35 }),
      tv({ name: "A_WR1", position: "WR", restOfSeasonProjection: 200 }),
      tv({ name: "A_WR2", position: "WR", restOfSeasonProjection: 190 }),
      tv({ name: "A_WR3", position: "WR", restOfSeasonProjection: 90 }),
      tv({ name: "A_WR4", position: "WR", restOfSeasonProjection: 85 }),
      tv({ name: "A_TE1", position: "TE", restOfSeasonProjection: 50 }),
    ];
    const teamBRoster: TradeValue[] = [
      tv({ name: "B_RB1", position: "RB", restOfSeasonProjection: 45 }),
      tv({ name: "B_RB2", position: "RB", restOfSeasonProjection: 40 }),
      tv({ name: "B_WR1", position: "WR", restOfSeasonProjection: 70 }),
      tv({ name: "B_WR2", position: "WR", restOfSeasonProjection: 65 }),
      tv({ name: "B_TE1", position: "TE", restOfSeasonProjection: 120 }),
      tv({ name: "B_TE2", position: "TE", restOfSeasonProjection: 110 }),
      tv({ name: "B_TE3", position: "TE", restOfSeasonProjection: 100 }),
    ];

    const avg = computeLeagueAvgValuePerStarter([myRoster, teamARoster, teamBRoster], 3, SLOTS);
    const myNeeds = computeTeamNeeds(1, "Me", myRoster, SLOTS, avg);
    const otherTeams: CandidateTeam[] = [
      { teamId: 2, teamName: "Team A", roster: teamARoster, needs: computeTeamNeeds(2, "Team A", teamARoster, SLOTS, avg), startingSlotCounts: SLOTS },
      { teamId: 3, teamName: "Team B", roster: teamBRoster, needs: computeTeamNeeds(3, "Team B", teamBRoster, SLOTS, avg), startingSlotCounts: SLOTS },
    ];

    const chain = planTradeChain(myRoster, myNeeds, SLOTS, otherTeams, avg);

    expect(chain.steps).toHaveLength(2);
    expect(chain.steps[0]?.offer.targetTeamName).toBe("Team A");
    expect(chain.steps[0]?.offer.receive.map((tv) => tv.player.position)).toEqual(["WR", "WR"]);
    expect(chain.steps[1]?.offer.targetTeamName).toBe("Team B");
    expect(chain.steps[1]?.offer.receive.map((tv) => tv.player.position)).toEqual(["TE"]);

    // Step 2 must give a DIFFERENT player than step 1 already gave away.
    const givenInStep1 = new Set(chain.steps[0]?.offer.give.map((tv) => tv.player.espnPlayerId));
    for (const tv of chain.steps[1]?.offer.give ?? []) {
      expect(givenInStep1.has(tv.player.espnPlayerId)).toBe(false);
    }
  });

  it("never proposes a second trade with a team already used in an earlier step", () => {
    const myRoster: TradeValue[] = [
      tv({ name: "MyRB1", position: "RB", restOfSeasonProjection: 300 }),
      tv({ name: "MyRB2", position: "RB", restOfSeasonProjection: 290 }),
      tv({ name: "MyRB3", position: "RB", restOfSeasonProjection: 130 }),
    ];
    const onlyOtherTeam: TradeValue[] = [
      tv({ name: "A_RB1", position: "RB", restOfSeasonProjection: 40 }),
      tv({ name: "A_RB2", position: "RB", restOfSeasonProjection: 35 }),
      tv({ name: "A_WR1", position: "WR", restOfSeasonProjection: 90 }),
      tv({ name: "A_WR2", position: "WR", restOfSeasonProjection: 85 }),
      tv({ name: "A_WR3", position: "WR", restOfSeasonProjection: 75 }), // tradeable depth beyond their 2 starters
    ];
    const avg = computeLeagueAvgValuePerStarter([myRoster, onlyOtherTeam], 2, SLOTS);
    const myNeeds = computeTeamNeeds(1, "Me", myRoster, SLOTS, avg);
    const otherTeams: CandidateTeam[] = [
      { teamId: 2, teamName: "Only Team", roster: onlyOtherTeam, needs: computeTeamNeeds(2, "Only Team", onlyOtherTeam, SLOTS, avg), startingSlotCounts: SLOTS },
    ];

    const chain = planTradeChain(myRoster, myNeeds, SLOTS, otherTeams, avg);

    // Only one team exists in the league, so the plan can't chain further
    // even though maxHops defaults to 2 — it must stop at 1 step.
    expect(chain.steps).toHaveLength(1);
    expect(chain.steps[0]?.offer.targetTeamId).toBe(2);
  });
});
