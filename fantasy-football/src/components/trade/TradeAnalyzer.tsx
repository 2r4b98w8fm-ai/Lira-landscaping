"use client";

import { useEffect, useState } from "react";
import { TradeValueRow } from "@/components/TradeValueRow";
import { NotConnectedBanner } from "@/components/NotConnectedBanner";
import type { TradeAnalysis, TradeValue } from "@/types/domain";

interface TeamWithValues {
  teamId: number;
  teamName: string;
  isMyTeam: boolean;
  players: TradeValue[];
}

export function TradeAnalyzer() {
  const [teams, setTeams] = useState<TeamWithValues[] | null>(null);
  const [status, setStatus] = useState<"loading" | "not_connected" | "no_team_selected" | "ready">(
    "loading"
  );
  const [teamAId, setTeamAId] = useState<number | null>(null);
  const [teamBId, setTeamBId] = useState<number | null>(null);
  const [selectedA, setSelectedA] = useState<Set<number>>(new Set());
  const [selectedB, setSelectedB] = useState<Set<number>>(new Set());
  const [analysis, setAnalysis] = useState<TradeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/league/trade/roster-values")
      .then((res) => res.json())
      .then((data) => {
        if (!data.connected) {
          setStatus("not_connected");
          return;
        }
        if (!data.teamSelected) {
          setStatus("no_team_selected");
          return;
        }
        setTeams(data.teams);
        setStatus("ready");
        const mine = data.teams.find((t: TeamWithValues) => t.isMyTeam);
        setTeamAId(mine?.teamId ?? data.teams[0]?.teamId ?? null);
        setTeamBId(data.teams.find((t: TeamWithValues) => !t.isMyTeam)?.teamId ?? null);
      });
  }, []);

  function toggle(set: Set<number>, setSet: (s: Set<number>) => void, id: number) {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSet(next);
  }

  async function runAnalysis() {
    if (!teamAId || !teamBId || selectedA.size === 0 || selectedB.size === 0) {
      setError("Pick at least one player from each side.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/league/trade/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamAId,
          playerIdsA: Array.from(selectedA),
          teamBId,
          playerIdsB: Array.from(selectedB),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not analyze this trade.");
        return;
      }
      setAnalysis(data.analysis);
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading") return <p className="text-slate-500">Loading rosters…</p>;
  if (status === "not_connected") return <NotConnectedBanner reason="not_connected" />;
  if (status === "no_team_selected") return <NotConnectedBanner reason="no_team_selected" />;
  if (!teams || teams.length < 2) {
    return <p className="text-slate-500">Need at least two teams with synced rosters to analyze a trade.</p>;
  }

  const teamA = teams.find((t) => t.teamId === teamAId);
  const teamB = teams.find((t) => t.teamId === teamBId);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TeamColumn
          label="Side A gives"
          teams={teams}
          selectedTeamId={teamAId}
          onTeamChange={(id) => {
            setTeamAId(id);
            setSelectedA(new Set());
          }}
          players={teamA?.players ?? []}
          selected={selectedA}
          onToggle={(id) => toggle(selectedA, setSelectedA, id)}
        />
        <TeamColumn
          label="Side B gives"
          teams={teams}
          selectedTeamId={teamBId}
          onTeamChange={(id) => {
            setTeamBId(id);
            setSelectedB(new Set());
          }}
          players={teamB?.players ?? []}
          selected={selectedB}
          onToggle={(id) => toggle(selectedB, setSelectedB, id)}
        />
      </div>

      <button
        onClick={runAnalysis}
        disabled={loading}
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500 hover:shadow disabled:opacity-50"
      >
        {loading ? "Analyzing…" : "Analyze trade"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}

      {analysis && (
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="font-semibold text-slate-900">{analysis.verdict}</p>
          <ul className="space-y-0.5 text-sm text-slate-500">
            {analysis.reasoning.map((line, i) => (
              <li key={i}>· {line}</li>
            ))}
          </ul>
          <div className="grid gap-4 sm:grid-cols-2">
            <SideSummary side={analysis.sideA} />
            <SideSummary side={analysis.sideB} />
          </div>
        </div>
      )}
    </div>
  );
}

function TeamColumn({
  label,
  teams,
  selectedTeamId,
  onTeamChange,
  players,
  selected,
  onToggle,
}: {
  label: string;
  teams: TeamWithValues[];
  selectedTeamId: number | null;
  onTeamChange: (id: number) => void;
  players: TradeValue[];
  selected: Set<number>;
  onToggle: (id: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">{label}</h3>
        <select
          value={selectedTeamId ?? ""}
          onChange={(e) => onTeamChange(Number(e.target.value))}
          className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
        >
          {teams.map((t) => (
            <option key={t.teamId} value={t.teamId}>
              {t.teamName}
              {t.isMyTeam ? " (me)" : ""}
            </option>
          ))}
        </select>
      </div>
      <div className="max-h-96 space-y-1.5 overflow-y-auto pr-1">
        {players
          .slice()
          .sort((a, b) => b.finalValue - a.finalValue)
          .map((p) => (
            <TradeValueRow
              key={p.player.espnPlayerId}
              value={p}
              selectable
              selected={selected.has(p.player.espnPlayerId)}
              onToggle={() => onToggle(p.player.espnPlayerId)}
            />
          ))}
      </div>
    </div>
  );
}

function SideSummary({ side }: { side: TradeAnalysis["sideA"] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-900">
        {side.teamName} — {side.totalValue.toFixed(1)} total value
      </h4>
      <div className="mt-1 space-y-1.5">
        {side.players.map((p) => (
          <TradeValueRow key={p.player.espnPlayerId} value={p} />
        ))}
      </div>
    </div>
  );
}
