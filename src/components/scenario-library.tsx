"use client";

import clsx from "clsx";
import { Clock, Play } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Scenario } from "@/lib/types";
import { PersonaPortrait } from "./persona";
import { Badge, Difficulty, ScorePill, buttonClass, fmt1 } from "./ui";

type Filters = { area: string[]; difficulty: string[]; role: string[] };
const empty: Filters = { area: [], difficulty: [], role: [] };

const GROUPS: { key: keyof Filters; label: string; options: string[] }[] = [
  { key: "area", label: "Area", options: ["Vendite", "Servizio clienti", "Manager", "Neoassunti"] },
  { key: "difficulty", label: "Difficoltà", options: ["Facile", "Media", "Difficile"] },
  { key: "role", label: "Interlocutore", options: ["Cliente", "Compratore", "Collega", "Collaboratore"] },
];

export function ScenarioLibrary({
  scenarios,
  lastScores,
  featuredId,
  weakest,
}: {
  scenarios: Scenario[];
  lastScores: Record<string, number>;
  featuredId: string;
  weakest: { name: string; value: number };
}) {
  const [f, setF] = useState<Filters>(empty);
  const toggle = (k: keyof Filters, v: string) =>
    setF((cur) => ({ ...cur, [k]: cur[k].includes(v) ? cur[k].filter((x) => x !== v) : [...cur[k], v] }));

  const shown = useMemo(
    () =>
      scenarios.filter(
        (s) =>
          (!f.area.length || f.area.includes(s.area)) &&
          (!f.difficulty.length || f.difficulty.includes(s.difficulty)) &&
          (!f.role.length || f.role.includes(s.personaRole)),
      ),
    [scenarios, f],
  );
  const featured = scenarios.find((s) => s.id === featuredId)!;
  const active = f.area.length + f.difficulty.length + f.role.length;

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
      {/* Filtri: colonna su desktop, righe di chip sul telefono */}
      <aside className="rounded-[var(--radius-card)] border border-border bg-surface p-4" aria-label="Filtri">
        <div className="space-y-4">
          {GROUPS.map((g) => (
            <fieldset key={g.key}>
              <legend className="text-sm font-semibold">{g.label}</legend>
              <div className="-mx-4 mt-2 flex gap-1.5 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0">
                {g.options.map((o) => {
                  const on = f[g.key].includes(o);
                  return (
                    <label
                      key={o}
                      className={clsx(
                        "flex h-9 flex-none cursor-pointer items-center gap-2 rounded-full border px-3 text-sm transition-colors lg:rounded-[var(--radius-control)] lg:border-0 lg:px-2",
                        on ? "border-soot bg-brand font-medium" : "border-control hover:bg-surface-muted",
                      )}
                    >
                      <input type="checkbox" checked={on} onChange={() => toggle(g.key, o)} className="hidden size-4 accent-[var(--soot)] lg:block" />
                      {o}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
        <button
          onClick={() => setF(empty)}
          disabled={!active}
          className="mt-4 text-sm font-medium text-foreground underline-offset-4 hover:underline disabled:text-muted disabled:no-underline"
        >
          Azzera i filtri{active ? ` (${active})` : ""}
        </button>
      </aside>

      <div className="min-w-0 space-y-4">
        {/* Consigliato: chiude il giro Migliora → Allenati */}
        <div className="grid overflow-hidden rounded-[var(--radius-card)] bg-soot text-white sm:grid-cols-[220px_minmax(0,1fr)]">
          <PersonaPortrait scenarioId={featured.id} className="aspect-[4/3] w-full sm:aspect-auto sm:h-full" label={featured.persona} />
          <div className="flex flex-col gap-3 p-5">
            <div className="text-sm text-brand">Consigliato per il team: allena {weakest.name.toLowerCase()} ({fmt1(weakest.value)})</div>
            <h2 className="text-2xl font-semibold tracking-tight">{featured.title}</h2>
            <p className="max-w-prose text-[15px] text-on-soot-muted">{featured.description}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-on-soot-muted">
              <span>{featured.persona}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" /> {featured.minutes} min
              </span>
              <span>{featured.difficulty}</span>
            </div>
            <Link href={`/roleplay/${featured.id}`} className={clsx(buttonClass("brand", "lg"), "mt-1 self-start")}>
              <Play className="size-4 fill-current" /> Inizia ora
            </Link>
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-semibold">
            <span className="num">{shown.length}</span> {shown.length === 1 ? "scenario" : "scenari"}
          </h2>
          <span className="text-sm text-muted">per area, dal più difficile</span>
        </div>

        {shown.length === 0 ? (
          <div className="rounded-[var(--radius-card)] border border-dashed border-control p-6 text-sm text-muted">Nessuno scenario con questi filtri. Togline uno.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((s) => (
              <article key={s.id} className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-colors hover:border-control">
                <PersonaPortrait scenarioId={s.id} className="aspect-[16/9] w-full" label={s.persona} />
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge>{s.personaRole}</Badge>
                    <Difficulty level={s.difficulty} />
                  </div>
                  <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.persona} · {s.area}</p>
                  <p className="mt-2 text-sm">{s.competencies.join(" · ")}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                    <span className="flex items-center gap-2 text-sm text-muted">
                      <Clock className="size-3.5" /> {s.minutes} min
                      {lastScores[s.id] !== undefined && (
                        <>
                          · ultimo <ScorePill score={lastScores[s.id]} />
                        </>
                      )}
                    </span>
                    <Link href={`/roleplay/${s.id}`} className={buttonClass(lastScores[s.id] !== undefined ? "secondary" : "primary", "sm")}>
                      {lastScores[s.id] !== undefined ? "Riprova" : "Inizia"}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
