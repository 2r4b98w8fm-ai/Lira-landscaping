import type { Position } from "@/lib/constants";
import type {
  DefenseRanking,
  RosterPlayer,
  StartSitBoard,
  StartSitRecommendation,
} from "@/types/domain";

function defenseRankLabel(rank: number): string {
  if (rank <= 8) return "tough matchup";
  if (rank >= 25) return "favorable matchup";
  return "average matchup";
}

/**
 * Ranks players at one position for the upcoming week. Score is projection
 * adjusted by matchup difficulty; if a player has no ESPN projection, they
 * still show up (never dropped silently) but sort last and the board flags
 * `dataIncomplete` so the UI can say so instead of implying a clean ranking.
 */
export function rankPosition(
  position: Position,
  candidates: RosterPlayer[],
  defenseRankings: DefenseRanking[]
): StartSitBoard {
  const defenseByTeam = new Map(
    defenseRankings
      .filter((d) => d.position === position)
      .map((d) => [d.team, d])
  );

  const recommendations: StartSitRecommendation[] = candidates.map((player) => {
    const defense = player.opponent ? defenseByTeam.get(player.opponent) : undefined;
    const reasoning: string[] = [];

    let score: number;
    if (player.weekProjection === null) {
      score = -Infinity;
      reasoning.push("No ESPN projection is available for this player this week.");
    } else {
      score = player.weekProjection;
      reasoning.push(`Projected for ${player.weekProjection.toFixed(1)} points this week.`);

      if (defense) {
        // Nudge the projection by how far the opposing defense's rank sits
        // from league-average (16.5, since rank 1 = toughest/fewest points
        // allowed and rank 32 = easiest/most points allowed), scaled modestly
        // so matchup context informs the order without swamping the projection.
        const ranksFromAverage = defense.rank - 16.5; // positive = generous defense (favorable)
        const adjustment = ranksFromAverage * 0.15;
        score += adjustment;
        reasoning.push(
          `${player.opponent} ranks #${defense.rank} of 32 defenses against ${position} this season (${defenseRankLabel(
            defense.rank
          )}), averaging ${defense.avgPointsAllowedPpr.toFixed(1)} PPR pts/game allowed to the position.`
        );
      } else if (player.opponent) {
        reasoning.push(`No matchup data yet for ${player.opponent} vs ${position} — projection used as-is.`);
      } else {
        reasoning.push("No opponent found this week (bye week or unresolved schedule) — projection used as-is.");
      }
    }

    if (player.injuryStatus !== "ACTIVE" && player.injuryStatus !== "UNKNOWN") {
      reasoning.push(`Injury status: ${player.injuryStatus}.`);
      if (player.injuryStatus === "OUT" || player.injuryStatus === "IR") {
        score = -Infinity;
        reasoning.push("Ruled out — excluded from the top of the ranking regardless of projection.");
      }
    }

    return {
      player,
      score,
      reasoning,
      matchup: {
        opponent: player.opponent,
        defenseRank: defense?.rank ?? null,
        defenseRankLabel: defense ? defenseRankLabel(defense.rank) : null,
      },
    };
  });

  recommendations.sort((a, b) => b.score - a.score);

  const dataIncomplete = candidates.every((p) => p.weekProjection === null);

  return { position, recommendations, dataIncomplete };
}

export function buildStartSitBoards(
  roster: RosterPlayer[],
  defenseRankings: DefenseRanking[],
  positions: Position[] = ["QB", "RB", "WR", "TE", "K", "DST"]
): StartSitBoard[] {
  return positions
    .map((position) => {
      const candidates = roster.filter((p) => p.position === position);
      if (candidates.length === 0) return null;
      return rankPosition(position, candidates, defenseRankings);
    })
    .filter((b): b is StartSitBoard => b !== null);
}
