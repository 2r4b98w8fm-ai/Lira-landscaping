import type { Position } from "@/lib/constants";
import {
  getAllTeamRosters,
  getDefenseVsPosition,
  getRestOfSeasonOpponents,
} from "@/lib/db/queries";
import type { DefenseRanking, RosterPlayer, TeamNeedsProfile, TradeValue } from "@/types/domain";
import { computeReplacementLevels } from "./scarcity";
import { computeRestOfSeasonSOS } from "./schedule";
import { computeTradeValue } from "./value";
import { computeLeagueAvgValuePerStarter, computeTeamNeeds } from "./needs";

export interface TradeContext {
  teams: Array<{ teamId: number; teamName: string }>;
  tradeValuesByTeam: Map<number, TradeValue[]>;
  needsByTeam: Map<number, TeamNeedsProfile>;
  replacementLevels: Record<Position, number>;
}

/**
 * Computes trade value + positional needs for every team in the league in
 * one pass, so the trade analyzer, target finder, and offer builder all
 * work from the same numbers. Reads roster + schedule + defense data that
 * `syncLeague` and `sync-defense-rankings` already cached in Postgres —
 * doesn't call ESPN or nflverse itself.
 */
export async function buildTradeContext(
  leagueRowId: number,
  season: number,
  currentWeek: number,
  rosterSlotCounts: Record<string, number>
): Promise<TradeContext> {
  const teamRosters = await getAllTeamRosters(leagueRowId);
  const numTeams = teamRosters.length;

  const allPlayers = teamRosters.flatMap((t) => t.roster);
  const replacementLevels = computeReplacementLevels(allPlayers, numTeams, rosterSlotCounts);

  const defenseRows = await getDefenseVsPosition(season);
  const defenseRankings: DefenseRanking[] = defenseRows.map((r) => ({
    team: r.team,
    position: r.position as Position,
    avgPointsAllowedPpr: r.avgPointsAllowedPpr,
    rank: r.rank,
    weeksSampled: r.weeksSampled,
  }));

  const uniqueNflTeams = Array.from(new Set(allPlayers.map((p) => p.nflTeam)));
  const remainingOpponentsByTeam = new Map<string, string[]>();
  for (const nflTeam of uniqueNflTeams) {
    remainingOpponentsByTeam.set(nflTeam, await getRestOfSeasonOpponents(season, nflTeam, currentWeek));
  }

  function valueFor(player: RosterPlayer): TradeValue {
    const remainingOpponents = remainingOpponentsByTeam.get(player.nflTeam) ?? [];
    const schedule = computeRestOfSeasonSOS(player.position, remainingOpponents, defenseRankings);
    return computeTradeValue(player, replacementLevels[player.position] ?? 0, schedule);
  }

  const tradeValuesByTeam = new Map<number, TradeValue[]>();
  for (const { teamId, roster } of teamRosters) {
    tradeValuesByTeam.set(teamId, roster.map(valueFor));
  }

  const avgValuePerStarter = computeLeagueAvgValuePerStarter(
    Array.from(tradeValuesByTeam.values()),
    numTeams,
    rosterSlotCounts
  );

  const needsByTeam = new Map<number, TeamNeedsProfile>();
  for (const { teamId, teamName } of teamRosters) {
    needsByTeam.set(
      teamId,
      computeTeamNeeds(teamId, teamName, tradeValuesByTeam.get(teamId) ?? [], rosterSlotCounts, avgValuePerStarter)
    );
  }

  return {
    teams: teamRosters.map(({ teamId, teamName }) => ({ teamId, teamName })),
    tradeValuesByTeam,
    needsByTeam,
    replacementLevels,
  };
}
