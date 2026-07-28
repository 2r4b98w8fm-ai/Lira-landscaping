import { NextResponse } from "next/server";
import { resolveMyTeam } from "@/lib/sync/resolve";

export async function GET() {
  const result = await resolveMyTeam();

  if (result.status === "not_connected") {
    return NextResponse.json({ connected: false });
  }
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const { leagueName, lastSyncedAt, roster } = result.data;
  return NextResponse.json({
    connected: true,
    teamSelected: true,
    leagueName,
    lastSyncedAt,
    roster,
  });
}
