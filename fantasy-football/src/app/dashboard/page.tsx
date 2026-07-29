"use client";

import { useEffect, useState } from "react";
import { NotConnectedBanner } from "@/components/NotConnectedBanner";
import { RosterTable } from "@/components/RosterTable";
import { InjuryWatchPanel } from "@/components/InjuryWatchPanel";
import { NotificationSettings } from "@/components/NotificationSettings";
import type { RosterPlayer } from "@/types/domain";

interface RosterResponse {
  connected: boolean;
  teamSelected?: boolean;
  leagueName?: string;
  lastSyncedAt?: string | null;
  roster?: RosterPlayer[];
}

export default function DashboardPage() {
  const [data, setData] = useState<RosterResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/league/roster");
    setData(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function refresh() {
    setSyncing(true);
    await fetch("/api/league/sync", { method: "POST" });
    await load();
    setSyncing(false);
  }

  if (loading) {
    return <p className="text-slate-500">Loading your roster…</p>;
  }

  if (!data?.connected) {
    return <NotConnectedBanner reason="not_connected" />;
  }
  if (!data.teamSelected) {
    return <NotConnectedBanner reason="no_team_selected" />;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">{data.leagueName}</h1>
          <p className="text-xs text-slate-500">
            Last synced from ESPN:{" "}
            {data.lastSyncedAt ? new Date(data.lastSyncedAt).toLocaleString() : "never"}
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={syncing}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
        >
          {syncing ? "Refreshing…" : "Refresh from ESPN"}
        </button>
      </div>
      {data.roster && data.roster.length > 0 ? (
        <>
          <InjuryWatchPanel roster={data.roster} />
          <RosterTable roster={data.roster} />
        </>
      ) : (
        <p className="text-slate-500">This roster came back empty — try refreshing.</p>
      )}
      <NotificationSettings />
    </div>
  );
}
