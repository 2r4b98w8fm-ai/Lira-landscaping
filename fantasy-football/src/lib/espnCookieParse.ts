/**
 * People following the "copy espn_s2/SWID from dev tools" instructions
 * rarely copy just the bare value — they select the whole cookie row, or
 * paste a `Cookie:` header, or forget the curly braces on SWID. This
 * parses whatever got pasted (into either field) and pulls out both
 * values wherever they appear, so pasting a messy blob into one box still
 * fills both correctly instead of failing silently.
 */
export interface ParsedEspnCookies {
  espnS2: string | null;
  swid: string | null;
}

const ESPN_S2_PATTERN = /espn_s2=([^;\s"]+)/i;
const SWID_KEYED_PATTERN = /swid=(\{?[0-9a-f-]{30,36}\}?)/i;
const BARE_SWID_PATTERN = /\{?[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}\}?/i;
// espn_s2 values are long, URL-safe-ish tokens with no spaces — this is a
// permissive fallback for "pasted the bare value, no espn_s2= prefix."
const BARE_ESPN_S2_PATTERN = /^[A-Za-z0-9%._~-]{60,}$/;

function ensureBraces(guid: string): string {
  const trimmed = guid.trim();
  return trimmed.startsWith("{") ? trimmed : `{${trimmed.replace(/[{}]/g, "")}}`;
}

export function parseEspnCookiePaste(raw: string): ParsedEspnCookies {
  const text = raw.trim();

  const espnS2Match = text.match(ESPN_S2_PATTERN);
  const swidKeyedMatch = text.match(SWID_KEYED_PATTERN);

  let espnS2 = espnS2Match?.[1]?.trim() ?? null;
  let swid = swidKeyedMatch?.[1] ? ensureBraces(swidKeyedMatch[1]) : null;

  // No `key=value` form found — maybe they pasted just the bare value into one field.
  if (!swid) {
    const bareSwidMatch = text.match(BARE_SWID_PATTERN);
    if (bareSwidMatch) swid = ensureBraces(bareSwidMatch[0]);
  }
  if (!espnS2 && BARE_ESPN_S2_PATTERN.test(text) && !BARE_SWID_PATTERN.test(text)) {
    espnS2 = text;
  }

  return { espnS2, swid };
}
