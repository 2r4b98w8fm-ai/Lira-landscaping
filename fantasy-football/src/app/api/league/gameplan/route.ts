import { NextResponse } from "next/server";
import { getDefenseVsPosition } from "@/lib/db/queries";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { buildStartSitBoards } from "@/lib/startsit/engine";
import { findFlipAlerts } from "@/lib/gameplan/flipAlerts";
import { buildTradeContext } from "@/lib/trade/context";
import { recommendTrades, type CandidateTeam } from "@/lib/trade/recommend";
import { buildWaiverRecommendations } from "@/lib/waiver/context";
import { buildAndRunSimulation } from "@/lib/simulation/context";
import type { Position } from "@/lib/constants";
import type { DefenseRanking } from "@/types/domain";

const MAX_TRADES = 2;
const MAX_WAIVERS = 3;

export async function GET() {
  const result = await resolveMyTeam();
  if (result.status === "not_connected") return NextResponse.json({ connected: false });
  if (result.status === "no_team_selected") {
    return NextResponse.json({ connected: true, teamSelected: false });
  }

  const {
    leagueName,
    roster,
    season,
    currentWeek,
    leagueRowId,
    teamRowId,
    rosterSlotCounts,
    regularSeasonWeeks,
    playoffTeamCount,
  } = result.data;

  const defenseRows = await getDefenseVsPosition(season);
  const defenseRankings: DefenseRanking[] = defenseRows.map((r) => ({
    team: r.team,
    position: r.position as Position,
    avgPointsAllowedPpr: r.avgPointsAllowedPpr,
    rank: r.rank,
    weeksSampled: r.weeksSampled,
  }));

  const boards = buildStartSitBoards(roster, defenseRankings);
  const flipAlerts = findFlipAlerts(boards, rosterSlotCounts);

  const injuryAlerts = roster.filter(
    (p) => p.injuryStatus !== "ACTIVE" && p.injuryStatus !== "UNKNOWN"
  );

  const tradeCtx = await buildTradeContext(leagueRowId, season, currentWeek, rosterSlotCounts);
  const myRoster = tradeCtx.tradeValuesByTeam.get(teamRowId);
  const myNeeds = tradeCtx.needsByTeam.get(teamRowId);
  let topTrades: ReturnType<typeof recommendTrades> = [];
  if (myRoster && myNeeds) {
    const otherTeams: CandidateTeam[] = tradeCtx.teams
      .filter((t) => t.teamId !== teamRowId)
      .map((t) => ({
        teamId: t.teamId,
        teamName: t.teamName,
        roster: tradeCtx.tradeValuesByTeam.get(t.teamId) ?? [],
        needs: tradeCtx.needsByTeam.get(t.teamId) ?? { teamId: t.teamId, teamName: t.teamName, needs: [] },
        startingSlotCounts: rosterSlotCounts,
      }));
    topTrades = recommendTrades(myRoster, myNeeds, rosterSlotCounts, otherTeams).slice(0, MAX_TRADES);
  }

  const waivers = await buildWaiverRecommendations(leagueRowId, teamRowId, rosterSlotCounts, season, currentWeek);
  const topWaivers = waivers.available
    ? waivers.recommendations.filter((w) => (w.valueAdded ?? 0) > 0).slice(0, MAX_WAIVERS)
    : [];

  const simulation = await buildAndRunSimulation(
    leagueRowId,
    season,
    currentWeek,
    regularSeasonWeeks,
    playoffTeamCount,
    rosterSlotCounts
  );
  const myPlayoffOdds = simulation.available
    ? simulation.result.teams.find((t) => t.teamId === teamRowId) ?? null
    : null;

  return NextResponse.json({
    connected: true,
    teamSelected: true,
    leagueName,
    currentWeek,
    flipAlerts,
    injuryAlerts,
    topTrades,
    topWaivers,
    myPlayoffOdds,
  });
}
