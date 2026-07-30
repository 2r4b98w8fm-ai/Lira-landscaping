CREATE TABLE IF NOT EXISTS "player_crosswalk" (
	"espn_player_id" integer PRIMARY KEY NOT NULL,
	"sleeper_id" text,
	"gsis_id" text,
	"sleeper_search_rank" integer,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player_projections" (
	"id" serial PRIMARY KEY NOT NULL,
	"espn_player_id" integer NOT NULL,
	"season" integer NOT NULL,
	"week" integer NOT NULL,
	"espn_rest_of_season" real,
	"our_model_rest_of_season" real,
	"our_model_week" real,
	"our_model_reasoning" jsonb,
	"sleeper_search_rank" integer,
	"sleeper_trend_direction" text,
	"sleeper_trend_count" integer,
	"consensus_rest_of_season" real,
	"consensus_source" text,
	"consensus_week" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sleeper_trending" (
	"id" serial PRIMARY KEY NOT NULL,
	"sleeper_id" text NOT NULL,
	"direction" text NOT NULL,
	"count" integer NOT NULL,
	"captured_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "player_week_stats_season_week_team_pos_idx";--> statement-breakpoint
ALTER TABLE "player_week_stats" ADD COLUMN "gsis_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "player_week_stats" ADD COLUMN "player_name" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "player_projections" ADD CONSTRAINT "player_projections_espn_player_id_players_espn_player_id_fk" FOREIGN KEY ("espn_player_id") REFERENCES "public"."players"("espn_player_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "player_projections_player_season_week_idx" ON "player_projections" USING btree ("espn_player_id","season","week");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sleeper_trending_sleeper_id_direction_idx" ON "sleeper_trending" USING btree ("sleeper_id","direction");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "player_week_stats_gsis_season_week_idx" ON "player_week_stats" USING btree ("gsis_id","season","week");