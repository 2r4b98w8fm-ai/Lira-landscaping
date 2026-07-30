import type { Position } from "@/lib/constants";
import { INJURY_MULTIPLIER } from "@/lib/injury";
import { computeRestOfSeasonSOS, scheduleMultiplierFromRank } from "@/lib/trade/schedule";
import type { DefenseRanking, InjuryStatus } from "@/types/domain";

/** Most recent game first would be natural to read, but callers hand us ascending-by-week logs, so weights are applied oldest-to-newest: [1, 2, 3] over the last up to 3 games — the most recent game always counts 3x an older one. */
const RECENT_GAME_WEIGHTS = [1, 2, 3];

export interface GameLogEntry {
  week: number;
  fantasyPointsPpr: number;
}

export interface OurModelInput {
  position: Position;
  injuryStatus: InjuryStatus;
  /** This season's real game log for this specific player, ascending by week. */
  gameLog: GameLogEntry[];
  /** This week's specific opponent, for the single-game weekly projection. Null on a bye or if unresolved. */
  thisWeekOpponent: string | null;
  /** Opponents for every remaining week strictly after this one — mirrors the same "after current week" convention trade value's schedule strength already uses. */
  remainingOpponents: string[];
  defenseRankings: DefenseRanking[];
}

export interface OurModelResult {
  /** Weighted recent-form points/game, before any matchup or injury adjustment. Null if there's no game log to build it from. */
  perGameRate: number | null;
  weekProjection: number | null;
  restOfSeasonProjection: number | null;
  reasoning: string[];
}

/**
 * Our own rest-of-season and weekly projection, built entirely from this
 * player's real nflverse game log — not ESPN's number, and not a
 * league-wide average. A recency-weighted per-game rate (last up to 3
 * games, most recent weighted heaviest) extrapolated over the remaining
 * schedule, adjusted by real defense-vs-position matchup strength and the
 * same injury discount trade value uses. Returns all nulls (never a guess)
 * when there's no game log to work from — a rookie, or a player Sleeper's
 * crosswalk couldn't match to a real gsis ID.
 */
export function computeOurModelProjection(input: OurModelInput): OurModelResult {
  const { position, injuryStatus, gameLog, thisWeekOpponent, remainingOpponents, defenseRankings } = input;
  const reasoning: string[] = [];

  if (gameLog.length === 0) {
    return {
      perGameRate: null,
      weekProjection: null,
      restOfSeasonProjection: null,
      reasoning: ["Our model has no real game log for this player yet (rookie, or not matched to a stats provider) — no projection produced."],
    };
  }

  const recent = gameLog.slice(-3);
  const weights = RECENT_GAME_WEIGHTS.slice(0, recent.length);
  const weightTotal = weights.reduce((s, w) => s + w, 0);
  const perGameRate = recent.reduce((sum, g, i) => sum + g.fantasyPointsPpr * (weights[i] ?? 1), 0) / weightTotal;
  reasoning.push(
    `Our model's recent-form rate: ${perGameRate.toFixed(1)} pts/game, a recency-weighted average of the last ${recent.length} game(s) (most recent weighted heaviest).`
  );

  const injuryMultiplier = INJURY_MULTIPLIER[injuryStatus];
  if (injuryMultiplier < 1) {
    reasoning.push(`Injury status ${injuryStatus} discounts our model's projection by ${Math.round((1 - injuryMultiplier) * 100)}%.`);
  }

  // This week's specific matchup.
  let weekProjection: number | null = null;
  if (thisWeekOpponent) {
    const defense = defenseRankings.find((d) => d.team === thisWeekOpponent && d.position === position);
    const matchupMultiplier = defense ? scheduleMultiplierFromRank(defense.rank) : 1;
    weekProjection = perGameRate * matchupMultiplier * injuryMultiplier;
    if (defense) {
      reasoning.push(
        `This week vs ${thisWeekOpponent} (defense rank #${defense.rank} of 32 vs ${position}): our model projects ${weekProjection.toFixed(1)} pts.`
      );
    } else {
      reasoning.push(`No matchup data for ${thisWeekOpponent} vs ${position} — our model's week projection uses the recent-form rate as-is.`);
    }
  } else {
    reasoning.push("No opponent this week (bye or unresolved schedule) — our model produces no week projection.");
  }

  // Rest of season, averaged across the remaining schedule.
  let restOfSeasonProjection: number | null = null;
  if (remainingOpponents.length > 0) {
    const sos = computeRestOfSeasonSOS(position, remainingOpponents, defenseRankings);
    const scheduleMultiplier = scheduleMultiplierFromRank(sos.avgRank);
    restOfSeasonProjection = perGameRate * remainingOpponents.length * scheduleMultiplier * injuryMultiplier;
    reasoning.push(
      sos.avgRank !== null
        ? `Rest of season (${remainingOpponents.length} game(s) remaining, average opposing defense rank #${sos.avgRank.toFixed(1)} of 32): our model projects ${restOfSeasonProjection.toFixed(1)} pts.`
        : `Rest of season (${remainingOpponents.length} game(s) remaining, no matchup data): our model projects ${restOfSeasonProjection.toFixed(1)} pts from recent form alone.`
    );
  } else {
    restOfSeasonProjection = 0;
    reasoning.push("No games remaining on the schedule — our model's rest-of-season projection is 0.");
  }

  return { perGameRate, weekProjection, restOfSeasonProjection, reasoning };
}
