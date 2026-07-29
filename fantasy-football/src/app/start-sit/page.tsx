"use client";

import { useEffect, useState } from "react";
import { NotConnectedBanner } from "@/components/NotConnectedBanner";
import { StartSitBoard } from "@/components/StartSitBoard";
import type { StartSitBoard as StartSitBoardType } from "@/types/domain";

interface StartSitResponse {
  connected: boolean;
  teamSelected?: boolean;
  boards?: StartSitBoardType[];
  defenseDataAvailable?: boolean;
}

export default function StartSitPage() {
  const [data, setData] = useState<StartSitResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/league/start-sit")
      .then((res) => res.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Crunching matchups…</p>;
  if (!data?.connected) return <NotConnectedBanner reason="not_connected" />;
  if (!data.teamSelected) return <NotConnectedBanner reason="no_team_selected" />;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h1 className="text-xl font-extrabold text-slate-900">Start / Sit</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ranked by ESPN&apos;s weekly projection, adjusted for how the opponent&apos;s defense has
          performed against that position this season.
        </p>
        {data.defenseDataAvailable === false && (
          <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-2 text-xs text-amber-800">
            Defense-vs-position data hasn&apos;t been synced yet, so rankings below use projections only
            (no matchup adjustment). Run <code>npm run db:sync-defense</code> to populate it.
          </p>
        )}
      </div>
      {data.boards && data.boards.length > 0 ? (
        data.boards.map((board) => <StartSitBoard key={board.position} board={board} />)
      ) : (
        <p className="text-slate-500">No roster data yet — visit the dashboard to sync your team first.</p>
      )}
    </div>
  );
}
