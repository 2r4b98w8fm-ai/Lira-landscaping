import { describe, expect, it } from "vitest";
import { getActiveLeague, withActiveLeagueUpdated, withLeagueAdded, type SessionData } from "@/lib/session";

function emptySession(): SessionData {
  return { leagues: [], activeIndex: 0 };
}

describe("withLeagueAdded", () => {
  it("adds a new league and makes it active", () => {
    const session = withLeagueAdded(emptySession(), { espnLeagueId: "111", season: 2026, myTeamId: null });
    expect(session.leagues).toHaveLength(1);
    expect(session.activeIndex).toBe(0);
    expect(getActiveLeague(session)?.espnLeagueId).toBe("111");
  });

  it("appends a second league without disturbing the first, and makes the new one active", () => {
    let session = withLeagueAdded(emptySession(), { espnLeagueId: "111", season: 2026, myTeamId: 1 });
    session = withLeagueAdded(session, { espnLeagueId: "222", season: 2026, myTeamId: null });
    expect(session.leagues).toHaveLength(2);
    expect(session.activeIndex).toBe(1);
    expect(session.leagues[0]).toMatchObject({ espnLeagueId: "111", myTeamId: 1 });
  });

  it("updates an already-connected league in place instead of duplicating it", () => {
    let session = withLeagueAdded(emptySession(), { espnLeagueId: "111", season: 2026, myTeamId: null, name: "Old Name" });
    session = withLeagueAdded(session, { espnLeagueId: "111", season: 2026, myTeamId: null, name: "New Name" });
    expect(session.leagues).toHaveLength(1);
    expect(session.leagues[0]?.name).toBe("New Name");
  });
});

describe("withActiveLeagueUpdated", () => {
  it("patches only the active league, leaving others untouched", () => {
    let session = withLeagueAdded(emptySession(), { espnLeagueId: "111", season: 2026, myTeamId: null });
    session = withLeagueAdded(session, { espnLeagueId: "222", season: 2026, myTeamId: null });
    session = { ...session, activeIndex: 0 };
    session = withActiveLeagueUpdated(session, { myTeamId: 5 });
    expect(session.leagues[0]?.myTeamId).toBe(5);
    expect(session.leagues[1]?.myTeamId).toBeNull();
  });
});

describe("getActiveLeague", () => {
  it("returns null when there are no connected leagues", () => {
    expect(getActiveLeague(emptySession())).toBeNull();
  });
});
