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
}

export interface EspnLeagueResponse {
  id?: number;
  seasonId?: number;
  settings?: EspnLeagueSettings;
  teams?: EspnTeam[];
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
