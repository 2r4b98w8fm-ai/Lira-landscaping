import type { RosterPlayer } from "@/types/domain";

const injuryColor: Record<string, string> = {
  ACTIVE: "text-slate-400",
  UNKNOWN: "text-slate-400",
  QUESTIONABLE: "text-amber-600",
  DOUBTFUL: "text-orange-600",
  OUT: "text-red-600",
  IR: "text-red-600",
  SUSPENSION: "text-red-600",
};

export function RosterTable({ roster }: { roster: RosterPlayer[] }) {
  const sorted = [...roster].sort((a, b) => a.position.localeCompare(b.position));

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-card">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-3 py-2.5">Slot</th>
            <th className="px-3 py-2.5">Player</th>
            <th className="px-3 py-2.5">Pos</th>
            <th className="px-3 py-2.5">Team</th>
            <th className="px-3 py-2.5">Opp</th>
            <th className="px-3 py-2.5 text-right">Season Pts</th>
            <th className="px-3 py-2.5 text-right">Week Proj</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sorted.map((p) => (
            <tr key={p.espnPlayerId} className="transition-colors hover:bg-brand-50/40">
              <td className="px-3 py-2.5 font-medium text-slate-500">{p.lineupSlot}</td>
              <td className="px-3 py-2.5">
                <div className="font-semibold text-slate-900">{p.name}</div>
                {p.injuryStatus !== "ACTIVE" && p.injuryStatus !== "UNKNOWN" && (
                  <div className={`text-xs font-medium ${injuryColor[p.injuryStatus]}`}>{p.injuryStatus}</div>
                )}
              </td>
              <td className="px-3 py-2.5 text-slate-600">{p.position}</td>
              <td className="px-3 py-2.5 text-slate-600">{p.nflTeam}</td>
              <td className="px-3 py-2.5 text-slate-600">{p.opponent ?? "—"}</td>
              <td className="px-3 py-2.5 text-right tabular-nums text-slate-700">
                {p.seasonPoints !== null ? p.seasonPoints.toFixed(1) : "—"}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-slate-700">
                {p.weekProjection !== null ? (
                  p.weekProjection.toFixed(1)
                ) : (
                  <span className="text-slate-400">not connected</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
