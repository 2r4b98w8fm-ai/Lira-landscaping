import type { RosterPlayer, TradeValue } from "@/types/domain";
import { INJURY_MULTIPLIER } from "@/lib/injury";
import { scheduleMultiplierFromRank, type ScheduleStrength } from "./schedule";

/** Floor for VORP so a bench/replacement-level player still has *some* trade value in the fairness math, rather than a confusing zero. */
const MIN_VORP = 0.5;

function restOfSeasonSourceLabel(source: RosterPlayer["restOfSeasonSource"]): string {
  switch (source) {
    case "espn":
      return "ESPN's rest-of-season projection";
    case "blended":
      return "a blend of ESPN's projection and our own model (built from real recent performance and matchups)";
    case "our_model":
      return "our own model (ESPN gave no projection, so this is built from real recent performance and matchups)";
    case "pace_estimate":
    default:
      return "an estimate from this season's scoring pace (no ESPN or model projection was available)";
  }
}

export function computeTradeValue(
  player: RosterPlayer,
  replacementLevel: number,
  schedule: ScheduleStrength
): TradeValue {
  const reasoning: string[] = [];

  const hasProjection = player.restOfSeasonProjection !== null;
  const baseProjection = player.restOfSeasonProjection ?? 0;

  if (hasProjection) {
    const sourceLabel = restOfSeasonSourceLabel(player.restOfSeasonSource);
    reasoning.push(`Rest-of-season projection: ${baseProjection.toFixed(1)} pts, from ${sourceLabel}.`);
  } else {
    reasoning.push("No rest-of-season projection available — valued at replacement level.");
  }

  reasoning.push(
    `Replacement level at ${player.position} in this league: ${replacementLevel.toFixed(1)} pts.`
  );

  const vorp = hasProjection ? Math.max(baseProjection - replacementLevel, MIN_VORP) : MIN_VORP;
  reasoning.push(`Value over replacement: ${vorp.toFixed(1)} pts.`);

  const injuryMultiplier = INJURY_MULTIPLIER[player.injuryStatus];
  if (injuryMultiplier < 1) {
    reasoning.push(`Injury status ${player.injuryStatus} discounts value by ${Math.round((1 - injuryMultiplier) * 100)}%.`);
  }

  const scheduleMultiplier = scheduleMultiplierFromRank(schedule.avgRank);
  if (schedule.avgRank !== null) {
    const direction = scheduleMultiplier > 1 ? "favorable" : scheduleMultiplier < 1 ? "tough" : "neutral";
    reasoning.push(
      `Remaining schedule averages defense rank #${schedule.avgRank.toFixed(1)} of 32 vs ${player.position} over ${schedule.gamesFound} game(s) — ${direction} rest-of-season schedule.`
    );
  } else {
    reasoning.push("No rest-of-season matchup data available — schedule not factored in.");
  }

  const finalValue = vorp * injuryMultiplier * scheduleMultiplier;

  return {
    player,
    baseProjection,
    replacementLevel,
    vorp,
    injuryMultiplier,
    scheduleMultiplier,
    finalValue,
    reasoning,
  };
}
