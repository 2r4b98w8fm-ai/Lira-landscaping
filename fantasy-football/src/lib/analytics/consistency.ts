export interface ConsistencyRating {
  gamesPlayed: number;
  mean: number;
  stdev: number;
  /** stdev / mean — unitless, so a WR averaging 20 and a K averaging 8 are comparable on the same scale, unlike raw stdev. */
  coefficientOfVariation: number;
  label: "Consistent floor" | "Boom/bust" | "Moderate";
}

const MIN_GAMES = 3;
const BOOM_BUST_THRESHOLD = 0.5;
const CONSISTENT_THRESHOLD = 0.25;

/**
 * How much a player's real week-to-week scoring actually swings, from
 * their own game log — not a league-wide position average. Useful for
 * close start/sit calls: if you're an underdog needing a swing week, the
 * boom/bust player is the better gamble; if you just need to protect a
 * lead, the consistent-floor one is. Null without at least 3 real games to
 * measure a spread from (same "don't trust a trend on 1-2 samples" bar
 * used elsewhere in this app), or if the mean is 0 (coefficient of
 * variation is meaningless there).
 */
export function computeConsistency(weeklyPoints: number[]): ConsistencyRating | null {
  if (weeklyPoints.length < MIN_GAMES) return null;

  const mean = weeklyPoints.reduce((sum, p) => sum + p, 0) / weeklyPoints.length;
  if (mean <= 0) return null;

  const variance = weeklyPoints.reduce((sum, p) => sum + (p - mean) ** 2, 0) / (weeklyPoints.length - 1);
  const stdev = Math.sqrt(variance);
  const coefficientOfVariation = stdev / mean;

  const label: ConsistencyRating["label"] =
    coefficientOfVariation >= BOOM_BUST_THRESHOLD
      ? "Boom/bust"
      : coefficientOfVariation <= CONSISTENT_THRESHOLD
        ? "Consistent floor"
        : "Moderate";

  return { gamesPlayed: weeklyPoints.length, mean, stdev, coefficientOfVariation, label };
}
