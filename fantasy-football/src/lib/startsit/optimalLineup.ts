import { FLEX_ELIGIBLE, POSITIONS, type Position } from "@/lib/constants";
import type { RosterPlayer } from "@/types/domain";

export interface LineupSlotAssignment {
  slot: string;
  player: RosterPlayer | null;
  projectedPoints: number | null;
}

export interface LineupChange {
  player: RosterPlayer;
  action: "start" | "sit";
}

export interface OptimalLineup {
  starters: LineupSlotAssignment[];
  bench: RosterPlayer[];
  totalProjectedPoints: number;
  /** What to actually change from the currently-set lineup to reach this one — empty means your lineup is already optimal. */
  changesFromCurrent: LineupChange[];
}

/** This week's usable projection for lineup-building — OUT/IR players and anyone with no projection at all can never be assigned a starting slot, never silently started on a guess. */
function weekScore(player: RosterPlayer): number {
  if (player.injuryStatus === "OUT" || player.injuryStatus === "IR") return -Infinity;
  return player.weekProjection ?? -Infinity;
}

/**
 * The exact best starting lineup for this week, slot by slot — including
 * FLEX. Fills each required position slot with its top projected
 * player(s), then fills FLEX from whichever RB/WR/TE is left over and
 * projects highest; this greedy order is optimal here because a flex slot
 * pulling from an already-sorted union of position pools can never do
 * better by displacing a required starter (the same total pool of
 * flex-eligible players is available to FLEX either way). A slot goes
 * unfilled (never fabricated) when there aren't enough healthy, projected
 * players to fill it.
 */
export function computeOptimalLineup(roster: RosterPlayer[], startingSlotCounts: Record<string, number>): OptimalLineup {
  const byPosition = new Map<Position, RosterPlayer[]>();
  for (const player of roster) {
    const list = byPosition.get(player.position) ?? [];
    list.push(player);
    byPosition.set(player.position, list);
  }
  for (const list of byPosition.values()) {
    list.sort((a, b) => weekScore(b) - weekScore(a));
  }

  const starters: LineupSlotAssignment[] = [];
  const used = new Set<number>();

  for (const position of POSITIONS) {
    const count = startingSlotCounts[position] ?? 0;
    const usable = (byPosition.get(position) ?? []).filter((p) => weekScore(p) > -Infinity);
    for (let i = 0; i < count; i++) {
      const player = usable[i] ?? null;
      if (player) used.add(player.espnPlayerId);
      starters.push({ slot: position, player, projectedPoints: player ? weekScore(player) : null });
    }
  }

  const flexCount = startingSlotCounts.FLEX ?? 0;
  const flexPool = FLEX_ELIGIBLE.flatMap((pos) => byPosition.get(pos) ?? [])
    .filter((p) => !used.has(p.espnPlayerId) && weekScore(p) > -Infinity)
    .sort((a, b) => weekScore(b) - weekScore(a));
  for (let i = 0; i < flexCount; i++) {
    const player = flexPool[i] ?? null;
    if (player) used.add(player.espnPlayerId);
    starters.push({ slot: "FLEX", player, projectedPoints: player ? weekScore(player) : null });
  }

  const bench = roster.filter((p) => !used.has(p.espnPlayerId));
  const totalProjectedPoints = starters.reduce((sum, s) => sum + (s.projectedPoints ?? 0), 0);

  const changesFromCurrent: LineupChange[] = [];
  for (const player of roster) {
    const currentlyStarting = player.lineupSlot !== "BE" && player.lineupSlot !== "IR";
    const shouldStart = used.has(player.espnPlayerId);
    if (currentlyStarting && !shouldStart) changesFromCurrent.push({ player, action: "sit" });
    if (!currentlyStarting && shouldStart) changesFromCurrent.push({ player, action: "start" });
  }

  return { starters, bench, totalProjectedPoints, changesFromCurrent };
}
