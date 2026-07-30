"use client";

import { useState } from "react";
import { NotConnectedBanner } from "@/components/NotConnectedBanner";
import { PowerRankingRow } from "@/components/PowerRankingRow";
import type { PowerRanking } from "@/types/domain";
import { DATA_POLL_INTERVAL_MS, useAutoRefresh } from "@/lib/hooks/useAutoRefresh";

interface PowerRankingsResponse {
  connected: boolean;
  teamSelected?: boolean;
  myTeamId?: number;
  rankings?: PowerRanking[];
}

export default function PowerRankingsPage() {
  const [data, setData] = useState<PowerRankingsResponse | null>(null);

  useAutoRefresh(() => {
    fetch("/api/league/power-rankings")
      .then((res) => res.json())
      .then(setData);
  }, DATA_POLL_INTERVAL_MS);

  if (!data) return <p className="text-slate-500">Crunching the standings…</p>;
  if (!data.connected) return <NotConnectedBanner reason="not_connected" />;
  if (!data.teamSelected) return <NotConnectedBanner reason="no_team_selected" />;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h1 className="text-xl font-extrabold text-slate-900">Power Rankings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Composite of record, points scored, and all-play win% (how you&apos;d do against every
          team, every week) — not just standings, which a personally easy or hard schedule can
          skew. All-play record and points against show whether a record is backed by real scoring
          or running lucky.
        </p>
      </div>
      <div className="space-y-2">
        {(data.rankings ?? []).map((r) => (
          <PowerRankingRow key={r.teamId} ranking={r} isMyTeam={r.teamId === data.myTeamId} />
        ))}
      </div>
    </div>
  );
}
