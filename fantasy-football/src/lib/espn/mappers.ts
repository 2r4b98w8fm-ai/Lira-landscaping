import {
  ESPN_LINEUP_SLOT_MAP,
  ESPN_POSITION_MAP,
  ESPN_PRO_TEAM_MAP,
  type Position,
} from "@/lib/constants";
import type { InjuryStatus, LeagueSummary, RosterPlayer, TeamSummary } from "@/types/domain";
import type {
  EspnLeagueResponse,
  EspnPlayer,
  EspnProTeamSchedulesResponse,
  EspnRosterEntry,
  EspnStatEntry,
  EspnTeam,
} from "./types";

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

function mapRosterEntry(
  entry: EspnRosterEntry,
  week: number,
  opponentMap: Map<number, number>
): RosterPlayer | null {
  const player: EspnPlayer | undefined = entry.playerPoolEntry?.player;
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

  return {
    espnPlayerId: player.id,
    name: player.fullName,
    position,
    nflTeam: mapProTeam(player.proTeamId),
    lineupSlot: ESPN_LINEUP_SLOT_MAP[entry.lineupSlotId ?? -1] ?? "BE",
    injuryStatus: mapInjuryStatus(player.injuryStatus),
    opponent,
    seasonPoints,
    weekProjection,
  };
}
