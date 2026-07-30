import { NextResponse } from "next/server";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { buildBreakoutBoard } from "@/lib/breakouts/context";

export async function GET() {
  const result = await resolveMyTeam();
  if (result.status === "not_connected") return NextResponse.json({ connected: false });
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const { leagueRowId, season, currentWeek, teamRowId } = result.data;
  const { entries, teamSnapCounts } = await buildBreakoutBoard(leagueRowId, season, currentWeek, teamRowId);

  return NextResponse.json({ connected: true, teamSelected: true, myTeamId: teamRowId, entries, teamSnapCounts });
}
