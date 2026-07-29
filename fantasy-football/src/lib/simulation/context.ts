import { getAllTeamRosters, getMatchupsForLeague, getPositionVariance, getTeamsForLeague } from "@/lib/db/queries";
import { computeTeamScoreDistribution, type PositionVarianceMap } from "./teamScore";
import { simulateSeason, type ScheduledMatchup, type TeamStanding } from "./monteCarlo";
import type { SimulationResult } from "@/types/domain";

export type SimulationAvailability =
  | { available: false; reason: string }
  | { available: true; result: SimulationResult };

/**
 * Builds every input the Monte Carlo simulator needs from what's already
 * cached in Postgres (rosters, real per-position variance, and the ESPN
 * matchup schedule) and runs it. Returns `available: false` — rather than a
 * misleading 100/0% result — when there's no ingested schedule at all,
 * since that's different from "the season is legitimately over."
 */
export async function buildAndRunSimulation(
  leagueRowId: number,
  season: number,
  currentWeek: number,
  regularSeasonWeeks: number,
  playoffTeamCount: number,
  rosterSlotCounts: Record<string, number>
): Promise<SimulationAvailability> {
  const allMatchups = await getMatchupsForLeague(leagueRowId);
  if (allMatchups.length === 0) {
    return {
      available: false,
      reason:
        "No league schedule has been synced yet. Re-run a league sync (ESPN's mMatchup data may not have been available on the last pull).",
    };
  }

  const teamRows = await getTeamsForLeague(leagueRowId);
  const teamRosters = await getAllTeamRosters(leagueRowId);
  const rosterByTeamId = new Map(teamRosters.map((t) => [t.teamId, t.roster]));

  const varianceRows = await getPositionVariance(season);
  const positionVariance: PositionVarianceMap = {};
  for (const row of varianceRows) {
    positionVariance[row.position] = { meanPpr: row.meanPpr, stdevPpr: row.stdevPpr };
  }

  const remainingWeeks = Math.max(regularSeasonWeeks - currentWeek + 1, 1);

  const distributions = new Map<number, { mean: number; stdev: number }>();
  for (const team of teamRows) {
    const roster = rosterByTeamId.get(team.id) ?? [];
    distributions.set(
      team.id,
      computeTeamScoreDistribution(roster, rosterSlotCounts, remainingWeeks, positionVariance)
    );
  }

  const standings: TeamStanding[] = teamRows.map((t) => ({
    teamId: t.id,
    teamName: t.name,
    wins: t.wins,
    losses: t.losses,
    ties: t.ties,
    pointsFor: t.pointsFor,
  }));

  const remainingMatchups: ScheduledMatchup[] = allMatchups
    .filter((m) => m.homeScore === null && m.week <= regularSeasonWeeks)
    .map((m) => ({ week: m.week, homeTeamId: m.homeTeamId, awayTeamId: m.awayTeamId }));

  const result = simulateSeason({
    standings,
    remainingMatchups,
    distributions,
    playoffTeamCount,
  });

  return { available: true, result };
}
