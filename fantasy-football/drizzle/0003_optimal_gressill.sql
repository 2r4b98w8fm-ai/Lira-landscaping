CREATE TABLE IF NOT EXISTS "matchups" (
	"id" serial PRIMARY KEY NOT NULL,
	"league_id" integer NOT NULL,
	"week" integer NOT NULL,
	"home_team_id" integer NOT NULL,
	"away_team_id" integer NOT NULL,
	"home_score" real,
	"away_score" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "position_variance" (
	"id" serial PRIMARY KEY NOT NULL,
	"season" integer NOT NULL,
	"position" text NOT NULL,
	"mean_ppr" real NOT NULL,
	"stdev_ppr" real NOT NULL,
	"sample_size" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leagues" ADD COLUMN "regular_season_weeks" integer DEFAULT 14 NOT NULL;--> statement-breakpoint
ALTER TABLE "leagues" ADD COLUMN "playoff_team_count" integer DEFAULT 4 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matchups" ADD CONSTRAINT "matchups_league_id_leagues_id_fk" FOREIGN KEY ("league_id") REFERENCES "public"."leagues"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "matchups_league_week_home_away_idx" ON "matchups" USING btree ("league_id","week","home_team_id","away_team_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "position_variance_season_position_idx" ON "position_variance" USING btree ("season","position");