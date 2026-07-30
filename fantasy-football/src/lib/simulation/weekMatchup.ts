import type { Position } from "@/lib/constants";
import type { RosterPlayer } from "@/types/domain";
import type { PositionVarianceMap } from "./teamScore";
import { computeOptimalLineup } from "@/lib/startsit/optimalLineup";

/** Same fallback used by the season simulator (teamScore.ts) — nflverse's player file has no K/DST rows, so there's no measured variance for them; an assumption, stated as such. */
const FALLBACK_STDEV: Partial<Record<Position, number>> = { K: 3, DST: 4 };

export interface WeekDistribution {
  mean: number;
  stdev: number;
}

/** This week's specific optimal-lineup score as a mean + stdev — unlike the season simulator's distribution (a season-long average), this uses each starter's real this-week projection and matchup. */
export function computeWeekScoreDistribution(
  roster: RosterPlayer[],
  startingSlotCounts: Record<string, number>,
  positionVariance: PositionVarianceMap
): WeekDistribution {
  const lineup = computeOptimalLineup(roster, startingSlotCounts);
  const variance = lineup.starters.reduce((sum, s) => {
    if (!s.player) return sum;
    const stdev = positionVariance[s.player.position]?.stdevPpr ?? FALLBACK_STDEV[s.player.position] ?? 5;
    return sum + stdev * stdev;
  }, 0);
  return { mean: lineup.totalProjectedPoints, stdev: Math.sqrt(variance) };
}

/** Abramowitz-Stegun approximation of the error function (max error ~1.5e-7) — good enough for a win-probability estimate, no external stats library needed. */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * ax);
  const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-ax * ax);
  return sign * y;
}

function standardNormalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

export interface MatchupPreview {
  myMean: number;
  myStdev: number;
  oppMean: number;
  oppStdev: number;
  /** Probability (0-100) my optimal lineup outscores the opponent's, treating both as independent normal-ish weekly distributions — a closed-form version of the same math the season simulator samples repeatedly. */
  winProbabilityPct: number;
}

export function computeMatchupPreview(mine: WeekDistribution, opponent: WeekDistribution): MatchupPreview {
  const combinedStdev = Math.sqrt(mine.stdev * mine.stdev + opponent.stdev * opponent.stdev);
  let winProbabilityPct: number;
  if (combinedStdev === 0) {
    winProbabilityPct = mine.mean > opponent.mean ? 100 : mine.mean < opponent.mean ? 0 : 50;
  } else {
    const z = (mine.mean - opponent.mean) / combinedStdev;
    winProbabilityPct = standardNormalCdf(z) * 100;
  }
  return { myMean: mine.mean, myStdev: mine.stdev, oppMean: opponent.mean, oppStdev: opponent.stdev, winProbabilityPct };
}
