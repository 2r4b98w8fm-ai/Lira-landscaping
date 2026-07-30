import {
  getCrosswalkForPlayers,
  getDefenseVsPosition,
  getRecentGameLog,
  getRestOfSeasonOpponents,
  getSleeperTrendingMap,
  savePlayerProjections,
  type PlayerProjectionRow,
} from "@/lib/db/queries";
import type { Position } from "@/lib/constants";
import { computeOurModelProjection } from "./ourModel";
import { blendRestOfSeason, blendWeek } from "./consensus";
import type { DefenseRanking, ProjectionBreakdown, RosterPlayer } from "@/types/domain";

/**
 * Runs every rostered/free-agent player synced from ESPN through our own
 * projection model and blends it with ESPN's number into a consensus —
 * this is what upgrades restOfSeasonProjection/weekProjection everywhere
 * downstream (trade value, waivers, start/sit) from "just ESPN's number"
 * to a real multi-source figure, without those engines needing to change
 * at all. Also persists the full per-source breakdown so the UI can show
 * exactly what each source said. Never throws — a player this can't fully
 * enrich (no crosswalk match, no game log yet) simply keeps their
 * ESPN/pace-estimate number as-is, which is what already happened before
 * this ran.
 */
export async function enrichRosterPlayers(
  playersList: RosterPlayer[],
  season: number,
  week: number
): Promise<RosterPlayer[]> {
  if (playersList.length === 0) return playersList;

  const defenseRows = await getDefenseVsPosition(season);
  const defenseRankings: DefenseRanking[] = defenseRows.map((r) => ({
    team: r.team,
    position: r.position as Position,
    avgPointsAllowedPpr: r.avgPointsAllowedPpr,
    rank: r.rank,
    weeksSampled: r.weeksSampled,
  }));

  const uniqueNflTeams = Array.from(new Set(playersList.map((p) => p.nflTeam)));
  const remainingOpponentsByTeam = new Map<string, string[]>();
  for (const nflTeam of uniqueNflTeams) {
    remainingOpponentsByTeam.set(nflTeam, await getRestOfSeasonOpponents(season, nflTeam, week));
  }

  const espnIds = playersList.map((p) => p.espnPlayerId);
  const crosswalk = await getCrosswalkForPlayers(espnIds);
  const gsisIds = Array.from(
    new Set(Array.from(crosswalk.values()).map((c) => c.gsisId).filter((g): g is string => g !== null))
  );
  const gameLogs = await getRecentGameLog(gsisIds, season, week);
  const trending = await getSleeperTrendingMap();

  const projectionRows: PlayerProjectionRow[] = [];
  const enriched: RosterPlayer[] = playersList.map((player) => {
    const cw = crosswalk.get(player.espnPlayerId);
    const gameLog = cw?.gsisId ? gameLogs.get(cw.gsisId) ?? [] : [];
    const remainingOpponents = remainingOpponentsByTeam.get(player.nflTeam) ?? [];

    const ourModel = computeOurModelProjection({
      position: player.position,
      injuryStatus: player.injuryStatus,
      gameLog,
      thisWeekOpponent: player.opponent,
      remainingOpponents,
      defenseRankings,
    });

    const espnRaw = player.restOfSeasonSource === "espn" ? player.restOfSeasonProjection : null;
    const paceEstimate = player.restOfSeasonSource === "pace_estimate" ? player.restOfSeasonProjection : null;
    const rosBlend = blendRestOfSeason(espnRaw, ourModel.restOfSeasonProjection, paceEstimate);
    const weekBlend = blendWeek(player.weekProjection, ourModel.weekProjection);

    const sleeperTrend = cw?.sleeperId ? trending.get(cw.sleeperId) ?? null : null;

    const breakdown: ProjectionBreakdown = {
      espnRestOfSeason: espnRaw,
      ourModelRestOfSeason: ourModel.restOfSeasonProjection,
      ourModelWeek: ourModel.weekProjection,
      ourModelReasoning: ourModel.reasoning,
      sleeperSearchRank: cw?.sleeperSearchRank ?? null,
      sleeperTrend: sleeperTrend ? { direction: sleeperTrend.direction, count: sleeperTrend.count } : null,
    };

    projectionRows.push({
      espnPlayerId: player.espnPlayerId,
      season,
      week,
      espnRestOfSeason: espnRaw,
      ourModelRestOfSeason: ourModel.restOfSeasonProjection,
      ourModelWeek: ourModel.weekProjection,
      ourModelReasoning: ourModel.reasoning,
      sleeperSearchRank: cw?.sleeperSearchRank ?? null,
      sleeperTrendDirection: sleeperTrend?.direction ?? null,
      sleeperTrendCount: sleeperTrend?.count ?? null,
      consensusRestOfSeason: rosBlend.value,
      consensusSource: rosBlend.source,
      consensusWeek: weekBlend,
    });

    return {
      ...player,
      weekProjection: weekBlend,
      restOfSeasonProjection: rosBlend.value,
      restOfSeasonSource: rosBlend.source,
      projectionBreakdown: breakdown,
    };
  });

  await savePlayerProjections(projectionRows);
  return enriched;
}
