import {
  getMatchupsForLeague,
  getPreviousPowerRankingSnapshot,
  getTeamsForLeague,
  savePowerRankingSnapshot,
} from "@/lib/db/queries";
import { computeAllPlayRecords, type PlayedMatchup } from "./allPlay";
import { computePowerRankings } from "./powerRankings";
import type { PowerRanking } from "@/types/domain";

/**
 * Computes power rankings from what's already cached (team records +
 * matchup scores) — no ESPN call. Persists a snapshot of this week's ranks
 * so the *next* computation can show trend arrows against it.
 */
export async function buildPowerRankings(leagueRowId: number, currentWeek: number): Promise<PowerRanking[]> {
  const teamRows = await getTeamsForLeague(leagueRowId);
  const allMatchups = await getMatchupsForLeague(leagueRowId);

  const played: PlayedMatchup[] = allMatchups
    .filter((m): m is typeof m & { homeScore: number; awayScore: number } => m.homeScore !== null && m.awayScore !== null)
    .map((m) => ({ week: m.week, homeTeamId: m.homeTeamId, awayTeamId: m.awayTeamId, homeScore: m.homeScore, awayScore: m.awayScore }));

  const allPlayRecords = computeAllPlayRecords(played, teamRows.map((t) => t.id));
  const previousRanks = await getPreviousPowerRankingSnapshot(leagueRowId, currentWeek);

  const rankings = computePowerRankings(
    teamRows.map((t) => ({
      teamId: t.id,
      teamName: t.name,
      wins: t.wins,
      losses: t.losses,
      ties: t.ties,
      pointsFor: t.pointsFor,
      pointsAgainst: t.pointsAgainst,
    })),
    allPlayRecords,
    previousRanks.size > 0 ? previousRanks : undefined
  );

  await savePowerRankingSnapshot(leagueRowId, currentWeek, rankings);

  return rankings;
}
