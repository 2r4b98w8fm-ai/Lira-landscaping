"use client";

import { useEffect, useState } from "react";
import type { TradeTargetSuggestion } from "@/types/domain";

export function TradeTargets({ onViewOffer }: { onViewOffer: (teamId: number) => void }) {
  const [targets, setTargets] = useState<TradeTargetSuggestion[] | null>(null);
  const [connected, setConnected] = useState(true);
  const [teamSelected, setTeamSelected] = useState(true);

  useEffect(() => {
    fetch("/api/league/trade/targets")
      .then((res) => res.json())
      .then((data) => {
        setConnected(data.connected ?? false);
        setTeamSelected(data.teamSelected ?? false);
        setTargets(data.targets ?? []);
      });
  }, []);

  if (!connected || !teamSelected) {
    return <p className="text-slate-500">Connect a league and pick your team first.</p>;
  }
  if (!targets) return <p className="text-slate-500">Scanning the league…</p>;
  if (targets.length === 0) {
    return (
      <p className="text-slate-500">
        No teams stand out as complementary trade partners right now — either your roster is fairly
        balanced, or there isn&apos;t enough surplus/need signal yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">
        Teams ranked by how well their weaknesses match your surplus (and vice versa) — a mutual fit
        ranks above a one-sided favor.
      </p>
      {targets.map((t) => (
        <div key={t.team.teamId} className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">{t.team.teamName}</h3>
            <button
              onClick={() => onViewOffer(t.team.teamId)}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              What should I offer?
            </button>
          </div>
          <ul className="mt-2 space-y-0.5 text-xs text-slate-500">
            {t.rationale.map((line, i) => (
              <li key={i}>· {line}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
