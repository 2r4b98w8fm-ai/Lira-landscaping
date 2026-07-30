export interface OpportunityGameLogEntry {
  week: number;
  fantasyPointsPpr: number;
  carries: number;
  targets: number;
}

export interface SnapGameLogEntry {
  week: number;
  offensePct: number;
}

export interface BreakoutInput {
  gameLog: OpportunityGameLogEntry[];
  snapLog: SnapGameLogEntry[];
  /** League-wide average fantasy points per touch (carry+target) at this player's position this season — the yardstick "efficiency" is measured against. */
  positionAvgPointsPerTouch: number;
}

export interface TrendStat {
  recent: number;
  earlier: number;
  delta: number;
}

export interface BreakoutResult {
  /** 0-100. A transparent, weighted-signal confidence score — not a calibrated statistical probability, since there's no labeled historical "did they break out" dataset to calibrate against. Every point of it is explained in `reasoning`. */
  breakoutScore: number;
  reasoning: string[];
  snapShareTrend: TrendStat | null;
  touchesTrend: TrendStat;
  efficiencyPerTouch: { recent: number; positionAvg: number } | null;
}

const MIN_GAMES_FOR_TREND = 5;
const RECENT_WINDOW = 3;

const SNAP_TREND_SCALE = 100;
const SNAP_TREND_CAP = 20;
const TOUCH_TREND_SCALE = 3;
const TOUCH_TREND_CAP = 15;
const EFFICIENCY_SCALE = 15;
const EFFICIENCY_CAP = 15;
const PRODUCTION_LAG_SCALE = 2;
const PRODUCTION_LAG_CAP = 15;

function average(nums: number[]): number {
  return nums.length > 0 ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function fmtSigned(n: number, digits = 1): string {
  return `${n >= 0 ? "+" : ""}${n.toFixed(digits)}`;
}

/**
 * A transparent, explainable breakout score built from four real signals:
 * rising snap share, rising touches (carries+targets), efficiency per
 * touch vs the position average, and "production lagging role" (recent
 * points growth smaller than the added opportunity alone would predict —
 * the box score hasn't caught up to the role yet, a classic early sign).
 * Every signal's exact contribution is in `reasoning`; this is a scored
 * heuristic, not a calibrated probability — we don't have a labeled
 * historical "broke out / didn't" dataset to calibrate one against, and
 * say so rather than dressing this up as more certain than it is. Returns
 * null when there isn't enough game history yet to trust a trend at all.
 */
export function computeBreakoutScore(input: BreakoutInput): BreakoutResult | null {
  const { gameLog, snapLog, positionAvgPointsPerTouch } = input;
  if (gameLog.length < MIN_GAMES_FOR_TREND) return null;

  const recentGames = gameLog.slice(-RECENT_WINDOW);
  const earlierGames = gameLog.slice(0, -RECENT_WINDOW);

  const recentTouches = recentGames.map((g) => g.carries + g.targets);
  const earlierTouches = earlierGames.map((g) => g.carries + g.targets);
  const recentAvgTouches = average(recentTouches);
  const earlierAvgTouches = average(earlierTouches);
  const touchesDelta = recentAvgTouches - earlierAvgTouches;

  const recentPoints = recentGames.map((g) => g.fantasyPointsPpr);
  const earlierPoints = earlierGames.map((g) => g.fantasyPointsPpr);
  const pointsDelta = average(recentPoints) - average(earlierPoints);

  const recentWeeks = new Set(recentGames.map((g) => g.week));
  const earlierWeeks = new Set(earlierGames.map((g) => g.week));
  const recentSnapPcts = snapLog.filter((s) => recentWeeks.has(s.week)).map((s) => s.offensePct);
  const earlierSnapPcts = snapLog.filter((s) => earlierWeeks.has(s.week)).map((s) => s.offensePct);

  const reasoning: string[] = [];
  let score = 0;

  let snapShareTrend: TrendStat | null = null;
  if (recentSnapPcts.length > 0 && earlierSnapPcts.length > 0) {
    const recentAvgPct = average(recentSnapPcts);
    const earlierAvgPct = average(earlierSnapPcts);
    const delta = recentAvgPct - earlierAvgPct;
    snapShareTrend = { recent: recentAvgPct, earlier: earlierAvgPct, delta };
    const contribution = clamp(delta * SNAP_TREND_SCALE, -SNAP_TREND_CAP, SNAP_TREND_CAP);
    score += contribution;
    reasoning.push(
      `Snap share: ${(recentAvgPct * 100).toFixed(0)}% over the last ${recentGames.length} games vs ${(earlierAvgPct * 100).toFixed(0)}% before that (${fmtSigned(delta * 100, 0)}pp) — ${fmtSigned(contribution)} to the score.`
    );
  } else {
    reasoning.push("No snap-count data available yet to compute a snap-share trend.");
  }

  const touchesContribution = clamp(touchesDelta * TOUCH_TREND_SCALE, -TOUCH_TREND_CAP, TOUCH_TREND_CAP);
  score += touchesContribution;
  reasoning.push(
    `Touches (carries+targets): ${recentAvgTouches.toFixed(1)}/game recently vs ${earlierAvgTouches.toFixed(1)}/game before (${fmtSigned(touchesDelta)}) — ${fmtSigned(touchesContribution)} to the score.`
  );

  let efficiencyPerTouch: BreakoutResult["efficiencyPerTouch"] = null;
  const recentTouchesTotal = recentTouches.reduce((a, b) => a + b, 0);
  if (recentTouchesTotal > 0 && positionAvgPointsPerTouch > 0) {
    const recentPointsPerTouch = recentPoints.reduce((a, b) => a + b, 0) / recentTouchesTotal;
    efficiencyPerTouch = { recent: recentPointsPerTouch, positionAvg: positionAvgPointsPerTouch };
    const ratio = recentPointsPerTouch / positionAvgPointsPerTouch;
    const efficiencyContribution = clamp((ratio - 1) * EFFICIENCY_SCALE, -EFFICIENCY_CAP, EFFICIENCY_CAP);
    score += efficiencyContribution;
    reasoning.push(
      `Efficiency: ${recentPointsPerTouch.toFixed(2)} pts/touch recently vs ${positionAvgPointsPerTouch.toFixed(2)} position average (${(ratio * 100).toFixed(0)}% of average) — ${fmtSigned(efficiencyContribution)} to the score.`
    );
  } else {
    reasoning.push("Not enough recent touches to evaluate efficiency per touch.");
  }

  if (touchesDelta > 0 && positionAvgPointsPerTouch > 0) {
    const expectedPointsGrowth = touchesDelta * positionAvgPointsPerTouch;
    const lag = expectedPointsGrowth - pointsDelta;
    if (lag > 0) {
      const productionLagContribution = clamp(lag * PRODUCTION_LAG_SCALE, 0, PRODUCTION_LAG_CAP);
      score += productionLagContribution;
      reasoning.push(
        `Production hasn't fully caught up to the added opportunity yet (extra touches alone predict about ${fmtSigned(expectedPointsGrowth)} pts/game, actual change was ${fmtSigned(pointsDelta)}) — the box score may be lagging the role, a classic pre-breakout sign. ${fmtSigned(productionLagContribution)} to the score.`
      );
    }
  }

  const breakoutScore = clamp(50 + score, 1, 99);
  return {
    breakoutScore,
    reasoning,
    snapShareTrend,
    touchesTrend: { recent: recentAvgTouches, earlier: earlierAvgTouches, delta: touchesDelta },
    efficiencyPerTouch,
  };
}

export type BreakoutRecommendation = "pick_up" | "trade_for" | "start_more";

/** Free agent -> pick up; rostered elsewhere in the league -> trade for; already on my roster -> start them more (or at least don't bench them by accident). */
export function recommendationFor(rosteredByTeamId: number | null, isMyTeam: boolean): BreakoutRecommendation {
  if (rosteredByTeamId === null) return "pick_up";
  if (isMyTeam) return "start_more";
  return "trade_for";
}
