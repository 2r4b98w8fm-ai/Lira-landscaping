"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface ConnectedLeagueSummary {
  espnLeagueId: string;
  season: number;
  name?: string;
}

export function LeagueSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [leagues, setLeagues] = useState<ConnectedLeagueSummary[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Re-fetch on every navigation, not just on mount — switching leagues
    // from elsewhere (the connect page's league list) always triggers a
    // route change, and this is a separate component instance that
    // wouldn't otherwise know the active league changed underneath it.
    fetch("/api/account/leagues")
      .then((res) => res.json())
      .then((data) => {
        setLeagues(data.leagues ?? []);
        setActiveIndex(data.activeIndex ?? 0);
      });
  }, [pathname]);

  if (leagues.length < 2) return null;

  async function handleChange(index: number) {
    setActiveIndex(index);
    await fetch("/api/account/switch-league", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });
    router.refresh();
  }

  return (
    <select
      value={activeIndex}
      onChange={(e) => handleChange(Number(e.target.value))}
      className="rounded-md border border-white/10 bg-field-800 px-2 py-1 text-xs text-slate-300"
    >
      {leagues.map((l, i) => (
        <option key={`${l.espnLeagueId}-${l.season}`} value={i}>
          {l.name ?? `League ${l.espnLeagueId}`}
        </option>
      ))}
    </select>
  );
}
