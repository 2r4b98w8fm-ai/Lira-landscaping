import { describe, expect, it } from "vitest";
import { simulateSeason, type TeamStanding, type ScheduledMatchup } from "@/lib/simulation/monteCarlo";

const NUM_SIMULATIONS = 3000;

describe("simulateSeason", () => {
  it("always sends exactly playoffTeamCount teams to the playoffs, every simulation", () => {
    const standings: TeamStanding[] = [
      { teamId: 1, teamName: "A", wins: 3, losses: 1, ties: 0, pointsFor: 400 },
      { teamId: 2, teamName: "B", wins: 2, losses: 2, ties: 0, pointsFor: 380 },
      { teamId: 3, teamName: "C", wins: 2, losses: 2, ties: 0, pointsFor: 370 },
      { teamId: 4, teamName: "D", wins: 1, losses: 3, ties: 0, pointsFor: 340 },
    ];
    const remainingMatchups: ScheduledMatchup[] = [
      { week: 5, homeTeamId: 1, awayTeamId: 2 },
      { week: 5, homeTeamId: 3, awayTeamId: 4 },
      { week: 6, homeTeamId: 1, awayTeamId: 3 },
      { week: 6, homeTeamId: 2, awayTeamId: 4 },
    ];
    const distributions = new Map([
      [1, { mean: 110, stdev: 15 }],
      [2, { mean: 100, stdev: 15 }],
      [3, { mean: 100, stdev: 15 }],
      [4, { mean: 90, stdev: 15 }],
    ]);

    const result = simulateSeason({
      standings,
      remainingMatchups,
      distributions,
      playoffTeamCount: 2,
      numSimulations: NUM_SIMULATIONS,
    });

    const totalPlayoffPct = result.teams.reduce((sum, t) => sum + t.playoffPct, 0);
    expect(totalPlayoffPct).toBeCloseTo(200, 0); // 2 playoff spots * 100%, every single sim

    expect(result.weeksRemaining).toBe(2);
  });

  it("gives a much stronger team a higher playoff probability than a much weaker one", () => {
    const standings: TeamStanding[] = [
      { teamId: 1, teamName: "Strong", wins: 2, losses: 0, ties: 0, pointsFor: 200 },
      { teamId: 2, teamName: "Weak", wins: 0, losses: 2, ties: 0, pointsFor: 120 },
      { teamId: 3, teamName: "Mid1", wins: 1, losses: 1, ties: 0, pointsFor: 160 },
      { teamId: 4, teamName: "Mid2", wins: 1, losses: 1, ties: 0, pointsFor: 155 },
    ];
    const remainingMatchups: ScheduledMatchup[] = [
      { week: 3, homeTeamId: 1, awayTeamId: 2 },
      { week: 3, homeTeamId: 3, awayTeamId: 4 },
      { week: 4, homeTeamId: 1, awayTeamId: 3 },
      { week: 4, homeTeamId: 2, awayTeamId: 4 },
    ];
    const distributions = new Map([
      [1, { mean: 140, stdev: 10 }], // Strong
      [2, { mean: 70, stdev: 10 }], // Weak
      [3, { mean: 100, stdev: 10 }],
      [4, { mean: 100, stdev: 10 }],
    ]);

    const result = simulateSeason({
      standings,
      remainingMatchups,
      distributions,
      playoffTeamCount: 2,
      numSimulations: NUM_SIMULATIONS,
    });

    const strong = result.teams.find((t) => t.teamId === 1)!;
    const weak = result.teams.find((t) => t.teamId === 2)!;
    expect(strong.playoffPct).toBeGreaterThan(weak.playoffPct);
    expect(strong.mostLikelySeed).toBe(1);
  });

  it("reports remainingSOS as null once a team has no games left, not a guessed value", () => {
    const standings: TeamStanding[] = [
      { teamId: 1, teamName: "A", wins: 5, losses: 0, ties: 0, pointsFor: 500 },
      { teamId: 2, teamName: "B", wins: 0, losses: 5, ties: 0, pointsFor: 300 },
    ];
    const result = simulateSeason({
      standings,
      remainingMatchups: [],
      distributions: new Map([
        [1, { mean: 120, stdev: 10 }],
        [2, { mean: 80, stdev: 10 }],
      ]),
      playoffTeamCount: 1,
      numSimulations: 500,
    });
    expect(result.teams.every((t) => t.remainingSOS === null)).toBe(true);
    // No games left to simulate -> final standings are already decided.
    expect(result.teams.find((t) => t.teamId === 1)?.playoffPct).toBe(100);
    expect(result.teams.find((t) => t.teamId === 2)?.playoffPct).toBe(0);
  });

  it("computes remainingSOS from real opponent means, not the team's own", () => {
    const standings: TeamStanding[] = [
      { teamId: 1, teamName: "A", wins: 0, losses: 0, ties: 0, pointsFor: 0 },
      { teamId: 2, teamName: "ToughOpponent", wins: 0, losses: 0, ties: 0, pointsFor: 0 },
    ];
    const result = simulateSeason({
      standings,
      remainingMatchups: [{ week: 1, homeTeamId: 1, awayTeamId: 2 }],
      distributions: new Map([
        [1, { mean: 100, stdev: 10 }],
        [2, { mean: 130, stdev: 10 }],
      ]),
      playoffTeamCount: 1,
      numSimulations: 500,
    });
    expect(result.teams.find((t) => t.teamId === 1)?.remainingSOS).toBe(130);
  });
});
