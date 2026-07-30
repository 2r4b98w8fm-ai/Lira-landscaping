"use client";

import { useEffect, useMemo, useState } from "react";
import { NotConnectedBanner } from "@/components/NotConnectedBanner";
import { BreakoutRow } from "@/components/BreakoutRow";
import { FLEX_ELIGIBLE, type Position } from "@/lib/constants";
import type { BreakoutEntry, TeamSnapSummary } from "@/lib/breakouts/context";

interface BreakoutsResponse {
  connected: boolean;
  teamSelected?: boolean;
  myTeamId?: number;
  entries?: BreakoutEntry[];
  teamSnapCounts?: TeamSnapSummary[];
}

const FILTERS = ["ALL", ...FLEX_ELIGIBLE] as const;
type Filter = (typeof FILTERS)[number];

export default function BreakoutsPage() {
  const [data, setData] = useState<BreakoutsResponse | null>(null);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [showTeamSnaps, setShowTeamSnaps] = useState(false);

  useEffect(() => {
    fetch("/api/league/breakouts")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const filtered = useMemo(() => {
    const entries = data?.entries ?? [];
    if (filter === "ALL") return entries;
    return entries.filter((e) => e.player.position === (filter as Position));
  }, [data, filter]);

  if (!data) return <p className="text-slate-500">Scanning usage data for breakout candidates…</p>;
  if (!data.connected) return <NotConnectedBanner reason="not_connected" />;
  if (!data.teamSelected) return <NotConnectedBanner reason="no_team_selected" />;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h1 className="text-xl font-extrabold text-slate-900">Breakouts</h1>
        <p className="mt-1 text-sm text-slate-500">
          Every RB/WR/TE in the league — rostered and free agent — scored for breakout likelihood from real
          usage data: snap-share trend, touch trend, efficiency vs the position average, and production
          lagging role (a classic pre-breakout sign). This is a transparent weighted-signal score, not a
          calibrated statistical probability — there's no labeled "did they break out" dataset to calibrate
          one against, so every point is explained instead of hidden behind a black box. Needs 5+ games of
          history before it will score a player at all.
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
        {filtered.length === 0 && <p className="text-sm text-slate-500">No players at this position yet.</p>}
        {filtered.map((entry) => (
          <BreakoutRow key={entry.player.espnPlayerId} entry={entry} isMyTeam={entry.rosteredByTeamId === data.myTeamId} />
        ))}
      </div>

      {data.teamSnapCounts && data.teamSnapCounts.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <button
            type="button"
            onClick={() => setShowTeamSnaps((s) => !s)}
            className="text-sm font-semibold text-slate-900 hover:text-brand-600"
          >
            {showTeamSnaps ? "Hide" : "Show"} team offensive snap counts ({data.teamSnapCounts.length} teams)
          </button>
          {showTeamSnaps && (
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-3 md:grid-cols-4">
              {data.teamSnapCounts.map((t) => (
                <div key={t.team} className="flex justify-between border-b border-slate-100 py-1">
                  <span className="font-medium text-slate-700">{t.team}</span>
                  <span className="font-mono tabular-nums text-slate-500">
                    {t.avgSnapsPerGame.toFixed(0)}/gm ({t.gamesTracked}g)
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
