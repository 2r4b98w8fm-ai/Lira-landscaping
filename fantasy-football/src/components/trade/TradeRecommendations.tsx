"use client";

import { useEffect, useState } from "react";
import { TradeValueRow } from "@/components/TradeValueRow";
import type { SuggestedOffer } from "@/types/domain";

interface RecommendedTrade extends SuggestedOffer {
  score: number;
}

export function TradeRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendedTrade[] | null>(null);
  const [connected, setConnected] = useState(true);
  const [teamSelected, setTeamSelected] = useState(true);

  useEffect(() => {
    fetch("/api/league/trade/recommendations")
      .then((res) => res.json())
      .then((data) => {
        setConnected(data.connected ?? false);
        setTeamSelected(data.teamSelected ?? false);
        setRecommendations(data.recommendations ?? []);
      });
  }, []);

  if (!connected || !teamSelected) {
    return <p className="text-slate-500">Connect a league and pick your team first.</p>;
  }
  if (!recommendations) return <p className="text-slate-500">Scanning every team for a deal worth making…</p>;
  if (recommendations.length === 0) {
    return (
      <p className="text-slate-500">
        No trade across the whole league clears the fairness bar right now — either your roster is
        fairly balanced against everyone else&apos;s, or there isn&apos;t enough surplus/need signal yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">
        The single best possible trade against every other team in the league, ranked by how much real
        value moves and how fair the ask is — this is where to start, not just who you could ask.
      </p>
      {recommendations.map((offer, i) => (
        <div key={offer.targetTeamId} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">
              <span className="mr-2 font-mono text-sm text-slate-400">#{i + 1}</span>
              {offer.targetTeamName}
            </h3>
            <span className="text-xs font-medium text-slate-400">
              value moved: {((offer.giveValue + offer.receiveValue) / 2).toFixed(1)}
            </span>
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
        </div>
      ))}
    </div>
  );
}
