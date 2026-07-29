import { afterEach, describe, expect, it, vi } from "vitest";
import { EspnApiError, fetchProTeamSchedulesRaw } from "@/lib/espn/client";

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

describe("espnFetch retry behavior", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("retries a transient 503 and succeeds on the next attempt", async () => {
    let calls = 0;
    const fetchMock = vi.fn(async () => {
      calls++;
      if (calls === 1) return jsonResponse(503, {});
      return jsonResponse(200, { settings: { proTeams: [] } });
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchProTeamSchedulesRaw(2026, {});
    expect(calls).toBe(2);
    expect(result).toEqual({ settings: { proTeams: [] } });
  });

  it("does not retry a permanent 401 (bad credentials) — fails on the first attempt", async () => {
    let calls = 0;
    const fetchMock = vi.fn(async () => {
      calls++;
      return jsonResponse(401, {});
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchProTeamSchedulesRaw(2026, {})).rejects.toThrow(EspnApiError);
    expect(calls).toBe(1);
  });

  it("does not retry a permanent 404 (league not found)", async () => {
    let calls = 0;
    const fetchMock = vi.fn(async () => {
      calls++;
      return jsonResponse(404, {});
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchProTeamSchedulesRaw(2026, {})).rejects.toThrow("League not found");
    expect(calls).toBe(1);
  });

  it("gives up after the max attempts on repeated transient failures", async () => {
    let calls = 0;
    const fetchMock = vi.fn(async () => {
      calls++;
      return jsonResponse(500, {});
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchProTeamSchedulesRaw(2026, {})).rejects.toThrow(EspnApiError);
    expect(calls).toBe(3); // MAX_ATTEMPTS
  });
});
