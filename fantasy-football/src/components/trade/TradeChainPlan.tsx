"use client";

import { useEffect, useState } from "react";
import { TradeValueRow } from "@/components/TradeValueRow";
import { CopyTradeButton } from "@/components/trade/CopyTradeButton";
import type { SuggestedOffer } from "@/types/domain";

interface TradeChainResponse {
  connected: boolean;
  teamSelected?: boolean;
  chain?: { steps: { offer: SuggestedOffer }[] };
}

export function TradeChainPlan() {
  const [data, setData] = useState<TradeChainResponse | null>(null);

  useEffect(() => {
    fetch("/api/league/trade/chain")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="text-slate-500">Planning a sequence of moves…</p>;
  if (!data.connected || !data.teamSelected) {
    return <p className="text-slate-500">Connect a league and pick your team first.</p>;
  }

  const steps = data.chain?.steps ?? [];
  if (steps.length === 0) {
    return (
      <p className="text-slate-500">
        No realistic trade path found to start a plan — either your roster is fairly balanced, or
        there isn&apos;t enough surplus/need signal yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">
        Do the first trade, and your roster&apos;s surplus/need shifts enough to open up the next one —
        each step is built against what your team looks like <em>after</em> the previous step, not your
        roster today.
      </p>
      {steps.map((step, i) => {
        const { offer } = step;
        return (
          <div key={offer.targetTeamId} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">
                <span className="mr-2 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">Step {i + 1}</span>
                vs {offer.targetTeamName}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium ${offer.favorsThem ? "text-brand-600" : "text-amber-600"}`}
                >
                  {offer.favorsThem ? "tilted their way — realistic" : "favors you — may need a sweetener"}
                </span>
                <CopyTradeButton offer={offer} />
              </div>
            </div>
            <ul className="space-y-0.5 text-sm text-slate-500">
              {offer.rationale.map((line, j) => (
                <li key={j}>· {line}</li>
              ))}
            </ul>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">You give ({offer.giveValue.toFixed(1)})</h4>
                <div className="mt-1 space-y-1.5">
                  {offer.give.map((p) => (
                    <TradeValueRow key={p.player.espnPlayerId} value={p} />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">You receive ({offer.receiveValue.toFixed(1)})</h4>
                <div className="mt-1 space-y-1.5">
                  {offer.receive.map((p) => (
                    <TradeValueRow key={p.player.espnPlayerId} value={p} />
                  ))}
                </div>
              </div>
            </div>
            {offer.dropCandidates.length > 0 && (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                You&apos;d net {offer.receive.length} player(s) for {offer.give.length} after this step — drop{" "}
                <strong>
                  {offer.dropCandidates.map((tv) => `${tv.player.name} (${tv.finalValue.toFixed(1)} val)`).join(", ")}
                </strong>{" "}
                to make roster room.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
