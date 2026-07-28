import type { Position } from "@/lib/constants";
import type { DefenseRanking } from "@/types/domain";

export interface ScheduleStrength {
  avgRank: number | null;
  gamesFound: number;
}

/**
 * Averages the defense-vs-position rank of every remaining opponent on a
 * player's schedule. Returns null (not a guessed neutral value) when there's
 * no matchup data for any remaining game, so callers can say so explicitly
 * instead of pretending a schedule adjustment was applied.
 */
export function computeRestOfSeasonSOS(
  position: Position,
  remainingOpponents: string[],
  defenseRankings: DefenseRanking[]
): ScheduleStrength {
  const ranks = remainingOpponents
    .map((opp) => defenseRankings.find((d) => d.team === opp && d.position === position)?.rank)
    .filter((r): r is number => r !== undefined);

  if (ranks.length === 0) return { avgRank: null, gamesFound: 0 };

  const avgRank = ranks.reduce((sum, r) => sum + r, 0) / ranks.length;
  return { avgRank, gamesFound: ranks.length };
}
