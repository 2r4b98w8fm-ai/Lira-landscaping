"use client";

import { useMemo, useState } from "react";
import { NotConnectedBanner } from "@/components/NotConnectedBanner";
import { RankingRow } from "@/components/RankingRow";
import { POSITIONS, type Position } from "@/lib/constants";
import type { RankedPlayer } from "@/lib/rankings/build";
import { DATA_POLL_INTERVAL_MS, useAutoRefresh } from "@/lib/hooks/useAutoRefresh";

interface RankingsResponse {
  connected: boolean;
  teamSelected?: boolean;
  myTeamId?: number;
  rankings?: RankedPlayer[];
}

const FILTERS = ["ALL", ...POSITIONS] as const;
type Filter = (typeof FILTERS)[number];

export default function RankingsPage() {
  const [data, setData] = useState<RankingsResponse | null>(null);
  const [filter, setFilter] = useState<Filter>("ALL");

  useAutoRefresh(() => {
    fetch("/api/league/rankings")
      .then((res) => res.json())
      .then(setData);
  }, DATA_POLL_INTERVAL_MS);

  const filtered = useMemo(() => {
    const rankings = data?.rankings ?? [];
    if (filter === "ALL") return rankings;
    return rankings.filter((r) => r.player.position === (filter as Position));
  }, [data, filter]);

  if (!data) return <p className="text-slate-500">Ranking every player in the league…</p>;
  if (!data.connected) return <NotConnectedBanner reason="not_connected" />;
  if (!data.teamSelected) return <NotConnectedBanner reason="no_team_selected" />;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h1 className="text-xl font-extrabold text-slate-900">Rankings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Every rostered player and free agent in this league, ranked by the same trade-value math used
          everywhere else — value over a real replacement level, adjusted for injury and schedule. Not a
          separate outside opinion; the same numbers, applied to the whole league.
        </p>
      </div>

      <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1 text-sm">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-3 py-1.5 font-medium transition ${
              filter === f ? "bg-white text-brand-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((r) => (
          <RankingRow key={r.player.espnPlayerId} ranking={r} isMyTeam={r.rosteredByTeamId === data.myTeamId} />
        ))}
      </div>
    </div>
  );
}
