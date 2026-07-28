import type { RosterPlayer, TradeValue } from "@/types/domain";
import type { ScheduleStrength } from "./schedule";

const INJURY_MULTIPLIER: Record<RosterPlayer["injuryStatus"], number> = {
  ACTIVE: 1.0,
  UNKNOWN: 1.0,
  QUESTIONABLE: 0.9,
  DOUBTFUL: 0.75,
  OUT: 0.4,
  IR: 0.15,
  SUSPENSION: 0.5,
};

/** Floor for VORP so a bench/replacement-level player still has *some* trade value in the fairness math, rather than a confusing zero. */
const MIN_VORP = 0.5;

/** How much a full 32-rank swing in schedule difficulty moves value, capped so it's a nudge, not a dominant factor. */
const SCHEDULE_SENSITIVITY = 0.01;
const SCHEDULE_MULTIPLIER_MIN = 0.9;
const SCHEDULE_MULTIPLIER_MAX = 1.1;

export function computeTradeValue(
  player: RosterPlayer,
  replacementLevel: number,
  schedule: ScheduleStrength
): TradeValue {
  const reasoning: string[] = [];

  const hasProjection = player.restOfSeasonProjection !== null;
  const baseProjection = player.restOfSeasonProjection ?? 0;

  if (hasProjection) {
    const sourceLabel =
      player.restOfSeasonSource === "espn"
        ? "ESPN's rest-of-season projection"
        : "an estimate from this season's scoring pace (ESPN gave no rest-of-season projection)";
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

  let scheduleMultiplier = 1;
  if (schedule.avgRank !== null) {
    const raw = 1 + (schedule.avgRank - 16.5) * SCHEDULE_SENSITIVITY;
    scheduleMultiplier = Math.min(Math.max(raw, SCHEDULE_MULTIPLIER_MIN), SCHEDULE_MULTIPLIER_MAX);
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
