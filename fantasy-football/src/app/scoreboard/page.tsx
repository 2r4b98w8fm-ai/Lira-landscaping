"use client";

import { useState } from "react";
import { NotConnectedBanner } from "@/components/NotConnectedBanner";
import { ScoreboardRow } from "@/components/ScoreboardRow";
import type { ScoreboardMatchup } from "@/lib/scoreboard/build";
import { DATA_POLL_INTERVAL_MS, useAutoRefresh } from "@/lib/hooks/useAutoRefresh";

interface ScoreboardResponse {
  connected: boolean;
  teamSelected?: boolean;
  available?: boolean;
  reason?: string;
  myTeamId?: number;
  currentWeek?: number;
  matchups?: ScoreboardMatchup[];
}

export default function ScoreboardPage() {
  const [data, setData] = useState<ScoreboardResponse | null>(null);

  useAutoRefresh(() => {
    fetch("/api/league/scoreboard")
      .then((res) => res.json())
      .then(setData);
  }, DATA_POLL_INTERVAL_MS);

  if (!data) return <p className="text-slate-500">Loading this week's matchups…</p>;
  if (!data.connected) return <NotConnectedBanner reason="not_connected" />;
  if (!data.teamSelected) return <NotConnectedBanner reason="no_team_selected" />;
  if (!data.available) return <p className="text-slate-500">{data.reason}</p>;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h1 className="text-xl font-extrabold text-slate-900">Scoreboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Every matchup in the league for week {data.currentWeek} — real scores straight from ESPN,
          refreshing automatically every 45s (and your league re-syncs from ESPN every 60s in the
          background, so this updates as games happen). A blank score means that side hasn't posted
          any points yet, not that it's actually zero.
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {(data.matchups ?? []).map((m) => (
          <ScoreboardRow key={`${m.homeTeamId}-${m.awayTeamId}`} matchup={m} myTeamId={data.myTeamId ?? null} />
        ))}
      </div>
    </div>
  );
}
