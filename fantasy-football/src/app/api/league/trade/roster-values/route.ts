import { NextResponse } from "next/server";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { buildTradeContext } from "@/lib/trade/context";

/** Every team's roster with trade value attached — feeds the manual trade-analyzer picker. */
export async function GET() {
  const result = await resolveMyTeam();
  if (result.status === "not_connected") return NextResponse.json({ connected: false });
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const { leagueRowId, season, currentWeek, rosterSlotCounts, teamRowId } = result.data;
  const ctx = await buildTradeContext(leagueRowId, season, currentWeek, rosterSlotCounts);

  const teams = ctx.teams.map((t) => ({
    teamId: t.teamId,
    teamName: t.teamName,
    isMyTeam: t.teamId === teamRowId,
    players: ctx.tradeValuesByTeam.get(t.teamId) ?? [],
  }));

  return NextResponse.json({ connected: true, teamSelected: true, myTeamId: teamRowId, teams });
}
