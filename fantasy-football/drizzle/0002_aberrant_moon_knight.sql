CREATE TABLE IF NOT EXISTS "pro_team_schedule" (
	"id" serial PRIMARY KEY NOT NULL,
	"season" integer NOT NULL,
	"nfl_team" text NOT NULL,
	"week" integer NOT NULL,
	"opponent" text
);
--> statement-breakpoint
ALTER TABLE "leagues" ADD COLUMN "current_week" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "leagues" ADD COLUMN "roster_slot_counts" jsonb;--> statement-breakpoint
ALTER TABLE "roster_slots" ADD COLUMN "rest_of_season_projection" real;--> statement-breakpoint
ALTER TABLE "roster_slots" ADD COLUMN "rest_of_season_source" text;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "pro_team_schedule_season_team_week_idx" ON "pro_team_schedule" USING btree ("season","nfl_team","week");