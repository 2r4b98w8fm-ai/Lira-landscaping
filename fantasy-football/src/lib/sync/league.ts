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
  upsertPlayers,
  upsertProTeamSchedule,
  upsertRoster,
} from "@/lib/db/queries";
import { enrichRosterPlayers } from "@/lib/projections/enrich";
import type { LeagueSummary, RosterPlayer } from "@/types/domain";

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

    const rosterByTeam: Array<{ espnTeamId: number; roster: RosterPlayer[] }> = [];
    for (const team of raw.teams ?? []) {
      if (team.id === undefined) continue;
      rosterByTeam.push({ espnTeamId: team.id, roster: mapRosterPlayers(team, week, opponentMap, warnings) });
    }

    let freeAgentPool: RosterPlayer[] = [];
    let freeAgentFetchOk = false;
    try {
      const freeAgentsRaw = await fetchFreeAgentsRaw(espnLeagueId, season, week, creds);
      freeAgentPool = mapFreeAgents(freeAgentsRaw, week, opponentMap, warnings);
      freeAgentFetchOk = true;
    } catch (err) {
      warnings.add(`Could not load free agents (waiver wire will be unavailable this sync): ${(err as Error).message}`);
    }

    // Run every player synced this cycle through our own model + Sleeper
    // blending in one batch (rather than per-team), so defense rankings and
    // schedule lookups are only fetched once regardless of league size.
    const allPlayers = [...rosterByTeam.flatMap((t) => t.roster), ...freeAgentPool];
    let enrichedAll = allPlayers;
    try {
      // Player identities must exist before enrichment persists
      // player_projections rows (it has a foreign key into players).
      await upsertPlayers(allPlayers);
      enrichedAll = await enrichRosterPlayers(allPlayers, season, week);
    } catch (err) {
      warnings.add(
        `Could not enrich projections with our own model/Sleeper data this sync (using ESPN-only numbers): ${(err as Error).message}`
      );
    }

    let cursor = 0;
    for (const { espnTeamId, roster } of rosterByTeam) {
      const enrichedRoster = enrichedAll.slice(cursor, cursor + roster.length);
      cursor += roster.length;
      await upsertRoster(leagueRowId, espnTeamId, week, enrichedRoster);
    }
    if (freeAgentFetchOk) {
      const enrichedFreeAgents = enrichedAll.slice(cursor, cursor + freeAgentPool.length);
      await upsertFreeAgents(leagueRowId, week, enrichedFreeAgents);
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
