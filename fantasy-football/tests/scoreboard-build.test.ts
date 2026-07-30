import { describe, expect, it } from "vitest";
import { buildScoreboard } from "@/lib/scoreboard/build";
import type { MappedMatchup } from "@/lib/espn/mappers";

const teams = [
  { id: 1, name: "Team A" },
  { id: 2, name: "Team B" },
  { id: 3, name: "Team C" },
  { id: 4, name: "Team D" },
];

describe("buildScoreboard", () => {
  it("joins matchup scores with real team names for the requested week", () => {
    const matchups: MappedMatchup[] = [
      { week: 5, homeTeamId: 1, awayTeamId: 2, homeScore: 88.4, awayScore: 76.2 },
      { week: 5, homeTeamId: 3, awayTeamId: 4, homeScore: null, awayScore: null },
    ];

    const board = buildScoreboard(matchups, teams, 5, 5);
    expect(board).toHaveLength(2);
    expect(board[0]).toMatchObject({ homeTeamName: "Team A", awayTeamName: "Team B", homeScore: 88.4, awayScore: 76.2 });
  });

  it("labels a week before the current one as final", () => {
    const matchups: MappedMatchup[] = [{ week: 3, homeTeamId: 1, awayTeamId: 2, homeScore: 100, awayScore: 90 }];
    const [row] = buildScoreboard(matchups, teams, 3, 5);
    expect(row?.timing).toBe("final");
  });

  it("labels the current week as live", () => {
    const matchups: MappedMatchup[] = [{ week: 5, homeTeamId: 1, awayTeamId: 2, homeScore: 40, awayScore: null }];
    const [row] = buildScoreboard(matchups, teams, 5, 5);
    expect(row?.timing).toBe("live");
    expect(row?.awayScore).toBeNull();
  });

  it("labels a future week as upcoming", () => {
    const matchups: MappedMatchup[] = [{ week: 8, homeTeamId: 1, awayTeamId: 2, homeScore: null, awayScore: null }];
    const [row] = buildScoreboard(matchups, teams, 8, 5);
    expect(row?.timing).toBe("upcoming");
  });

  it("falls back to a placeholder name for a team id it can't resolve", () => {
    const matchups: MappedMatchup[] = [{ week: 5, homeTeamId: 99, awayTeamId: 2, homeScore: null, awayScore: null }];
    const [row] = buildScoreboard(matchups, teams, 5, 5);
    expect(row?.homeTeamName).toBe("Unknown Team");
  });
});
