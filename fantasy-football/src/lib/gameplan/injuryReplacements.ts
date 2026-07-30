import type { RosterPlayer } from "@/types/domain";

export interface InjuryReplacement {
  injuredPlayer: RosterPlayer;
  replacement: RosterPlayer | null;
  replacementSource: "bench" | "waivers" | null;
}

/**
 * For each injured (questionable-or-worse) roster player, the best real
 * replacement available right now at the same position — checked first
 * among your own bench (no waiver move needed), then the waiver wire, and
 * only preferring waivers when nothing on your bench comes close. Never
 * suggests another OUT/IR player, and returns null when genuinely nothing
 * better exists rather than fabricating a suggestion.
 */
export function findInjuryReplacements(
  injuredPlayers: RosterPlayer[],
  fullRoster: RosterPlayer[],
  freeAgentPool: RosterPlayer[]
): InjuryReplacement[] {
  return injuredPlayers.map((injuredPlayer) => {
    const isUsable = (p: RosterPlayer) =>
      p.espnPlayerId !== injuredPlayer.espnPlayerId &&
      p.position === injuredPlayer.position &&
      p.injuryStatus !== "OUT" &&
      p.injuryStatus !== "IR" &&
      (p.restOfSeasonProjection ?? 0) > 0;

    const benchCandidates = fullRoster.filter((p) => isUsable(p) && p.lineupSlot === "BE");
    const waiverCandidates = freeAgentPool.filter(isUsable);

    const best = (list: RosterPlayer[]): RosterPlayer | null =>
      list.reduce<RosterPlayer | null>(
        (top, p) => (!top || (p.restOfSeasonProjection ?? 0) > (top.restOfSeasonProjection ?? 0) ? p : top),
        null
      );

    const benchBest = best(benchCandidates);
    const waiverBest = best(waiverCandidates);

    if (benchBest && (!waiverBest || (benchBest.restOfSeasonProjection ?? 0) >= (waiverBest.restOfSeasonProjection ?? 0))) {
      return { injuredPlayer, replacement: benchBest, replacementSource: "bench" };
    }
    if (waiverBest) {
      return { injuredPlayer, replacement: waiverBest, replacementSource: "waivers" };
    }
    return { injuredPlayer, replacement: null, replacementSource: null };
  });
}
