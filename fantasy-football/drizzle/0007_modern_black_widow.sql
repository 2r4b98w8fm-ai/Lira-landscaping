CREATE TABLE IF NOT EXISTS "player_snap_counts" (
	"id" serial PRIMARY KEY NOT NULL,
	"gsis_id" text NOT NULL,
	"season" integer NOT NULL,
	"week" integer NOT NULL,
	"offense_snaps" integer NOT NULL,
	"offense_pct" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_snap_counts" (
	"id" serial PRIMARY KEY NOT NULL,
	"season" integer NOT NULL,
	"week" integer NOT NULL,
	"team" text NOT NULL,
	"total_offense_snaps" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "player_week_stats" ADD COLUMN "carries" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "player_week_stats" ADD COLUMN "targets" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "player_week_stats" ADD COLUMN "receptions" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "player_week_stats" ADD COLUMN "target_share" real;--> statement-breakpoint
ALTER TABLE "player_week_stats" ADD COLUMN "wopr" real;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "player_snap_counts_gsis_season_week_idx" ON "player_snap_counts" USING btree ("gsis_id","season","week");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "team_snap_counts_season_week_team_idx" ON "team_snap_counts" USING btree ("season","week","team");