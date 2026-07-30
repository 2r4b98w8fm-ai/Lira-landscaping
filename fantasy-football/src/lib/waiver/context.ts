import { getFreeAgentsForLeague, getLeagueById, getRosterForTeam, getTeamById } from "@/lib/db/queries";
import { rankWaiverWire, type FaabState } from "./engine";
import type { WaiverRecommendation } from "@/types/domain";

export type WaiverAvailability =
  | { available: false; reason: string }
  | { available: true; recommendations: WaiverRecommendation[] };

/** Builds waiver recommendations from what's already cached — no ESPN call here (see sync/league.ts for the free-agent pull itself). */
export async function buildWaiverRecommendations(
  leagueRowId: number,
  myTeamRowId: number,
  rosterSlotCounts: Record<string, number>,
  season: number,
  currentWeek: number
): Promise<WaiverAvailability> {
  const freeAgentPool = await getFreeAgentsForLeague(leagueRowId, season, currentWeek);
  if (freeAgentPool.length === 0) {
    return {
      available: false,
      reason:
        "No free-agent pool has been synced yet. Re-run a league sync (ESPN's free-agent endpoint may not have been available on the last pull).",
    };
  }

  const myRoster = await getRosterForTeam(myTeamRowId, season, currentWeek);

  const [league, myTeam] = await Promise.all([getLeagueById(leagueRowId), getTeamById(myTeamRowId)]);
  const faab: FaabState | null =
    league?.faabBudget != null ? { totalBudget: league.faabBudget, spent: myTeam?.faabSpent ?? null } : null;

  return { available: true, recommendations: rankWaiverWire(myRoster, freeAgentPool, rosterSlotCounts, faab) };
}
