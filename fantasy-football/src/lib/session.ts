import { cookies } from "next/headers";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

export interface SessionData {
  espnLeagueId: string;
  season: number;
  myTeamId: number | null;
  espnS2?: string;
  swid?: string;
}

const COOKIE_NAME = "gridiron_session";

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
    return JSON.parse(decrypted.toString("utf8")) as SessionData;
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
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
