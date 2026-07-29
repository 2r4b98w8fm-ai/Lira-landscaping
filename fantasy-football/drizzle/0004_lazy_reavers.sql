CREATE TABLE IF NOT EXISTS "free_agents" (
	"id" serial PRIMARY KEY NOT NULL,
	"league_id" integer NOT NULL,
	"espn_player_id" integer NOT NULL,
	"week" integer NOT NULL,
	"opponent" text,
	"week_projection" real,
	"season_points" real,
	"rest_of_season_projection" real,
	"rest_of_season_source" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "power_ranking_snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"league_id" integer NOT NULL,
	"week" integer NOT NULL,
	"team_id" integer NOT NULL,
	"rank" integer NOT NULL,
	"computed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "free_agents" ADD CONSTRAINT "free_agents_league_id_leagues_id_fk" FOREIGN KEY ("league_id") REFERENCES "public"."leagues"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "free_agents" ADD CONSTRAINT "free_agents_espn_player_id_players_espn_player_id_fk" FOREIGN KEY ("espn_player_id") REFERENCES "public"."players"("espn_player_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "power_ranking_snapshots" ADD CONSTRAINT "power_ranking_snapshots_league_id_leagues_id_fk" FOREIGN KEY ("league_id") REFERENCES "public"."leagues"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "free_agents_league_player_idx" ON "free_agents" USING btree ("league_id","espn_player_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "power_ranking_snapshots_league_week_team_idx" ON "power_ranking_snapshots" USING btree ("league_id","week","team_id");