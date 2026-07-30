"use client";

import { useState } from "react";
import Link from "next/link";
import { NotConnectedBanner } from "@/components/NotConnectedBanner";
import { DATA_POLL_INTERVAL_MS, useAutoRefresh } from "@/lib/hooks/useAutoRefresh";
import type { FlipAlert } from "@/lib/gameplan/flipAlerts";
import type { InjuryReplacement } from "@/lib/gameplan/injuryReplacements";
import type { ByeWeekEntry } from "@/lib/gameplan/byeWeeks";
import type { MatchupPreview } from "@/lib/simulation/weekMatchup";
import type { RosterPlayer, SimulationTeamResult, SuggestedOffer, WaiverRecommendation } from "@/types/domain";

interface GamePlanResponse {
  connected: boolean;
  teamSelected?: boolean;
  leagueName?: string;
  currentWeek?: number;
  flipAlerts?: FlipAlert[];
  injuryAlerts?: RosterPlayer[];
  injuryReplacements?: InjuryReplacement[];
  byeWeeks?: ByeWeekEntry[];
  topTrades?: (SuggestedOffer & { score: number })[];
  topWaivers?: WaiverRecommendation[];
  myPlayoffOdds?: SimulationTeamResult | null;
  weekMatchup?: (MatchupPreview & { opponentTeamName: string }) | null;
}

const INJURY_COLOR: Record<string, string> = {
  QUESTIONABLE: "border-amber-200 bg-amber-50 text-amber-700",
  DOUBTFUL: "border-orange-200 bg-orange-50 text-orange-700",
  OUT: "border-red-200 bg-red-50 text-red-700",
  IR: "border-red-200 bg-red-50 text-red-700",
  SUSPENSION: "border-red-200 bg-red-50 text-red-700",
};

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <h2 className="text-base font-bold text-slate-900">{title}</h2>
      <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

export default function GamePlanPage() {
  const [data, setData] = useState<GamePlanResponse | null>(null);

  useAutoRefresh(() => {
    fetch("/api/league/gameplan")
      .then((res) => res.json())
      .then(setData);
  }, DATA_POLL_INTERVAL_MS);

  if (!data) return <p className="text-slate-500">Building your game plan…</p>;
  if (!data.connected) return <NotConnectedBanner reason="not_connected" />;
  if (!data.teamSelected) return <NotConnectedBanner reason="no_team_selected" />;

  const flipAlerts = data.flipAlerts ?? [];
  const injuryAlerts = data.injuryAlerts ?? [];
  const injuryReplacements = data.injuryReplacements ?? [];
  const byeWeeks = data.byeWeeks ?? [];
  const topTrades = data.topTrades ?? [];
  const topWaivers = data.topWaivers ?? [];
  const odds = data.myPlayoffOdds;
  const matchup = data.weekMatchup;

  const replacementFor = (espnPlayerId: number) =>
    injuryReplacements.find((r) => r.injuredPlayer.espnPlayerId === espnPlayerId);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h1 className="text-xl font-extrabold text-slate-900">Game Plan — Week {data.currentWeek}</h1>
        <p className="mt-1 text-sm text-slate-500">
          Everything worth acting on this week for {data.leagueName}, in one place: lineup flips, injuries,
          the best trade and waiver moves available, and where you stand for the playoffs.
        </p>
      </div>

      <Section
        title={matchup ? `This week: vs ${matchup.opponentTeamName}` : "This week's matchup"}
        subtitle="Optimal-lineup projections for both teams, compared as real-valued distributions — not a coin flip."
      >
        {!matchup && (
          <p className="text-sm text-slate-500">
            No scheduled matchup found for this week — the league schedule may not be synced yet, or this
            could be a playoff bye.
          </p>
        )}
        {matchup && (
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
            <div className="text-sm">
              <p className="text-slate-900">
                You project <span className="font-mono font-semibold">{matchup.myMean.toFixed(1)}</span> vs{" "}
                <span className="font-mono font-semibold">{matchup.oppMean.toFixed(1)}</span>.
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Spread accounts for real per-position scoring variance on both sides.
              </p>
            </div>
            <span
              className={`font-mono text-2xl font-bold ${
                matchup.winProbabilityPct >= 50 ? "text-brand-700" : "text-red-600"
              }`}
            >
              {matchup.winProbabilityPct.toFixed(0)}%
            </span>
          </div>
        )}
      </Section>

      <Section
        title="Lineup flips"
        subtitle="Bench players projected to outscore a current starter at the same position this week."
      >
        {flipAlerts.length === 0 && <p className="text-sm text-slate-500">No flips found — your starting lineup looks optimal.</p>}
        {flipAlerts.map((alert, i) => (
          <div key={i} className="rounded-xl border border-brand-200 bg-brand-50/60 p-3 text-sm">
            <span className="font-semibold text-slate-900">{alert.benchPlayerName}</span>
            <span className="text-slate-500"> ({alert.position}, {alert.benchPlayerScore.toFixed(1)} pts) outprojects your starter </span>
            <span className="font-semibold text-slate-900">{alert.displacedStarterName}</span>
            <span className="text-slate-500"> ({alert.displacedStarterScore.toFixed(1)} pts) — consider starting {alert.benchPlayerName} instead.</span>
          </div>
        ))}
        <Link href="/start-sit" className="inline-block text-xs font-medium text-brand-600 hover:text-brand-700">
          See the full Start/Sit board →
        </Link>
      </Section>

      <Section title="Injury watch" subtitle="Everyone on your roster who isn't fully active right now, with the best replacement if you need one.">
        {injuryAlerts.length === 0 && <p className="text-sm text-slate-500">Nobody on your roster is banged up right now.</p>}
        {injuryAlerts.map((p) => {
          const replacement = replacementFor(p.espnPlayerId);
          return (
            <div
              key={p.espnPlayerId}
              className={`rounded-xl border px-3 py-2 text-sm ${INJURY_COLOR[p.injuryStatus] ?? "border-slate-200 bg-slate-50 text-slate-700"}`}
            >
              <span className="font-semibold">{p.name}</span> ({p.position} · {p.nflTeam}) — {p.injuryStatus}
              {replacement?.replacement && (
                <p className="mt-0.5 text-xs">
                  Best replacement: <strong>{replacement.replacement.name}</strong> (
                  {replacement.replacementSource === "bench" ? "your bench" : "waivers"})
                </p>
              )}
              {replacement && !replacement.replacement && (
                <p className="mt-0.5 text-xs">No real replacement available on your bench or waivers right now.</p>
              )}
            </div>
          );
        })}
      </Section>

      <Section title="Upcoming byes" subtitle="Roster players on a bye in the next few weeks — plan waiver moves ahead of time.">
        {byeWeeks.length === 0 && <p className="text-sm text-slate-500">No byes coming up for your roster in the next few weeks.</p>}
        {byeWeeks.map((entry) => (
          <div key={entry.week} className="rounded-xl border border-slate-200 p-3 text-sm">
            <p className="font-semibold text-slate-900">Week {entry.week}</p>
            <p className="mt-0.5 text-slate-600">
              {entry.players.map((p) => `${p.name} (${p.position} · ${p.nflTeam})`).join(", ")}
            </p>
          </div>
        ))}
      </Section>

      <Section title="Best trade available" subtitle="The single best trade against every other team, ranked league-wide.">
        {topTrades.length === 0 && <p className="text-sm text-slate-500">No trade clears the fairness bar right now.</p>}
        {topTrades.map((offer) => (
          <div key={offer.targetTeamId} className="rounded-xl border border-slate-200 p-3 text-sm">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">vs {offer.targetTeamName}</p>
              <span className={`text-xs font-medium ${offer.favorsThem ? "text-brand-600" : "text-amber-600"}`}>
                {offer.favorsThem ? "realistic to accept" : "favors you"}
              </span>
            </div>
            <p className="mt-1 text-slate-600">
              Give: {offer.give.map((p) => p.player.name).join(", ")} ({offer.giveValue.toFixed(1)}) · Receive:{" "}
              {offer.receive.map((p) => p.player.name).join(", ")} ({offer.receiveValue.toFixed(1)})
            </p>
            {offer.dropCandidates.length > 0 && (
              <p className="mt-1 text-xs text-amber-700">
                Drop {offer.dropCandidates.map((tv) => tv.player.name).join(", ")} to make roster room.
              </p>
            )}
          </div>
        ))}
        <Link href="/trade" className="inline-block text-xs font-medium text-brand-600 hover:text-brand-700">
          See all recommended trades →
        </Link>
      </Section>

      <Section title="Best waiver moves" subtitle="Free agents who project as a real upgrade over your current worst starter.">
        {topWaivers.length === 0 && <p className="text-sm text-slate-500">Nothing on waivers clears your bar right now.</p>}
        {topWaivers.map((w) => (
          <div key={w.player.espnPlayerId} className="flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50/60 px-3 py-2 text-sm">
            <span>
              <span className="font-semibold text-slate-900">{w.player.name}</span>
              <span className="text-slate-500"> ({w.player.position} · {w.player.nflTeam})</span>
            </span>
            <span className="font-mono font-semibold text-brand-700">+{(w.valueAdded ?? 0).toFixed(1)}</span>
          </div>
        ))}
        <Link href="/waivers" className="inline-block text-xs font-medium text-brand-600 hover:text-brand-700">
          See the full waiver board →
        </Link>
      </Section>

      <Section title="Playoff standing" subtitle="Where a 5,000-simulation season projects you to land.">
        {!odds && <p className="text-sm text-slate-500">Run a league sync with a schedule to see playoff odds.</p>}
        {odds && (
          <div className="rounded-xl border border-slate-200 p-3 text-sm">
            <p className="text-slate-900">
              <span className="font-mono text-lg font-bold text-brand-700">{odds.playoffPct.toFixed(1)}%</span>{" "}
              chance to make the playoffs — most likely seed #{odds.mostLikelySeed ?? "—"}.
            </p>
            <p className="mt-1 text-slate-500">
              Projected wins: {odds.projectedWinsRange.p10}–{odds.projectedWinsRange.p90} (median {odds.projectedWinsRange.p50}).
            </p>
          </div>
        )}
        <Link href="/playoffs" className="inline-block text-xs font-medium text-brand-600 hover:text-brand-700">
          See full playoff odds →
        </Link>
      </Section>
    </div>
  );
}
