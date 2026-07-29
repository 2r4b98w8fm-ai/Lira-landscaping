import type { SimulationResult, SimulationTeamResult } from "@/types/domain";

export interface TeamStanding {
  teamId: number;
  teamName: string;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
}

export interface ScheduledMatchup {
  week: number;
  homeTeamId: number;
  awayTeamId: number;
}

export interface TeamDistribution {
  mean: number;
  stdev: number;
}

export interface SimulateSeasonParams {
  standings: TeamStanding[];
  remainingMatchups: ScheduledMatchup[];
  distributions: Map<number, TeamDistribution>;
  playoffTeamCount: number;
  numSimulations?: number;
  /** Injectable RNG (uniform [0,1)) for deterministic tests. Defaults to Math.random. */
  random?: () => number;
}

const DEFAULT_SIMULATIONS = 5000;

/** Box-Muller transform: two uniforms -> one standard-normal sample. */
function sampleNormal(mean: number, stdev: number, rand: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return mean + z * stdev;
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const index = Math.min(sorted.length - 1, Math.max(0, Math.round(p * (sorted.length - 1))));
  return sorted[index] ?? 0;
}

/**
 * Simulates the rest of the regular season thousands of times, sampling
 * each remaining matchup's score from each team's real, data-derived weekly
 * distribution (see teamScore.ts), to produce playoff odds, a seed
 * distribution, and a projected win-total range — a probability spread,
 * never a single predicted outcome.
 */
export function simulateSeason(params: SimulateSeasonParams): SimulationResult {
  const {
    standings,
    remainingMatchups,
    distributions,
    playoffTeamCount,
    numSimulations = DEFAULT_SIMULATIONS,
    random = Math.random,
  } = params;

  const playoffCounts = new Map<number, number>();
  const seedCounts = new Map<number, Map<number, number>>();
  const winsSamples = new Map<number, number[]>();
  for (const team of standings) {
    playoffCounts.set(team.teamId, 0);
    seedCounts.set(team.teamId, new Map());
    winsSamples.set(team.teamId, []);
  }

  for (let sim = 0; sim < numSimulations; sim++) {
    const wins = new Map(standings.map((t) => [t.teamId, t.wins]));
    const pointsFor = new Map(standings.map((t) => [t.teamId, t.pointsFor]));

    for (const matchup of remainingMatchups) {
      const home = distributions.get(matchup.homeTeamId);
      const away = distributions.get(matchup.awayTeamId);
      if (!home || !away) continue;

      const homeScore = Math.max(0, sampleNormal(home.mean, home.stdev, random));
      const awayScore = Math.max(0, sampleNormal(away.mean, away.stdev, random));

      pointsFor.set(matchup.homeTeamId, (pointsFor.get(matchup.homeTeamId) ?? 0) + homeScore);
      pointsFor.set(matchup.awayTeamId, (pointsFor.get(matchup.awayTeamId) ?? 0) + awayScore);

      if (homeScore > awayScore) {
        wins.set(matchup.homeTeamId, (wins.get(matchup.homeTeamId) ?? 0) + 1);
      } else if (awayScore > homeScore) {
        wins.set(matchup.awayTeamId, (wins.get(matchup.awayTeamId) ?? 0) + 1);
      }
      // A true tie leaves both win counts unchanged — negligible with continuous scores.
    }

    const ranked = [...standings]
      .map((t) => ({ teamId: t.teamId, wins: wins.get(t.teamId) ?? 0, pointsFor: pointsFor.get(t.teamId) ?? 0 }))
      .sort((a, b) => (b.wins !== a.wins ? b.wins - a.wins : b.pointsFor - a.pointsFor));

    ranked.forEach((t, i) => {
      const seed = i + 1;
      winsSamples.get(t.teamId)?.push(t.wins);
      if (seed <= playoffTeamCount) {
        playoffCounts.set(t.teamId, (playoffCounts.get(t.teamId) ?? 0) + 1);
        const seeds = seedCounts.get(t.teamId)!;
        seeds.set(seed, (seeds.get(seed) ?? 0) + 1);
      }
    });
  }

  const opponentsByTeam = new Map<number, number[]>();
  for (const m of remainingMatchups) {
    opponentsByTeam.set(m.homeTeamId, [...(opponentsByTeam.get(m.homeTeamId) ?? []), m.awayTeamId]);
    opponentsByTeam.set(m.awayTeamId, [...(opponentsByTeam.get(m.awayTeamId) ?? []), m.homeTeamId]);
  }

  const teams: SimulationTeamResult[] = standings.map((team) => {
    const seeds = seedCounts.get(team.teamId) ?? new Map();
    const seedDistribution: Record<number, number> = {};
    let mostLikelySeed: number | null = null;
    let mostLikelyCount = 0;
    for (const [seed, count] of seeds) {
      const pct = (count / numSimulations) * 100;
      seedDistribution[seed] = pct;
      if (count > mostLikelyCount) {
        mostLikelyCount = count;
        mostLikelySeed = seed;
      }
    }

    const sortedWins = [...(winsSamples.get(team.teamId) ?? [])].sort((a, b) => a - b);

    const opponents = opponentsByTeam.get(team.teamId) ?? [];
    const remainingSOS =
      opponents.length > 0
        ? opponents.reduce((sum, id) => sum + (distributions.get(id)?.mean ?? 0), 0) / opponents.length
        : null;

    return {
      teamId: team.teamId,
      teamName: team.teamName,
      playoffPct: ((playoffCounts.get(team.teamId) ?? 0) / numSimulations) * 100,
      seedDistribution,
      mostLikelySeed,
      projectedWinsRange: {
        p10: percentile(sortedWins, 0.1),
        p50: percentile(sortedWins, 0.5),
        p90: percentile(sortedWins, 0.9),
      },
      remainingSOS,
    };
  });

  const weeksRemaining = new Set(remainingMatchups.map((m) => m.week)).size;

  return { numSimulations, weeksRemaining, teams };
}
