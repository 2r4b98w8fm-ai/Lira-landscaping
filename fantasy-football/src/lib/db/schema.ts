import {
  pgTable,
  serial,
  text,
  integer,
  real,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const leagues = pgTable(
  "leagues",
  {
    id: serial("id").primaryKey(),
    espnLeagueId: text("espn_league_id").notNull(),
    season: integer("season").notNull(),
    name: text("name").notNull(),
    lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
    lastSyncError: text("last_sync_error"),
  },
  (t) => ({
    leagueSeasonIdx: uniqueIndex("leagues_espn_id_season_idx").on(
      t.espnLeagueId,
      t.season
    ),
  })
);

export const teams = pgTable(
  "teams",
  {
    id: serial("id").primaryKey(),
    leagueId: integer("league_id")
      .notNull()
      .references(() => leagues.id, { onDelete: "cascade" }),
    espnTeamId: integer("espn_team_id").notNull(),
    name: text("name").notNull(),
    abbrev: text("abbrev").notNull(),
    wins: integer("wins").notNull().default(0),
    losses: integer("losses").notNull().default(0),
    ties: integer("ties").notNull().default(0),
    pointsFor: real("points_for").notNull().default(0),
    pointsAgainst: real("points_against").notNull().default(0),
  },
  (t) => ({
    leagueTeamIdx: uniqueIndex("teams_league_espn_team_idx").on(
      t.leagueId,
      t.espnTeamId
    ),
  })
);

/** Player identity cache, shared across all leagues. Refreshed on each league sync. */
export const players = pgTable("players", {
  espnPlayerId: integer("espn_player_id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  nflTeam: text("nfl_team").notNull(),
  injuryStatus: text("injury_status").notNull().default("UNKNOWN"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/**
 * Snapshot of who is on which roster/slot as of the last league sync,
 * including that sync's week-scoped projection/opponent/season-total —
 * these are cached too (rather than re-fetched from ESPN on every page
 * load) and simply go stale until the next sync overwrites them.
 */
export const rosterSlots = pgTable(
  "roster_slots",
  {
    id: serial("id").primaryKey(),
    teamId: integer("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    espnPlayerId: integer("espn_player_id")
      .notNull()
      .references(() => players.espnPlayerId),
    lineupSlot: text("lineup_slot").notNull(),
    week: integer("week").notNull(),
    opponent: text("opponent"),
    weekProjection: real("week_projection"),
    seasonPoints: real("season_points"),
  },
  (t) => ({
    teamPlayerIdx: uniqueIndex("roster_slots_team_player_idx").on(
      t.teamId,
      t.espnPlayerId
    ),
  })
);

/**
 * Real weekly stats pulled from nflverse (nflverse-data GitHub releases).
 * Used to compute defense-vs-position rankings from actual points allowed.
 */
export const playerWeekStats = pgTable(
  "player_week_stats",
  {
    id: serial("id").primaryKey(),
    season: integer("season").notNull(),
    week: integer("week").notNull(),
    nflTeam: text("nfl_team").notNull(),
    opponent: text("opponent").notNull(),
    position: text("position").notNull(),
    fantasyPointsPpr: real("fantasy_points_ppr").notNull(),
  },
  (t) => ({
    seasonWeekTeamIdx: uniqueIndex(
      "player_week_stats_season_week_team_pos_idx"
    ).on(t.season, t.week, t.nflTeam, t.position, t.opponent),
  })
);

/** Aggregated, ranked output: how many PPR points each defense allows per position. */
export const defenseVsPosition = pgTable(
  "defense_vs_position",
  {
    id: serial("id").primaryKey(),
    season: integer("season").notNull(),
    throughWeek: integer("through_week").notNull(),
    team: text("team").notNull(),
    position: text("position").notNull(),
    avgPointsAllowedPpr: real("avg_points_allowed_ppr").notNull(),
    rank: integer("rank").notNull(),
    weeksSampled: integer("weeks_sampled").notNull(),
    computedAt: timestamp("computed_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    seasonTeamPosIdx: uniqueIndex("defense_vs_position_season_team_pos_idx").on(
      t.season,
      t.team,
      t.position
    ),
  })
);

export const syncLog = pgTable("sync_log", {
  id: serial("id").primaryKey(),
  source: text("source").notNull(),
  status: text("status").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
