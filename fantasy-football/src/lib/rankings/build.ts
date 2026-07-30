import type { Position } from "@/lib/constants";
import type { RankingEntry } from "./context";

export interface RankedPlayer extends RankingEntry {
  overallRank: number;
  positionRank: number;
}

/**
 * Sorts every player in the league universe by trade value (VORP after
 * injury/schedule adjustment) — the same "overall rank" and "positional
 * rank" language every other fantasy ranking uses, just computed from this
 * league's real settings and this app's own transparent math instead of a
 * generic outside opinion.
 */
export function rankPlayers(entries: RankingEntry[]): RankedPlayer[] {
  const sorted = [...entries].sort((a, b) => b.tradeValue.finalValue - a.tradeValue.finalValue);
  const positionCounts = new Map<Position, number>();
  return sorted.map((entry, i) => {
    const positionRank = (positionCounts.get(entry.player.position) ?? 0) + 1;
    positionCounts.set(entry.player.position, positionRank);
    return { ...entry, overallRank: i + 1, positionRank };
  });
}
