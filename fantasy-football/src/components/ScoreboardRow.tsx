import type { ScoreboardMatchup } from "@/lib/scoreboard/build";

const TIMING_LABEL: Record<ScoreboardMatchup["timing"], string> = {
  live: "Live",
  final: "Final",
  upcoming: "Upcoming",
};

const TIMING_CLASSES: Record<ScoreboardMatchup["timing"], string> = {
  live: "bg-emerald-100 text-emerald-700",
  final: "bg-slate-100 text-slate-500",
  upcoming: "bg-slate-100 text-slate-400",
};

function fmtScore(score: number | null): string {
  return score === null ? "–" : score.toFixed(1);
}

export function ScoreboardRow({ matchup, myTeamId }: { matchup: ScoreboardMatchup; myTeamId: number | null }) {
  const homeIsMe = matchup.homeTeamId === myTeamId;
  const awayIsMe = matchup.awayTeamId === myTeamId;
  const homeLeading = matchup.homeScore !== null && matchup.awayScore !== null && matchup.homeScore > matchup.awayScore;
  const awayLeading = matchup.homeScore !== null && matchup.awayScore !== null && matchup.awayScore > matchup.homeScore;

  return (
    <div
      className={`rounded-xl border p-3 shadow-card transition ${
        homeIsMe || awayIsMe ? "border-brand-400 bg-brand-50" : "border-slate-200 bg-white hover:shadow-card-hover"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${TIMING_CLASSES[matchup.timing]}`}>
          {TIMING_LABEL[matchup.timing]}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto] items-center gap-y-1 text-sm">
        <span className={`font-medium ${homeLeading ? "text-slate-900" : "text-slate-600"} ${homeIsMe ? "font-bold" : ""}`}>
          {matchup.homeTeamName}
          {homeIsMe && <span className="ml-1 text-xs font-normal text-brand-600">(you)</span>}
        </span>
        <span className={`font-mono tabular-nums ${homeLeading ? "font-bold text-slate-900" : "text-slate-500"}`}>
          {fmtScore(matchup.homeScore)}
        </span>
        <span className={`font-medium ${awayLeading ? "text-slate-900" : "text-slate-600"} ${awayIsMe ? "font-bold" : ""}`}>
          {matchup.awayTeamName}
          {awayIsMe && <span className="ml-1 text-xs font-normal text-brand-600">(you)</span>}
        </span>
        <span className={`font-mono tabular-nums ${awayLeading ? "font-bold text-slate-900" : "text-slate-500"}`}>
          {fmtScore(matchup.awayScore)}
        </span>
      </div>
    </div>
  );
}
