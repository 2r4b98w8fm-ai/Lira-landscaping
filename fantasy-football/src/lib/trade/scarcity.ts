import { FLEX_ELIGIBLE, POSITIONS, type Position } from "@/lib/constants";
import type { RosterPlayer } from "@/types/domain";

/**
 * "Replacement level" for a position: the rest-of-season projection of the
 * last player who'd realistically be startable in this league, given real
 * starting requirements (including a fair split of FLEX slots across
 * RB/WR/TE) and the actual pool of rostered players. Trade value is built
 * on how far above this baseline a player sits — that's what makes a
 * scarce position (e.g. only 12 startable TEs in a 10-team league) worth
 * more than a deep one for the same raw point total.
 */
export function computeReplacementLevels(
  allRosteredPlayers: RosterPlayer[],
  numTeams: number,
  startingSlotCounts: Record<string, number>
): Record<Position, number> {
  const result = {} as Record<Position, number>;

  for (const position of POSITIONS) {
    const starters = numTeams * (startingSlotCounts[position] ?? 0);
    const flexShare = FLEX_ELIGIBLE.includes(position)
      ? (numTeams * (startingSlotCounts.FLEX ?? 0)) / FLEX_ELIGIBLE.length
      : 0;
    const replacementIndex = Math.round(starters + flexShare);

    const values = allRosteredPlayers
      .filter((p) => p.position === position)
      .map((p) => p.restOfSeasonProjection ?? 0)
      .sort((a, b) => b - a);

    if (values.length === 0) {
      result[position] = 0;
    } else {
      const index = Math.min(replacementIndex, values.length - 1);
      result[position] = values[index] ?? 0;
    }
  }

  return result;
}
