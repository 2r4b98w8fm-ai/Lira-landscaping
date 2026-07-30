"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LeagueSwitcher } from "./LeagueSwitcher";
import { LiveSyncBadge } from "./LiveSyncBadge";

const links = [
  { href: "/", label: "Connect" },
  { href: "/gameplan", label: "Game Plan" },
  { href: "/dashboard", label: "Roster" },
  { href: "/scoreboard", label: "Scoreboard" },
  { href: "/start-sit", label: "Start/Sit" },
  { href: "/trade", label: "Trade" },
  { href: "/rankings", label: "Rankings" },
  { href: "/breakouts", label: "Breakouts" },
  { href: "/playoffs", label: "Playoffs" },
  { href: "/waivers", label: "Waivers" },
  { href: "/power-rankings", label: "Power Rankings" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            🏈 <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">Gridiron Desk</span>
          </span>
          <LeagueSwitcher />
          <LiveSyncBadge />
        </div>
        <nav className="flex flex-wrap gap-1 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                  active
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
