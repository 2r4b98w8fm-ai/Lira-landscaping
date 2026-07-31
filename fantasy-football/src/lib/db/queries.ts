import { and, desc, eq, gt, gte, inArray, lt, lte, notInArray, sql } from "drizzle-orm";
import { db } from "./client";
import {
  defenseVsPosition,
  freeAgents,
  leagues,
  matchups,
  notificationSubscriptions,
  playerCrosswalk,
  playerProjections,
  playerSnapCounts,
  playerWeekStats,
  players,
  positionVariance,
  powerRankingSnapshots,
  proTeamSchedule,
  pushSubscriptions,
  rosterSlots,
  sleeperTrending,
  syncLog,
  teams,
  teamSnapCounts,
} from "./schema";
import type { DefenseRankRow, RawStatRow } from "@/lib/nflverse/ingest";
import type { PositionVarianceRow } from "@/lib/nflverse/variance";
import type { SleeperCrosswalkRow, SleeperTrendingRow } from "@/lib/sleeper/ingest";
import type { MappedMatchup } from "@/lib/espn/mappers";
import type { LeagueSummary, PowerRanking, ProjectionBreakdown, RosterPlayer } from "@/types/domain";

/** Splits an array into fixed-size chunks, so bulk inserts stay under Postgres's per-query parameter limit. */
function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

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
        faabSpent: team.faabSpent,
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
          faabSpent: team.faabSpent,
        },
      });
  }

  return row.id;
}

export async function updateLeagueMeta(
  leagueRowId: number,
  currentWeek: number,
  rosterSlotCounts: Record<string, number>,
  scheduleSettings?: { regularSeasonWeeks: number; playoffTeamCount: number },
  faabBudget?: number | null
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
      ...(faabBudget !== undefined ? { faabBudget } : {}),
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

/**
 * Upserts just player identity rows (name/position/team/injury), with no
 * roster-slot/free-agent association — needed before savePlayerProjections
 * can run, since player_projections has a foreign key into this table and
 * enrichment now runs before upsertRoster/upsertFreeAgents get to it.
 */
export async function upsertPlayers(playersList: RosterPlayer[]) {
  for (const p of playersList) {
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
  }
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

  // Wholesale-replace this team's roster slots, same as upsertFreeAgents —
  // a player who left the team (traded, cut) simply stops appearing rather
  // than lingering as a stale row that could collide with whoever now holds
  // that same espnPlayerId elsewhere in the league.
  const keepIds = roster.map((p) => p.espnPlayerId);
  await db.delete(rosterSlots).where(
    keepIds.length > 0
      ? and(eq(rosterSlots.teamId, team.id), notInArray(rosterSlots.espnPlayerId, keepIds))
      : eq(rosterSlots.teamId, team.id)
  );

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

function toRosterPlayer(
  r: {
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
  },
  breakdown: ProjectionBreakdown | null = null
): RosterPlayer {
  return {
    ...r,
    position: r.position as RosterPlayer["position"],
    injuryStatus: r.injuryStatus as RosterPlayer["injuryStatus"],
    restOfSeasonSource: r.restOfSeasonSource as RosterPlayer["restOfSeasonSource"],
    projectionBreakdown: breakdown,
  };
}

/** Merges in the persisted multi-source breakdown (see projections/enrich.ts) for each player, when season/week are known. A no-op (breakdowns left null) when they're omitted — callers without that context still work, just without the per-source detail. */
async function attachProjectionBreakdowns(
  playersList: RosterPlayer[],
  season?: number,
  week?: number
): Promise<RosterPlayer[]> {
  if (season === undefined || week === undefined || playersList.length === 0) return playersList;
  const breakdowns = await getProjectionBreakdownsForPlayers(
    playersList.map((p) => p.espnPlayerId),
    season,
    week
  );
  if (breakdowns.size === 0) return playersList;
  return playersList.map((p) => ({ ...p, projectionBreakdown: breakdowns.get(p.espnPlayerId) ?? p.projectionBreakdown }));
}

export async function getRosterForTeam(teamId: number, season?: number, week?: number): Promise<RosterPlayer[]> {
  const rows = await db
    .select(rosterPlayerSelection)
    .from(rosterSlots)
    .innerJoin(players, eq(players.espnPlayerId, rosterSlots.espnPlayerId))
    .where(eq(rosterSlots.teamId, teamId));

  return attachProjectionBreakdowns(rows.map((r) => toRosterPlayer(r)), season, week);
}

/** Every team's roster in the league, for league-wide scarcity/needs analysis. */
export async function getAllTeamRosters(
  leagueId: number,
  season?: number,
  week?: number
): Promise<Array<{ teamId: number; teamName: string; roster: RosterPlayer[] }>> {
  const leagueTeams = await getTeamsForLeague(leagueId);
  const results: Array<{ teamId: number; teamName: string; roster: RosterPlayer[] }> = [];
  for (const team of leagueTeams) {
    const roster = await getRosterForTeam(team.id, season, week);
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

export async function getFreeAgentsForLeague(leagueId: number, season?: number, week?: number): Promise<RosterPlayer[]> {
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

  return attachProjectionBreakdowns(
    rows.map((r) => toRosterPlayer({ ...r, lineupSlot: "FA" })),
    season,
    week
  );
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

export async function getTeamById(teamId: number) {
  const [team] = await db.select().from(teams).where(eq(teams.id, teamId));
  return team ?? null;
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

/** Schedule rows (week + opponent, including bye weeks as a null opponent) for one NFL team across a week range — unlike getRestOfSeasonOpponents, byes aren't filtered out, since finding them is the point. */
export async function getScheduleForTeam(
  season: number,
  nflTeam: string,
  fromWeek: number,
  toWeek: number
): Promise<Array<{ week: number; opponent: string | null }>> {
  return db
    .select({ week: proTeamSchedule.week, opponent: proTeamSchedule.opponent })
    .from(proTeamSchedule)
    .where(
      and(
        eq(proTeamSchedule.season, season),
        eq(proTeamSchedule.nflTeam, nflTeam),
        gte(proTeamSchedule.week, fromWeek),
        lte(proTeamSchedule.week, toWeek)
      )
    );
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

/** Upserts by endpoint (the same browser re-subscribing, e.g. after switching leagues, just moves to the new team) rather than accumulating duplicate rows. */
export async function savePushSubscription(teamId: number, endpoint: string, p256dh: string, auth: string) {
  await db
    .insert(pushSubscriptions)
    .values({ teamId, endpoint, p256dh, auth })
    .onConflictDoUpdate({
      target: pushSubscriptions.endpoint,
      set: { teamId, p256dh, auth },
    });
}

export async function deletePushSubscription(endpoint: string) {
  await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, endpoint));
}

export async function getPushSubscriptionsForTeam(teamId: number) {
  return db.select().from(pushSubscriptions).where(eq(pushSubscriptions.teamId, teamId));
}

export async function getAllPushSubscriptions() {
  return db
    .select({
      id: pushSubscriptions.id,
      teamId: pushSubscriptions.teamId,
      endpoint: pushSubscriptions.endpoint,
      p256dh: pushSubscriptions.p256dh,
      auth: pushSubscriptions.auth,
      leagueId: teams.leagueId,
      leagueName: leagues.name,
    })
    .from(pushSubscriptions)
    .innerJoin(teams, eq(teams.id, pushSubscriptions.teamId))
    .innerJoin(leagues, eq(leagues.id, teams.leagueId));
}

/**
 * Wholesale-replaces this season's per-player game log with the freshly
 * fetched nflverse rows. Chunked because a full season is tens of
 * thousands of player-weeks — one round trip per row would be far too slow.
 */
export async function savePlayerWeekStats(season: number, rows: RawStatRow[]) {
  await db.delete(playerWeekStats).where(eq(playerWeekStats.season, season));

  for (const batch of chunk(rows, 500)) {
    await db.insert(playerWeekStats).values(
      batch.map((r) => ({
        gsisId: r.gsisId,
        playerName: r.playerName,
        season: r.season,
        week: r.week,
        nflTeam: r.nflTeam,
        opponent: r.opponentTeam,
        position: r.position,
        fantasyPointsPpr: r.fantasyPointsPpr,
        carries: r.carries,
        targets: r.targets,
        receptions: r.receptions,
        targetShare: r.targetShare,
        wopr: r.wopr,
      }))
    );
  }
}

export interface GameLogEntry {
  week: number;
  fantasyPointsPpr: number;
}

/** This season's game log (through `throughWeek`, ascending by week) for each requested gsisId — the real per-player history our own model is built from. */
export async function getRecentGameLog(
  gsisIds: string[],
  season: number,
  throughWeek: number
): Promise<Map<string, GameLogEntry[]>> {
  const result = new Map<string, GameLogEntry[]>();
  if (gsisIds.length === 0) return result;

  for (const batch of chunk(gsisIds, 500)) {
    const rows = await db
      .select({ gsisId: playerWeekStats.gsisId, week: playerWeekStats.week, fantasyPointsPpr: playerWeekStats.fantasyPointsPpr })
      .from(playerWeekStats)
      .where(
        and(
          inArray(playerWeekStats.gsisId, batch),
          eq(playerWeekStats.season, season),
          lte(playerWeekStats.week, throughWeek)
        )
      );
    for (const row of rows) {
      const list = result.get(row.gsisId) ?? [];
      list.push({ week: row.week, fantasyPointsPpr: row.fantasyPointsPpr });
      result.set(row.gsisId, list);
    }
  }

  for (const list of result.values()) list.sort((a, b) => a.week - b.week);
  return result;
}

export interface OpportunityGameLogEntry {
  week: number;
  fantasyPointsPpr: number;
  carries: number;
  targets: number;
  receptions: number;
  targetShare: number | null;
  wopr: number | null;
}

/** Same scope as getRecentGameLog, but with the usage/opportunity columns the breakout engine needs (touches, target share, WOPR) rather than just fantasy points. */
export async function getOpportunityGameLog(
  gsisIds: string[],
  season: number,
  throughWeek: number
): Promise<Map<string, OpportunityGameLogEntry[]>> {
  const result = new Map<string, OpportunityGameLogEntry[]>();
  if (gsisIds.length === 0) return result;

  for (const batch of chunk(gsisIds, 500)) {
    const rows = await db
      .select({
        gsisId: playerWeekStats.gsisId,
        week: playerWeekStats.week,
        fantasyPointsPpr: playerWeekStats.fantasyPointsPpr,
        carries: playerWeekStats.carries,
        targets: playerWeekStats.targets,
        receptions: playerWeekStats.receptions,
        targetShare: playerWeekStats.targetShare,
        wopr: playerWeekStats.wopr,
      })
      .from(playerWeekStats)
      .where(
        and(
          inArray(playerWeekStats.gsisId, batch),
          eq(playerWeekStats.season, season),
          lte(playerWeekStats.week, throughWeek)
        )
      );
    for (const row of rows) {
      const list = result.get(row.gsisId) ?? [];
      list.push({
        week: row.week,
        fantasyPointsPpr: row.fantasyPointsPpr,
        carries: row.carries,
        targets: row.targets,
        receptions: row.receptions,
        targetShare: row.targetShare,
        wopr: row.wopr,
      });
      result.set(row.gsisId, list);
    }
  }

  for (const list of result.values()) list.sort((a, b) => a.week - b.week);
  return result;
}

/** Wholesale-replaces this season's snap counts with a freshly resolved set (see nflverse/snapCounts.ts for how PFR player names get resolved to a gsis_id). */
export async function savePlayerSnapCounts(
  season: number,
  rows: Array<{ gsisId: string; week: number; offenseSnaps: number; offensePct: number }>
) {
  await db.delete(playerSnapCounts).where(eq(playerSnapCounts.season, season));
  for (const batch of chunk(rows, 500)) {
    await db.insert(playerSnapCounts).values(
      batch.map((r) => ({ gsisId: r.gsisId, season, week: r.week, offenseSnaps: r.offenseSnaps, offensePct: r.offensePct }))
    );
  }
}

export interface SnapCountLogEntry {
  week: number;
  offenseSnaps: number;
  offensePct: number;
}

export async function getSnapCountLog(
  gsisIds: string[],
  season: number,
  throughWeek: number
): Promise<Map<string, SnapCountLogEntry[]>> {
  const result = new Map<string, SnapCountLogEntry[]>();
  if (gsisIds.length === 0) return result;

  for (const batch of chunk(gsisIds, 500)) {
    const rows = await db
      .select({
        gsisId: playerSnapCounts.gsisId,
        week: playerSnapCounts.week,
        offenseSnaps: playerSnapCounts.offenseSnaps,
        offensePct: playerSnapCounts.offensePct,
      })
      .from(playerSnapCounts)
      .where(
        and(
          inArray(playerSnapCounts.gsisId, batch),
          eq(playerSnapCounts.season, season),
          lte(playerSnapCounts.week, throughWeek)
        )
      );
    for (const row of rows) {
      const list = result.get(row.gsisId) ?? [];
      list.push({ week: row.week, offenseSnaps: row.offenseSnaps, offensePct: row.offensePct });
      result.set(row.gsisId, list);
    }
  }

  for (const list of result.values()) list.sort((a, b) => a.week - b.week);
  return result;
}

/** Wholesale-replaces this season's team-level snap-count estimates. */
export async function saveTeamSnapCounts(season: number, rows: Array<{ week: number; team: string; totalOffenseSnaps: number }>) {
  await db.delete(teamSnapCounts).where(eq(teamSnapCounts.season, season));
  for (const batch of chunk(rows, 500)) {
    await db.insert(teamSnapCounts).values(batch.map((r) => ({ season, week: r.week, team: r.team, totalOffenseSnaps: r.totalOffenseSnaps })));
  }
}

/** This season's team snap-count history through `throughWeek`, for every team — a small table, so loaded wholesale rather than per-team. */
export async function getTeamSnapCounts(season: number, throughWeek: number): Promise<Map<string, Array<{ week: number; totalOffenseSnaps: number }>>> {
  const rows = await db
    .select({ team: teamSnapCounts.team, week: teamSnapCounts.week, totalOffenseSnaps: teamSnapCounts.totalOffenseSnaps })
    .from(teamSnapCounts)
    .where(and(eq(teamSnapCounts.season, season), lte(teamSnapCounts.week, throughWeek)));

  const result = new Map<string, Array<{ week: number; totalOffenseSnaps: number }>>();
  for (const row of rows) {
    const list = result.get(row.team) ?? [];
    list.push({ week: row.week, totalOffenseSnaps: row.totalOffenseSnaps });
    result.set(row.team, list);
  }
  for (const list of result.values()) list.sort((a, b) => a.week - b.week);
  return result;
}

/** Wholesale-replaces the ESPN<->Sleeper<->gsis ID crosswalk with a freshly fetched one from Sleeper's player directory. */
export async function saveSleeperCrosswalk(rows: SleeperCrosswalkRow[]) {
  for (const batch of chunk(rows, 500)) {
    await db
      .insert(playerCrosswalk)
      .values(
        batch.map((r) => ({
          espnPlayerId: r.espnPlayerId,
          sleeperId: r.sleeperId,
          gsisId: r.gsisId,
          sleeperSearchRank: r.searchRank,
          updatedAt: new Date(),
        }))
      )
      .onConflictDoUpdate({
        target: playerCrosswalk.espnPlayerId,
        set: {
          sleeperId: sql`excluded.sleeper_id`,
          gsisId: sql`excluded.gsis_id`,
          sleeperSearchRank: sql`excluded.sleeper_search_rank`,
          updatedAt: new Date(),
        },
      });
  }
}

export interface CrosswalkEntry {
  sleeperId: string | null;
  gsisId: string | null;
  sleeperSearchRank: number | null;
}

export async function getCrosswalkForPlayers(espnPlayerIds: number[]): Promise<Map<number, CrosswalkEntry>> {
  const result = new Map<number, CrosswalkEntry>();
  if (espnPlayerIds.length === 0) return result;

  for (const batch of chunk(espnPlayerIds, 500)) {
    const rows = await db
      .select()
      .from(playerCrosswalk)
      .where(inArray(playerCrosswalk.espnPlayerId, batch));
    for (const row of rows) {
      result.set(row.espnPlayerId, {
        sleeperId: row.sleeperId,
        gsisId: row.gsisId,
        sleeperSearchRank: row.sleeperSearchRank,
      });
    }
  }
  return result;
}

/** Wholesale-replaces this direction's ("add" or "drop") trending snapshot — a player who falls off Sleeper's trending list simply stops appearing. */
export async function saveSleeperTrending(direction: "add" | "drop", rows: SleeperTrendingRow[]) {
  await db.delete(sleeperTrending).where(eq(sleeperTrending.direction, direction));
  for (const batch of chunk(rows, 500)) {
    await db.insert(sleeperTrending).values(
      batch.map((r) => ({ sleeperId: r.sleeperId, direction, count: r.count, capturedAt: new Date() }))
    );
  }
}

export interface TrendingEntry {
  direction: "add" | "drop";
  count: number;
}

export async function getSleeperTrendingMap(): Promise<Map<string, TrendingEntry>> {
  const rows = await db.select().from(sleeperTrending);
  const result = new Map<string, TrendingEntry>();
  for (const row of rows) {
    result.set(row.sleeperId, { direction: row.direction as "add" | "drop", count: row.count });
  }
  return result;
}

export interface PlayerProjectionRow {
  espnPlayerId: number;
  season: number;
  week: number;
  espnRestOfSeason: number | null;
  ourModelRestOfSeason: number | null;
  ourModelWeek: number | null;
  ourModelReasoning: string[];
  sleeperSearchRank: number | null;
  sleeperTrendDirection: "add" | "drop" | null;
  sleeperTrendCount: number | null;
  consensusRestOfSeason: number | null;
  consensusSource: string | null;
  consensusWeek: number | null;
}

export async function savePlayerProjections(rows: PlayerProjectionRow[]) {
  for (const row of rows) {
    await db
      .insert(playerProjections)
      .values({ ...row })
      .onConflictDoUpdate({
        target: [playerProjections.espnPlayerId, playerProjections.season, playerProjections.week],
        set: { ...row },
      });
  }
}

export async function getProjectionBreakdownsForPlayers(
  espnPlayerIds: number[],
  season: number,
  week: number
): Promise<Map<number, ProjectionBreakdown>> {
  const result = new Map<number, ProjectionBreakdown>();
  if (espnPlayerIds.length === 0) return result;

  for (const batch of chunk(espnPlayerIds, 500)) {
    const rows = await db
      .select()
      .from(playerProjections)
      .where(
        and(
          inArray(playerProjections.espnPlayerId, batch),
          eq(playerProjections.season, season),
          eq(playerProjections.week, week)
        )
      );
    for (const row of rows) {
      result.set(row.espnPlayerId, {
        espnRestOfSeason: row.espnRestOfSeason,
        ourModelRestOfSeason: row.ourModelRestOfSeason,
        ourModelWeek: row.ourModelWeek,
        ourModelReasoning: row.ourModelReasoning ?? [],
        sleeperSearchRank: row.sleeperSearchRank,
        sleeperTrend:
          row.sleeperTrendDirection && row.sleeperTrendCount !== null
            ? { direction: row.sleeperTrendDirection as "add" | "drop", count: row.sleeperTrendCount }
            : null,
      });
    }
  }
  return result;
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
