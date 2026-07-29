import {
  ESPN_LINEUP_SLOT_MAP,
  ESPN_POSITION_MAP,
  ESPN_PRO_TEAM_MAP,
  STARTING_SLOT_ID_MAP,
  type Position,
} from "@/lib/constants";
import type { InjuryStatus, LeagueSummary, RosterPlayer, TeamSummary } from "@/types/domain";
import type {
  EspnFanResponse,
  EspnFreeAgentsResponse,
  EspnLeagueResponse,
  EspnPlayer,
  EspnProTeamSchedulesResponse,
  EspnRosterEntry,
  EspnStatEntry,
  EspnTeam,
} from "./types";

/**
 * NFL regular season length used only for the season-pace ROS fallback
 * (see mapRosterEntry) when ESPN doesn't supply its own rest-of-season
 * projection. Approximate — doesn't account for each team's individual bye.
 */
const SEASON_WEEKS = 18;

/** Collects non-fatal problems encountered while mapping a sync, for sync_log. */
export class MappingWarnings {
  readonly messages: string[] = [];
  add(msg: string) {
    this.messages.push(msg);
  }
}

function mapInjuryStatus(raw: string | undefined): InjuryStatus {
  switch (raw) {
    case "ACTIVE":
      return "ACTIVE";
    case "QUESTIONABLE":
      return "QUESTIONABLE";
    case "DOUBTFUL":
      return "DOUBTFUL";
    case "OUT":
      return "OUT";
    case "INJURY_RESERVE":
      return "IR";
    case "SUSPENSION":
      return "SUSPENSION";
    default:
      return "UNKNOWN";
  }
}

function mapPosition(defaultPositionId: number | undefined): Position | null {
  if (defaultPositionId === undefined) return null;
  return ESPN_POSITION_MAP[defaultPositionId] ?? null;
}

function mapProTeam(proTeamId: number | undefined): string {
  if (proTeamId === undefined) return "FA";
  return ESPN_PRO_TEAM_MAP[proTeamId] ?? "FA";
}

function extractStat(
  stats: EspnStatEntry[] | undefined,
  match: { scoringPeriodId?: number; statSourceId: number; statSplitTypeId?: number }
): number | null {
  if (!stats) return null;
  const entry = stats.find(
    (s) =>
      s.statSourceId === match.statSourceId &&
      (match.scoringPeriodId === undefined || s.scoringPeriodId === match.scoringPeriodId) &&
      (match.statSplitTypeId === undefined || s.statSplitTypeId === match.statSplitTypeId)
  );
  return typeof entry?.appliedTotal === "number" ? entry.appliedTotal : null;
}

/**
 * Builds proTeamId -> opponent proTeamId for a given week from the
 * proTeamSchedules_wl response. Returns an empty map (never throws) if the
 * shape doesn't match what we expect, so opponent just shows as "unknown"
 * upstream instead of failing the whole sync.
 */
export function buildOpponentMap(
  raw: EspnProTeamSchedulesResponse,
  week: number,
  warnings: MappingWarnings
): Map<number, number> {
  const map = new Map<number, number>();
  const proTeams = raw.settings?.proTeams;
  if (!proTeams) {
    warnings.add("proTeamSchedules response missing settings.proTeams; opponents unavailable this sync.");
    return map;
  }
  for (const team of proTeams) {
    if (team.id === undefined) continue;
    const games = team.proGamesByScoringPeriod?.[String(week)];
    const game = games?.[0];
    if (!game) continue;
    const opponentId =
      game.homeProTeamId === team.id ? game.awayProTeamId : game.homeProTeamId;
    if (opponentId !== undefined) map.set(team.id, opponentId);
  }
  return map;
}

/**
 * Full-season schedule for every NFL team, for rest-of-season strength of
 * schedule. Unlike buildOpponentMap (one week), this walks every week
 * present in the response so trade value can look ahead.
 */
export function buildFullSeasonSchedule(
  raw: EspnProTeamSchedulesResponse,
  warnings: MappingWarnings
): Array<{ nflTeam: string; week: number; opponent: string | null }> {
  const rows: Array<{ nflTeam: string; week: number; opponent: string | null }> = [];
  const proTeams = raw.settings?.proTeams;
  if (!proTeams) {
    warnings.add("proTeamSchedules response missing settings.proTeams; full schedule unavailable.");
    return rows;
  }
  for (const team of proTeams) {
    if (team.id === undefined) continue;
    const nflTeam = mapProTeam(team.id);
    const byWeek = team.proGamesByScoringPeriod ?? {};
    for (const weekKey of Object.keys(byWeek)) {
      const week = Number(weekKey);
      if (!Number.isFinite(week)) continue;
      const game = byWeek[weekKey]?.[0];
      const opponentId = game
        ? game.homeProTeamId === team.id
          ? game.awayProTeamId
          : game.homeProTeamId
        : undefined;
      rows.push({ nflTeam, week, opponent: opponentId !== undefined ? mapProTeam(opponentId) : null });
    }
  }
  return rows;
}

/**
 * Reads real starting-lineup requirements (QB/RB/WR/TE/FLEX/K/DST counts)
 * out of the league's own settings, for scarcity/replacement-level math.
 * Falls back to a standard single-league default (with a warning) if ESPN
 * didn't return rosterSettings at all — never silently assumes.
 */
export function mapStartingSlotCounts(
  raw: EspnLeagueResponse,
  warnings: MappingWarnings
): Record<string, number> {
  const counts = raw.settings?.rosterSettings?.lineupSlotCounts;
  if (!counts) {
    warnings.add(
      "League settings didn't include rosterSettings.lineupSlotCounts; falling back to a standard 1QB/2RB/2WR/1TE/1FLEX/1K/1DST assumption."
    );
    return { QB: 1, RB: 2, WR: 2, TE: 1, FLEX: 1, K: 1, DST: 1 };
  }

  const result: Record<string, number> = {};
  for (const [slotId, count] of Object.entries(counts)) {
    const key = STARTING_SLOT_ID_MAP[Number(slotId)];
    if (!key || !count) continue;
    result[key] = (result[key] ?? 0) + count;
  }
  return result;
}

/** Regular-season length and playoff bracket size, for the season simulator. Falls back (with a warning) to a standard 14-week/4-team assumption if ESPN omits scheduleSettings. */
export function mapScheduleSettings(
  raw: EspnLeagueResponse,
  warnings: MappingWarnings
): { regularSeasonWeeks: number; playoffTeamCount: number } {
  const settings = raw.settings?.scheduleSettings;
  if (!settings?.matchupPeriodCount || !settings?.playoffTeamCount) {
    warnings.add(
      "League settings didn't include scheduleSettings; falling back to a standard 14-week season / 4-team playoff assumption."
    );
    return { regularSeasonWeeks: 14, playoffTeamCount: 4 };
  }
  return {
    regularSeasonWeeks: settings.matchupPeriodCount,
    playoffTeamCount: settings.playoffTeamCount,
  };
}

export interface MappedMatchup {
  week: number;
  homeTeamId: number;
  awayTeamId: number;
  /** Null until the matchup is actually played. */
  homeScore: number | null;
  awayScore: number | null;
}

/**
 * Every matchup ESPN has scheduled for the season (past and future). Used
 * by the playoff simulator to know which teams play each other in each
 * remaining week — without it, the simulator can't model anything beyond
 * "everyone plays everyone," so a missing/malformed schedule is treated as
 * "no schedule data" upstream rather than guessed at.
 */
export function mapSchedule(raw: EspnLeagueResponse, warnings: MappingWarnings): MappedMatchup[] {
  const matchups = raw.schedule;
  if (!matchups) {
    warnings.add("ESPN response had no `schedule` array; playoff simulation will be unavailable this sync.");
    return [];
  }

  const mapped: MappedMatchup[] = [];
  for (const m of matchups) {
    if (
      m.matchupPeriodId === undefined ||
      m.home?.teamId === undefined ||
      m.away?.teamId === undefined
    ) {
      continue; // e.g. a playoff-bye placeholder with no away team
    }
    mapped.push({
      week: m.matchupPeriodId,
      homeTeamId: m.home.teamId,
      awayTeamId: m.away.teamId,
      homeScore: typeof m.home.totalPoints === "number" && m.home.totalPoints > 0 ? m.home.totalPoints : null,
      awayScore: typeof m.away.totalPoints === "number" && m.away.totalPoints > 0 ? m.away.totalPoints : null,
    });
  }
  return mapped;
}

export function mapLeagueSummary(
  raw: EspnLeagueResponse,
  espnLeagueId: string,
  season: number,
  warnings: MappingWarnings
): LeagueSummary {
  const name = raw.settings?.name ?? `League ${espnLeagueId}`;
  const teams = (raw.teams ?? []).map((t) => mapTeamSummary(t, warnings));
  return { espnLeagueId, season, name, teams };
}

function mapTeamSummary(raw: EspnTeam, warnings: MappingWarnings): TeamSummary {
  try {
    const record = raw.record?.overall;
    const name =
      raw.name ?? [raw.location, raw.nickname].filter(Boolean).join(" ").trim() ?? "Unnamed Team";
    return {
      espnTeamId: raw.id ?? -1,
      name: name || `Team ${raw.id ?? "?"}`,
      abbrev: raw.abbrev ?? "???",
      wins: record?.wins ?? 0,
      losses: record?.losses ?? 0,
      ties: record?.ties ?? 0,
      pointsFor: record?.pointsFor ?? 0,
      pointsAgainst: record?.pointsAgainst ?? 0,
    };
  } catch (err) {
    warnings.add(`Failed to map team ${raw.id ?? "?"}: ${(err as Error).message}`);
    return {
      espnTeamId: raw.id ?? -1,
      name: `Team ${raw.id ?? "?"}`,
      abbrev: "???",
      wins: 0,
      losses: 0,
      ties: 0,
      pointsFor: 0,
      pointsAgainst: 0,
    };
  }
}

export function mapRosterPlayers(
  team: EspnTeam,
  week: number,
  opponentMap: Map<number, number>,
  warnings: MappingWarnings
): RosterPlayer[] {
  const entries = team.roster?.entries ?? [];
  const players: RosterPlayer[] = [];

  for (const entry of entries) {
    try {
      const mapped = mapRosterEntry(entry, week, opponentMap);
      if (mapped) players.push(mapped);
    } catch (err) {
      warnings.add(
        `Skipped one roster entry on team ${team.id ?? "?"} (player ${entry.playerId ?? "?"}): ${
          (err as Error).message
        }`
      );
    }
  }
  return players;
}

/** Every field a RosterPlayer needs except lineupSlot, which depends on where the caller found the player (a roster slot vs. the free-agent pool). */
function mapCorePlayerFields(
  player: EspnPlayer | undefined,
  week: number,
  opponentMap: Map<number, number>
): Omit<RosterPlayer, "lineupSlot"> | null {
  if (!player || player.id === undefined || !player.fullName) return null;

  const position = mapPosition(player.defaultPositionId);
  if (!position) return null;

  const opponentProTeamId = opponentMap.get(player.proTeamId ?? -1);
  const opponent = opponentProTeamId !== undefined ? mapProTeam(opponentProTeamId) : null;

  const weekProjection = extractStat(player.stats, {
    scoringPeriodId: week,
    statSourceId: 1,
    statSplitTypeId: 1,
  });
  const seasonPoints = extractStat(player.stats, {
    statSourceId: 0,
    statSplitTypeId: 0,
  });

  // Prefer ESPN's own rest-of-season/full-season projection (statSourceId 1,
  // season split). ESPN doesn't document whether that total is "full season"
  // or "remaining", so we treat it as full-season and net out points already
  // scored — if that goes negative (a bad ESPN season total, or the player
  // has badly outperformed it) we fall back to the pace estimate instead of
  // showing a negative or clearly-wrong ROS number.
  const espnSeasonProjection = extractStat(player.stats, {
    statSourceId: 1,
    statSplitTypeId: 0,
  });
  let restOfSeasonProjection: number | null = null;
  let restOfSeasonSource: "espn" | "pace_estimate" | null = null;
  if (espnSeasonProjection !== null && seasonPoints !== null && espnSeasonProjection - seasonPoints > 0) {
    restOfSeasonProjection = espnSeasonProjection - seasonPoints;
    restOfSeasonSource = "espn";
  } else if (seasonPoints !== null && week > 1) {
    const remainingWeeks = Math.max(SEASON_WEEKS - week, 0);
    restOfSeasonProjection = (seasonPoints / (week - 1)) * remainingWeeks;
    restOfSeasonSource = "pace_estimate";
  }

  return {
    espnPlayerId: player.id,
    name: player.fullName,
    position,
    nflTeam: mapProTeam(player.proTeamId),
    injuryStatus: mapInjuryStatus(player.injuryStatus),
    opponent,
    seasonPoints,
    weekProjection,
    restOfSeasonProjection,
    restOfSeasonSource,
  };
}

function mapRosterEntry(
  entry: EspnRosterEntry,
  week: number,
  opponentMap: Map<number, number>
): RosterPlayer | null {
  const core = mapCorePlayerFields(entry.playerPoolEntry?.player, week, opponentMap);
  if (!core) return null;
  return { ...core, lineupSlot: ESPN_LINEUP_SLOT_MAP[entry.lineupSlotId ?? -1] ?? "BE" };
}

/**
 * Free agents/waiver-wire players. ESPN returns these from a different,
 * undocumented endpoint shape (a top-level `players` array, no roster/slot
 * wrapper) — reuses the same defensive per-player mapping as rosters, just
 * without a lineup slot (tagged "FA").
 */
export function mapFreeAgents(
  raw: EspnFreeAgentsResponse,
  week: number,
  opponentMap: Map<number, number>,
  warnings: MappingWarnings
): RosterPlayer[] {
  const entries = raw.players ?? [];
  if (entries.length === 0) {
    warnings.add("ESPN free-agent response had no `players` array; waiver wire will be empty this sync.");
  }

  const players: RosterPlayer[] = [];
  for (const entry of entries) {
    try {
      const core = mapCorePlayerFields(entry.player, week, opponentMap);
      if (core) players.push({ ...core, lineupSlot: "FA" });
    } catch (err) {
      warnings.add(`Skipped one free agent entry: ${(err as Error).message}`);
    }
  }
  return players;
}

export interface DiscoveredLeague {
  espnLeagueId: string;
  season: number;
}

/**
 * Every football league an ESPN account belongs to, from the fan API
 * (see client.ts for why this is the shakiest endpoint in the app).
 * Degrades to an empty list — never throws — so the caller can always
 * fall back to manual league-ID entry when ESPN's shape doesn't match
 * what we expect, or the account simply isn't in any FFL league.
 */
export function mapFanLeagues(raw: EspnFanResponse, warnings: MappingWarnings): DiscoveredLeague[] {
  const preferences = raw.preferences;
  if (!preferences) {
    warnings.add("ESPN's fan API response had no `preferences` array; league auto-discovery unavailable.");
    return [];
  }

  const seen = new Set<string>();
  const leagues: DiscoveredLeague[] = [];
  for (const pref of preferences) {
    const entry = pref.metadata?.entry;
    if (!entry || entry.gameId !== "ffl" || !entry.groupId || entry.seasonId === undefined) continue;
    const key = `${entry.groupId}-${entry.seasonId}`;
    if (seen.has(key)) continue;
    seen.add(key);
    leagues.push({ espnLeagueId: entry.groupId, season: entry.seasonId });
  }
  return leagues;
}
