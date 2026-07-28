import type { RosterPlayer } from "@/types/domain";

const injuryColor: Record<string, string> = {
  ACTIVE: "text-slate-500",
  UNKNOWN: "text-slate-500",
  QUESTIONABLE: "text-amber-400",
  DOUBTFUL: "text-orange-400",
  OUT: "text-red-400",
  IR: "text-red-400",
  SUSPENSION: "text-red-400",
};

export function RosterTable({ roster }: { roster: RosterPlayer[] }) {
  const sorted = [...roster].sort((a, b) => a.position.localeCompare(b.position));

  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-field-900/80 text-left text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-3 py-2">Slot</th>
            <th className="px-3 py-2">Player</th>
            <th className="px-3 py-2">Pos</th>
            <th className="px-3 py-2">Team</th>
            <th className="px-3 py-2">Opp</th>
            <th className="px-3 py-2 text-right">Season Pts</th>
            <th className="px-3 py-2 text-right">Week Proj</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {sorted.map((p) => (
            <tr key={p.espnPlayerId} className="hover:bg-white/[0.03]">
              <td className="px-3 py-2 text-slate-400">{p.lineupSlot}</td>
              <td className="px-3 py-2">
                <div className="font-medium">{p.name}</div>
                {p.injuryStatus !== "ACTIVE" && p.injuryStatus !== "UNKNOWN" && (
                  <div className={`text-xs ${injuryColor[p.injuryStatus]}`}>{p.injuryStatus}</div>
                )}
              </td>
              <td className="px-3 py-2 text-slate-300">{p.position}</td>
              <td className="px-3 py-2 text-slate-300">{p.nflTeam}</td>
              <td className="px-3 py-2 text-slate-300">{p.opponent ?? "—"}</td>
              <td className="px-3 py-2 text-right tabular-nums">
                {p.seasonPoints !== null ? p.seasonPoints.toFixed(1) : "—"}
              </td>
              <td className="px-3 py-2 text-right tabular-nums">
                {p.weekProjection !== null ? (
                  p.weekProjection.toFixed(1)
                ) : (
                  <span className="text-slate-500">not connected</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
