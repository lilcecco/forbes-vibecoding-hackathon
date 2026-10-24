"use client";

import clsx from "clsx";
import { Bell, Menu, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { NAV, isActive } from "./nav";
import { Avatar, buttonClass } from "./ui";

const NOTIFICATIONS = [
  { href: "/team/m8", text: "Paolo Greco è sceso di 0,5 in 4 settimane", when: "oggi" },
  { href: "/contenuti", text: "Le note di Giulia sono in elaborazione", when: "oggi" },
  { href: "/report/r1", text: "Marco Bellini ha preso 4,2 nel rinnovo con sconto", when: "oggi" },
];

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="px-2 pt-1">
        <Logo href="/dashboard" />
        <div className="mt-3 text-sm text-muted">Nordica Assicurazioni</div>
      </div>

      <nav className="flex flex-col gap-0.5" aria-label="Sezioni">
        {NAV.map((item) => {
          const { href, label, icon: Icon, hint } = item;
          const active = isActive(item, pathname);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "flex h-10 items-center gap-3 rounded-[var(--radius-control)] px-3 text-[15px] transition-colors",
                active ? "bg-surface-muted font-medium text-foreground" : "text-muted hover:bg-surface-muted/60 hover:text-foreground",
              )}
            >
              <Icon className="size-4" strokeWidth={1.75} />
              <span className="flex-1">{label}</span>
              <span className="text-xs text-muted">{hint}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[var(--radius-card)] bg-soot p-4 text-white">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold">Piano Team</span>
          <span className="num text-on-soot-muted">8 di 30 posti</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-soot-3">
          <div className="h-full rounded-full bg-brand" style={{ width: `${(8 / 30) * 100}%` }} />
        </div>
        <Link href="/team" className="mt-3 inline-block text-sm font-medium text-brand underline-offset-4 hover:underline">
          Invita una persona
        </Link>
      </div>
    </div>
  );
}

function Notifications() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative grid size-10 place-items-center rounded-full text-muted hover:bg-surface-muted hover:text-foreground"
        aria-label={`Notifiche: ${NOTIFICATIONS.length} nuove`}
        aria-expanded={open}
      >
        <Bell className="size-5" strokeWidth={1.75} />
        <span className="absolute right-1.5 top-1.5 grid min-w-4 place-items-center rounded-full bg-danger px-1 text-[11px] font-semibold leading-4 text-white">
          {NOTIFICATIONS.length}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-[var(--radius-card)] border border-border bg-surface p-2 shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
          {NOTIFICATIONS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="flex items-start justify-between gap-3 rounded-[var(--radius-control)] px-3 py-2.5 text-sm hover:bg-surface-muted"
            >
              <span>{n.text}</span>
              <span className="shrink-0 text-xs text-muted">{n.when}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const current = NAV.find((n) => isActive(n, pathname));
  const title = pathname.startsWith("/report") ? "Report del coach" : current?.label ?? "Coach";

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-dvh border-r border-border bg-surface lg:block">
        <Sidebar />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[86%] max-w-80 bg-surface">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 grid size-10 place-items-center rounded-full text-muted hover:bg-surface-muted"
              aria-label="Chiudi menu"
            >
              <X className="size-5" />
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border bg-surface px-4 md:px-6">
          <button
            onClick={() => setOpen(true)}
            className="-ml-2 grid size-10 place-items-center rounded-full text-muted hover:bg-surface-muted lg:hidden"
            aria-label="Apri menu"
          >
            <Menu className="size-5" />
          </button>
          <h1 className="truncate text-xl font-semibold tracking-tight">{title}</h1>

          <form
            className="ml-auto hidden h-9 w-72 items-center gap-2 rounded-full border border-control bg-surface px-3 text-sm md:flex"
            onSubmit={(e) => {
              e.preventDefault();
              const q = new FormData(e.currentTarget).get("q");
              router.push(`/team?q=${encodeURIComponent(String(q ?? ""))}`);
            }}
            role="search"
          >
            <Search className="size-4 text-muted" />
            <input
              name="q"
              placeholder="Cerca una persona del team"
              aria-label="Cerca una persona del team"
              className="w-full bg-transparent outline-none placeholder:text-muted"
            />
          </form>

          <Link href="/roleplay" className={clsx(buttonClass("primary"), "hidden md:inline-flex")}>
            <Plus className="size-4" /> Nuovo role play
          </Link>
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Notifications />
            <div className="flex items-center gap-2 pl-1">
              <Avatar name="Elena Marchi" />
              <div className="hidden text-sm leading-tight xl:block">
                <div className="font-medium">Elena Marchi</div>
                <div className="text-xs text-muted">HR · Nordica Assicurazioni</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 pb-24 md:p-6 md:pb-6">{children}</main>
      </div>

      {/* Telefono: l'azione principale resta a portata di pollice */}
      {!pathname.startsWith("/roleplay") && (
        <Link
          href="/roleplay"
          className="fixed bottom-4 right-4 z-30 inline-flex h-12 items-center gap-2 rounded-full bg-soot px-5 text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)] md:hidden"
        >
          <Plus className="size-4" /> Nuovo role play
        </Link>
      )}
    </div>
  );
}
