import { NextResponse } from "next/server";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { buildLeagueWideRankings } from "@/lib/rankings/context";
import { rankPlayers } from "@/lib/rankings/build";

export async function GET() {
  const result = await resolveMyTeam();
  if (result.status === "not_connected") return NextResponse.json({ connected: false });
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const { leagueRowId, season, currentWeek, rosterSlotCounts, teamRowId } = result.data;
  const entries = await buildLeagueWideRankings(leagueRowId, season, currentWeek, rosterSlotCounts);
  const rankings = rankPlayers(entries);

  return NextResponse.json({ connected: true, teamSelected: true, myTeamId: teamRowId, rankings });
}
