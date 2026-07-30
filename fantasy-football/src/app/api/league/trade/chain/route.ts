import { NextResponse } from "next/server";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { buildTradeContext } from "@/lib/trade/context";
import { planTradeChain } from "@/lib/trade/chain";
import type { CandidateTeam } from "@/lib/trade/recommend";

export async function GET() {
  const result = await resolveMyTeam();
  if (result.status === "not_connected") return NextResponse.json({ connected: false });
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const { leagueRowId, season, currentWeek, rosterSlotCounts, teamRowId } = result.data;
  const ctx = await buildTradeContext(leagueRowId, season, currentWeek, rosterSlotCounts);

  const myRoster = ctx.tradeValuesByTeam.get(teamRowId);
  const myNeeds = ctx.needsByTeam.get(teamRowId);
  if (!myRoster || !myNeeds) {
    return NextResponse.json({ connected: true, teamSelected: true, chain: { steps: [] } });
  }

  const otherTeams: CandidateTeam[] = ctx.teams
    .filter((t) => t.teamId !== teamRowId)
    .map((t) => ({
      teamId: t.teamId,
      teamName: t.teamName,
      roster: ctx.tradeValuesByTeam.get(t.teamId) ?? [],
      needs: ctx.needsByTeam.get(t.teamId) ?? { teamId: t.teamId, teamName: t.teamName, needs: [] },
      startingSlotCounts: rosterSlotCounts,
    }));

  const chain = planTradeChain(myRoster, myNeeds, rosterSlotCounts, otherTeams, ctx.avgValuePerStarter);

  return NextResponse.json({ connected: true, teamSelected: true, chain });
}
