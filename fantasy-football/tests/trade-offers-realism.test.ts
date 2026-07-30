import { describe, expect, it } from "vitest";
import { computeTradeValue } from "@/lib/trade/value";
import { buildOffer } from "@/lib/trade/offers";
import type { RosterPlayer, TeamNeedsProfile, TradeValue } from "@/types/domain";

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

function needsProfile(
  needs: Array<{ position: TeamNeedsProfile["needs"][number]["position"]; surplus: number; startingRequirement: number; rosteredCount: number }>
): TeamNeedsProfile {
  return { teamId: 2, teamName: "Them", needs };
}

describe("buildOffer targets the other team's worst weakness", () => {
  it("gives from the position where THEY are weakest, not just where I have the most surplus", () => {
    // I have more raw surplus at RB (300) than WR (100), but their need is
    // far more severe at WR (-200) than at RB (-10) — the old algorithm
    // picked whichever position I had the most surplus in (RB); the fix
    // should target their actual biggest hole (WR) instead.
    const myRoster: TradeValue[] = [
      tv({ name: "MyRB1", position: "RB", restOfSeasonProjection: 300 }),
      tv({ name: "MyRB2", position: "RB", restOfSeasonProjection: 280 }),
      tv({ name: "MyRB3", position: "RB", restOfSeasonProjection: 260 }), // RB depth
      tv({ name: "MyWR1", position: "WR", restOfSeasonProjection: 250 }),
      tv({ name: "MyWR2", position: "WR", restOfSeasonProjection: 240 }),
      tv({ name: "MyWR3", position: "WR", restOfSeasonProjection: 230 }), // WR depth
    ];
    const myNeeds = needsProfile([
      { position: "RB", surplus: 300, startingRequirement: 2, rosteredCount: 3 },
      { position: "WR", surplus: 100, startingRequirement: 2, rosteredCount: 3 },
      { position: "TE", surplus: -50, startingRequirement: 1, rosteredCount: 1 },
    ]);
    const targetNeeds: TeamNeedsProfile = {
      teamId: 2,
      teamName: "Them",
      needs: [
        { position: "RB", surplus: -10, startingRequirement: 2, rosteredCount: 2 }, // mild need
        { position: "WR", surplus: -200, startingRequirement: 2, rosteredCount: 0 }, // severe need
        { position: "TE", surplus: 80, startingRequirement: 1, rosteredCount: 3 },
      ],
    };
    const targetRoster: TradeValue[] = [
      tv({ name: "TheirTE1", position: "TE", restOfSeasonProjection: 100 }),
      tv({ name: "TheirTE2", position: "TE", restOfSeasonProjection: 90 }),
      tv({ name: "TheirTE3", position: "TE", restOfSeasonProjection: 80 }),
    ];

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
    expect(offer?.give[0]?.player.position).toBe("WR");
  });

  it("prefers a combination where I give up at least as much value as I receive (favorsThem)", () => {
    const myRoster: TradeValue[] = [
      tv({ name: "MyRB1", position: "RB", restOfSeasonProjection: 200 }),
      tv({ name: "MyRB2", position: "RB", restOfSeasonProjection: 180 }),
      tv({ name: "MyRB3", position: "RB", restOfSeasonProjection: 130 }),
    ];
    const targetRoster: TradeValue[] = [
      tv({ name: "TheirWR1", position: "WR", restOfSeasonProjection: 200 }),
      tv({ name: "TheirWR2", position: "WR", restOfSeasonProjection: 180 }),
      tv({ name: "TheirWR3", position: "WR", restOfSeasonProjection: 90 }), // clearly less than my give candidate
    ];
    const myNeeds = needsProfile([
      { position: "RB", surplus: 200, startingRequirement: 2, rosteredCount: 3 },
    ]);
    const targetNeeds: TeamNeedsProfile = {
      teamId: 2,
      teamName: "Them",
      needs: [{ position: "WR", surplus: 100, startingRequirement: 2, rosteredCount: 3 }],
    };
    myNeeds.needs.push({ position: "WR", surplus: -80, startingRequirement: 2, rosteredCount: 0 });
    targetNeeds.needs.push({ position: "RB", surplus: -80, startingRequirement: 2, rosteredCount: 0 });

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
    expect(offer?.giveValue).toBeGreaterThanOrEqual(offer?.receiveValue ?? 0);
    expect(offer?.favorsThem).toBe(true);
  });

  it("recommends a drop candidate when the trade nets more players than it gives up", () => {
    // My RB corps has exactly 1 tradeable depth piece beyond my 2 starters
    // (MyRB3). Their WR corps has 2 starters (90, 80) plus 2 tradeable
    // depth pieces (75, 70) — together worth less than my RB3 (130), so
    // the "closest to fair without exceeding it" search prefers the PAIR
    // over either single depth WR, producing a 1-for-2 shape.
    const myRoster: TradeValue[] = [
      tv({ name: "MyRB1", position: "RB", restOfSeasonProjection: 220 }),
      tv({ name: "MyRB2", position: "RB", restOfSeasonProjection: 200 }),
      tv({ name: "MyRB3", position: "RB", restOfSeasonProjection: 130 }), // tradeable depth
      tv({ name: "MyBenchWR", position: "WR", restOfSeasonProjection: 55 }), // weakest remaining piece — expected drop candidate
    ];
    const targetRoster: TradeValue[] = [
      tv({ name: "TheirWRStarter1", position: "WR", restOfSeasonProjection: 90 }),
      tv({ name: "TheirWRStarter2", position: "WR", restOfSeasonProjection: 80 }),
      tv({ name: "TheirWRDepth1", position: "WR", restOfSeasonProjection: 75 }), // tradeable depth
      tv({ name: "TheirWRDepth2", position: "WR", restOfSeasonProjection: 70 }), // tradeable depth
    ];
    const myNeeds: TeamNeedsProfile = {
      teamId: 1,
      teamName: "Me",
      needs: [
        { position: "RB", surplus: 200, startingRequirement: 2, rosteredCount: 3 },
        { position: "WR", surplus: -80, startingRequirement: 2, rosteredCount: 1 },
      ],
    };
    const targetNeeds: TeamNeedsProfile = {
      teamId: 2,
      teamName: "Them",
      needs: [
        { position: "RB", surplus: -80, startingRequirement: 2, rosteredCount: 0 },
        { position: "WR", surplus: 60, startingRequirement: 2, rosteredCount: 4 },
      ],
    };

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

    expect(offer?.give).toHaveLength(1);
    expect(offer?.receive).toHaveLength(2);
    expect(offer?.dropCandidate?.player.name).toBe("MyBenchWR");
  });

  it("returns null with no drop candidate when there's no real surplus to trade", () => {
    const myRoster = [tv({ name: "OnlyRB", position: "RB", restOfSeasonProjection: 100 })];
    const targetRoster = [tv({ name: "OnlyWR", position: "WR", restOfSeasonProjection: 100 })];
    const myNeeds: TeamNeedsProfile = { teamId: 1, teamName: "Me", needs: [] };
    const targetNeeds: TeamNeedsProfile = { teamId: 2, teamName: "Them", needs: [] };

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
