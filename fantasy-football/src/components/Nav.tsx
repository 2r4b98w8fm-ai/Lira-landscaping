"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Connect" },
  { href: "/dashboard", label: "Roster" },
  { href: "/start-sit", label: "Start/Sit" },
  { href: "/trade", label: "Trade" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="border-b border-white/10 bg-field-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <span className="text-lg font-semibold tracking-tight">🏈 Gridiron Desk</span>
        <nav className="flex gap-1 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  active
                    ? "bg-emerald-600/90 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
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
