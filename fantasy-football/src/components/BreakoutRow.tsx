"use client";

import { useState } from "react";
import type { BreakoutEntry } from "@/lib/breakouts/context";

const RECOMMENDATION_LABEL: Record<string, string> = {
  pick_up: "Pick up",
  trade_for: "Trade for",
  start_more: "Start more",
};

function scoreClasses(score: number): string {
  if (score >= 75) return "bg-emerald-100 text-emerald-700";
  if (score >= 55) return "bg-amber-100 text-amber-700";
  return "bg-slate-100 text-slate-500";
}

export function BreakoutRow({ entry, isMyTeam }: { entry: BreakoutEntry; isMyTeam: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const { player, averages, breakout, recommendation } = entry;

  return (
    <div
      className={`rounded-xl border p-3 shadow-card transition ${
        isMyTeam ? "border-brand-400 bg-brand-50" : "border-slate-200 bg-white hover:shadow-card-hover"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-1 flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-slate-900">{player.name}</span>
          <span className="text-xs text-slate-500">
            {player.position} · {player.nflTeam}
          </span>
          <span className="text-xs text-slate-400">
            {entry.rosteredBy ? (isMyTeam ? "your team" : entry.rosteredBy) : "free agent"}
          </span>
          <span className="text-xs text-slate-400">
            {averages.pointsPerGame.toFixed(1)} pts/gm · {averages.touchesPerGame.toFixed(1)} touches/gm
            {averages.avgSnapPct !== null ? ` · ${(averages.avgSnapPct * 100).toFixed(0)}% snaps` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {recommendation && (
            <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">
              {RECOMMENDATION_LABEL[recommendation]}
            </span>
          )}
          {breakout ? (
            <span className={`rounded-full px-2 py-0.5 font-mono text-sm font-semibold tabular-nums ${scoreClasses(breakout.breakoutScore)}`}>
              {breakout.breakoutScore.toFixed(0)}%
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-400">
              not enough games
            </span>
          )}
          {breakout && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="text-xs font-medium text-slate-400 hover:text-brand-600"
            >
              {expanded ? "hide math" : "why"}
            </button>
          )}
        </div>
      </div>
      {expanded && breakout && (
        <ul className="mt-2 space-y-0.5 border-t border-slate-100 pt-2 text-xs text-slate-500">
          {breakout.reasoning.map((line, i) => (
            <li key={i}>· {line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
