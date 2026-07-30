import { NextResponse } from "next/server";
import { getDefenseVsPosition } from "@/lib/db/queries";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { buildStartSitBoards } from "@/lib/startsit/engine";
import { computeOptimalLineup } from "@/lib/startsit/optimalLineup";
import type { Position } from "@/lib/constants";
import type { DefenseRanking } from "@/types/domain";

export async function GET() {
  const result = await resolveMyTeam();

  if (result.status === "not_connected") {
    return NextResponse.json({ connected: false });
  }
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const { season, roster, rosterSlotCounts } = result.data;
  const defenseRows = await getDefenseVsPosition(season);
  const defenseRankings: DefenseRanking[] = defenseRows.map((r) => ({
    team: r.team,
    position: r.position as Position,
    avgPointsAllowedPpr: r.avgPointsAllowedPpr,
    rank: r.rank,
    weeksSampled: r.weeksSampled,
  }));

  const boards = buildStartSitBoards(roster, defenseRankings);
  const optimalLineup = computeOptimalLineup(roster, rosterSlotCounts);

  return NextResponse.json({
    connected: true,
    teamSelected: true,
    boards,
    optimalLineup,
    defenseDataAvailable: defenseRankings.length > 0,
  });
}
