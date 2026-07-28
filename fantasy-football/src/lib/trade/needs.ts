import { POSITIONS, type Position } from "@/lib/constants";
import type { PositionalNeed, TeamNeedsProfile, TradeValue } from "@/types/domain";

/**
 * League-wide average trade value per starting slot at each position —
 * total value rostered leaguewide at a position, divided by how many
 * starting slots exist for it across every team. This is the baseline
 * `computeTeamNeeds` compares each team against; without it, "need" could
 * never go negative (every player's value is floored above zero — see
 * MIN_VORP in value.ts — so an empty position would score as merely
 * neutral instead of the real weakness it is).
 */
export function computeLeagueAvgValuePerStarter(
  allTeamRosters: TradeValue[][],
  numTeams: number,
  startingSlotCounts: Record<string, number>
): Record<Position, number> {
  const result = {} as Record<Position, number>;
  for (const position of POSITIONS) {
    const startingRequirement = startingSlotCounts[position] ?? 0;
    const totalSlots = numTeams * startingRequirement;
    if (totalSlots === 0) {
      result[position] = 0;
      continue;
    }
    const leagueTotalValue = allTeamRosters.reduce(
      (sum, roster) =>
        sum + roster.filter((tv) => tv.player.position === position).reduce((s, tv) => s + tv.finalValue, 0),
      0
    );
    result[position] = leagueTotalValue / totalSlots;
  }
  return result;
}

/**
 * Surplus/need per position: total trade value a team holds at that
 * position, minus what an average team's starting corps at that position
 * is worth leaguewide. Positive = real depth or strength beyond the
 * league norm; negative = a real weak spot, including "no players at all",
 * which nets out as strongly negative rather than a false neutral.
 */
export function computeTeamNeeds(
  teamId: number,
  teamName: string,
  roster: TradeValue[],
  startingSlotCounts: Record<string, number>,
  avgValuePerStarter: Record<Position, number>
): TeamNeedsProfile {
  const needs: PositionalNeed[] = POSITIONS.map((position) => {
    const atPosition = roster.filter((tv) => tv.player.position === position);
    const startingRequirement = startingSlotCounts[position] ?? 0;
    const totalValue = atPosition.reduce((sum, tv) => sum + tv.finalValue, 0);
    const surplus = totalValue - startingRequirement * (avgValuePerStarter[position] ?? 0);

    return {
      position,
      surplus,
      startingRequirement,
      rosteredCount: atPosition.length,
    };
  });

  return { teamId, teamName, needs };
}

export function surplusPlayersAtPosition(
  roster: TradeValue[],
  position: Position,
  startingRequirement: number
): TradeValue[] {
  return roster
    .filter((tv) => tv.player.position === position)
    .sort((a, b) => b.finalValue - a.finalValue)
    .slice(startingRequirement);
}
