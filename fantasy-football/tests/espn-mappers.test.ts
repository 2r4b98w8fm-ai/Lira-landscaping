import { describe, expect, it } from "vitest";
import {
  MappingWarnings,
  mapFreeAgents,
  mapLeagueSummary,
  mapRosterPlayers,
  mapStartingSlotCounts,
} from "@/lib/espn/mappers";
import type { EspnFreeAgentsResponse, EspnLeagueResponse } from "@/lib/espn/types";
import fixture from "./fixtures/espn-league-sample.json";

describe("mapLeagueSummary", () => {
  it("maps league name, teams, and records from a realistic ESPN payload", () => {
    const warnings = new MappingWarnings();
    const league = mapLeagueSummary(
      fixture as EspnLeagueResponse,
      "123456",
      2026,
      warnings
    );

    expect(league.name).toBe("The League of Ordinary Gentlemen");
    expect(league.teams).toHaveLength(2);
    expect(league.teams[0]).toMatchObject({
      espnTeamId: 1,
      name: "Gridiron Gang",
      wins: 3,
      losses: 1,
    });
    // Team 2 has no `name`, only location/nickname — mapper should join them.
    expect(league.teams[1]?.name).toBe("Fumble Squad");
    expect(warnings.messages).toHaveLength(0);
  });

  it("falls back gracefully when settings/name is missing entirely", () => {
    const warnings = new MappingWarnings();
    const broken = { id: 999, teams: [] } as EspnLeagueResponse;
    const league = mapLeagueSummary(broken, "999", 2026, warnings);
    expect(league.name).toBe("League 999");
    expect(league.teams).toEqual([]);
  });
});

describe("mapRosterPlayers", () => {
  it("extracts weekly projection and season total from the stats array", () => {
    const warnings = new MappingWarnings();
    const team = fixture.teams[0] as any;
    const players = mapRosterPlayers(team, 4, new Map(), warnings);

    const allen = players.find((p) => p.name === "Josh Allen");
    expect(allen).toBeDefined();
    expect(allen?.position).toBe("QB");
    expect(allen?.weekProjection).toBe(24.7);
    expect(allen?.seasonPoints).toBe(88.3);
    expect(allen?.lineupSlot).toBe("QB");
  });

  it("never fabricates a projection when ESPN doesn't provide one", () => {
    const warnings = new MappingWarnings();
    const team = fixture.teams[0] as any;
    const players = mapRosterPlayers(team, 4, new Map(), warnings);

    const backup = players.find((p) => p.name === "Some Backup");
    expect(backup?.weekProjection).toBeNull();
    expect(backup?.seasonPoints).toBeNull();
    // Unknown proTeamId (99) degrades to "FA" instead of throwing.
    expect(backup?.nflTeam).toBe("FA");
  });

  it("resolves opponent from the pro team schedule map", () => {
    const warnings = new MappingWarnings();
    const team = fixture.teams[0] as any;
    // Buffalo (proTeamId 2) opponent this week is Miami (proTeamId 15).
    const opponentMap = new Map([[2, 15]]);
    const players = mapRosterPlayers(team, 4, opponentMap, warnings);

    const allen = players.find((p) => p.name === "Josh Allen");
    expect(allen?.opponent).toBe("MIA");
  });

  it("skips a malformed entry instead of crashing the whole roster", () => {
    const warnings = new MappingWarnings();
    const malformedTeam = {
      id: 1,
      roster: {
        entries: [
          { playerId: 1, lineupSlotId: 0, playerPoolEntry: { player: { id: 1, fullName: "OK Guy", defaultPositionId: 1 } } },
          { playerId: 2, lineupSlotId: 0, playerPoolEntry: { player: { id: 2 } } }, // no fullName -> skipped
        ],
      },
    } as any;

    const players = mapRosterPlayers(malformedTeam, 4, new Map(), warnings);
    expect(players).toHaveLength(1);
    expect(players[0]?.name).toBe("OK Guy");
  });

  it("prefers ESPN's own rest-of-season projection when present", () => {
    const warnings = new MappingWarnings();
    const team = fixture.teams[0] as any;
    const players = mapRosterPlayers(team, 4, new Map(), warnings);

    const projected = players.find((p) => p.name === "Season Projected Guy");
    expect(projected?.restOfSeasonSource).toBe("espn");
    expect(projected?.restOfSeasonProjection).toBe(200); // 300 season total - 100 already scored
  });

  it("falls back to a season-pace estimate when ESPN has no ROS projection, and labels it as such", () => {
    const warnings = new MappingWarnings();
    const team = fixture.teams[0] as any;
    const players = mapRosterPlayers(team, 4, new Map(), warnings);

    const allen = players.find((p) => p.name === "Josh Allen");
    expect(allen?.restOfSeasonSource).toBe("pace_estimate");
    // 88.3 pts over 3 played weeks (week 4 means 3 prior weeks) * 14 remaining weeks
    expect(allen?.restOfSeasonProjection).toBeCloseTo((88.3 / 3) * 14, 2);
  });

  it("never estimates a rest-of-season projection with no season data at all", () => {
    const warnings = new MappingWarnings();
    const team = fixture.teams[0] as any;
    const players = mapRosterPlayers(team, 4, new Map(), warnings);

    const backup = players.find((p) => p.name === "Some Backup");
    expect(backup?.restOfSeasonProjection).toBeNull();
    expect(backup?.restOfSeasonSource).toBeNull();
  });
});

describe("mapStartingSlotCounts", () => {
  it("reads real starting requirements from league settings", () => {
    const warnings = new MappingWarnings();
    const counts = mapStartingSlotCounts(fixture as EspnLeagueResponse, warnings);
    expect(counts).toEqual({ QB: 1, RB: 2, WR: 2, TE: 1, DST: 1, K: 1, FLEX: 1 });
    expect(warnings.messages).toHaveLength(0);
  });

  it("falls back to a standard default and warns when settings are missing", () => {
    const warnings = new MappingWarnings();
    const counts = mapStartingSlotCounts({ id: 1 } as EspnLeagueResponse, warnings);
    expect(counts).toEqual({ QB: 1, RB: 2, WR: 2, TE: 1, FLEX: 1, K: 1, DST: 1 });
    expect(warnings.messages.length).toBeGreaterThan(0);
  });
});

describe("mapFreeAgents", () => {
  it("maps the free-agent pool with an FA lineup slot and no warnings on a clean response", () => {
    const warnings = new MappingWarnings();
    const raw: EspnFreeAgentsResponse = {
      players: [
        {
          player: {
            id: 9001,
            fullName: "Waiver Wire Wonder",
            defaultPositionId: 4,
            proTeamId: 9,
            injuryStatus: "ACTIVE",
            stats: [{ scoringPeriodId: 4, statSourceId: 1, statSplitTypeId: 1, appliedTotal: 8.5 }],
          },
        },
      ],
    };
    const pool = mapFreeAgents(raw, 4, new Map(), warnings);
    expect(pool).toHaveLength(1);
    expect(pool[0]).toMatchObject({ name: "Waiver Wire Wonder", position: "TE", lineupSlot: "FA", weekProjection: 8.5 });
    expect(warnings.messages).toHaveLength(0);
  });

  it("degrades to an empty pool with a warning rather than throwing when the shape is missing", () => {
    const warnings = new MappingWarnings();
    const pool = mapFreeAgents({}, 4, new Map(), warnings);
    expect(pool).toEqual([]);
    expect(warnings.messages.length).toBeGreaterThan(0);
  });

  it("skips a malformed free agent entry instead of crashing the whole pool", () => {
    const warnings = new MappingWarnings();
    const raw: EspnFreeAgentsResponse = {
      players: [
        { player: { id: 1, fullName: "Good FA", defaultPositionId: 2 } },
        { player: { id: 2 } }, // no fullName -> skipped
      ],
    };
    const pool = mapFreeAgents(raw, 4, new Map(), warnings);
    expect(pool).toHaveLength(1);
    expect(pool[0]?.name).toBe("Good FA");
  });
});
