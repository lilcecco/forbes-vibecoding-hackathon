"use client";

import clsx from "clsx";
import { Bell, Menu, Search, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";
import { NAV, isActive } from "./nav";

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="px-2 pt-1">
        <Logo href="/dashboard" />
      </div>

      <nav className="flex flex-col gap-1">
        {NAV.map((item) => {
          const { href, label, icon: Icon, hint } = item;
          const active = isActive(item, pathname);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={clsx(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-soft text-brand"
                  : "text-muted hover:bg-surface-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              <span className="flex-1">{label}</span>
              <span className="text-[10px] uppercase tracking-wide text-muted/70 opacity-0 group-hover:opacity-100">
                {hint}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-border bg-gradient-to-br from-brand-soft to-surface p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="size-4 text-brand" /> Finanziabile
        </div>
        <p className="mt-1 text-xs text-muted">
          La formazione con Coach si può finanziare con Fondimpresa.
        </p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = NAV.find((n) => isActive(n, pathname));

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[248px_1fr]">
      {/* Sidebar desktop */}
      <aside className="sticky top-0 hidden h-dvh border-r border-border bg-surface lg:block">
        <Sidebar />
      </aside>

      {/* Sidebar mobile (drawer) */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-surface shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 rounded-md p-1 text-muted hover:bg-surface-muted"
              aria-label="Chiudi menu"
            >
              <X className="size-5" />
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-surface/80 px-4 backdrop-blur md:px-6">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-1.5 text-muted hover:bg-surface-muted lg:hidden"
            aria-label="Apri menu"
          >
            <Menu className="size-5" />
          </button>
          <h1 className="text-base font-semibold">{current?.label ?? "Coach"}</h1>

          <div className="ml-auto hidden max-w-xs flex-1 items-center gap-2 rounded-lg border border-border bg-surface-muted px-3 py-1.5 text-sm text-muted md:flex">
            <Search className="size-4" />
            <input
              placeholder="Cerca persone, scenari, documenti…"
              className="w-full bg-transparent outline-none placeholder:text-muted"
            />
          </div>

          <button className="relative ml-auto rounded-full p-2 text-muted hover:bg-surface-muted md:ml-0" aria-label="Notifiche">
            <Bell className="size-5" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-danger" />
          </button>
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-full bg-brand text-xs font-semibold text-brand-foreground">
              EM
            </div>
            <div className="hidden text-sm leading-tight sm:block">
              <div className="font-medium">Elena Marchi</div>
              <div className="text-xs text-muted">HR · Nordica Assicurazioni</div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
