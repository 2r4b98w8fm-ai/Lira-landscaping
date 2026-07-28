import { NextResponse } from "next/server";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { buildTradeContext } from "@/lib/trade/context";
import { findTradeTargets } from "@/lib/trade/targets";

export async function GET() {
  const result = await resolveMyTeam();
  if (result.status === "not_connected") return NextResponse.json({ connected: false });
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const { leagueRowId, season, currentWeek, rosterSlotCounts, teamRowId } = result.data;
  const ctx = await buildTradeContext(leagueRowId, season, currentWeek, rosterSlotCounts);

  const myNeeds = ctx.needsByTeam.get(teamRowId);
  if (!myNeeds) {
    return NextResponse.json({ connected: true, teamSelected: true, targets: [] });
  }

  const otherTeams = Array.from(ctx.needsByTeam.entries())
    .filter(([id]) => id !== teamRowId)
    .map(([, profile]) => profile);

  const targets = findTradeTargets(myNeeds, otherTeams);

  return NextResponse.json({ connected: true, teamSelected: true, myNeeds, targets });
}
