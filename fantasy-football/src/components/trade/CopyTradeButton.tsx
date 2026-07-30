"use client";

import { useState } from "react";
import { formatOfferAsText } from "@/lib/trade/shareText";
import type { SuggestedOffer } from "@/types/domain";

export function CopyTradeButton({ offer }: { offer: SuggestedOffer }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(formatOfferAsText(offer));
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard access can be denied by the browser — silently do nothing rather than throw.
        }
      }}
      className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
    >
      {copied ? "Copied!" : "Copy for league chat"}
    </button>
  );
}
