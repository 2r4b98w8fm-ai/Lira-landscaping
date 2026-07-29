import { describe, expect, it } from "vitest";
import { computeAllPlayRecords, type PlayedMatchup } from "@/lib/analytics/allPlay";
import { computePowerRankings, type TeamRecordInput } from "@/lib/analytics/powerRankings";

describe("computeAllPlayRecords", () => {
  it("counts a team's all-play wins as beating every other team's score that week", () => {
    const matchups: PlayedMatchup[] = [
      { week: 1, homeTeamId: 1, awayTeamId: 2, homeScore: 120, awayScore: 100 },
      { week: 1, homeTeamId: 3, awayTeamId: 4, homeScore: 90, awayScore: 80 },
    ];
    const records = computeAllPlayRecords(matchups, [1, 2, 3, 4]);
    // Team 1 scored 120, highest of the week -> beats all 3 others.
    expect(records.get(1)).toEqual({ wins: 3, losses: 0, ties: 0, gamesPlayed: 1 });
    // Team 4 scored 80, lowest -> loses to all 3 others.
    expect(records.get(4)).toEqual({ wins: 0, losses: 3, ties: 0, gamesPlayed: 1 });
  });

  it("accumulates across multiple played weeks", () => {
    const matchups: PlayedMatchup[] = [
      { week: 1, homeTeamId: 1, awayTeamId: 2, homeScore: 100, awayScore: 90 },
      { week: 2, homeTeamId: 1, awayTeamId: 2, homeScore: 80, awayScore: 95 },
    ];
    const records = computeAllPlayRecords(matchups, [1, 2]);
    expect(records.get(1)).toEqual({ wins: 1, losses: 1, ties: 0, gamesPlayed: 2 });
  });

  it("records a tie when two teams score exactly the same", () => {
    const matchups: PlayedMatchup[] = [{ week: 1, homeTeamId: 1, awayTeamId: 2, homeScore: 100, awayScore: 100 }];
    const records = computeAllPlayRecords(matchups, [1, 2]);
    expect(records.get(1)?.ties).toBe(1);
  });
});

function team(partial: Partial<TeamRecordInput>): TeamRecordInput {
  return {
    teamId: 1,
    teamName: "Team",
    wins: 5,
    losses: 3,
    ties: 0,
    pointsFor: 900,
    pointsAgainst: 850,
    ...partial,
  };
}

describe("computePowerRankings", () => {
  it("ranks a team with a better record, more points, and a better all-play record first", () => {
    const teams = [
      team({ teamId: 1, teamName: "Strong", wins: 7, losses: 1, pointsFor: 1100 }),
      team({ teamId: 2, teamName: "Weak", wins: 2, losses: 6, pointsFor: 750 }),
    ];
    const allPlay = new Map([
      [1, { wins: 14, losses: 2, ties: 0, gamesPlayed: 8 }],
      [2, { wins: 3, losses: 13, ties: 0, gamesPlayed: 8 }],
    ]);
    const ranked = computePowerRankings(teams, allPlay);
    expect(ranked[0]?.teamId).toBe(1);
    expect(ranked[0]?.rank).toBe(1);
    expect(ranked[1]?.rank).toBe(2);
  });

  it("flags a team with a good record but a losing all-play record as lucky", () => {
    const teams = [team({ teamId: 1, wins: 6, losses: 2, pointsFor: 800 })];
    // All-play record shows they'd be well under .500 against the full field.
    const allPlay = new Map([[1, { wins: 8, losses: 24, ties: 0, gamesPlayed: 8 }]]);
    const [ranking] = computePowerRankings(teams, allPlay);
    expect(ranking?.luckWins).toBeGreaterThan(0);
    expect(ranking?.reasoning.some((r) => r.includes("good fortune"))).toBe(true);
  });

  it("reports trend as null with no prior snapshot, and as a signed delta when one exists", () => {
    const teams = [team({ teamId: 1 }), team({ teamId: 2, wins: 1, losses: 7, pointsFor: 500 })];
    const allPlay = new Map([
      [1, { wins: 5, losses: 3, ties: 0, gamesPlayed: 8 }],
      [2, { wins: 3, losses: 5, ties: 0, gamesPlayed: 8 }],
    ]);

    const noHistory = computePowerRankings(teams, allPlay);
    expect(noHistory.every((r) => r.trend === null)).toBe(true);

    // Team 1 was previously ranked 2nd; it's now ranked 1st -> moved up 1 spot.
    const withHistory = computePowerRankings(teams, allPlay, new Map([[1, 2], [2, 1]]));
    const team1 = withHistory.find((r) => r.teamId === 1)!;
    expect(team1.trend).toBe(1);
  });
});
