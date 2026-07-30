"use client";

import { useState } from "react";
import { ProjectionSources } from "@/components/ProjectionSources";
import type { RankedPlayer } from "@/lib/rankings/build";

export function RankingRow({ ranking, isMyTeam }: { ranking: RankedPlayer; isMyTeam: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const { player, tradeValue } = ranking;

  return (
    <div
      className={`rounded-xl border p-3 shadow-card transition ${
        isMyTeam ? "border-brand-400 bg-brand-50" : "border-slate-200 bg-white hover:shadow-card-hover"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2 text-sm">
          <span className="w-8 font-mono text-slate-400">#{ranking.overallRank}</span>
          <span className="font-semibold text-slate-900">{player.name}</span>
          <span className="text-xs text-slate-500">
            {player.position}#{ranking.positionRank} · {player.nflTeam}
          </span>
          <span className="text-xs text-slate-400">
            {ranking.rosteredBy ? (isMyTeam ? "your team" : ranking.rosteredBy) : "free agent"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold tabular-nums text-brand-700">
            {tradeValue.finalValue.toFixed(1)}
          </span>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="text-xs font-medium text-slate-400 hover:text-brand-600"
          >
            {expanded ? "hide math" : "show math"}
          </button>
        </div>
      </div>
      <div className="mt-1.5">
        <ProjectionSources breakdown={player.projectionBreakdown} />
      </div>
      {expanded && (
        <ul className="mt-2 space-y-0.5 border-t border-slate-100 pt-2 text-xs text-slate-500">
          {tradeValue.reasoning.map((line, i) => (
            <li key={i}>· {line}</li>
          ))}
          {player.projectionBreakdown?.ourModelReasoning.map((line, i) => (
            <li key={`model-${i}`}>· {line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
