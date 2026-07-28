import type {
  EspnLeagueResponse,
  EspnProTeamSchedulesResponse,
} from "./types";

export interface EspnCredentials {
  espnS2?: string;
  swid?: string;
}

export class EspnApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "EspnApiError";
  }
}

const BASE = "https://fantasy.espn.com/apis/v3/games/ffl/seasons";
const FETCH_TIMEOUT_MS = 10_000;

function buildCookieHeader(creds: EspnCredentials): string | undefined {
  const parts: string[] = [];
  if (creds.espnS2) parts.push(`espn_s2=${creds.espnS2}`);
  if (creds.swid) parts.push(`SWID=${creds.swid}`);
  return parts.length > 0 ? parts.join("; ") : undefined;
}

async function espnFetch<T>(url: string, creds: EspnCredentials): Promise<T> {
  const cookie = buildCookieHeader(creds);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        ...(cookie ? { Cookie: cookie } : {}),
      },
      signal: controller.signal,
      cache: "no-store",
    });

    if (res.status === 401 || res.status === 403) {
      throw new EspnApiError(
        "ESPN rejected these credentials. For a private league, double-check the espn_s2 and SWID cookie values.",
        res.status
      );
    }
    if (res.status === 404) {
      throw new EspnApiError(
        "League not found. Check the league ID and season.",
        404
      );
    }
    if (!res.ok) {
      throw new EspnApiError(
        `ESPN responded with an unexpected status (${res.status}). Their API may be down or the endpoint shape changed.`,
        res.status
      );
    }

    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof EspnApiError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new EspnApiError("ESPN did not respond in time.", undefined, err);
    }
    throw new EspnApiError(
      "Could not reach ESPN's Fantasy API.",
      undefined,
      err
    );
  } finally {
    clearTimeout(timeout);
  }
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
  for (const view of ["mTeam", "mRoster", "mSettings", "mStandings"]) {
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
