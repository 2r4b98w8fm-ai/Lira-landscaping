import { NextResponse } from "next/server";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { getMatchupsForLeague, getTeamsForLeague } from "@/lib/db/queries";
import { buildScoreboard } from "@/lib/scoreboard/build";

export async function GET() {
  const result = await resolveMyTeam();
  if (result.status === "not_connected") return NextResponse.json({ connected: false });
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const { leagueRowId, teamRowId, currentWeek } = result.data;
  const [matchups, teams] = await Promise.all([getMatchupsForLeague(leagueRowId), getTeamsForLeague(leagueRowId)]);

  if (matchups.length === 0) {
    return NextResponse.json({
      connected: true,
      teamSelected: true,
      available: false,
      reason: "No league schedule has been synced yet. Re-run a league sync (ESPN's mMatchup data may not have been available on the last pull).",
    });
  }

  const board = buildScoreboard(matchups, teams, currentWeek, currentWeek);
  return NextResponse.json({ connected: true, teamSelected: true, available: true, myTeamId: teamRowId, currentWeek, matchups: board });
}
