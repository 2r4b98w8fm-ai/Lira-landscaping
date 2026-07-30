import { afterEach, describe, expect, it, vi } from "vitest";
import { SleeperIngestError, fetchSleeperCrosswalk, fetchSleeperTrending } from "@/lib/sleeper/ingest";

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

describe("fetchSleeperCrosswalk", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("keeps only players with a resolvable numeric espn_id", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse(200, {
          "421": { espn_id: 4361529, gsis_id: "00-0036389", search_rank: 12 },
          "999": { espn_id: null, gsis_id: "00-0000001", search_rank: 500 },
          "1000": { gsis_id: "00-0000002" }, // no espn_id at all
        })
      )
    );

    const rows = await fetchSleeperCrosswalk();
    expect(rows).toEqual([{ espnPlayerId: 4361529, sleeperId: "421", gsisId: "00-0036389", searchRank: 12 }]);
  });

  it("throws SleeperIngestError on a non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse(500, {})));
    await expect(fetchSleeperCrosswalk()).rejects.toThrow(SleeperIngestError);
  });
});

describe("fetchSleeperTrending", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("maps player_id/count pairs for the requested direction", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        expect(url).toContain("/trending/add");
        return jsonResponse(200, [
          { player_id: "421", count: 5000 },
          { player_id: "888", count: 200 },
        ]);
      })
    );

    const rows = await fetchSleeperTrending("add");
    expect(rows).toEqual([
      { sleeperId: "421", count: 5000 },
      { sleeperId: "888", count: 200 },
    ]);
  });

  it("returns an empty list rather than throwing on a malformed body", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse(200, { unexpected: "shape" })));
    const rows = await fetchSleeperTrending("drop");
    expect(rows).toEqual([]);
  });
});
