"use client";

import { useState } from "react";
import { TradeAnalyzer } from "@/components/trade/TradeAnalyzer";
import { TradeTargets } from "@/components/trade/TradeTargets";
import { TradeOffers } from "@/components/trade/TradeOffers";

const TABS = ["Analyze a trade", "Find targets", "What should I offer"] as const;
type Tab = (typeof TABS)[number];

export default function TradePage() {
  const [tab, setTab] = useState<Tab>("Analyze a trade");
  const [offerTarget, setOfferTarget] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h1 className="text-xl font-extrabold text-slate-900">Trade</h1>
        <p className="mt-1 text-sm text-slate-500">
          Value is rest-of-season points over a replacement-level player at the position, adjusted for
          injury and remaining schedule — the math is always shown, never a black-box number.
        </p>
      </div>

      <div className="flex gap-1 rounded-lg bg-slate-100 p-1 text-sm">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-md px-3 py-1.5 font-medium transition ${
              tab === t ? "bg-white text-brand-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Analyze a trade" && <TradeAnalyzer />}
      {tab === "Find targets" && (
        <TradeTargets
          onViewOffer={(teamId) => {
            setOfferTarget(teamId);
            setTab("What should I offer");
          }}
        />
      )}
      {tab === "What should I offer" && <TradeOffers initialTargetTeamId={offerTarget} />}
    </div>
  );
}
