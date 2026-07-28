CREATE TABLE IF NOT EXISTS "defense_vs_position" (
	"id" serial PRIMARY KEY NOT NULL,
	"season" integer NOT NULL,
	"through_week" integer NOT NULL,
	"team" text NOT NULL,
	"position" text NOT NULL,
	"avg_points_allowed_ppr" real NOT NULL,
	"rank" integer NOT NULL,
	"weeks_sampled" integer NOT NULL,
	"computed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leagues" (
	"id" serial PRIMARY KEY NOT NULL,
	"espn_league_id" text NOT NULL,
	"season" integer NOT NULL,
	"name" text NOT NULL,
	"last_synced_at" timestamp with time zone,
	"last_sync_error" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player_week_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"season" integer NOT NULL,
	"week" integer NOT NULL,
	"nfl_team" text NOT NULL,
	"opponent" text NOT NULL,
	"position" text NOT NULL,
	"fantasy_points_ppr" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"espn_player_id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"position" text NOT NULL,
	"nfl_team" text NOT NULL,
	"injury_status" text DEFAULT 'UNKNOWN' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roster_slots" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"espn_player_id" integer NOT NULL,
	"lineup_slot" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sync_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"source" text NOT NULL,
	"status" text NOT NULL,
	"message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"league_id" integer NOT NULL,
	"espn_team_id" integer NOT NULL,
	"name" text NOT NULL,
	"abbrev" text NOT NULL,
	"wins" integer DEFAULT 0 NOT NULL,
	"losses" integer DEFAULT 0 NOT NULL,
	"ties" integer DEFAULT 0 NOT NULL,
	"points_for" real DEFAULT 0 NOT NULL,
	"points_against" real DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roster_slots" ADD CONSTRAINT "roster_slots_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roster_slots" ADD CONSTRAINT "roster_slots_espn_player_id_players_espn_player_id_fk" FOREIGN KEY ("espn_player_id") REFERENCES "public"."players"("espn_player_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teams" ADD CONSTRAINT "teams_league_id_leagues_id_fk" FOREIGN KEY ("league_id") REFERENCES "public"."leagues"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "defense_vs_position_season_team_pos_idx" ON "defense_vs_position" USING btree ("season","team","position");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "leagues_espn_id_season_idx" ON "leagues" USING btree ("espn_league_id","season");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "player_week_stats_season_week_team_pos_idx" ON "player_week_stats" USING btree ("season","week","nfl_team","position","opponent");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "roster_slots_team_player_idx" ON "roster_slots" USING btree ("team_id","espn_player_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "teams_league_espn_team_idx" ON "teams" USING btree ("league_id","espn_team_id");