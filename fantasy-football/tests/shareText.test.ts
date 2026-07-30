import { describe, expect, it } from "vitest";
import { computeTradeValue } from "@/lib/trade/value";
import { formatOfferAsText } from "@/lib/trade/shareText";
import type { RosterPlayer, SuggestedOffer } from "@/types/domain";

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

function tv(partial: Partial<RosterPlayer>) {
  return computeTradeValue(player(partial), 50, { avgRank: null, gamesFound: 0 });
}

function baseOffer(overrides: Partial<SuggestedOffer>): SuggestedOffer {
  return {
    targetTeamId: 2,
    targetTeamName: "Rival Team",
    give: [tv({ name: "MyGiveGuy", restOfSeasonProjection: 150 })],
    receive: [tv({ name: "TheirReceiveGuy", restOfSeasonProjection: 140 })],
    giveValue: 100,
    receiveValue: 90,
    fairnessGapPct: 10,
    favorsThem: true,
    dropCandidates: [],
    rationale: [],
    ...overrides,
  };
}

describe("formatOfferAsText", () => {
  it("addresses the message to the target team and lists both sides", () => {
    const text = formatOfferAsText(baseOffer({}));
    expect(text).toContain("Trade offer for Rival Team:");
    expect(text).toContain("I send: MyGiveGuy");
    expect(text).toContain("You send: TheirReceiveGuy");
  });

  it("includes a favor-them note only when the offer favors them", () => {
    const favors = formatOfferAsText(baseOffer({ favorsThem: true }));
    expect(favors).toContain("This favors you value-wise");

    const doesNotFavor = formatOfferAsText(baseOffer({ favorsThem: false }));
    expect(doesNotFavor).not.toContain("This favors you value-wise");
  });

  it("mentions drop candidates when present", () => {
    const text = formatOfferAsText(
      baseOffer({ dropCandidates: [tv({ name: "BenchGuy", restOfSeasonProjection: 55 })] })
    );
    expect(text).toContain("I'd drop BenchGuy");
  });
});
