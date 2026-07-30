import type { Position } from "@/lib/constants";
import type { StartSitBoard } from "@/types/domain";

export interface FlipAlert {
  position: Position;
  benchPlayerName: string;
  benchPlayerScore: number;
  displacedStarterName: string;
  displacedStarterScore: number;
}

/**
 * A "you're about to leave points on your bench" alert: a bench player who
 * ranks high enough this week to have displaced an actual starter, per the
 * same start/sit math the Start/Sit board already uses — this just
 * surfaces the cases worth acting on instead of making you scan every
 * position board yourself.
 */
export function findFlipAlerts(boards: StartSitBoard[], rosterSlotCounts: Record<string, number>): FlipAlert[] {
  const alerts: FlipAlert[] = [];

  for (const board of boards) {
    if (board.dataIncomplete) continue;
    const requirement = rosterSlotCounts[board.position] ?? 0;
    if (requirement <= 0) continue;

    const topN = board.recommendations.slice(0, requirement);
    const displaced = board.recommendations
      .slice(requirement)
      .find((r) => r.player.lineupSlot !== "BE" && r.player.lineupSlot !== "IR");
    if (!displaced) continue;

    for (const rec of topN) {
      if (rec.player.lineupSlot !== "BE") continue;
      if (rec.score === -Infinity) continue;

      alerts.push({
        position: board.position,
        benchPlayerName: rec.player.name,
        benchPlayerScore: rec.score,
        displacedStarterName: displaced.player.name,
        displacedStarterScore: displaced.score,
      });
    }
  }

  return alerts;
}
