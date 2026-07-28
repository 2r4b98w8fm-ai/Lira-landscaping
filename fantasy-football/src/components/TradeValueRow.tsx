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
      className={`rounded-lg border p-3 ${
        selected ? "border-emerald-500/70 bg-emerald-500/10" : "border-white/10 bg-field-900/60"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <label className="flex flex-1 items-center gap-2 text-sm">
          {selectable && (
            <input
              type="checkbox"
              checked={!!selected}
              onChange={onToggle}
              className="rounded border-white/20 bg-field-800"
            />
          )}
          <span className="font-medium">{value.player.name}</span>
          <span className="text-xs text-slate-400">
            {value.player.position} · {value.player.nflTeam}
          </span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono tabular-nums text-emerald-300">
            {value.finalValue.toFixed(1)}
          </span>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="text-xs text-slate-500 hover:text-slate-300"
          >
            {expanded ? "hide math" : "show math"}
          </button>
        </div>
      </div>
      {expanded && (
        <ul className="mt-2 space-y-0.5 border-t border-white/5 pt-2 text-xs text-slate-400">
          {value.reasoning.map((line, i) => (
            <li key={i}>· {line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
