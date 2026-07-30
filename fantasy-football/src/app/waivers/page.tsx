"use client";

import { useState } from "react";
import { NotConnectedBanner } from "@/components/NotConnectedBanner";
import { WaiverBoard } from "@/components/WaiverBoard";
import type { WaiverRecommendation } from "@/types/domain";
import { DATA_POLL_INTERVAL_MS, useAutoRefresh } from "@/lib/hooks/useAutoRefresh";

interface WaiversResponse {
  connected: boolean;
  teamSelected?: boolean;
  available?: boolean;
  reason?: string;
  recommendations?: WaiverRecommendation[];
}

export default function WaiversPage() {
  const [data, setData] = useState<WaiversResponse | null>(null);

  useAutoRefresh(() => {
    fetch("/api/league/waivers")
      .then((res) => res.json())
      .then(setData);
  }, DATA_POLL_INTERVAL_MS);

  if (!data) return <p className="text-slate-500">Scanning the waiver wire…</p>;
  if (!data.connected) return <NotConnectedBanner reason="not_connected" />;
  if (!data.teamSelected) return <NotConnectedBanner reason="no_team_selected" />;
  if (!data.available) return <p className="text-slate-500">{data.reason}</p>;

  const byPosition = new Map<string, WaiverRecommendation[]>();
  for (const rec of data.recommendations ?? []) {
    const list = byPosition.get(rec.player.position) ?? [];
    list.push(rec);
    byPosition.set(rec.player.position, list);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h1 className="text-xl font-extrabold text-slate-900">Waiver Wire</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ranked by rest-of-season projected value added over your current worst starter at each
          position — not just "who&apos;s available," but who&apos;s actually an upgrade.
        </p>
      </div>
      {byPosition.size === 0 ? (
        <p className="text-slate-500">No free agents with usable data right now.</p>
      ) : (
        Array.from(byPosition.entries()).map(([position, recs]) => (
          <WaiverBoard key={position} position={position} recs={recs.slice(0, 10)} />
        ))
      )}
    </div>
  );
}
