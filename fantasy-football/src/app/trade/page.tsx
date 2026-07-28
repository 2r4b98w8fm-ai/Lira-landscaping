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
      <div>
        <h1 className="text-xl font-bold">Trade</h1>
        <p className="text-sm text-slate-400">
          Value is rest-of-season points over a replacement-level player at the position, adjusted for
          injury and remaining schedule — the math is always shown, never a black-box number.
        </p>
      </div>

      <div className="flex gap-1 border-b border-white/10">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-sm ${
              tab === t ? "border-b-2 border-emerald-500 text-white" : "text-slate-400 hover:text-slate-200"
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
