import type { RestOfSeasonSource } from "@/types/domain";

export interface RestOfSeasonBlend {
  value: number | null;
  source: RestOfSeasonSource;
}

/**
 * Blends ESPN's own rest-of-season number with our own model's into one
 * consensus figure — a plain average when both exist, kept deliberately
 * simple (no tuned weighting) so it stays explainable. Falls back to
 * whichever single source exists, and finally to the season-pace estimate
 * mapRosterEntry already computes when ESPN gives nothing at all — a
 * number is only ever null when literally none of the three exist.
 */
export function blendRestOfSeason(
  espn: number | null,
  ourModel: number | null,
  paceEstimate: number | null
): RestOfSeasonBlend {
  if (espn !== null && ourModel !== null) return { value: (espn + ourModel) / 2, source: "blended" };
  if (espn !== null) return { value: espn, source: "espn" };
  if (ourModel !== null) return { value: ourModel, source: "our_model" };
  if (paceEstimate !== null) return { value: paceEstimate, source: "pace_estimate" };
  return { value: null, source: null };
}

/** Same blending rule as blendRestOfSeason, for the single-week number — no pace-estimate fallback exists at the week granularity. */
export function blendWeek(espn: number | null, ourModel: number | null): number | null {
  if (espn !== null && ourModel !== null) return (espn + ourModel) / 2;
  if (espn !== null) return espn;
  if (ourModel !== null) return ourModel;
  return null;
}
