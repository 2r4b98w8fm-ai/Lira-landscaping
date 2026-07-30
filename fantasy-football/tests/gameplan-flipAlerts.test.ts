import { describe, expect, it } from "vitest";
import { findFlipAlerts } from "@/lib/gameplan/flipAlerts";
import type { RosterPlayer, StartSitBoard, StartSitRecommendation } from "@/types/domain";

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

function rec(partial: Partial<RosterPlayer>, score: number): StartSitRecommendation {
  return {
    player: player(partial),
    score,
    reasoning: [],
    matchup: { opponent: null, defenseRank: null, defenseRankLabel: null },
  };
}

function board(position: StartSitBoard["position"], recommendations: StartSitRecommendation[], dataIncomplete = false): StartSitBoard {
  return { position, recommendations, dataIncomplete };
}

const SLOTS = { RB: 2 };

describe("findFlipAlerts", () => {
  it("flags a bench player who ranks above a real starter", () => {
    const boards = [
      board("RB", [
        rec({ name: "Bench Stud", lineupSlot: "BE" }, 25),
        rec({ name: "Starter A", lineupSlot: "RB" }, 20),
        rec({ name: "Starter B", lineupSlot: "RB" }, 15),
      ]),
    ];
    const alerts = findFlipAlerts(boards, SLOTS);
    expect(alerts).toHaveLength(1);
    expect(alerts[0]?.benchPlayerName).toBe("Bench Stud");
    expect(alerts[0]?.displacedStarterName).toBe("Starter B");
  });

  it("does not flag anything when starters already outrank the bench", () => {
    const boards = [
      board("RB", [
        rec({ name: "Starter A", lineupSlot: "RB" }, 25),
        rec({ name: "Starter B", lineupSlot: "RB" }, 20),
        rec({ name: "Bench Guy", lineupSlot: "BE" }, 10),
      ]),
    ];
    expect(findFlipAlerts(boards, SLOTS)).toEqual([]);
  });

  it("skips a position with incomplete data or no starting requirement", () => {
    const incompleteBoards = [board("RB", [rec({ lineupSlot: "BE" }, 25)], true)];
    expect(findFlipAlerts(incompleteBoards, SLOTS)).toEqual([]);

    const noRequirementBoards = [board("K", [rec({ name: "Bench K", position: "K", lineupSlot: "BE" }, 25)])];
    expect(findFlipAlerts(noRequirementBoards, { K: 0 })).toEqual([]);
  });

  it("never flags a bench player with a -Infinity score (ruled out / no projection)", () => {
    // Realistically pre-sorted (as the real engine always produces): a
    // -Infinity score always sorts last, so this bench player would never
    // land in the top N regardless — confirms the explicit guard is belt-and-suspenders, not load-bearing.
    const boards = [
      board("RB", [
        rec({ name: "Starter A", lineupSlot: "RB" }, 20),
        rec({ name: "Starter B", lineupSlot: "RB" }, 15),
        rec({ name: "Bench Hurt", lineupSlot: "BE" }, -Infinity),
      ]),
    ];
    expect(findFlipAlerts(boards, SLOTS)).toEqual([]);
  });
});
