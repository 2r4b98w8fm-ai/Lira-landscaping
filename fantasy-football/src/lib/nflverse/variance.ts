import { POSITIONS, type Position } from "@/lib/constants";
import type { RawStatRow } from "./ingest";

export interface PositionVarianceRow {
  position: Position;
  meanPpr: number;
  stdevPpr: number;
  sampleSize: number;
}

/**
 * Real week-to-week scoring variance per position, computed from every
 * individual player-week in the season (not the defense-vs-position
 * aggregate). This is what lets the playoff simulator draw a team's weekly
 * score from an actual data-derived distribution instead of assuming a
 * made-up spread.
 */
export function computePositionVariance(rows: RawStatRow[]): PositionVarianceRow[] {
  const byPosition = new Map<Position, number[]>();
  for (const row of rows) {
    const list = byPosition.get(row.position) ?? [];
    list.push(row.fantasyPointsPpr);
    byPosition.set(row.position, list);
  }

  const results: PositionVarianceRow[] = [];
  for (const position of POSITIONS) {
    const values = byPosition.get(position);
    if (!values || values.length < 2) continue;

    const mean = values.reduce((s, v) => s + v, 0) / values.length;
    const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / (values.length - 1);

    results.push({ position, meanPpr: mean, stdevPpr: Math.sqrt(variance), sampleSize: values.length });
  }
  return results;
}
