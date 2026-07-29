import type {
  EspnFanResponse,
  EspnFreeAgentsResponse,
  EspnLeagueResponse,
  EspnProTeamSchedulesResponse,
} from "./types";

export interface EspnCredentials {
  espnS2?: string;
  swid?: string;
}

/** Distinguishes a permanent failure (bad credentials, not found — retrying won't help) from a transient one (network blip, ESPN 5xx — worth retrying). */
export class EspnApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly cause?: unknown,
    public readonly transient: boolean = false
  ) {
    super(message);
    this.name = "EspnApiError";
  }
}

const BASE = "https://fantasy.espn.com/apis/v3/games/ffl/seasons";
const FAN_BASE = "https://fan.api.espn.com/apis/v2/fans";
const FETCH_TIMEOUT_MS = 10_000;
const MAX_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 300;

function buildCookieHeader(creds: EspnCredentials): string | undefined {
  const parts: string[] = [];
  if (creds.espnS2) parts.push(`espn_s2=${creds.espnS2}`);
  if (creds.swid) parts.push(`SWID=${creds.swid}`);
  return parts.length > 0 ? parts.join("; ") : undefined;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function espnFetchOnce<T>(
  url: string,
  creds: EspnCredentials,
  extraHeaders?: Record<string, string>
): Promise<T> {
  const cookie = buildCookieHeader(creds);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        ...(cookie ? { Cookie: cookie } : {}),
        ...extraHeaders,
      },
      signal: controller.signal,
      cache: "no-store",
    });

    if (res.status === 401 || res.status === 403) {
      throw new EspnApiError(
        "ESPN rejected these credentials. For a private league, double-check the espn_s2 and SWID cookie values.",
        res.status,
        undefined,
        false
      );
    }
    if (res.status === 404) {
      throw new EspnApiError("League not found. Check the league ID and season.", 404, undefined, false);
    }
    if (res.status === 429 || res.status >= 500) {
      throw new EspnApiError(
        `ESPN responded with ${res.status}. This is usually transient (rate limiting or a momentary outage).`,
        res.status,
        undefined,
        true
      );
    }
    if (!res.ok) {
      throw new EspnApiError(
        `ESPN responded with an unexpected status (${res.status}). Their API may be down or the endpoint shape changed.`,
        res.status,
        undefined,
        false
      );
    }

    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof EspnApiError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new EspnApiError("ESPN did not respond in time.", undefined, err, true);
    }
    // A network-level failure (DNS, connection reset, etc.) — worth a retry.
    throw new EspnApiError("Could not reach ESPN's Fantasy API.", undefined, err, true);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Retries only transient failures (network blips, 429/5xx) with exponential
 * backoff; permanent failures (bad credentials, 404) fail immediately since
 * retrying can't fix them. Caps at MAX_ATTEMPTS total tries.
 */
async function espnFetch<T>(
  url: string,
  creds: EspnCredentials,
  extraHeaders?: Record<string, string>
): Promise<T> {
  let lastError: EspnApiError | undefined;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await espnFetchOnce<T>(url, creds, extraHeaders);
    } catch (err) {
      const espnErr = err instanceof EspnApiError ? err : new EspnApiError("Unexpected error calling ESPN.", undefined, err, true);
      lastError = espnErr;
      if (!espnErr.transient || attempt === MAX_ATTEMPTS) throw espnErr;
      await sleep(RETRY_BASE_DELAY_MS * 2 ** (attempt - 1));
    }
  }
  // Unreachable — the loop above always returns or throws — but keeps TS satisfied.
  throw lastError ?? new EspnApiError("ESPN request failed for an unknown reason.");
}

/**
 * Pulls league settings, teams, and full rosters for the given scoring
 * period (week). scoringPeriodId scopes which week's stats/projections show
 * up on each player entry.
 */
export async function fetchLeagueRaw(
  leagueId: string,
  season: number,
  scoringPeriodId: number,
  creds: EspnCredentials
): Promise<EspnLeagueResponse> {
  const params = new URLSearchParams({ scoringPeriodId: String(scoringPeriodId) });
  for (const view of ["mTeam", "mRoster", "mSettings", "mStandings", "mMatchup"]) {
    params.append("view", view);
  }
  const url = `${BASE}/${season}/segments/0/leagues/${leagueId}?${params.toString()}`;
  return espnFetch<EspnLeagueResponse>(url, creds);
}

/** Pro (NFL) team schedules for the season, used to resolve weekly opponents. */
export async function fetchProTeamSchedulesRaw(
  season: number,
  creds: EspnCredentials
): Promise<EspnProTeamSchedulesResponse> {
  const url = `${BASE}/${season}?view=proTeamSchedules_wl`;
  return espnFetch<EspnProTeamSchedulesResponse>(url, creds);
}

/**
 * Free agent / waiver-wire pool for the league. Uses `view=kona_player_info`
 * plus the undocumented X-Fantasy-Filter header ESPN's own web app sends —
 * this is one of the least stable corners of the API; if ESPN changes this
 * shape, the sync degrades to "no free agents this cycle" (see
 * mapFreeAgents) rather than failing the whole league sync.
 */
export async function fetchFreeAgentsRaw(
  leagueId: string,
  season: number,
  scoringPeriodId: number,
  creds: EspnCredentials,
  limit = 100
): Promise<EspnFreeAgentsResponse> {
  const filter = {
    players: {
      filterStatus: { value: ["FREEAGENT", "WAIVERS"] },
      filterSlotIds: { value: [0, 2, 4, 6, 16, 17, 23] },
      limit,
      sortPercOwned: { sortAsc: false, sortPriority: 1 },
    },
  };
  const url = `${BASE}/${season}/segments/0/leagues/${leagueId}?scoringPeriodId=${scoringPeriodId}&view=kona_player_info`;
  return espnFetch<EspnFreeAgentsResponse>(url, creds, {
    "X-Fantasy-Filter": JSON.stringify(filter),
  });
}

/**
 * Discovers every league an ESPN account (identified by its SWID) belongs
 * to, so a user can connect once with espn_s2/SWID instead of needing to
 * already know a specific league ID. Different host (fan.api.espn.com) and
 * the least documented shape in this app — degrades to an empty list (see
 * mapFanLeagues) rather than blocking the manual "enter a league ID"
 * fallback if ESPN's shape has drifted.
 */
export async function fetchFanLeaguesRaw(swid: string, creds: EspnCredentials): Promise<EspnFanResponse> {
  const url = `${FAN_BASE}/${encodeURIComponent(swid)}?featureFlags=expandedLeagueMappings`;
  return espnFetch<EspnFanResponse>(url, creds);
}
