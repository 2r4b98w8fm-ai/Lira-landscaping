/**
 * Sleeper's public fantasy API (api.sleeper.app) — free, no auth required,
 * no rate-limit key needed. Two things we use it for:
 *
 * 1. Its player directory publishes a real cross-platform ID map (espn_id,
 *    gsis_id, search_rank per player) — the one place this crosswalk is
 *    available for free without scraping, letting us join an ESPN roster
 *    player to their real nflverse game log (see projections/ourModel.ts)
 *    and to Sleeper's own trending signal below.
 * 2. Its trending endpoints report add/drop counts across Sleeper's whole
 *    user base in the last 24h — a real market-sentiment signal
 *    independent of ESPN's or our own projection math.
 *
 * Like ESPN's fantasy API, api.sleeper.app is blocked by this sandbox's
 * network policy, so this client is fixture-tested only here (see
 * tests/sleeper-ingest.test.ts) and has never been exercised against the
 * live API in this environment — it will only be proven out once deployed.
 * Documented per Sleeper's own API docs (https://docs.sleeper.com), which
 * describe the player object shape used below.
 */

const PLAYERS_URL = "https://api.sleeper.app/v1/players/nfl";
const TRENDING_URL = "https://api.sleeper.app/v1/players/nfl/trending";
const FETCH_TIMEOUT_MS = 30_000;
const TRENDING_LOOKBACK_HOURS = 24;
const TRENDING_LIMIT = 75;

export class SleeperIngestError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "SleeperIngestError";
  }
}

interface SleeperPlayerRaw {
  espn_id?: number | string | null;
  gsis_id?: string | null;
  search_rank?: number | null;
}

export interface SleeperCrosswalkRow {
  espnPlayerId: number;
  sleeperId: string;
  gsisId: string | null;
  searchRank: number | null;
}

export interface SleeperTrendingRow {
  sleeperId: string;
  count: number;
}

async function sleeperFetch<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!res.ok) {
      throw new SleeperIngestError(`Sleeper API returned ${res.status} for ${url}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof SleeperIngestError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new SleeperIngestError("Sleeper API did not respond in time.", err);
    }
    throw new SleeperIngestError("Could not reach Sleeper's API.", err);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * The full Sleeper player directory, filtered down to players with a
 * resolvable ESPN ID — that's the only subset useful as a crosswalk into
 * our ESPN-keyed data. Players Sleeper doesn't track against ESPN (rare,
 * e.g. very deep practice-squad players) are simply absent, not guessed at.
 */
export async function fetchSleeperCrosswalk(): Promise<SleeperCrosswalkRow[]> {
  const raw = await sleeperFetch<Record<string, SleeperPlayerRaw>>(PLAYERS_URL);
  const rows: SleeperCrosswalkRow[] = [];
  for (const [sleeperId, player] of Object.entries(raw)) {
    const espnId = Number(player.espn_id);
    if (!Number.isFinite(espnId) || espnId <= 0) continue;
    rows.push({
      espnPlayerId: espnId,
      sleeperId,
      gsisId: player.gsis_id ?? null,
      searchRank: typeof player.search_rank === "number" ? player.search_rank : null,
    });
  }
  return rows;
}

/**
 * Sleeper's "trending" add or drop counts over the last 24h. Returns an
 * empty list (never throws past the caller) on a malformed response — this
 * is a supplementary buzz signal, not core math, so a bad day for this one
 * fetch shouldn't take down anything else.
 */
export async function fetchSleeperTrending(direction: "add" | "drop"): Promise<SleeperTrendingRow[]> {
  const url = `${TRENDING_URL}/${direction}?lookback_hours=${TRENDING_LOOKBACK_HOURS}&limit=${TRENDING_LIMIT}`;
  const raw = await sleeperFetch<Array<{ player_id?: string; count?: number }>>(url);
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((r): r is { player_id: string; count: number } => typeof r.player_id === "string" && typeof r.count === "number")
    .map((r) => ({ sleeperId: r.player_id, count: r.count }));
}
