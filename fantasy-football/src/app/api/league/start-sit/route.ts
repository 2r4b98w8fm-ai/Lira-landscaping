import { NextResponse } from "next/server";
import { getCrosswalkForPlayers, getDefenseVsPosition, getRecentGameLog } from "@/lib/db/queries";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { buildStartSitBoards } from "@/lib/startsit/engine";
import { computeOptimalLineup } from "@/lib/startsit/optimalLineup";
import { computeConsistency } from "@/lib/analytics/consistency";
import type { Position } from "@/lib/constants";
import type { ConsistencyRating, DefenseRanking } from "@/types/domain";

export async function GET() {
  const result = await resolveMyTeam();

  if (result.status === "not_connected") {
    return NextResponse.json({ connected: false });
  }
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const { season, currentWeek, roster, rosterSlotCounts } = result.data;
  const defenseRows = await getDefenseVsPosition(season);
  const defenseRankings: DefenseRanking[] = defenseRows.map((r) => ({
    team: r.team,
    position: r.position as Position,
    avgPointsAllowedPpr: r.avgPointsAllowedPpr,
    rank: r.rank,
    weeksSampled: r.weeksSampled,
  }));

  const crosswalk = await getCrosswalkForPlayers(roster.map((p) => p.espnPlayerId));
  const gsisIds = Array.from(
    new Set(Array.from(crosswalk.values()).map((c) => c.gsisId).filter((g): g is string => g !== null))
  );
  const gameLogs = await getRecentGameLog(gsisIds, season, currentWeek);
  const consistencyByPlayer = new Map<number, ConsistencyRating>();
  for (const player of roster) {
    const gsisId = crosswalk.get(player.espnPlayerId)?.gsisId;
    const log = gsisId ? gameLogs.get(gsisId) ?? [] : [];
    const rating = computeConsistency(log.map((g) => g.fantasyPointsPpr));
    if (rating) consistencyByPlayer.set(player.espnPlayerId, rating);
  }

  const boards = buildStartSitBoards(roster, defenseRankings, undefined, consistencyByPlayer);
  const optimalLineup = computeOptimalLineup(roster, rosterSlotCounts);

  return NextResponse.json({
    connected: true,
    teamSelected: true,
    boards,
    optimalLineup,
    defenseDataAvailable: defenseRankings.length > 0,
  });
}
