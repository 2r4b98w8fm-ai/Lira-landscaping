import type { Position } from "@/lib/constants";
import type { DefenseRanking } from "@/types/domain";

export interface ScheduleStrength {
  avgRank: number | null;
  gamesFound: number;
}

/** How much a full 32-rank swing in schedule difficulty moves value, capped so it's a nudge, not a dominant factor. */
const SCHEDULE_SENSITIVITY = 0.01;
const SCHEDULE_MULTIPLIER_MIN = 0.9;
const SCHEDULE_MULTIPLIER_MAX = 1.1;

/**
 * Converts an average remaining-schedule defense rank into a value
 * multiplier, shared by trade value and our own projection model so
 * "tougher schedule discounts projections" means the same 0.9x-1.1x band
 * everywhere. Rank 16.5 (league-average) is neutral; below favors the
 * player (easier matchups), above discounts them.
 */
export function scheduleMultiplierFromRank(avgRank: number | null): number {
  if (avgRank === null) return 1;
  const raw = 1 + (avgRank - 16.5) * SCHEDULE_SENSITIVITY;
  return Math.min(Math.max(raw, SCHEDULE_MULTIPLIER_MIN), SCHEDULE_MULTIPLIER_MAX);
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
