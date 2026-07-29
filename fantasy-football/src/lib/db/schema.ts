import {
  pgTable,
  serial,
  text,
  integer,
  real,
  timestamp,
  uniqueIndex,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const leagues = pgTable(
  "leagues",
  {
    id: serial("id").primaryKey(),
    espnLeagueId: text("espn_league_id").notNull(),
    season: integer("season").notNull(),
    name: text("name").notNull(),
    currentWeek: integer("current_week").notNull().default(1),
    /**
     * Starting lineup slot counts for this league (e.g. {"QB":1,"RB":2,...}),
     * read from ESPN's own settings rather than assumed — used to compute
     * real positional scarcity/replacement level for trade value.
     */
    rosterSlotCounts: jsonb("roster_slot_counts").$type<Record<string, number>>(),
    /** Regular-season length and playoff bracket size, from ESPN's scheduleSettings. Used by the playoff simulator. */
    regularSeasonWeeks: integer("regular_season_weeks").notNull().default(14),
    playoffTeamCount: integer("playoff_team_count").notNull().default(4),
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
    /** Rest-of-season projected points, for trade value. See restOfSeasonSource. */
    restOfSeasonProjection: real("rest_of_season_projection"),
    /** 'espn' = ESPN's own ROS projection field; 'pace_estimate' = season-points-so-far/week * remaining weeks, used only when ESPN doesn't provide one. Never silently treated as equally authoritative in the UI. */
    restOfSeasonSource: text("rest_of_season_source"),
  },
  (t) => ({
    teamPlayerIdx: uniqueIndex("roster_slots_team_player_idx").on(
      t.teamId,
      t.espnPlayerId
    ),
  })
);

/**
 * The free-agent/waiver-wire pool for a league as of the last sync. Keyed
 * by league (not team, since a player is a free agent relative to one
 * league specifically) and refreshed wholesale on each waiver sync — a
 * player who gets picked up simply stops appearing next sync rather than
 * needing an explicit delete.
 */
export const freeAgents = pgTable(
  "free_agents",
  {
    id: serial("id").primaryKey(),
    leagueId: integer("league_id")
      .notNull()
      .references(() => leagues.id, { onDelete: "cascade" }),
    espnPlayerId: integer("espn_player_id")
      .notNull()
      .references(() => players.espnPlayerId),
    week: integer("week").notNull(),
    opponent: text("opponent"),
    weekProjection: real("week_projection"),
    seasonPoints: real("season_points"),
    restOfSeasonProjection: real("rest_of_season_projection"),
    restOfSeasonSource: text("rest_of_season_source"),
  },
  (t) => ({
    leaguePlayerIdx: uniqueIndex("free_agents_league_player_idx").on(t.leagueId, t.espnPlayerId),
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

/**
 * Full-season NFL schedule (every team, every week), pulled once per sync
 * from ESPN's proTeamSchedules_wl view. Used to compute rest-of-season
 * strength of schedule for trade value without re-fetching per request.
 */
export const proTeamSchedule = pgTable(
  "pro_team_schedule",
  {
    id: serial("id").primaryKey(),
    season: integer("season").notNull(),
    nflTeam: text("nfl_team").notNull(),
    week: integer("week").notNull(),
    /** Null on a bye week. */
    opponent: text("opponent"),
  },
  (t) => ({
    seasonTeamWeekIdx: uniqueIndex("pro_team_schedule_season_team_week_idx").on(
      t.season,
      t.nflTeam,
      t.week
    ),
  })
);

/**
 * Fantasy league matchup schedule (who plays whom, every week, past and
 * future), from ESPN's mMatchup view. The playoff simulator uses this to
 * know remaining opponents; already-played weeks (with scores) anchor the
 * simulation's starting standings.
 */
export const matchups = pgTable(
  "matchups",
  {
    id: serial("id").primaryKey(),
    leagueId: integer("league_id")
      .notNull()
      .references(() => leagues.id, { onDelete: "cascade" }),
    week: integer("week").notNull(),
    homeTeamId: integer("home_team_id").notNull(),
    awayTeamId: integer("away_team_id").notNull(),
    /** Null until the matchup is actually played. */
    homeScore: real("home_score"),
    awayScore: real("away_score"),
  },
  (t) => ({
    leagueWeekTeamsIdx: uniqueIndex("matchups_league_week_home_away_idx").on(
      t.leagueId,
      t.week,
      t.homeTeamId,
      t.awayTeamId
    ),
  })
);

/**
 * Real week-to-week scoring variance per position, computed from nflverse's
 * actual historical fantasy points (see nflverse/ingest.ts). Used to model
 * each team's weekly score as a distribution (not a single number) in the
 * playoff simulator, instead of assuming a made-up variance.
 */
export const positionVariance = pgTable(
  "position_variance",
  {
    id: serial("id").primaryKey(),
    season: integer("season").notNull(),
    position: text("position").notNull(),
    meanPpr: real("mean_ppr").notNull(),
    stdevPpr: real("stdev_ppr").notNull(),
    sampleSize: integer("sample_size").notNull(),
  },
  (t) => ({
    seasonPositionIdx: uniqueIndex("position_variance_season_position_idx").on(t.season, t.position),
  })
);

/**
 * One row per team per week a power ranking was computed, purely so the
 * next computation can show a trend arrow against the prior week's rank.
 * Power rankings themselves are computed on demand from cached data (not
 * pulled from ESPN), so this table is the only thing making trend
 * comparison possible across requests.
 */
export const powerRankingSnapshots = pgTable(
  "power_ranking_snapshots",
  {
    id: serial("id").primaryKey(),
    leagueId: integer("league_id")
      .notNull()
      .references(() => leagues.id, { onDelete: "cascade" }),
    week: integer("week").notNull(),
    teamId: integer("team_id").notNull(),
    rank: integer("rank").notNull(),
    computedAt: timestamp("computed_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    leagueWeekTeamIdx: uniqueIndex("power_ranking_snapshots_league_week_team_idx").on(
      t.leagueId,
      t.week,
      t.teamId
    ),
  })
);

/**
 * A durable (DB, not just session-cookie) record of "email this address
 * about this team." Deliberately holds no ESPN credentials — notification
 * sends only ever act on data already cached from a real user-triggered
 * sync (see notifications/send.ts), so a stolen row here can't be used to
 * pull anything from ESPN, unlike the session cookie.
 */
export const notificationSubscriptions = pgTable(
  "notification_subscriptions",
  {
    id: serial("id").primaryKey(),
    teamId: integer("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    injuryAlerts: boolean("injury_alerts").notNull().default(true),
    waiverAlerts: boolean("waiver_alerts").notNull().default(true),
    /** Last injury statuses we emailed about, keyed by espnPlayerId (string) -> InjuryStatus. */
    lastInjurySnapshot: jsonb("last_injury_snapshot").$type<Record<string, string>>(),
    lastDigestSentAt: timestamp("last_digest_sent_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    teamIdx: uniqueIndex("notification_subscriptions_team_idx").on(t.teamId),
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
