import { NextResponse } from "next/server";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { buildTradeContext } from "@/lib/trade/context";
import { buildOffer } from "@/lib/trade/offers";

export async function GET(req: Request) {
  const result = await resolveMyTeam();
  if (result.status === "not_connected") return NextResponse.json({ connected: false });
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const targetTeamId = Number(new URL(req.url).searchParams.get("targetTeamId"));
  if (!Number.isInteger(targetTeamId)) {
    return NextResponse.json({ error: "Missing or invalid targetTeamId." }, { status: 400 });
  }

  const { leagueRowId, season, currentWeek, rosterSlotCounts, teamRowId } = result.data;
  const ctx = await buildTradeContext(leagueRowId, season, currentWeek, rosterSlotCounts);

  const myRoster = ctx.tradeValuesByTeam.get(teamRowId);
  const myNeeds = ctx.needsByTeam.get(teamRowId);
  const targetRoster = ctx.tradeValuesByTeam.get(targetTeamId);
  const targetNeeds = ctx.needsByTeam.get(targetTeamId);
  const targetTeam = ctx.teams.find((t) => t.teamId === targetTeamId);

  if (!myRoster || !myNeeds || !targetRoster || !targetNeeds || !targetTeam) {
    return NextResponse.json({ error: "Unknown team in this league." }, { status: 400 });
  }

  const offer = buildOffer({
    myRoster,
    myNeeds,
    myStartingSlotCounts: rosterSlotCounts,
    targetTeamId: targetTeam.teamId,
    targetTeamName: targetTeam.teamName,
    targetRoster,
    targetNeeds,
    targetStartingSlotCounts: rosterSlotCounts,
  });

  return NextResponse.json({ connected: true, teamSelected: true, offer });
}
