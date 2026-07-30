import { describe, expect, it } from "vitest";
import { findInjuryReplacements } from "@/lib/gameplan/injuryReplacements";
import type { RosterPlayer } from "@/types/domain";

let nextId = 1;
function player(partial: Partial<RosterPlayer>): RosterPlayer {
  return {
    espnPlayerId: nextId++,
    name: partial.name ?? "Player",
    position: "RB",
    nflTeam: "BUF",
    lineupSlot: "BE",
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

describe("findInjuryReplacements", () => {
  it("prefers a bench replacement over a waiver one when the bench option is at least as good", () => {
    const injured = player({ name: "Hurt", position: "RB", injuryStatus: "OUT", lineupSlot: "RB" });
    const fullRoster = [
      injured,
      player({ name: "Bench RB", position: "RB", lineupSlot: "BE", restOfSeasonProjection: 200 }),
    ];
    const freeAgentPool = [player({ name: "Waiver RB", position: "RB", restOfSeasonProjection: 120 })];

    const [result] = findInjuryReplacements([injured], fullRoster, freeAgentPool);
    expect(result?.replacement?.name).toBe("Bench RB");
    expect(result?.replacementSource).toBe("bench");
  });

  it("falls back to waivers when nothing usable is on the bench", () => {
    const injured = player({ name: "Hurt", position: "WR", injuryStatus: "OUT", lineupSlot: "WR" });
    const fullRoster = [injured, player({ name: "Other RB", position: "RB", lineupSlot: "BE" })];
    const freeAgentPool = [player({ name: "Waiver WR", position: "WR", restOfSeasonProjection: 90 })];

    const [result] = findInjuryReplacements([injured], fullRoster, freeAgentPool);
    expect(result?.replacement?.name).toBe("Waiver WR");
    expect(result?.replacementSource).toBe("waivers");
  });

  it("never suggests another OUT/IR player as a replacement", () => {
    const injured = player({ name: "Hurt", position: "RB", injuryStatus: "OUT", lineupSlot: "RB" });
    const alsoHurt = player({ name: "Also Hurt", position: "RB", lineupSlot: "BE", injuryStatus: "IR", restOfSeasonProjection: 999 });
    const fullRoster = [injured, alsoHurt];

    const [result] = findInjuryReplacements([injured], fullRoster, []);
    expect(result?.replacement).toBeNull();
    expect(result?.replacementSource).toBeNull();
  });

  it("returns null when genuinely nothing is available anywhere", () => {
    const injured = player({ name: "Hurt", position: "TE", injuryStatus: "OUT", lineupSlot: "TE" });
    const [result] = findInjuryReplacements([injured], [injured], []);
    expect(result?.replacement).toBeNull();
  });
});
