# Gridiron Desk

Data-driven decision support for your ESPN Fantasy Football league: start/sit calls with
visible reasoning, backed by real ESPN roster/projection data and real historical NFL stats
(no fabricated numbers).

**Phase 1 (this build):** connect an ESPN league, browse your roster, get a start/sit board
per position. Phases 2–4 (trade analyzer, playoff simulator, waiver/power-rankings layer) are
not built yet.

## Tech stack

- **Frontend:** Next.js 15 (App Router) + React 19 + Tailwind CSS
- **Backend:** Next.js Route Handlers, TypeScript (no separate service — the simulation math
  planned for Phase 3 is straightforward enough in TS/Node that a second Python service isn't
  worth the operational overhead; revisit if Monte Carlo perf becomes a problem)
- **Database:** Postgres via Drizzle ORM (works with Neon, Supabase, or plain Postgres)
- **Deploy target:** Vercel + Neon/Supabase Postgres

## Data sources — what's real, what needs you

| Data | Source | Status |
|---|---|---|
| League/teams/rosters | ESPN's undocumented Fantasy API (`fantasy.espn.com/apis/v3/...`) | **Real**, live-pulled on connect/refresh |
| Weekly player projections | ESPN's own projected-stats field (`statSourceId: 1`) on the roster response | **Real**, but ESPN doesn't always populate it for every player — those show "not connected", never a made-up number |
| Season-to-date points | Same ESPN roster response (`statSourceId: 0`) | **Real** |
| Defense-vs-position (matchup difficulty) | [nflverse-data](https://github.com/nflverse/nflverse-data) weekly player stats, aggregated by opponent+position | **Real**, computed from actual box scores, free and no API key needed |
| Opponent this week | ESPN pro team schedule endpoint | **Real** |

Nothing here is mocked or hardcoded. Where ESPN doesn't return a value (a rookie the API hasn't
projected yet, a bye week, etc.), the UI says so explicitly instead of showing a plausible-looking
fake number.

### A note on ESPN's API

It's undocumented and has changed shape before (team ID renumbering, field renames). The client
(`src/lib/espn/`) is written defensively: every field access has a fallback, one bad player entry
is skipped with a warning instead of crashing the whole sync, and warnings are surfaced in the UI
and logged to the `sync_log` table rather than silently swallowed. If ESPN changes something and
a sync starts failing, check `src/lib/espn/mappers.ts` and `src/lib/espn/types.ts` first — that's
where the undocumented shape assumptions live.

## Private leagues (espn_s2 / SWID)

Most leagues are private. ESPN requires two cookie values instead of an API key:

1. Log into fantasy.espn.com and open your league.
2. Open dev tools → Application (Chrome) / Storage (Firefox) → Cookies → `fantasy.espn.com`.
3. Copy `espn_s2` and `SWID` (SWID includes the curly braces).

The connect form has this explainer built in. These values are encrypted into an httpOnly
session cookie server-side and are **never written to the database** — only your league/team
IDs and cached stats are persisted.

## Local setup

```bash
cp .env.example .env.local
# fill in DATABASE_URL (a local Postgres is fine) and SESSION_SECRET (openssl rand -hex 32)

npm install
npm run db:generate   # generate SQL migration from schema.ts (already checked in under drizzle/)
npm run db:migrate    # apply it
npm run db:sync-defense [season]   # pull real nflverse stats, compute defense-vs-position

npm run dev
```

Then open http://localhost:3000, connect a league, pick your team, and check the Roster and
Start/Sit pages.

## What I'd need from you to fully verify this

- **A real ESPN league ID** (and `espn_s2`/`SWID` if private) to confirm the live pull against
  ESPN's actual current-season response shape.
- **A hosted Postgres connection string** (Neon/Supabase) for a real deploy — local dev uses
  whatever `DATABASE_URL` you point at.
- Note: this sandbox's outbound network policy blocks `fantasy.espn.com` directly, so the ESPN
  client is verified against realistic fixture data (`tests/espn-mappers.test.ts`) rather than a
  live call from inside this environment. It will reach ESPN normally once deployed or run
  locally on a machine without that restriction — I'd want to confirm one live sync against a
  real league before calling this fully proven end-to-end.
- nflverse data and the Postgres/Drizzle layer **were** verified live in this environment
  (real 2024 season stats downloaded, parsed, and written to a local Postgres instance).

## What's next (Phase 2)

Trade value calculator, "who should I target," and "what should I offer" — not started. Let me
know when you want to move on and I'll pick up from there.

## Project layout

```
src/
  app/                    pages (connect, dashboard, start-sit) + API route handlers
  components/             UI components
  lib/
    espn/                 ESPN API client + defensive mappers
    nflverse/              real weekly stats ingestion + defense-vs-position math
    startsit/              ranking engine with human-readable reasoning
    db/                    Drizzle schema, client, queries
    sync/                  orchestrates an ESPN pull -> DB cache write
    session.ts             encrypted session cookie (league/team selection + ESPN creds)
scripts/
  migrate.ts               applies Drizzle migrations
  sync-defense-rankings.ts  one-off/cron entry point for the nflverse ingest
tests/                     fixture-based unit tests for mappers, ingest math, ranking engine
```
