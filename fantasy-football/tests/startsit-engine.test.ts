import { describe, expect, it } from "vitest";
import { rankPosition } from "@/lib/startsit/engine";
import type { DefenseRanking, RosterPlayer } from "@/types/domain";

function player(partial: Partial<RosterPlayer>): RosterPlayer {
  return {
    espnPlayerId: 1,
    name: "Test Player",
    position: "WR",
    nflTeam: "BUF",
    lineupSlot: "WR",
    injuryStatus: "ACTIVE",
    opponent: "NE",
    seasonPoints: 50,
    weekProjection: 10,
    ...partial,
  };
}

describe("rankPosition", () => {
  it("ranks the higher projection first when matchups are equal", () => {
    const a = player({ espnPlayerId: 1, name: "A", weekProjection: 12 });
    const b = player({ espnPlayerId: 2, name: "B", weekProjection: 8 });
    const board = rankPosition("WR", [a, b], []);
    expect(board.recommendations.map((r) => r.player.name)).toEqual(["A", "B"]);
  });

  it("boosts a player facing a weak (high-rank) defense over an equal projection facing a tough one", () => {
    const vsWeak = player({ espnPlayerId: 1, name: "VsWeak", weekProjection: 10, opponent: "WEAK" });
    const vsTough = player({ espnPlayerId: 2, name: "VsTough", weekProjection: 10, opponent: "TOUGH" });
    const defenses: DefenseRanking[] = [
      { team: "WEAK", position: "WR", rank: 30, avgPointsAllowedPpr: 25, weeksSampled: 4 },
      { team: "TOUGH", position: "WR", rank: 2, avgPointsAllowedPpr: 6, weeksSampled: 4 },
    ];
    const board = rankPosition("WR", [vsWeak, vsTough], defenses);
    expect(board.recommendations[0]?.player.name).toBe("VsWeak");
    expect(board.recommendations[0]?.reasoning.some((r) => r.includes("#30"))).toBe(true);
  });

  it("never invents a projection — sorts missing-projection players last and explains why", () => {
    const known = player({ espnPlayerId: 1, name: "Known", weekProjection: 5 });
    const unknown = player({ espnPlayerId: 2, name: "Unknown", weekProjection: null });
    const board = rankPosition("WR", [known, unknown], []);
    expect(board.recommendations[0]?.player.name).toBe("Known");
    expect(board.recommendations[1]?.player.name).toBe("Unknown");
    expect(board.recommendations[1]?.reasoning).toContain(
      "No ESPN projection is available for this player this week."
    );
  });

  it("flags dataIncomplete when nobody at the position has a projection", () => {
    const board = rankPosition("TE", [player({ weekProjection: null })], []);
    expect(board.dataIncomplete).toBe(true);
  });

  it("drops a ruled-out player to the bottom even if they had a projection", () => {
    const healthy = player({ espnPlayerId: 1, name: "Healthy", weekProjection: 6 });
    const out = player({ espnPlayerId: 2, name: "Out", weekProjection: 20, injuryStatus: "OUT" });
    const board = rankPosition("WR", [healthy, out], []);
    expect(board.recommendations[0]?.player.name).toBe("Healthy");
  });
});
