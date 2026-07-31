"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  // A link tap already unmounts/remounts the page, but close explicitly too
  // in case the route change is fast enough that the menu would otherwise
  // still be open on the new page.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 text-lg font-extrabold tracking-tight text-slate-900">
            🏈 <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">Gridiron Desk</span>
          </span>
          <div className="hidden min-w-0 items-center gap-3 sm:flex">
            <LeagueSwitcher />
            <LiveSyncBadge />
          </div>
        </div>

        <nav className="hidden flex-wrap justify-end gap-1 text-sm sm:flex">
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

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex shrink-0 items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 sm:hidden"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 sm:hidden">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <LeagueSwitcher />
            <LiveSyncBadge />
          </div>
          <nav className="flex flex-col gap-1 text-sm">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2.5 font-medium transition-all ${
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
      )}
    </header>
  );
}
