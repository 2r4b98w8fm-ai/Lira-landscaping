import { NextResponse } from "next/server";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { buildPowerRankings } from "@/lib/analytics/context";

export async function GET() {
  const result = await resolveMyTeam();
  if (result.status === "not_connected") return NextResponse.json({ connected: false });
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const { leagueRowId, currentWeek, teamRowId } = result.data;
  const rankings = await buildPowerRankings(leagueRowId, currentWeek);

  return NextResponse.json({ connected: true, teamSelected: true, myTeamId: teamRowId, rankings });
}
