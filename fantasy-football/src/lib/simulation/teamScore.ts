import { FLEX_ELIGIBLE, type Position } from "@/lib/constants";
import type { RosterPlayer } from "@/types/domain";

export interface PositionVarianceMap {
  [position: string]: { meanPpr: number; stdevPpr: number } | undefined;
}

/**
 * nflverse's player-level file doesn't carry K/DST rows (see nflverse/ingest.ts),
 * so there's no real historical variance for those two positions. Rather than
 * fabricate a look-alike number, we use a documented, conservative fixed
 * spread reflecting that both positions score in a narrower, lower range
 * than skill positions — this is an assumption, not measured data, and is
 * surfaced as such wherever the simulator explains itself.
 */
const FALLBACK_STDEV: Partial<Record<Position, number>> = { K: 3, DST: 4 };

function weeklyMean(player: RosterPlayer, remainingWeeks: number): number {
  if (player.restOfSeasonProjection !== null && remainingWeeks > 0) {
    return player.restOfSeasonProjection / remainingWeeks;
  }
  return player.weekProjection ?? 0;
}

/**
 * Estimates a team's weekly starting-lineup score as a mean + stdev,
 * assuming the team starts its best projected players at each position
 * (including FLEX) — the simulator doesn't know future in-season lineup
 * decisions, so "plays its best roster every week" is the stated
 * assumption, not a hidden one.
 */
export function computeTeamScoreDistribution(
  roster: RosterPlayer[],
  startingSlotCounts: Record<string, number>,
  remainingWeeks: number,
  positionVariance: PositionVarianceMap
): { mean: number; stdev: number } {
  const byPosition = new Map<Position, RosterPlayer[]>();
  for (const player of roster) {
    const list = byPosition.get(player.position) ?? [];
    list.push(player);
    byPosition.set(player.position, list);
  }
  for (const list of byPosition.values()) {
    list.sort((a, b) => weeklyMean(b, remainingWeeks) - weeklyMean(a, remainingWeeks));
  }

  const starters: RosterPlayer[] = [];
  const used = new Set<number>();

  for (const [position, list] of byPosition) {
    const count = startingSlotCounts[position] ?? 0;
    for (const player of list.slice(0, count)) {
      starters.push(player);
      used.add(player.espnPlayerId);
    }
  }

  const flexCount = startingSlotCounts.FLEX ?? 0;
  const flexPool = FLEX_ELIGIBLE.flatMap((pos) => byPosition.get(pos) ?? [])
    .filter((p) => !used.has(p.espnPlayerId))
    .sort((a, b) => weeklyMean(b, remainingWeeks) - weeklyMean(a, remainingWeeks));
  for (const player of flexPool.slice(0, flexCount)) {
    starters.push(player);
  }

  const mean = starters.reduce((sum, p) => sum + weeklyMean(p, remainingWeeks), 0);
  const variance = starters.reduce((sum, p) => {
    const stdev = positionVariance[p.position]?.stdevPpr ?? FALLBACK_STDEV[p.position] ?? 5;
    return sum + stdev * stdev;
  }, 0);

  return { mean, stdev: Math.sqrt(variance) };
}
