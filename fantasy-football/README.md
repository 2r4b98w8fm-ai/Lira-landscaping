# Gridiron Desk

Data-driven decision support for your ESPN Fantasy Football league: start/sit calls with
visible reasoning, backed by real ESPN roster/projection data and real historical NFL stats
(no fabricated numbers).

**Phase 1:** connect an ESPN league, browse your roster, get a start/sit board per position.
**Phase 2:** trade value calculator, "who should I target," and "what should I offer" — all with
the math shown, not a black-box score. **Phase 3 (this build):** Monte Carlo playoff probability
simulator. Phase 4 (waiver wire, power rankings, weekly recap dashboard) is not built yet.

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
| Rest-of-season projection | ESPN's season-total projected stat, net of points already scored | **Real** when ESPN provides it; **estimated** from season-to-date scoring pace when it doesn't (always labeled which, in both the API response and the UI's "show math") |
| Starting lineup requirements (for scarcity math) | ESPN league settings (`rosterSettings.lineupSlotCounts`) | **Real**, falls back to a standard assumption (with a logged warning) only if ESPN omits it |
| Positional scarcity / replacement level | Computed from every rostered player's real rest-of-season projection in your league | **Real**, no external "average draft position" or similar service used |
| Fantasy league schedule (who plays whom, every week) | ESPN's `mMatchup` view | **Real**; if ESPN doesn't return it, the playoff simulator says so instead of running on an assumed schedule |
| Regular-season length / playoff bracket size | ESPN league settings (`scheduleSettings`) | **Real**, falls back to a standard assumption (with a logged warning) only if ESPN omits it |
| Weekly scoring variance per position (for the playoff simulator) | Computed from every individual player-week in nflverse's real historical data | **Real** for QB/RB/WR/TE; K/DST use a documented fixed assumption (labeled as such) since nflverse's player-level file has no kicker/defense rows |

Nothing here is mocked or hardcoded. Where ESPN doesn't return a value (a rookie the API hasn't
projected yet, a bye week, etc.), the UI says so explicitly instead of showing a plausible-looking
fake number.

## Trade value methodology (Phase 2)

Every player's trade value is built from four visible steps — the API returns each one and the
UI's "show math" toggle prints them per player:

1. **Rest-of-season projection.** ESPN's own number when available, otherwise (season points so
   far ÷ weeks played) × weeks remaining — always labeled which one you're looking at.
2. **Value over replacement (VORP).** Projection minus the "replacement level" for that
   position — the rest-of-season projection of the last player who'd actually be startable
   league-wide, given your league's real starting slot counts (including a proportional split of
   FLEX across RB/WR/TE). This is what makes a scarce position worth more than a deep one for the
   same raw points.
3. **Injury discount.** A fixed multiplier by ESPN's reported status (ACTIVE 1.0×, QUESTIONABLE
   0.9×, DOUBTFUL 0.75×, OUT 0.4×, IR 0.15×, SUSPENSION 0.5×).
4. **Rest-of-season schedule.** The average defense-vs-position rank of a player's remaining
   opponents nudges value ±10% at most — real nflverse-derived data, or no adjustment at all
   (never a guess) if there's no matchup data yet.

**Team needs** (surplus/weakness per position) compare a team's total value at a position against
the league-average value per starting slot there — so an empty position reads as a real, sharply
negative need rather than a false "neutral."

**"Who should I target"** ranks other teams by how well their weak spots match your surplus (and
vice versa), weighting a mutual fit above a one-sided favor.

**"What should I offer"** builds a give/receive package from your surplus at a target's weak
position, matched against their surplus at one of your weak positions, picking whichever
combination lands closest to even value (returns nothing rather than inventing a trade when there
isn't real surplus on both sides).

## Playoff simulator methodology (Phase 3)

The `/playoffs` page runs 5,000 Monte Carlo simulations of the rest of the regular season:

1. **Each team's weekly score is a distribution, not a number.** Mean = sum of each likely starter's
   weekly-average rest-of-season projection (best player at each position, including FLEX — the
   simulator assumes a team starts its best roster every week, since it can't know future in-season
   lineup decisions). Stdev = combined real historical week-to-week variance per position from
   nflverse (K/DST use a documented fixed assumption, not measured data — see the table above).
2. **Every remaining matchup** (from ESPN's actual schedule) samples both teams' scores from that
   distribution, decides a winner, and updates simulated wins and points.
3. **After all remaining weeks, teams are ranked** by wins, then points-for as the tiebreaker
   (a reasonable default — ESPN's actual tiebreaker rules aren't exposed by the API), and the top
   N make the playoffs (N = your league's real playoff bracket size).
4. Repeat 5,000 times and tally: **playoff odds**, a **seed distribution**, a **10th–90th percentile
   projected win-total range**, and **remaining strength of schedule** (average projected score of
   a team's remaining opponents).

The UI states plainly that this is a probabilistic model, not a guarantee. If ESPN's schedule data
isn't available for a league, the page says so rather than simulating on a guessed schedule.

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
- Phase 2's trade math (value, scarcity, needs, target-finding, offer-building) was verified
  end-to-end against a seeded 4-team league with realistic values in this environment — screenshot-
  tested through all three Trade tabs, including a 0%-gap offer the algorithm found on its own.
  It still depends on the same ESPN roster sync as Phase 1, so it inherits that same "needs one
  live league to fully confirm" caveat.
- Phase 3's simulator was verified end-to-end against a seeded 4-team league with a real schedule
  and 5 remaining weeks: the strongest team locked a #1 seed, an evenly-matched pair split with
  daylight between them, and the two weak teams were correctly all but eliminated — sensible
  results, not just "it renders." The first version of my seed data had a bug (used ESPN team IDs
  where internal database IDs were needed) that made every team's projected wins stay frozen at
  their current record; catching that in the verification screenshot is what caught it, not a
  flaw in the simulator itself — worth knowing since the same ID-mapping pattern appears in the
  real sync code (`sync/league.ts`), just already handled correctly there.

## What's next (Phase 4)

Waiver wire recommendations, power rankings with trend arrows, and a weekly recap/analytics
dashboard — not started. Let me know when you want to move on and I'll pick up from there.

## Project layout

```
src/
  app/                    pages (connect, dashboard, start-sit, trade, playoffs) + API routes
  components/             UI components (components/trade/ for the trade tabs)
  lib/
    espn/                 ESPN API client + defensive mappers
    nflverse/              real weekly stats ingestion + defense-vs-position math + scoring variance
    startsit/              ranking engine with human-readable reasoning
    trade/                 value/scarcity/schedule/needs/targets/offers — all pure, tested functions
    simulation/             team score distribution + Monte Carlo season simulator
    db/                    Drizzle schema, client, queries
    sync/                  orchestrates an ESPN pull -> DB cache write; resolves session -> cached team
    session.ts             encrypted session cookie (league/team selection + ESPN creds)
scripts/
  migrate.ts               applies Drizzle migrations
  sync-defense-rankings.ts  one-off/cron entry point for the nflverse ingest (defense rankings + variance)
tests/                     fixture-based unit tests for mappers, ingest math, ranking/trade/sim engines
```
