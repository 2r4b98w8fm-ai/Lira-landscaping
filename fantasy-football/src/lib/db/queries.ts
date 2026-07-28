import { and, eq } from "drizzle-orm";
import { db } from "./client";
import {
  defenseVsPosition,
  leagues,
  players,
  rosterSlots,
  syncLog,
  teams,
} from "./schema";
import type { DefenseRankRow } from "@/lib/nflverse/ingest";
import type { LeagueSummary, RosterPlayer } from "@/types/domain";

export async function logSync(
  source: string,
  status: "ok" | "error",
  message?: string
) {
  await db.insert(syncLog).values({ source, status, message });
}

export async function upsertLeague(summary: LeagueSummary): Promise<number> {
  const [row] = await db
    .insert(leagues)
    .values({
      espnLeagueId: summary.espnLeagueId,
      season: summary.season,
      name: summary.name,
      lastSyncedAt: new Date(),
      lastSyncError: null,
    })
    .onConflictDoUpdate({
      target: [leagues.espnLeagueId, leagues.season],
      set: { name: summary.name, lastSyncedAt: new Date(), lastSyncError: null },
    })
    .returning({ id: leagues.id });

  if (!row) throw new Error("Failed to upsert league");

  for (const team of summary.teams) {
    await db
      .insert(teams)
      .values({
        leagueId: row.id,
        espnTeamId: team.espnTeamId,
        name: team.name,
        abbrev: team.abbrev,
        wins: team.wins,
        losses: team.losses,
        ties: team.ties,
        pointsFor: team.pointsFor,
        pointsAgainst: team.pointsAgainst,
      })
      .onConflictDoUpdate({
        target: [teams.leagueId, teams.espnTeamId],
        set: {
          name: team.name,
          abbrev: team.abbrev,
          wins: team.wins,
          losses: team.losses,
          ties: team.ties,
          pointsFor: team.pointsFor,
          pointsAgainst: team.pointsAgainst,
        },
      });
  }

  return row.id;
}

export async function recordLeagueSyncError(
  espnLeagueId: string,
  season: number,
  message: string
) {
  await db
    .insert(leagues)
    .values({
      espnLeagueId,
      season,
      name: `League ${espnLeagueId}`,
      lastSyncError: message,
    })
    .onConflictDoUpdate({
      target: [leagues.espnLeagueId, leagues.season],
      set: { lastSyncError: message },
    });
}

export async function upsertRoster(
  leagueId: number,
  espnTeamId: number,
  week: number,
  roster: RosterPlayer[]
) {
  const [team] = await db
    .select({ id: teams.id })
    .from(teams)
    .where(and(eq(teams.leagueId, leagueId), eq(teams.espnTeamId, espnTeamId)));
  if (!team) return;

  for (const p of roster) {
    await db
      .insert(players)
      .values({
        espnPlayerId: p.espnPlayerId,
        name: p.name,
        position: p.position,
        nflTeam: p.nflTeam,
        injuryStatus: p.injuryStatus,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: players.espnPlayerId,
        set: {
          name: p.name,
          position: p.position,
          nflTeam: p.nflTeam,
          injuryStatus: p.injuryStatus,
          updatedAt: new Date(),
        },
      });

    await db
      .insert(rosterSlots)
      .values({
        teamId: team.id,
        espnPlayerId: p.espnPlayerId,
        lineupSlot: p.lineupSlot,
        week,
        opponent: p.opponent,
        weekProjection: p.weekProjection,
        seasonPoints: p.seasonPoints,
      })
      .onConflictDoUpdate({
        target: [rosterSlots.teamId, rosterSlots.espnPlayerId],
        set: {
          lineupSlot: p.lineupSlot,
          week,
          opponent: p.opponent,
          weekProjection: p.weekProjection,
          seasonPoints: p.seasonPoints,
        },
      });
  }
}

export async function getRosterForTeam(teamId: number): Promise<RosterPlayer[]> {
  const rows = await db
    .select({
      espnPlayerId: players.espnPlayerId,
      name: players.name,
      position: players.position,
      nflTeam: players.nflTeam,
      injuryStatus: players.injuryStatus,
      lineupSlot: rosterSlots.lineupSlot,
      opponent: rosterSlots.opponent,
      weekProjection: rosterSlots.weekProjection,
      seasonPoints: rosterSlots.seasonPoints,
    })
    .from(rosterSlots)
    .innerJoin(players, eq(players.espnPlayerId, rosterSlots.espnPlayerId))
    .where(eq(rosterSlots.teamId, teamId));

  return rows.map((r) => ({
    ...r,
    position: r.position as RosterPlayer["position"],
    injuryStatus: r.injuryStatus as RosterPlayer["injuryStatus"],
  }));
}

export async function getTeamByEspnTeamId(leagueId: number, espnTeamId: number) {
  const [team] = await db
    .select()
    .from(teams)
    .where(and(eq(teams.leagueId, leagueId), eq(teams.espnTeamId, espnTeamId)));
  return team ?? null;
}

export async function getLeagueByEspnId(espnLeagueId: string, season: number) {
  const [league] = await db
    .select()
    .from(leagues)
    .where(and(eq(leagues.espnLeagueId, espnLeagueId), eq(leagues.season, season)));
  return league ?? null;
}

export async function getTeamsForLeague(leagueId: number) {
  return db.select().from(teams).where(eq(teams.leagueId, leagueId));
}

export async function saveDefenseVsPosition(
  season: number,
  throughWeek: number,
  ranked: DefenseRankRow[]
) {
  for (const row of ranked) {
    await db
      .insert(defenseVsPosition)
      .values({
        season,
        throughWeek,
        team: row.team,
        position: row.position,
        avgPointsAllowedPpr: row.avgPointsAllowedPpr,
        rank: row.rank,
        weeksSampled: row.weeksSampled,
        computedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [defenseVsPosition.season, defenseVsPosition.team, defenseVsPosition.position],
        set: {
          throughWeek,
          avgPointsAllowedPpr: row.avgPointsAllowedPpr,
          rank: row.rank,
          weeksSampled: row.weeksSampled,
          computedAt: new Date(),
        },
      });
  }
}

export async function getDefenseVsPosition(season: number) {
  return db
    .select()
    .from(defenseVsPosition)
    .where(eq(defenseVsPosition.season, season));
}
