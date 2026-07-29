import { cookies } from "next/headers";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

export interface ConnectedLeague {
  espnLeagueId: string;
  season: number;
  myTeamId: number | null;
  /** Cached display name, purely for the league switcher — not authoritative (the DB copy from the last sync is). */
  name?: string;
}

export interface SessionData {
  espnS2?: string;
  swid?: string;
  leagues: ConnectedLeague[];
  /** Index into `leagues` for whichever one the UI is currently showing. */
  activeIndex: number;
}

const COOKIE_NAME = "gridiron_session";
// Long-lived on purpose: once you've pasted espn_s2/SWID once, staying
// "logged in" (i.e. not needing to paste them again) is the whole point.
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

function getKey(): Buffer {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 64) {
    throw new Error(
      "SESSION_SECRET must be a 64-character hex string. Generate one with `openssl rand -hex 32`."
    );
  }
  return Buffer.from(secret, "hex");
}

function encrypt(data: SessionData): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv);
  const plaintext = Buffer.from(JSON.stringify(data), "utf8");
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString("base64url");
}

function decrypt(payload: string): SessionData | null {
  try {
    const raw = Buffer.from(payload, "base64url");
    const iv = raw.subarray(0, 12);
    const authTag = raw.subarray(12, 28);
    const encrypted = raw.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", getKey(), iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const parsed = JSON.parse(decrypted.toString("utf8"));
    // Guard against an older single-league cookie shape (pre-multi-league):
    // treat it as "not connected" rather than crashing on missing fields.
    if (!Array.isArray(parsed?.leagues)) return null;
    return parsed as SessionData;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionData | null> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  return decrypt(raw);
}

export async function setSession(data: SessionData): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, encrypt(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export function getActiveLeague(session: SessionData): ConnectedLeague | null {
  return session.leagues[session.activeIndex] ?? null;
}

/** Adds a league (or updates it in place if already connected) and makes it the active one. */
export function withLeagueAdded(session: SessionData, league: ConnectedLeague): SessionData {
  const existingIndex = session.leagues.findIndex(
    (l) => l.espnLeagueId === league.espnLeagueId && l.season === league.season
  );
  if (existingIndex !== -1) {
    const leagues = [...session.leagues];
    leagues[existingIndex] = { ...leagues[existingIndex], ...league };
    return { ...session, leagues, activeIndex: existingIndex };
  }
  return { ...session, leagues: [...session.leagues, league], activeIndex: session.leagues.length };
}

export function withActiveLeagueUpdated(session: SessionData, patch: Partial<ConnectedLeague>): SessionData {
  const leagues = session.leagues.map((l, i) => (i === session.activeIndex ? { ...l, ...patch } : l));
  return { ...session, leagues };
}
