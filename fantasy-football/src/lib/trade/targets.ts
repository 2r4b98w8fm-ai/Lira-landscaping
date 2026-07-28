import type { Position } from "@/lib/constants";
import type { TeamNeedsProfile, TradeTargetSuggestion } from "@/types/domain";

/** Minimum |surplus| (in trade-value points) to call a position a real surplus or need rather than noise. */
const SIGNIFICANCE_THRESHOLD = 5;

function needsMap(profile: TeamNeedsProfile): Map<Position, number> {
  return new Map(profile.needs.map((n) => [n.position, n.surplus]));
}

/**
 * Ranks other teams by how well they complement my roster: positions where
 * they're weak and I have real surplus (I can help them), weighted extra
 * when it's mutual (they're also strong exactly where I'm weak — a trade
 * both sides have real reason to make, not just a favor).
 */
export function findTradeTargets(
  myTeam: TeamNeedsProfile,
  otherTeams: TeamNeedsProfile[]
): TradeTargetSuggestion[] {
  const mine = needsMap(myTeam);

  const suggestions = otherTeams.map((team) => {
    const theirs = needsMap(team);
    const complementaryPositions: Position[] = [];
    const rationale: string[] = [];
    let mutualCount = 0;

    for (const [position, mySurplus] of mine) {
      const theirSurplus = theirs.get(position) ?? 0;
      const iCanHelpThem = mySurplus > SIGNIFICANCE_THRESHOLD && theirSurplus < -SIGNIFICANCE_THRESHOLD;
      if (!iCanHelpThem) continue;

      complementaryPositions.push(position);
      rationale.push(
        `You have surplus at ${position} (+${mySurplus.toFixed(1)}) while ${team.teamName} is thin there (${theirSurplus.toFixed(1)}).`
      );
    }

    for (const [position, theirSurplus] of theirs) {
      const mySurplus = mine.get(position) ?? 0;
      if (theirSurplus > SIGNIFICANCE_THRESHOLD && mySurplus < -SIGNIFICANCE_THRESHOLD) {
        mutualCount += 1;
        rationale.push(
          `${team.teamName} has surplus at ${position} (+${theirSurplus.toFixed(1)}) while you're thin there (${mySurplus.toFixed(1)}).`
        );
      }
    }

    return { team, complementaryPositions, rationale, mutualCount };
  });

  return suggestions
    .filter((s) => s.complementaryPositions.length > 0 || s.mutualCount > 0)
    .sort((a, b) => {
      if (a.mutualCount !== b.mutualCount) return b.mutualCount - a.mutualCount;
      return b.complementaryPositions.length - a.complementaryPositions.length;
    })
    .map(({ team, complementaryPositions, rationale }) => ({ team, complementaryPositions, rationale }));
}
