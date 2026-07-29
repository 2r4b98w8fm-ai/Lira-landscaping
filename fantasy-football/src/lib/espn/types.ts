/**
 * ESPN's Fantasy API is undocumented and its response shape has drifted over
 * seasons. These types cover only the fields we actually read, and every
 * field is optional so a missing/renamed field degrades a single value to
 * `null` instead of throwing and killing the whole sync (see mappers.ts).
 */

export interface EspnStatEntry {
  scoringPeriodId?: number;
  seasonId?: number;
  statSourceId?: number; // 0 = actual, 1 = projected
  statSplitTypeId?: number; // 0 = season total, 1 = single week
  appliedTotal?: number;
}

export interface EspnPlayer {
  id?: number;
  fullName?: string;
  defaultPositionId?: number;
  proTeamId?: number;
  injuryStatus?: string;
  stats?: EspnStatEntry[];
}

export interface EspnPlayerPoolEntry {
  player?: EspnPlayer;
}

export interface EspnRosterEntry {
  playerId?: number;
  lineupSlotId?: number;
  playerPoolEntry?: EspnPlayerPoolEntry;
}

export interface EspnRoster {
  entries?: EspnRosterEntry[];
}

export interface EspnRecord {
  overall?: {
    wins?: number;
    losses?: number;
    ties?: number;
    pointsFor?: number;
    pointsAgainst?: number;
  };
}

export interface EspnTeam {
  id?: number;
  name?: string;
  abbrev?: string;
  location?: string;
  nickname?: string;
  record?: EspnRecord;
  roster?: EspnRoster;
}

export interface EspnLeagueSettings {
  name?: string;
  /** Starting lineup slot requirements, keyed by lineupSlotId (as a string). */
  rosterSettings?: {
    lineupSlotCounts?: Record<string, number>;
  };
  /** Regular-season length and playoff bracket size, for the season simulator. */
  scheduleSettings?: {
    matchupPeriodCount?: number;
    playoffTeamCount?: number;
  };
}

export interface EspnMatchupSide {
  teamId?: number;
  totalPoints?: number;
}

export interface EspnMatchup {
  matchupPeriodId?: number;
  home?: EspnMatchupSide;
  away?: EspnMatchupSide;
  winner?: string; // "HOME" | "AWAY" | "UNDECIDED" | "TIE"
}

export interface EspnLeagueResponse {
  id?: number;
  seasonId?: number;
  settings?: EspnLeagueSettings;
  teams?: EspnTeam[];
  /** Every matchup for the season, past and future — from view=mMatchup. */
  schedule?: EspnMatchup[];
  status?: {
    currentMatchupPeriod?: number;
  };
}

export interface EspnProTeamScheduleEntry {
  id?: number;
  proGamesByScoringPeriod?: Record<
    string,
    Array<{
      id?: number;
      homeProTeamId?: number;
      awayProTeamId?: number;
    }>
  >;
}

export interface EspnProTeamSchedulesResponse {
  settings?: {
    proTeams?: EspnProTeamScheduleEntry[];
  };
}

/**
 * Free-agent/waiver-wire pool. From a different endpoint than the league
 * roster pull (a `players` filter on the league resource, view=kona_player_info
 * with an X-Fantasy-Filter header) — top-level `players` array, no team/roster
 * wrapper, unlike EspnRosterEntry.
 */
export interface EspnFreeAgentEntry {
  player?: EspnPlayer;
}

export interface EspnFreeAgentsResponse {
  players?: EspnFreeAgentEntry[];
}

/**
 * The "which leagues does this ESPN account belong to" endpoint that
 * powers ESPN's own My Leagues page — a different host (fan.api.espn.com)
 * and the least documented, least stable shape in this whole app. Used
 * only to let a user discover their leagues after pasting espn_s2/SWID
 * once, instead of needing to already know a league ID. If this shape
 * drifts, discovery degrades to an empty list (see mapFanLeagues) and the
 * UI falls back to manual league-ID entry — it's never the only path in.
 */
export interface EspnFanLeagueEntry {
  groupId?: string;
  seasonId?: number;
  gameId?: string;
}

export interface EspnFanPreference {
  metadata?: {
    entry?: EspnFanLeagueEntry;
  };
}

export interface EspnFanResponse {
  preferences?: EspnFanPreference[];
}
