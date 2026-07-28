import { describe, expect, it } from "vitest";
import {
  MappingWarnings,
  mapLeagueSummary,
  mapRosterPlayers,
} from "@/lib/espn/mappers";
import type { EspnLeagueResponse } from "@/lib/espn/types";
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
});
