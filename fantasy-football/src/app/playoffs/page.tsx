"use client";

import { useEffect, useState } from "react";
import { NotConnectedBanner } from "@/components/NotConnectedBanner";
import { PlayoffOddsRow } from "@/components/PlayoffOddsRow";
import type { SimulationResult } from "@/types/domain";

interface SimulateResponse {
  connected: boolean;
  teamSelected?: boolean;
  available?: boolean;
  reason?: string;
  simulation?: SimulationResult;
}

export default function PlayoffsPage() {
  const [data, setData] = useState<SimulateResponse | null>(null);
  const [myTeamId, setMyTeamId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/league/simulate")
      .then((res) => res.json())
      .then(setData);
    fetch("/api/league/trade/roster-values")
      .then((res) => res.json())
      .then((d) => {
        const mine = d.teams?.find((t: { isMyTeam: boolean; teamId: number }) => t.isMyTeam);
        if (mine) setMyTeamId(mine.teamId);
      });
  }, []);

  if (!data) return <p className="text-slate-400">Running the simulation…</p>;
  if (!data.connected) return <NotConnectedBanner reason="not_connected" />;
  if (!data.teamSelected) return <NotConnectedBanner reason="no_team_selected" />;
  if (!data.available) {
    return <p className="text-slate-400">{data.reason}</p>;
  }

  const sim = data.simulation!;
  const sorted = [...sim.teams].sort((a, b) => b.playoffPct - a.playoffPct);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Playoff Odds</h1>
        <p className="mt-1 text-sm text-slate-400">
          {sim.numSimulations.toLocaleString()} simulated regular seasons, {sim.weeksRemaining} week
          {sim.weeksRemaining === 1 ? "" : "s"} remaining. Each team&apos;s weekly score is drawn from a
          distribution built from real rest-of-season projections and real historical per-position
          scoring variance.
        </p>
        <p className="mt-2 rounded-md border border-amber-500/40 bg-amber-500/10 p-2 text-xs text-amber-200">
          This is a probabilistic model, not a guarantee — treat it as a range of plausible outcomes,
          not a prediction of what will happen.
        </p>
      </div>

      <div className="space-y-2">
        {sorted.map((team) => (
          <PlayoffOddsRow key={team.teamId} team={team} isMyTeam={team.teamId === myTeamId} />
        ))}
      </div>
    </div>
  );
}
