import { describe, expect, it } from "vitest";
import { computeTradeValue } from "@/lib/trade/value";
import { rankPlayers } from "@/lib/rankings/build";
import type { RankingEntry } from "@/lib/rankings/context";
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

function entry(partial: Partial<RosterPlayer>, rosteredBy: string | null, rosteredByTeamId: number | null): RankingEntry {
  const p = player(partial);
  return {
    player: p,
    tradeValue: computeTradeValue(p, 50, { avgRank: null, gamesFound: 0 }),
    rosteredBy,
    rosteredByTeamId,
  };
}

describe("rankPlayers", () => {
  it("sorts by trade value descending and assigns sequential overall ranks", () => {
    const entries = [
      entry({ name: "Low", position: "RB", restOfSeasonProjection: 60 }, "Team A", 1),
      entry({ name: "High", position: "WR", restOfSeasonProjection: 200 }, "Team B", 2),
      entry({ name: "Mid", position: "RB", restOfSeasonProjection: 120 }, null, null),
    ];

    const ranked = rankPlayers(entries);
    expect(ranked.map((r) => r.player.name)).toEqual(["High", "Mid", "Low"]);
    expect(ranked.map((r) => r.overallRank)).toEqual([1, 2, 3]);
  });

  it("tracks positional rank independently per position", () => {
    const entries = [
      entry({ name: "RB1", position: "RB", restOfSeasonProjection: 200 }, "Team A", 1),
      entry({ name: "WR1", position: "WR", restOfSeasonProjection: 180 }, "Team A", 1),
      entry({ name: "RB2", position: "RB", restOfSeasonProjection: 150 }, "Team B", 2),
    ];

    const ranked = rankPlayers(entries);
    const rb1 = ranked.find((r) => r.player.name === "RB1");
    const rb2 = ranked.find((r) => r.player.name === "RB2");
    const wr1 = ranked.find((r) => r.player.name === "WR1");

    expect(rb1?.positionRank).toBe(1);
    expect(rb2?.positionRank).toBe(2);
    expect(wr1?.positionRank).toBe(1);
  });

  it("marks free agents with a null rosteredBy", () => {
    const entries = [entry({ name: "FA", position: "RB", restOfSeasonProjection: 90 }, null, null)];
    const ranked = rankPlayers(entries);
    expect(ranked[0]?.rosteredBy).toBeNull();
  });
});
