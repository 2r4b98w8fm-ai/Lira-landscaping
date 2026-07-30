# Gridiron Desk

Data-driven decision support for your ESPN Fantasy Football league: start/sit calls with
visible reasoning, backed by real ESPN roster/projection data and real historical NFL stats
(no fabricated numbers).

**Phase 1:** connect an ESPN league, browse your roster, get a start/sit board per position.
**Phase 2:** trade value calculator, "who should I target," and "what should I offer" — all with
the math shown, not a black-box score. **Phase 3:** Monte Carlo playoff probability simulator.
**Phase 4:** waiver wire recommendations, power rankings with an all-play "luck" read, and an
injury watch panel. **This build:** multi-league account connect (discover every league tied to
your ESPN account instead of entering IDs one at a time), real email notifications, and ESPN
client hardening (retry/backoff on transient failures).

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
| Free-agent / waiver-wire pool | ESPN's free-agent player endpoint (`kona_player_info` + an `X-Fantasy-Filter` header) | **Real**; this is one of the least stable corners of ESPN's API, so a broken pull degrades to "waiver wire unavailable this sync" rather than failing the whole league sync |
| All-play record / power rankings / luck rating | Computed directly from every played matchup's real score (ESPN's own `mMatchup` data) | **Real**, no external "power ranking" service |
| League auto-discovery ("connect my ESPN account") | ESPN's fan API (`fan.api.espn.com`, a different host from the fantasy API) | **Real**, the least documented/stable endpoint in this app by far — degrades to "enter your league ID directly" if the shape has drifted, never the only way in |

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

## Waiver wire & power rankings (Phase 4)

**Waiver wire** ranks the free-agent pool by rest-of-season projected value added over the worst
starter you currently roster at that position — the bar a pickup has to clear to be a real
upgrade, not just a recognizable name. If you don't roster enough players to fill a position's
starting slots at all, the bar is 0 (anything playable is an upgrade). A free agent with no usable
projection sorts last with an explicit note, never a guessed number.

**Power rankings** are a transparent composite of three real inputs — actual record, points
scored, and **all-play win%** (how a team's score each week would have fared against every other
team, not just the one it was matched against) — so a personally easy or hard schedule doesn't
fully determine the ranking. Trend arrows compare against the last time rankings were computed for
this league (stored as a snapshot); a team's first-ever computation shows "NEW" rather than a
fabricated trend.

**Luck rating** compares actual wins to what a team's all-play record implies they "should" have
won — the standard fantasy way of separating a good record from good matchup fortune. Points
against (already part of ESPN's own team record) sits alongside it for the same reason.

**Injury Watch** is an in-app panel on the Roster page listing every rostered player ESPN doesn't
list as fully active, worst-first — no new data pulled, just a surfaced view of what the roster
sync already has. Push/email/SMS alerts would need a notification service (Twilio, a mail
provider, a cron-triggered digest) that isn't built; this is the in-app equivalent.

## Account model: why there's no ESPN password login

ESPN doesn't offer OAuth or any sanctioned way for a third-party app to sign in as you. The only
real credential is `espn_s2`/`SWID` — the cookies your own browser already holds after you log
into fantasy.espn.com yourself. A form that took your actual ESPN password and had this app's
server submit it to ESPN's login page would mean your real password flows through and potentially
gets stored by a third-party app (exactly what security guidance says never to do), would likely
violate ESPN's terms, and would break the moment their login page adds bot/CAPTCHA protection.

What you get instead is the practical equivalent: paste `espn_s2`/`SWID` once (never a password),
and the app calls ESPN's own "my leagues" endpoint to discover every league tied to that account,
so you don't need to already know a league ID. Connect it, and the session cookie remembers it for
180 days — so this genuinely is "log in once" for as long as your browser keeps that cookie. You
can connect multiple leagues (a switcher appears in the nav once you have 2+) and add more anytime
from the Connect page. If ESPN's discovery endpoint doesn't return anything usable, the manual
"enter your league ID" path is still right there — auto-discovery is never the only way in.

## Notifications (email digests)

Two kinds, both opt-in from a panel on the Roster page, and both **inert until you set
`RESEND_API_KEY`** in your deployment (the panel says so plainly, and the subscribe endpoint
refuses to save with a clear error if it isn't set — no silent no-op):

- **Injury alerts**: every time you (a real, session-having user) hit "Refresh from ESPN," the app
  compares the new injury statuses against the last ones it emailed about and sends a digest if
  anything changed. This deliberately does **not** run from an unattended cron job — see below.
- **Waiver digest**: a periodic email of real upgrades on your waiver wire (same value-added-over-
  worst-starter math as the Waivers page), meant to run from a scheduled job (`vercel.json` wires
  up a daily cron hitting `/api/cron/waiver-digest`, protected by a `CRON_SECRET` you set — Vercel
  automatically sends it as a bearer token to your own cron routes when that env var is present).

**Why the injury digest isn't also on the cron job:** sending it would require re-authenticating to
ESPN outside of a real user's session, which means storing your `espn_s2`/`SWID` in the database
rather than only in an encrypted cookie. A leaked database row would then hand over live ESPN
session access, not just app data — a meaningfully worse blast radius than anything else this app
stores. So the cron path only ever reads what a real sync already cached in Postgres; it never
calls ESPN itself. That's a deliberate scope limit, not an oversight — revisit it only if you
decide that tradeoff is worth it for real-time-without-a-visit injury alerts.

**Not yet exercised against a real Resend account** — I have no API key to test with, so sending
is covered by unit tests up to the point of calling Resend's SDK (digest content, the "nothing to
report" skip logic, the "not configured" guard) but an actual delivered email is unverified.

## Keeping the background data refresh actually frequent on free plans

Every page in the app polls its own data every 45s and the nav auto-syncs your ESPN league every
60s straight from your browser session — that part is free and unconditional, no infra needed (see
`src/lib/hooks/useAutoRefresh.ts` and `src/components/LiveSyncBadge.tsx`). But the nflverse/Sleeper/
snap-count stats behind Rankings, Breakouts, etc. only get as fresh as whatever last hit
`/api/cron/sync-projections-data`, and **Vercel's Hobby plan caps its own `vercel.json` cron
schedule to once a day** — a paid Pro plan is the only way to make Vercel itself fire it more
often.

Rather than pay for that, this repo stacks two free services instead of one:

1. **Vercel's own cron** (`vercel.json`) still fires once a day — free on Hobby, kept as a
   guaranteed-to-work fallback.
2. **A GitHub Actions scheduled workflow** (`.github/workflows/sync-projections-cron.yml`) hits the
   same endpoint every 2 hours in between. This repo is public, so Actions minutes are unlimited —
   nothing to pay or upgrade. The workflow is a plain `curl` with a bearer token; the app has no
   idea which of the two triggered it.

To turn the GitHub Actions half on, add two repository secrets under **Settings → Secrets and
variables → Actions**:

- `CRON_SECRET` — the exact same value you set as the `CRON_SECRET` env var on your Vercel
  deployment.
- `APP_URL` — your deployment's base URL, e.g. `https://your-app.vercel.app` (no trailing slash
  needed either way).

You can trigger it once manually (Actions tab → "Sync projections data (intraday)" → "Run
workflow") to confirm both secrets are wired up correctly before waiting for the schedule.

**Caveat:** GitHub disables a scheduled workflow automatically after 60 days with no commits to the
repository — a dormant fork's cron will quietly stop firing (Vercel's daily cron keeps running
regardless, so the app never goes fully stale, just back to once-a-day). Any push resets that
clock, so this is only a concern for a repo nobody touches for two months straight.

**If you'd rather not touch GitHub Actions at all:** a third-party free cron service like
[cron-job.org](https://cron-job.org) does the same job with no code — create a job that GETs
`https://your-app.vercel.app/api/cron/sync-projections-data` with header
`Authorization: Bearer <your CRON_SECRET>` on whatever schedule you want (their free tier allows
down to once a minute). Either approach — or both at once — is fine; the route doesn't care who
calls it, only that the bearer token matches.

### A note on ESPN's API

It's undocumented and has changed shape before (team ID renumbering, field renames). The client
(`src/lib/espn/`) is written defensively: every field access has a fallback, one bad player entry
is skipped with a warning instead of crashing the whole sync, and warnings are surfaced in the UI
and logged to the `sync_log` table rather than silently swallowed. If ESPN changes something and
a sync starts failing, check `src/lib/espn/mappers.ts` and `src/lib/espn/types.ts` first — that's
where the undocumented shape assumptions live.

**Retry behavior:** every ESPN call now retries transient failures (429/5xx, network blips,
timeouts) up to 3 total attempts with exponential backoff (300ms, 600ms) — genuinely tested with a
mocked `fetch` (`tests/espn-client-retry.test.ts`), not just against fixtures. Permanent failures
(401/403 bad credentials, 404 not found) fail immediately since retrying can't fix them. This is
real hardening, but it's still hardening against *simulated* failure modes — it can't substitute
for what only a live league can confirm: that the current response shapes still match what
`mappers.ts` expects. That's still this app's biggest open unknown.

## Private leagues (espn_s2 / SWID)

Most leagues are private. ESPN requires two cookie values instead of an API key:

1. Log into fantasy.espn.com and open your league.
2. Open dev tools → Application (Chrome) / Storage (Firefox) → Cookies → `fantasy.espn.com`.
3. Copy `espn_s2` and `SWID`.

The connect form has this explainer built in, plus a smart-paste parser
(`src/lib/espnCookieParse.ts`): paste whatever you actually copied — the whole cookie row, a full
`Cookie:` header, a GUID missing its curly braces — into either field, and it extracts both values
correctly rather than requiring an exact, trimmed value in an exact field. This exists because a
real ESPN/Disney-style "click a button, log in on their page, come back connected" flow is not
achievable for a plain website: ESPN has no OAuth for Fantasy, so there's no protocol for their
login page to hand anything back to a third-party site, regardless of whether it's a popup, an
iframe, or a redirect — that's true for any website, not a limitation specific to this one. (A
browser extension *could* read your existing ESPN cookies directly and skip this entirely, but
that's a separate piece of software with its own install/trust/store-review overhead; the
smart-paste flow was the more practical choice for now — see the git history around this decision
if you want the fuller reasoning.)

These values are encrypted into an httpOnly session cookie server-side and are **never written to
the database** — only your league/team IDs and cached stats are persisted.

## Local setup

```bash
cp .env.example .env.local
# fill in DATABASE_URL (a local Postgres is fine) and SESSION_SECRET (openssl rand -hex 32)
# RESEND_API_KEY / RESEND_FROM_EMAIL / CRON_SECRET are optional — notifications
# just stay off (with an honest "not configured" state) without them

npm install
npm run db:generate   # generate SQL migration from schema.ts (already checked in under drizzle/)
npm run db:migrate    # apply it
npm run db:sync-defense [season]   # pull real nflverse stats + Sleeper crosswalk/trending — powers
                                    # defense-vs-position, scoring variance, and our own model

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
- Phase 4 was verified against a seeded 4-team league with varied real weekly scores: power
  rankings correctly separated record from scoring luck (one team's actual record ran well ahead
  of its all-play record and was flagged as such), the waiver board correctly told upgrades from
  non-upgrades with the exact math, and the injury watch panel correctly surfaced and severity-
  sorted OUT/QUESTIONABLE players. The free-agent fetch (`fetchFreeAgentsRaw`) was, at the time,
  the newest and least-documented ESPN endpoint in this app.
- **The fan-API league discovery (`fetchFanLeaguesRaw`) is now that newest, least-documented
  endpoint** — a different host than everything else this app calls, and genuinely the most
  speculative piece of this whole codebase. It's fixture-tested for its parsing logic
  (`mapFanLeagues`) and degrades to "enter your league ID directly" rather than blocking anyone if
  the shape has drifted, but a live account is what would actually confirm it works.
- Multi-league session handling was verified end-to-end in this environment: seeded two leagues,
  confirmed the "Your leagues" list and Roster page both reflect the connected leagues correctly,
  and caught a real bug in the process — the nav's league switcher only fetched its state once on
  mount, so switching leagues via the connect page's list left the switcher showing the stale
  league even though the actual page data was correct. Fixed by re-fetching on every navigation.
- Notification digest *content* (injury diff logic, waiver digest, the "not configured" and
  "nothing to report" skip paths) is unit-tested; actual delivery through Resend is not verified —
  I have no API key for it. Given one, sending a real test email would be the next thing to check.

## What's next

All four original phases plus this round's account/notification/hardening work are built. Natural
next steps: a live league to shake out the fan-API discovery endpoint and confirm response shapes
haven't drifted; a real Resend account to verify actual email delivery; and, if the injury digest
ever needs to run without a live user session, a deliberate decision about whether storing
encrypted ESPN credentials server-side is worth that tradeoff (see the Notifications section above
for why this build doesn't do that today).

## Project layout

```
src/
  app/                    pages (connect, dashboard, start-sit, trade, playoffs, waivers,
                           power-rankings) + API routes (including account/, cron/, notifications/)
  components/             UI components (components/trade/ for the trade tabs)
  lib/
    espn/                 ESPN API client + defensive mappers (rosters, schedule, free agents,
                           fan-API league discovery) — retry/backoff lives in client.ts
    nflverse/              real weekly stats ingestion + defense-vs-position math + scoring variance
    startsit/              ranking engine with human-readable reasoning
    trade/                 value/scarcity/schedule/needs/targets/offers — all pure, tested functions
    simulation/             team score distribution + Monte Carlo season simulator
    waiver/                 free-agent value-added ranking engine
    analytics/              all-play records + power rankings + luck rating
    projections/             our own model (real recent form + matchup + injury) + consensus blending
    sleeper/                 Sleeper's public API client (ID crosswalk + trending adds/drops)
    ingestion/               shared nflverse+Sleeper refresh, used by both the script and the cron route
    notifications/          email digests (injury changes, waiver upgrades) via Resend
    db/                    Drizzle schema, client, queries
    sync/                  orchestrates an ESPN pull -> DB cache write; resolves session -> cached team
    session.ts             encrypted, multi-league session cookie (leagues[], espn_s2/SWID)
scripts/
  migrate.ts               applies Drizzle migrations
  sync-defense-rankings.ts  one-off/cron entry point for the nflverse+Sleeper ingest (also runs daily via cron)
tests/                     fixture-based unit tests for mappers, ingest math, and every engine
vercel.json                daily cron config for the waiver-digest email job and the projection-data refresh
```
