import { and, desc, eq, gt, lt } from "drizzle-orm";
import { db } from "./client";
import {
  defenseVsPosition,
  freeAgents,
  leagues,
  matchups,
  notificationSubscriptions,
  players,
  positionVariance,
  powerRankingSnapshots,
  proTeamSchedule,
  rosterSlots,
  syncLog,
  teams,
} from "./schema";
import type { DefenseRankRow } from "@/lib/nflverse/ingest";
import type { PositionVarianceRow } from "@/lib/nflverse/variance";
import type { MappedMatchup } from "@/lib/espn/mappers";
import type { LeagueSummary, PowerRanking, RosterPlayer } from "@/types/domain";

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

export async function updateLeagueMeta(
  leagueRowId: number,
  currentWeek: number,
  rosterSlotCounts: Record<string, number>,
  scheduleSettings?: { regularSeasonWeeks: number; playoffTeamCount: number }
) {
  await db
    .update(leagues)
    .set({
      currentWeek,
      rosterSlotCounts,
      ...(scheduleSettings
        ? {
            regularSeasonWeeks: scheduleSettings.regularSeasonWeeks,
            playoffTeamCount: scheduleSettings.playoffTeamCount,
          }
        : {}),
    })
    .where(eq(leagues.id, leagueRowId));
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
        restOfSeasonProjection: p.restOfSeasonProjection,
        restOfSeasonSource: p.restOfSeasonSource,
      })
      .onConflictDoUpdate({
        target: [rosterSlots.teamId, rosterSlots.espnPlayerId],
        set: {
          lineupSlot: p.lineupSlot,
          week,
          opponent: p.opponent,
          weekProjection: p.weekProjection,
          seasonPoints: p.seasonPoints,
          restOfSeasonProjection: p.restOfSeasonProjection,
          restOfSeasonSource: p.restOfSeasonSource,
        },
      });
  }
}

const rosterPlayerSelection = {
  espnPlayerId: players.espnPlayerId,
  name: players.name,
  position: players.position,
  nflTeam: players.nflTeam,
  injuryStatus: players.injuryStatus,
  lineupSlot: rosterSlots.lineupSlot,
  opponent: rosterSlots.opponent,
  weekProjection: rosterSlots.weekProjection,
  seasonPoints: rosterSlots.seasonPoints,
  restOfSeasonProjection: rosterSlots.restOfSeasonProjection,
  restOfSeasonSource: rosterSlots.restOfSeasonSource,
} as const;

function toRosterPlayer(r: {
  espnPlayerId: number;
  name: string;
  position: string;
  nflTeam: string;
  injuryStatus: string;
  lineupSlot: string;
  opponent: string | null;
  weekProjection: number | null;
  seasonPoints: number | null;
  restOfSeasonProjection: number | null;
  restOfSeasonSource: string | null;
}): RosterPlayer {
  return {
    ...r,
    position: r.position as RosterPlayer["position"],
    injuryStatus: r.injuryStatus as RosterPlayer["injuryStatus"],
    restOfSeasonSource: r.restOfSeasonSource as RosterPlayer["restOfSeasonSource"],
  };
}

export async function getRosterForTeam(teamId: number): Promise<RosterPlayer[]> {
  const rows = await db
    .select(rosterPlayerSelection)
    .from(rosterSlots)
    .innerJoin(players, eq(players.espnPlayerId, rosterSlots.espnPlayerId))
    .where(eq(rosterSlots.teamId, teamId));

  return rows.map(toRosterPlayer);
}

/** Every team's roster in the league, for league-wide scarcity/needs analysis. */
export async function getAllTeamRosters(
  leagueId: number
): Promise<Array<{ teamId: number; teamName: string; roster: RosterPlayer[] }>> {
  const leagueTeams = await getTeamsForLeague(leagueId);
  const results: Array<{ teamId: number; teamName: string; roster: RosterPlayer[] }> = [];
  for (const team of leagueTeams) {
    const roster = await getRosterForTeam(team.id);
    results.push({ teamId: team.id, teamName: team.name, roster });
  }
  return results;
}

/** Replaces the whole free-agent pool for a league — a player no longer returned by ESPN simply stops appearing rather than needing an explicit "picked up" delete. */
export async function upsertFreeAgents(leagueId: number, week: number, pool: RosterPlayer[]) {
  await db.delete(freeAgents).where(eq(freeAgents.leagueId, leagueId));

  for (const p of pool) {
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

    await db.insert(freeAgents).values({
      leagueId,
      espnPlayerId: p.espnPlayerId,
      week,
      opponent: p.opponent,
      weekProjection: p.weekProjection,
      seasonPoints: p.seasonPoints,
      restOfSeasonProjection: p.restOfSeasonProjection,
      restOfSeasonSource: p.restOfSeasonSource,
    });
  }
}

export async function getFreeAgentsForLeague(leagueId: number): Promise<RosterPlayer[]> {
  const rows = await db
    .select({
      espnPlayerId: players.espnPlayerId,
      name: players.name,
      position: players.position,
      nflTeam: players.nflTeam,
      injuryStatus: players.injuryStatus,
      opponent: freeAgents.opponent,
      weekProjection: freeAgents.weekProjection,
      seasonPoints: freeAgents.seasonPoints,
      restOfSeasonProjection: freeAgents.restOfSeasonProjection,
      restOfSeasonSource: freeAgents.restOfSeasonSource,
    })
    .from(freeAgents)
    .innerJoin(players, eq(players.espnPlayerId, freeAgents.espnPlayerId))
    .where(eq(freeAgents.leagueId, leagueId));

  return rows.map((r) => toRosterPlayer({ ...r, lineupSlot: "FA" }));
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

export async function getLeagueById(leagueId: number) {
  const [league] = await db.select().from(leagues).where(eq(leagues.id, leagueId));
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

export async function upsertProTeamSchedule(
  season: number,
  rows: Array<{ nflTeam: string; week: number; opponent: string | null }>
) {
  for (const row of rows) {
    await db
      .insert(proTeamSchedule)
      .values({ season, nflTeam: row.nflTeam, week: row.week, opponent: row.opponent })
      .onConflictDoUpdate({
        target: [proTeamSchedule.season, proTeamSchedule.nflTeam, proTeamSchedule.week],
        set: { opponent: row.opponent },
      });
  }
}

/** Opponents for every week after `afterWeek`, skipping byes. Used for rest-of-season SOS. */
export async function getRestOfSeasonOpponents(
  season: number,
  nflTeam: string,
  afterWeek: number
): Promise<string[]> {
  const rows = await db
    .select({ opponent: proTeamSchedule.opponent })
    .from(proTeamSchedule)
    .where(
      and(
        eq(proTeamSchedule.season, season),
        eq(proTeamSchedule.nflTeam, nflTeam),
        gt(proTeamSchedule.week, afterWeek)
      )
    );
  return rows.map((r) => r.opponent).filter((o): o is string => o !== null);
}

export async function upsertMatchups(leagueId: number, rows: MappedMatchup[]) {
  for (const row of rows) {
    await db
      .insert(matchups)
      .values({
        leagueId,
        week: row.week,
        homeTeamId: row.homeTeamId,
        awayTeamId: row.awayTeamId,
        homeScore: row.homeScore,
        awayScore: row.awayScore,
      })
      .onConflictDoUpdate({
        target: [matchups.leagueId, matchups.week, matchups.homeTeamId, matchups.awayTeamId],
        set: { homeScore: row.homeScore, awayScore: row.awayScore },
      });
  }
}

export async function getMatchupsForLeague(leagueId: number): Promise<MappedMatchup[]> {
  const rows = await db.select().from(matchups).where(eq(matchups.leagueId, leagueId));
  return rows.map((r) => ({
    week: r.week,
    homeTeamId: r.homeTeamId,
    awayTeamId: r.awayTeamId,
    homeScore: r.homeScore,
    awayScore: r.awayScore,
  }));
}

export async function savePositionVariance(season: number, rows: PositionVarianceRow[]) {
  for (const row of rows) {
    await db
      .insert(positionVariance)
      .values({
        season,
        position: row.position,
        meanPpr: row.meanPpr,
        stdevPpr: row.stdevPpr,
        sampleSize: row.sampleSize,
      })
      .onConflictDoUpdate({
        target: [positionVariance.season, positionVariance.position],
        set: { meanPpr: row.meanPpr, stdevPpr: row.stdevPpr, sampleSize: row.sampleSize },
      });
  }
}

export async function getPositionVariance(season: number) {
  return db.select().from(positionVariance).where(eq(positionVariance.season, season));
}

/** Most recent power-ranking snapshot strictly before `beforeWeek`, for trend arrows. Empty map if there's no prior snapshot at all. */
export async function getPreviousPowerRankingSnapshot(
  leagueId: number,
  beforeWeek: number
): Promise<Map<number, number>> {
  const [latest] = await db
    .select({ week: powerRankingSnapshots.week })
    .from(powerRankingSnapshots)
    .where(and(eq(powerRankingSnapshots.leagueId, leagueId), lt(powerRankingSnapshots.week, beforeWeek)))
    .orderBy(desc(powerRankingSnapshots.week))
    .limit(1);

  if (!latest) return new Map();

  const rows = await db
    .select({ teamId: powerRankingSnapshots.teamId, rank: powerRankingSnapshots.rank })
    .from(powerRankingSnapshots)
    .where(and(eq(powerRankingSnapshots.leagueId, leagueId), eq(powerRankingSnapshots.week, latest.week)));

  return new Map(rows.map((r) => [r.teamId, r.rank]));
}

export async function savePowerRankingSnapshot(leagueId: number, week: number, rankings: PowerRanking[]) {
  for (const r of rankings) {
    await db
      .insert(powerRankingSnapshots)
      .values({ leagueId, week, teamId: r.teamId, rank: r.rank })
      .onConflictDoUpdate({
        target: [powerRankingSnapshots.leagueId, powerRankingSnapshots.week, powerRankingSnapshots.teamId],
        set: { rank: r.rank },
      });
  }
}

export async function upsertNotificationSubscription(
  teamId: number,
  email: string,
  injuryAlerts: boolean,
  waiverAlerts: boolean
) {
  await db
    .insert(notificationSubscriptions)
    .values({ teamId, email, injuryAlerts, waiverAlerts })
    .onConflictDoUpdate({
      target: notificationSubscriptions.teamId,
      set: { email, injuryAlerts, waiverAlerts },
    });
}

export async function getNotificationSubscriptionForTeam(teamId: number) {
  const [row] = await db
    .select()
    .from(notificationSubscriptions)
    .where(eq(notificationSubscriptions.teamId, teamId));
  return row ?? null;
}

export async function updateInjurySnapshot(teamId: number, snapshot: Record<string, string>) {
  await db
    .update(notificationSubscriptions)
    .set({ lastInjurySnapshot: snapshot, lastDigestSentAt: new Date() })
    .where(eq(notificationSubscriptions.teamId, teamId));
}

export async function getSubscriptionsWithWaiverAlerts() {
  return db
    .select({
      teamId: notificationSubscriptions.teamId,
      email: notificationSubscriptions.email,
      leagueId: teams.leagueId,
      leagueName: leagues.name,
    })
    .from(notificationSubscriptions)
    .innerJoin(teams, eq(teams.id, notificationSubscriptions.teamId))
    .innerJoin(leagues, eq(leagues.id, teams.leagueId))
    .where(eq(notificationSubscriptions.waiverAlerts, true));
}
