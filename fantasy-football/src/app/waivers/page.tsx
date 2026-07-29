"use client";

import { useEffect, useState } from "react";
import { NotConnectedBanner } from "@/components/NotConnectedBanner";
import { WaiverBoard } from "@/components/WaiverBoard";
import type { WaiverRecommendation } from "@/types/domain";

interface WaiversResponse {
  connected: boolean;
  teamSelected?: boolean;
  available?: boolean;
  reason?: string;
  recommendations?: WaiverRecommendation[];
}

export default function WaiversPage() {
  const [data, setData] = useState<WaiversResponse | null>(null);

  useEffect(() => {
    fetch("/api/league/waivers")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="text-slate-400">Scanning the waiver wire…</p>;
  if (!data.connected) return <NotConnectedBanner reason="not_connected" />;
  if (!data.teamSelected) return <NotConnectedBanner reason="no_team_selected" />;
  if (!data.available) return <p className="text-slate-400">{data.reason}</p>;

  const byPosition = new Map<string, WaiverRecommendation[]>();
  for (const rec of data.recommendations ?? []) {
    const list = byPosition.get(rec.player.position) ?? [];
    list.push(rec);
    byPosition.set(rec.player.position, list);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Waiver Wire</h1>
        <p className="text-sm text-slate-400">
          Ranked by rest-of-season projected value added over your current worst starter at each
          position — not just "who&apos;s available," but who&apos;s actually an upgrade.
        </p>
      </div>
      {byPosition.size === 0 ? (
        <p className="text-slate-400">No free agents with usable data right now.</p>
      ) : (
        Array.from(byPosition.entries()).map(([position, recs]) => (
          <WaiverBoard key={position} position={position} recs={recs.slice(0, 10)} />
        ))
      )}
    </div>
  );
}
