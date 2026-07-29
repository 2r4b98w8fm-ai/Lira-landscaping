"use client";

import { useState } from "react";
import type { TradeValue } from "@/types/domain";

export function TradeValueRow({
  value,
  selectable,
  selected,
  onToggle,
}: {
  value: TradeValue;
  selectable?: boolean;
  selected?: boolean;
  onToggle?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl border p-3 shadow-sm transition ${
        selected ? "border-brand-400 bg-brand-50" : "border-slate-200 bg-white hover:shadow-card-hover"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <label className="flex flex-1 items-center gap-2 text-sm">
          {selectable && (
            <input
              type="checkbox"
              checked={!!selected}
              onChange={onToggle}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500/30"
            />
          )}
          <span className="font-semibold text-slate-900">{value.player.name}</span>
          <span className="text-xs text-slate-500">
            {value.player.position} · {value.player.nflTeam}
          </span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono font-semibold tabular-nums text-brand-700">
            {value.finalValue.toFixed(1)}
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
      {expanded && (
        <ul className="mt-2 space-y-0.5 border-t border-slate-100 pt-2 text-xs text-slate-500">
          {value.reasoning.map((line, i) => (
            <li key={i}>· {line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
