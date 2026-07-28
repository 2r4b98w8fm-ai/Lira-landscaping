ALTER TABLE "roster_slots" ADD COLUMN "week" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "roster_slots" ADD COLUMN "opponent" text;--> statement-breakpoint
ALTER TABLE "roster_slots" ADD COLUMN "week_projection" real;--> statement-breakpoint
ALTER TABLE "roster_slots" ADD COLUMN "season_points" real;