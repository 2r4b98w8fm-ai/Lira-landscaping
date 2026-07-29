import { getLeagueByEspnId, getRosterForTeam, getTeamByEspnTeamId } from "@/lib/db/queries";
import { getSession, type SessionData } from "@/lib/session";
import type { RosterPlayer } from "@/types/domain";

export interface ResolvedTeam {
  session: SessionData;
  leagueRowId: number;
  leagueName: string;
  lastSyncedAt: Date | null;
  teamRowId: number;
  roster: RosterPlayer[];
  season: number;
  currentWeek: number;
  rosterSlotCounts: Record<string, number>;
  regularSeasonWeeks: number;
  playoffTeamCount: number;
}

export type ResolveResult =
  | { status: "not_connected" }
  | { status: "no_team_selected"; leagueRowId: number }
  | { status: "ok"; data: ResolvedTeam };

/** Reads the session cookie, then loads the cached league/team/roster from Postgres. */
export async function resolveMyTeam(): Promise<ResolveResult> {
  const session = await getSession();
  if (!session) return { status: "not_connected" };

  const league = await getLeagueByEspnId(session.espnLeagueId, session.season);
  if (!league) return { status: "not_connected" };

  if (session.myTeamId === null) {
    return { status: "no_team_selected", leagueRowId: league.id };
  }

  const team = await getTeamByEspnTeamId(league.id, session.myTeamId);
  if (!team) return { status: "no_team_selected", leagueRowId: league.id };

  const roster = await getRosterForTeam(team.id);

  return {
    status: "ok",
    data: {
      session,
      leagueRowId: league.id,
      leagueName: league.name,
      lastSyncedAt: league.lastSyncedAt,
      teamRowId: team.id,
      roster,
      season: league.season,
      currentWeek: league.currentWeek,
      rosterSlotCounts: league.rosterSlotCounts ?? {},
      regularSeasonWeeks: league.regularSeasonWeeks,
      playoffTeamCount: league.playoffTeamCount,
    },
  };
}
