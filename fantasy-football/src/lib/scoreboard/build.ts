import type { MappedMatchup } from "@/lib/espn/mappers";

export type MatchupTiming = "upcoming" | "live" | "final";

export interface ScoreboardMatchup {
  week: number;
  homeTeamId: number;
  homeTeamName: string;
  /** Null when that side hasn't posted any points yet — never shown as 0.0, since 0 and "hasn't started" look the same in ESPN's own data. */
  homeScore: number | null;
  awayTeamId: number;
  awayTeamName: string;
  awayScore: number | null;
  /**
   * "final" for a week strictly before the league's current week (ESPN
   * scores for a past week are done), "live" for the current week (real
   * scores that may still be moving as games happen — refreshed by the
   * app's live sync), "upcoming" for any week after. This is inferred from
   * the week number relative to currentWeek, not from score presence,
   * since a live in-progress score and a genuinely final one look
   * identical in ESPN's data.
   */
  timing: MatchupTiming;
}

function timingFor(week: number, currentWeek: number): MatchupTiming {
  if (week < currentWeek) return "final";
  if (week === currentWeek) return "live";
  return "upcoming";
}

/**
 * Joins the league's real ESPN matchup schedule (already cached from a
 * sync, auto-refreshed every 60s while the app is open) with team names,
 * scoped to one week. Used for the live scoreboard — the "final/live/
 * upcoming" label is the only thing this adds beyond raw ESPN data.
 */
export function buildScoreboard(
  matchups: MappedMatchup[],
  teams: Array<{ id: number; name: string }>,
  week: number,
  currentWeek: number
): ScoreboardMatchup[] {
  const nameById = new Map(teams.map((t) => [t.id, t.name]));
  return matchups
    .filter((m) => m.week === week)
    .map((m) => ({
      week: m.week,
      homeTeamId: m.homeTeamId,
      homeTeamName: nameById.get(m.homeTeamId) ?? "Unknown Team",
      homeScore: m.homeScore,
      awayTeamId: m.awayTeamId,
      awayTeamName: nameById.get(m.awayTeamId) ?? "Unknown Team",
      awayScore: m.awayScore,
      timing: timingFor(m.week, currentWeek),
    }));
}
