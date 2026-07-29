import { fetchFreeAgentsRaw, fetchLeagueRaw, fetchProTeamSchedulesRaw, type EspnCredentials } from "@/lib/espn/client";
import {
  MappingWarnings,
  buildFullSeasonSchedule,
  buildOpponentMap,
  mapFreeAgents,
  mapLeagueSummary,
  mapRosterPlayers,
  mapSchedule,
  mapScheduleSettings,
  mapStartingSlotCounts,
} from "@/lib/espn/mappers";
import {
  getTeamsForLeague,
  logSync,
  recordLeagueSyncError,
  updateLeagueMeta,
  upsertFreeAgents,
  upsertLeague,
  upsertMatchups,
  upsertProTeamSchedule,
  upsertRoster,
} from "@/lib/db/queries";
import type { LeagueSummary } from "@/types/domain";

export interface LeagueSyncResult {
  league: LeagueSummary;
  week: number;
  warnings: string[];
}

/**
 * Full live pull from ESPN for one league: settings, teams, every roster,
 * and this week's opponents/projections. Writes everything to Postgres so
 * subsequent page loads read from the cache instead of hitting ESPN again.
 * Never throws for partial/missing fields — those degrade to warnings and
 * null values (see mappers.ts); it only throws if ESPN itself is
 * unreachable or rejects the request outright.
 */
export async function syncLeague(
  espnLeagueId: string,
  season: number,
  creds: EspnCredentials
): Promise<LeagueSyncResult> {
  const warnings = new MappingWarnings();

  let raw;
  try {
    // First call without a fixed week just to discover the current one.
    const probe = await fetchLeagueRaw(espnLeagueId, season, 1, creds);
    const week = probe.status?.currentMatchupPeriod ?? 1;
    raw = week === 1 ? probe : await fetchLeagueRaw(espnLeagueId, season, week, creds);

    const schedule = await fetchProTeamSchedulesRaw(season, creds).catch((err) => {
      warnings.add(`Could not load pro team schedules (opponents will show as unknown): ${(err as Error).message}`);
      return { settings: { proTeams: [] } };
    });
    const opponentMap = buildOpponentMap(schedule, week, warnings);

    const league = mapLeagueSummary(raw, espnLeagueId, season, warnings);
    const leagueRowId = await upsertLeague(league);

    const rosterSlotCounts = mapStartingSlotCounts(raw, warnings);
    const scheduleSettings = mapScheduleSettings(raw, warnings);
    await updateLeagueMeta(leagueRowId, week, rosterSlotCounts, scheduleSettings);

    const fullSchedule = buildFullSeasonSchedule(schedule, warnings);
    if (fullSchedule.length > 0) {
      await upsertProTeamSchedule(season, fullSchedule);
    }

    const leagueMatchups = mapSchedule(raw, warnings);
    if (leagueMatchups.length > 0) {
      const leagueTeams = await getTeamsForLeague(leagueRowId);
      const espnToRowId = new Map(leagueTeams.map((t) => [t.espnTeamId, t.id]));
      const resolvedMatchups = leagueMatchups
        .map((m) => ({
          ...m,
          homeTeamId: espnToRowId.get(m.homeTeamId),
          awayTeamId: espnToRowId.get(m.awayTeamId),
        }))
        .filter(
          (m): m is typeof m & { homeTeamId: number; awayTeamId: number } =>
            m.homeTeamId !== undefined && m.awayTeamId !== undefined
        );
      if (resolvedMatchups.length < leagueMatchups.length) {
        warnings.add(
          `${leagueMatchups.length - resolvedMatchups.length} matchup(s) referenced a team not in this sync's roster pull; skipped.`
        );
      }
      await upsertMatchups(leagueRowId, resolvedMatchups);
    }

    for (const team of raw.teams ?? []) {
      if (team.id === undefined) continue;
      const roster = mapRosterPlayers(team, week, opponentMap, warnings);
      await upsertRoster(leagueRowId, team.id, week, roster);
    }

    try {
      const freeAgentsRaw = await fetchFreeAgentsRaw(espnLeagueId, season, week, creds);
      const freeAgentPool = mapFreeAgents(freeAgentsRaw, week, opponentMap, warnings);
      await upsertFreeAgents(leagueRowId, week, freeAgentPool);
    } catch (err) {
      warnings.add(`Could not load free agents (waiver wire will be unavailable this sync): ${(err as Error).message}`);
    }

    await logSync(
      "espn",
      warnings.messages.length > 0 ? "ok" : "ok",
      warnings.messages.length > 0
        ? `Synced with ${warnings.messages.length} warning(s): ${warnings.messages.join(" | ")}`
        : "Synced cleanly"
    );

    return { league, week, warnings: warnings.messages };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await recordLeagueSyncError(espnLeagueId, season, message);
    await logSync("espn", "error", message);
    throw err;
  }
}
