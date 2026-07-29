import { NextResponse } from "next/server";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { buildAndRunSimulation } from "@/lib/simulation/context";

export async function GET() {
  const result = await resolveMyTeam();
  if (result.status === "not_connected") return NextResponse.json({ connected: false });
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const { leagueRowId, season, currentWeek, regularSeasonWeeks, playoffTeamCount, rosterSlotCounts } =
    result.data;

  const simulation = await buildAndRunSimulation(
    leagueRowId,
    season,
    currentWeek,
    regularSeasonWeeks,
    playoffTeamCount,
    rosterSlotCounts
  );

  if (!simulation.available) {
    return NextResponse.json({ connected: true, teamSelected: true, available: false, reason: simulation.reason });
  }

  return NextResponse.json({ connected: true, teamSelected: true, available: true, simulation: simulation.result });
}
