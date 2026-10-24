"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { fmt1, initials } from "./ui";

type Week = { week: string; minutes: number; roleplays: number; score: number };

// Pratica della squadra a settimana: colonne per i minuti, linea per il punteggio.
// La settimana in corso porta l'unico colore dei dati; le altre sono in grigio.
export function WeeklyChart({ data }: { data: Week[] }) {
  const [metric, setMetric] = useState<"minutes" | "score">("minutes");
  const W = 640;
  const H = 220;
  const pad = { l: 40, r: 8, t: 22, b: 28 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const ticks = metric === "minutes" ? [0, 100, 200, 300] : [3, 3.5, 4];
  const [lo, hi] = [ticks[0], ticks[ticks.length - 1]];
  const y = (v: number) => pad.t + ih - ((v - lo) / (hi - lo)) * ih;
  const step = iw / data.length;
  const last = data.length - 1;
  const linePts = data.map((d, i) => `${pad.l + step * i + step / 2},${y(d.score)}`).join(" ");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold">Pratica del team, settimana per settimana</h2>
        <div className="inline-flex rounded-[var(--radius-control)] bg-surface-muted p-0.5 text-sm" role="tablist">
          {(
            [
              ["minutes", "Minuti"],
              ["score", "Punteggio"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={metric === k}
              onClick={() => setMetric(k)}
              className={clsx(
                "h-8 rounded-[6px] px-3 transition-colors",
                metric === k ? "bg-surface font-medium shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : "text-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label={metric === "minutes" ? "Minuti di pratica per settimana" : "Punteggio medio per settimana"}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--rule)" strokeWidth={t === lo ? 1.5 : 1} />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="12" fill="var(--muted)" className="num">
              {metric === "minutes" ? t : fmt1(t)}
            </text>
          </g>
        ))}
        {metric === "minutes" &&
          data.map((d, i) => {
            const x = pad.l + step * i + step * 0.22;
            const w = step * 0.56;
            return (
              <g key={d.week}>
                <rect x={x} y={y(d.minutes)} width={w} height={y(0) - y(d.minutes)} rx="3" fill={i === last ? "var(--data)" : "#c8cbbf"} />
                <text x={x + w / 2} y={y(d.minutes) - 6} textAnchor="middle" fontSize="12" fill={i === last ? "var(--foreground)" : "var(--muted)"} fontWeight={i === last ? 600 : 400} className="num">
                  {d.minutes}
                </text>
              </g>
            );
          })}
        {metric === "score" && (
          <>
            <polyline points={linePts} fill="none" stroke="var(--data)" strokeWidth="2" />
            {data.map((d, i) => (
              <g key={d.week}>
                <circle cx={pad.l + step * i + step / 2} cy={y(d.score)} r={i === last ? 4.5 : 3} fill={i === last ? "var(--data)" : "var(--surface)"} stroke="var(--data)" strokeWidth="2" />
                <text x={pad.l + step * i + step / 2} y={y(d.score) - 10} textAnchor="middle" fontSize="12" fill="var(--muted)" className="num">
                  {fmt1(d.score)}
                </text>
              </g>
            ))}
          </>
        )}
        {data.map((d, i) => (
          <text key={d.week} x={pad.l + step * i + step / 2} y={H - 8} textAnchor="middle" fontSize="12" fill={i === last ? "var(--foreground)" : "var(--muted)"}>
            {i === last ? `${d.week} · questa` : d.week}
          </text>
        ))}
      </svg>
      <p className="mt-1 text-sm text-muted">
        {metric === "minutes"
          ? `Minuti di role play e lezioni. ${data.reduce((s, d) => s + d.minutes, 0)} minuti in 6 settimane.`
          : "Media dei voti del coach nei role play della settimana, su 5."}
      </p>
    </div>
  );
}

type Person = { id: string; name: string; avgScore: number };

// Chi è pronto per il campo: ogni persona è un punto sulla scala 1–5, la soglia è 4
export function ReadinessStrip({ people, threshold }: { people: Person[]; threshold: number }) {
  const sorted = [...people].sort((a, b) => a.avgScore - b.avgScore);
  const lanes: number[] = [];
  const placed = sorted.map((p) => {
    let lane = 0;
    while (lanes[lane] !== undefined && p.avgScore - lanes[lane] < 0.35) lane++;
    lanes[lane] = p.avgScore;
    return { ...p, lane };
  });
  const pos = (s: number) => `${((s - 1) / 4) * 100}%`;
  const ready = people.filter((p) => p.avgScore >= threshold).length;
  const laneCount = Math.max(...placed.map((p) => p.lane)) + 1;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-base font-semibold">Chi è pronto</h2>
        <span className="num text-sm text-muted">
          <b className="font-semibold text-foreground">{ready}</b> di {people.length} sopra {fmt1(threshold)}
        </span>
      </div>
      <div className="relative mx-4 mt-8" style={{ height: laneCount * 40 + 8 }}>
        <div className="absolute inset-y-0 border-l border-dashed border-data" style={{ left: pos(threshold) }}>
          <span className="absolute -top-6 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-data">pronto da {fmt1(threshold)}</span>
        </div>
        {placed.map((p) => {
          const isReady = p.avgScore >= threshold;
          return (
            <Link
              key={p.id}
              href={`/team/${p.id}`}
              title={`${p.name} · ${fmt1(p.avgScore)}`}
              className={clsx(
                "absolute grid size-8 -translate-x-1/2 place-items-center rounded-full text-xs font-semibold transition-transform hover:scale-110",
                isReady ? "bg-data text-white" : "border border-control bg-surface text-foreground",
              )}
              style={{ left: pos(p.avgScore), bottom: p.lane * 40 }}
            >
              {initials(p.name)}
            </Link>
          );
        })}
      </div>
      <div className="relative mx-4 mt-2 h-5 border-t border-border">
        {[1, 2, 3, 4, 5].map((t) => (
          <span key={t} className="num absolute top-1 -translate-x-1/2 text-xs text-muted" style={{ left: pos(t) }}>
            {t}
          </span>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">Media dei voti del coach di ogni persona. Tocca un punto per il suo percorso.</p>
    </div>
  );
}

// Serie di punteggi nel tempo per una persona (pagina di dettaglio)
export function ScoreLine({ data }: { data: { week: string; score: number }[] }) {
  const W = 520;
  const H = 150;
  const pad = { l: 32, r: 12, t: 16, b: 24 };
  const ticks = [1, 2, 3, 4, 5];
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - (v - 1) / 4);
  const step = (W - pad.l - pad.r) / (data.length - 1);
  const x = (i: number) => pad.l + step * i;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Punteggio medio nelle ultime 6 settimane">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--rule)" />
          <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="12" fill="var(--muted)">
            {t}
          </text>
        </g>
      ))}
      <line x1={pad.l} x2={W - pad.r} y1={y(4)} y2={y(4)} stroke="var(--data)" strokeDasharray="4 4" />
      <polyline points={data.map((d, i) => `${x(i)},${y(d.score)}`).join(" ")} fill="none" stroke="var(--soot)" strokeWidth="2" />
      {data.map((d, i) => (
        <g key={d.week}>
          {i === data.length - 1 && (
            <>
              <circle cx={x(i)} cy={y(d.score)} r="4.5" fill="var(--soot)" />
              <text x={x(i) - 8} y={y(d.score) - 10} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--foreground)">
                {fmt1(d.score)}
              </text>
            </>
          )}
          <text x={x(i)} y={H - 6} textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"} fontSize="12" fill="var(--muted)">
            {d.week}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Profilo delle competenze: la persona contro la media del team, una riga per competenza
export function CompetencyCompare({ rows }: { rows: { name: string; mine: number | null; team: number | null }[] }) {
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.name}>
          <div className="mb-1 flex justify-between text-sm">
            <span>{r.name}</span>
            <span className="num">
              {r.mine === null ? <span className="text-muted">—</span> : <b className={clsx("font-semibold", r.mine < 3 && "text-danger")}>{fmt1(r.mine)}</b>}
              <span className="text-muted"> · team {r.team === null ? "—" : fmt1(r.team)}</span>
            </span>
          </div>
          <div className="relative h-2 rounded-full bg-surface-muted">
            {r.mine !== null && <div className="h-full rounded-full bg-soot" style={{ width: `${(r.mine / 5) * 100}%` }} />}
            {r.team !== null && <span className="absolute -top-0.5 h-3 w-0.5 bg-data" style={{ left: `${(r.team / 5) * 100}%` }} aria-hidden />}
          </div>
        </li>
      ))}
    </ul>
  );
}
