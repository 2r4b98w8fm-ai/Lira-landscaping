import type { Position } from "@/lib/constants";
import {
  getAllTeamRosters,
  getDefenseVsPosition,
  getFreeAgentsForLeague,
  getRestOfSeasonOpponents,
} from "@/lib/db/queries";
import { computeReplacementLevels } from "@/lib/trade/scarcity";
import { computeRestOfSeasonSOS } from "@/lib/trade/schedule";
import { computeTradeValue } from "@/lib/trade/value";
import type { DefenseRanking, RosterPlayer, TradeValue } from "@/types/domain";

export interface RankingEntry {
  player: RosterPlayer;
  tradeValue: TradeValue;
  /** Team name if rostered somewhere in the league, null if a free agent. */
  rosteredBy: string | null;
  rosteredByTeamId: number | null;
}

/**
 * Every player in the league universe — every roster plus the free-agent
 * pool — valued on the exact same scale as the trade tools (VORP over a
 * real replacement level, injury and schedule adjusted). This is what
 * "rankings" means here: not a separate opinion, but the same transparent
 * math applied league-wide instead of just to your own roster.
 */
export async function buildLeagueWideRankings(
  leagueRowId: number,
  season: number,
  currentWeek: number,
  rosterSlotCounts: Record<string, number>
): Promise<RankingEntry[]> {
  const teamRosters = await getAllTeamRosters(leagueRowId, season, currentWeek);
  const freeAgentPool = await getFreeAgentsForLeague(leagueRowId, season, currentWeek);

  const rosteredPlayers = teamRosters.flatMap((t) => t.roster);
  const replacementLevels = computeReplacementLevels(rosteredPlayers, teamRosters.length, rosterSlotCounts);

  const defenseRows = await getDefenseVsPosition(season);
  const defenseRankings: DefenseRanking[] = defenseRows.map((r) => ({
    team: r.team,
    position: r.position as Position,
    avgPointsAllowedPpr: r.avgPointsAllowedPpr,
    rank: r.rank,
    weeksSampled: r.weeksSampled,
  }));

  const entries: Array<{ player: RosterPlayer; rosteredBy: string | null; rosteredByTeamId: number | null }> = [
    ...teamRosters.flatMap((t) =>
      t.roster.map((player) => ({ player, rosteredBy: t.teamName, rosteredByTeamId: t.teamId }))
    ),
    ...freeAgentPool.map((player) => ({ player, rosteredBy: null, rosteredByTeamId: null })),
  ];

  const uniqueNflTeams = Array.from(new Set(entries.map((e) => e.player.nflTeam)));
  const remainingOpponentsByTeam = new Map<string, string[]>();
  for (const nflTeam of uniqueNflTeams) {
    remainingOpponentsByTeam.set(nflTeam, await getRestOfSeasonOpponents(season, nflTeam, currentWeek));
  }

  return entries.map(({ player, rosteredBy, rosteredByTeamId }) => {
    const remainingOpponents = remainingOpponentsByTeam.get(player.nflTeam) ?? [];
    const schedule = computeRestOfSeasonSOS(player.position, remainingOpponents, defenseRankings);
    const tradeValue = computeTradeValue(player, replacementLevels[player.position] ?? 0, schedule);
    return { player, tradeValue, rosteredBy, rosteredByTeamId };
  });
}
