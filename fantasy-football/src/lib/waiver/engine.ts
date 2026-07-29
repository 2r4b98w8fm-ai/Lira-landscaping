import type { Position } from "@/lib/constants";
import type { RosterPlayer, WaiverRecommendation } from "@/types/domain";

/**
 * The rest-of-season projection of the worst player you currently start at
 * a position — the bar a waiver add has to clear to be a real upgrade, not
 * just "a name you recognize." If you don't even roster enough players to
 * fill the position's starting slots, the bar is 0: literally anything
 * playable is an upgrade.
 */
function myWorstStarterValue(
  myRoster: RosterPlayer[],
  position: Position,
  startingRequirement: number
): number {
  if (startingRequirement <= 0) return 0;
  const atPosition = myRoster
    .filter((p) => p.position === position)
    .sort((a, b) => (b.restOfSeasonProjection ?? 0) - (a.restOfSeasonProjection ?? 0));

  if (atPosition.length < startingRequirement) return 0;
  return atPosition[startingRequirement - 1]?.restOfSeasonProjection ?? 0;
}

/**
 * Ranks the free-agent pool by rest-of-season value added over your worst
 * current starter at that position — never a made-up "top available
 * players" list, and a free agent with no usable projection sorts last
 * with an explicit note rather than being silently dropped.
 */
export function rankWaiverWire(
  myRoster: RosterPlayer[],
  freeAgentPool: RosterPlayer[],
  startingSlotCounts: Record<string, number>
): WaiverRecommendation[] {
  const worstStarterByPosition = new Map<Position, number>();

  const recommendations: WaiverRecommendation[] = freeAgentPool.map((player) => {
    let threshold = worstStarterByPosition.get(player.position);
    if (threshold === undefined) {
      threshold = myWorstStarterValue(myRoster, player.position, startingSlotCounts[player.position] ?? 0);
      worstStarterByPosition.set(player.position, threshold);
    }

    const reasoning: string[] = [];
    let valueAdded: number | null = null;

    if (player.restOfSeasonProjection === null) {
      reasoning.push("No rest-of-season projection available for this player.");
    } else {
      valueAdded = player.restOfSeasonProjection - threshold;
      reasoning.push(
        `Projected ${player.restOfSeasonProjection.toFixed(1)} rest-of-season pts vs. your worst rostered ${player.position} at ${threshold.toFixed(1)}.`
      );
      reasoning.push(
        valueAdded > 0
          ? `A real upgrade: +${valueAdded.toFixed(1)} pts over what you're currently starting there.`
          : `Not an upgrade — your current worst starter still projects higher.`
      );
    }

    if (player.injuryStatus !== "ACTIVE" && player.injuryStatus !== "UNKNOWN") {
      reasoning.push(`Injury status: ${player.injuryStatus}.`);
    }

    return { player, myWorstStarterValue: threshold, valueAdded, reasoning };
  });

  recommendations.sort((a, b) => (b.valueAdded ?? -Infinity) - (a.valueAdded ?? -Infinity));
  return recommendations;
}
