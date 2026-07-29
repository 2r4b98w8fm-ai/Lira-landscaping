import { describe, expect, it } from "vitest";
import { buildInjuryDigestHtml, diffInjuryStatuses, snapshotInjuryStatuses } from "@/lib/notifications/injuryDigest";
import { buildWaiverDigestHtml } from "@/lib/notifications/waiverDigest";
import type { RosterPlayer, WaiverRecommendation } from "@/types/domain";

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
    ...partial,
  };
}

describe("snapshotInjuryStatuses / diffInjuryStatuses", () => {
  it("detects a status change against a prior snapshot", () => {
    const before = [player({ espnPlayerId: 1, name: "Healthy Guy", injuryStatus: "ACTIVE" })];
    const snapshot = snapshotInjuryStatuses(before);

    const after = [player({ espnPlayerId: 1, name: "Healthy Guy", injuryStatus: "OUT" })];
    const changes = diffInjuryStatuses(snapshot, after);

    expect(changes).toHaveLength(1);
    expect(changes[0]).toMatchObject({ name: "Healthy Guy", oldStatus: "ACTIVE", newStatus: "OUT" });
  });

  it("reports no changes for a player with no prior snapshot entry, rather than a false positive", () => {
    const newPlayer = [player({ espnPlayerId: 99, injuryStatus: "OUT" })];
    const changes = diffInjuryStatuses({}, newPlayer);
    expect(changes).toEqual([]);
  });

  it("reports nothing when statuses are unchanged", () => {
    const before = [player({ espnPlayerId: 1, injuryStatus: "QUESTIONABLE" })];
    const snapshot = snapshotInjuryStatuses(before);
    const after = [player({ espnPlayerId: 1, injuryStatus: "QUESTIONABLE" })];
    expect(diffInjuryStatuses(snapshot, after)).toEqual([]);
  });
});

describe("buildInjuryDigestHtml", () => {
  it("returns null when there's nothing to report, so callers skip sending", () => {
    expect(buildInjuryDigestHtml("My League", [])).toBeNull();
  });

  it("includes each changed player's old and new status", () => {
    const html = buildInjuryDigestHtml("My League", [
      { espnPlayerId: 1, name: "Star RB", position: "RB", oldStatus: "ACTIVE", newStatus: "OUT" },
    ]);
    expect(html).toContain("Star RB");
    expect(html).toContain("ACTIVE");
    expect(html).toContain("OUT");
  });
});

describe("buildWaiverDigestHtml", () => {
  function rec(partial: Partial<WaiverRecommendation>): WaiverRecommendation {
    return {
      player: player({}),
      myWorstStarterValue: 50,
      valueAdded: 20,
      reasoning: [],
      ...partial,
    };
  }

  it("returns null when nothing clears the value-added bar", () => {
    const html = buildWaiverDigestHtml("My League", [rec({ valueAdded: 2 }), rec({ valueAdded: null })]);
    expect(html).toBeNull();
  });

  it("includes real upgrades above the bar, sorted best first", () => {
    const big = rec({ valueAdded: 40, player: player({ name: "Big Add" }) });
    const small = rec({ valueAdded: 10, player: player({ name: "Small Add" }) });
    const html = buildWaiverDigestHtml("My League", [small, big]);
    expect(html).toContain("Big Add");
    expect(html).toContain("Small Add");
    expect(html!.indexOf("Big Add")).toBeLessThan(html!.indexOf("Small Add"));
  });
});
