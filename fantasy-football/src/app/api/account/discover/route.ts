import { NextResponse } from "next/server";
import { z } from "zod";
import { EspnApiError, fetchFanLeaguesRaw } from "@/lib/espn/client";
import { MappingWarnings, mapFanLeagues } from "@/lib/espn/mappers";

const bodySchema = z.object({
  espnS2: z.string().min(1),
  swid: z.string().min(1),
});

/**
 * Discovers every football league tied to an ESPN account from espn_s2/SWID
 * alone — no league ID required. This is the "log in and see my leagues"
 * flow. Never the only way in: if ESPN's fan-API shape has drifted, this
 * returns an empty list with a warning rather than an error, so the UI can
 * fall back to "enter your league ID directly."
 */
export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "espn_s2 and SWID are both required to discover leagues." }, { status: 400 });
  }
  const { espnS2, swid } = parsed.data;

  try {
    const raw = await fetchFanLeaguesRaw(swid, { espnS2, swid });
    const warnings = new MappingWarnings();
    const leagues = mapFanLeagues(raw, warnings);
    return NextResponse.json({ leagues, warnings: warnings.messages });
  } catch (err) {
    // Discovery failing is a soft fallback ("use manual entry instead"), not
    // a hard error — always 200 so the UI can show the fallback calmly.
    const message = err instanceof EspnApiError ? err.message : "Could not reach ESPN to discover leagues.";
    return NextResponse.json({ leagues: [], warnings: [message] });
  }
}
