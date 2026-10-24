"use client";

import clsx from "clsx";
import { ArrowUp, Check, Hand, Mic, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { DocumentItem, Lesson } from "@/lib/types";
import { CoachMark } from "./logo";
import { Progress, mmss } from "./ui";

// Testo che il docente legge, capitolo per capitolo (demo per la lezione sul rinnovo)
const SCRIPTS: Record<string, string[][]> = {
  l2: [
    ["Il premio Casa sale perché in tre province i sinistri per allagamento sono cresciuti dell'8%.", "Il cliente non lo sa: dirlo per primo cambia il tono della telefonata."],
    ["I numeri da citare sono due: più 8% di sinistri in zona e più 50 euro sul premio annuo.", "Detto così, l'aumento si spiega da solo: sono 4 euro al mese."],
    ["Prima dello sconto ci sono due strade: la franchigia a 500 euro abbassa il premio del 7%.", "Oppure il pagamento mensile senza costi: il totale resta, la rata pesa meno."],
  ],
};

type Answer = { text: string; cite: string };

function answerFor(q: string, doc?: DocumentItem): Answer {
  const s = q.toLowerCase();
  if (s.includes("sconto") || s.includes("massimo"))
    return { text: "Lo sconto massimo al rinnovo è il 10%. Oltre serve l'approvazione del responsabile d'area. Prima prova la franchigia più alta.", cite: "Listino p. 4" };
  if (s.includes("franchigia"))
    return { text: "Con la franchigia a 500 euro il premio Casa scende del 7%. Conviene a chi non ha avuto sinistri negli ultimi tre anni.", cite: "Listino p. 6" };
  if (s.includes("multi") || s.includes("auto") || s.includes("doppia"))
    return { text: "Sì: con Casa più Auto lo sconto sale al 12% sul totale, e vale anche al rinnovo.", cite: "Listino p. 9" };
  if (s.includes("concorrente") || s.includes("costa meno"))
    return { text: "Non inseguire il prezzo: chiedi cosa copre l'offerta del concorrente. Spesso manca l'allagamento, che da noi è incluso.", cite: "Listino p. 3" };
  return { text: `Nel documento «${doc?.name ?? "caricato"}» la risposta è nel capitolo che stai ascoltando. Te lo rileggo con un esempio?`, cite: doc ? doc.name.replace(/\.\w+$/, "") : "Documento" };
}

const SUGGESTIONS = ["Qual è lo sconto massimo?", "Conviene la franchigia?", "Casa e Auto insieme?"];

export function LessonPlayer({ lessons, documents }: { lessons: Lesson[]; documents: DocumentItem[] }) {
  const [selectedId, setSelectedId] = useState(lessons.find((l) => l.progress > 0 && l.progress < 100)?.id ?? lessons[0].id);
  const selected = lessons.find((l) => l.id === selectedId)!;
  const doc = documents.find((d) => d.id === selected.documentId);
  const total = selected.minutes * 60;
  const per = total / selected.chapters.length;

  const [t, setT] = useState(Math.round((selected.progress / 100) * total));
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ from: "tu" | "docente"; text: string; cite?: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((v) => Math.min(total, v + 1)), 1000 / speed);
    return () => clearInterval(id);
  }, [playing, speed, total]);

  useEffect(() => {
    if (t >= total) setPlaying(false);
  }, [t, total]);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [chat]);

  const chapter = Math.min(selected.chapters.length - 1, Math.floor(t / per));
  const lines = SCRIPTS[selected.id]?.[chapter] ?? [
    `Capitolo «${selected.chapters[chapter]}»: il docente lo spiega partendo da ${doc?.name ?? "il documento"}.`,
    "Puoi interrompere in qualsiasi momento e fare una domanda.",
  ];
  const line = lines[Math.floor((t - chapter * per) / 6) % lines.length];

  const grouped = useMemo(
    () => documents.filter((d) => d.status === "pronto").map((d) => ({ doc: d, items: lessons.filter((l) => l.documentId === d.id) })),
    [documents, lessons],
  );

  function select(l: Lesson) {
    setSelectedId(l.id);
    setT(Math.round((l.progress / 100) * l.minutes * 60));
    setPlaying(false);
    setChat([]);
  }

  function ask(q: string) {
    if (!q.trim()) return;
    setPlaying(false);
    const a = answerFor(q, doc);
    setChat((c) => [...c, { from: "tu", text: q }, { from: "docente", text: a.text, cite: a.cite }]);
    setQuestion("");
  }

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_340px]">
      {/* Lezioni, per documento */}
      <nav className="order-3 space-y-5 rounded-[var(--radius-card)] border border-border bg-surface p-4 lg:order-1" aria-label="Lezioni">
        {grouped.map(({ doc: d, items }) => {
          const done = items.filter((l) => l.progress === 100).length;
          return (
            <div key={d.id}>
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="truncate text-sm font-semibold">{d.name.replace(/\.\w+$/, "")}</h2>
                <span className="num shrink-0 text-xs text-muted">
                  {done}/{items.length}
                </span>
              </div>
              <ul className="mt-2 space-y-0.5">
                {items.map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => select(l)}
                      aria-current={l.id === selectedId ? "true" : undefined}
                      className={clsx(
                        "flex w-full items-start gap-2 rounded-[var(--radius-control)] px-2 py-2 text-left text-sm transition-colors",
                        l.id === selectedId ? "bg-brand font-medium" : "hover:bg-surface-muted",
                      )}
                    >
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center">
                        {l.progress === 100 ? <Check className="size-4 text-success" /> : l.id === selectedId ? <Play className="size-3.5 fill-current" /> : <span className="size-2 rounded-full border border-muted" />}
                      </span>
                      <span className="flex-1">{l.title}</span>
                      <span className="num shrink-0 text-xs text-muted">{l.minutes}′</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Player del docente AI */}
      <section className="order-1 min-w-0 lg:order-2" aria-label="Lezione in corso">
        <div className="text-sm text-muted">
          {doc?.name.replace(/\.\w+$/, "")} · capitolo {chapter + 1} di {selected.chapters.length}
        </div>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{selected.title}</h2>

        <div className="mt-4 overflow-hidden rounded-[var(--radius-card)] bg-soot text-white">
          <div className="flex flex-col items-center gap-5 px-6 pb-6 pt-8">
            <div className="flex items-center gap-3">
              <CoachMark className="size-14" speaking={playing} />
              <div>
                <div className="font-semibold">Il tuo docente</div>
                <div className="text-sm text-on-soot-muted">{playing ? "sta spiegando" : t >= total ? "lezione finita" : "in pausa"}</div>
              </div>
            </div>
            <div className="flex h-14 items-center gap-1" aria-hidden>
              {Array.from({ length: 36 }).map((_, i) => (
                <span
                  key={i}
                  className={clsx("w-1.5 rounded-full", playing ? "animate-wave bg-brand" : "bg-soot-3")}
                  style={{ height: `${22 + ((i * 37) % 78)}%`, animationDelay: `${i * 55}ms` }}
                />
              ))}
            </div>
            <p className="min-h-[3.2em] max-w-xl text-center text-lg leading-snug" aria-live="polite">
              {line}
            </p>
          </div>
          <div className="border-t border-soot-3 px-5 py-4">
            <div className="flex items-center gap-3 text-sm">
              <span className="num w-12 text-on-soot-muted">{mmss(t)}</span>
              <div className="relative h-1.5 flex-1 rounded-full bg-soot-3">
                <div className="h-full rounded-full bg-brand" style={{ width: `${(t / total) * 100}%` }} />
                {selected.chapters.slice(1).map((_, i) => (
                  <span key={i} className="absolute top-0 h-1.5 w-0.5 bg-soot" style={{ left: `${((i + 1) / selected.chapters.length) * 100}%` }} />
                ))}
              </div>
              <span className="num w-12 text-right text-on-soot-muted">{mmss(total)}</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button onClick={() => setT((v) => Math.max(0, v - 15))} className="grid size-11 place-items-center rounded-full hover:bg-soot-2" aria-label="Indietro di 15 secondi">
                <RotateCcw className="size-5" />
              </button>
              <button
                onClick={() => (t >= total ? (setT(0), setPlaying(true)) : setPlaying((p) => !p))}
                className="grid size-14 place-items-center rounded-full bg-white text-soot transition-transform active:scale-95"
                aria-label={playing ? "Pausa" : "Ascolta"}
              >
                {playing ? <Pause className="size-6 fill-current" /> : <Play className="ml-0.5 size-6 fill-current" />}
              </button>
              <button onClick={() => setT((v) => Math.min(total, v + 15))} className="grid size-11 place-items-center rounded-full hover:bg-soot-2" aria-label="Avanti di 15 secondi">
                <RotateCw className="size-5" />
              </button>
              <button
                onClick={() => setSpeed((s) => (s === 1 ? 1.25 : s === 1.25 ? 1.5 : 1))}
                className="num h-9 rounded-full border border-soot-3 px-3 text-sm hover:bg-soot-2"
                aria-label="Velocità"
              >
                {String(speed).replace(".", ",")}×
              </button>
              <button
                onClick={() => {
                  setPlaying(false);
                  inputRef.current?.focus();
                }}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 font-medium text-soot transition-transform active:scale-95"
              >
                <Hand className="size-4" /> Interrompi e chiedi
              </button>
            </div>
          </div>
        </div>

        <ol className="mt-4 grid gap-2 sm:grid-cols-3">
          {selected.chapters.map((c, i) => (
            <li key={c}>
              <button
                onClick={() => setT(Math.ceil(i * per))}
                className={clsx(
                  "w-full rounded-[var(--radius-control)] border px-3 py-2 text-left text-sm transition-colors",
                  i === chapter ? "border-soot bg-surface font-medium" : "border-border bg-surface text-muted hover:text-foreground",
                )}
              >
                <span className="num text-xs text-muted">{mmss(Math.ceil(i * per))}</span>
                <span className="block">{c}</span>
              </button>
            </li>
          ))}
        </ol>
        <Progress value={(t / total) * 100} className="mt-3 lg:hidden" />
      </section>

      {/* Chat con il docente, sempre aperta */}
      <aside className="order-2 flex flex-col rounded-[var(--radius-card)] border border-border bg-surface p-4 lg:order-3 lg:col-span-2 xl:col-span-1 xl:min-h-[560px]" aria-label="Chiedi sul documento">
        <h2 className="text-base font-semibold">Chiedi sul documento</h2>
        <p className="mt-0.5 text-sm text-muted">Il docente risponde citando la pagina.</p>
        <div className="mt-4 flex-1 space-y-2 overflow-y-auto xl:max-h-[380px]">
          {chat.length === 0 && (
            <div className="rounded-[var(--radius-control)] bg-surface-muted p-3 text-sm">
              Stai ascoltando «{selected.chapters[chapter]}». Chiedimi quello che non è chiaro.
            </div>
          )}
          {chat.map((m, i) => (
            <div key={i} className={clsx("max-w-[88%] rounded-[var(--radius-control)] px-3 py-2 text-sm", m.from === "tu" ? "ml-auto bg-brand" : "bg-surface-muted")}>
              {m.text}
              {m.cite && <span className="mt-1.5 block w-fit rounded-full bg-surface px-2 py-0.5 text-xs font-medium">{m.cite}</span>}
            </div>
          ))}
          <div ref={chatEnd} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => ask(s)} className="h-8 rounded-full border border-control px-3 text-sm hover:bg-surface-muted">
              {s}
            </button>
          ))}
        </div>
        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            ask(question);
          }}
        >
          <div className="flex h-11 flex-1 items-center gap-2 rounded-full border border-control px-4">
            <input
              ref={inputRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Scrivi la tua domanda"
              aria-label="La tua domanda"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
            <Mic className="size-4 shrink-0 text-muted" aria-hidden />
          </div>
          <button type="submit" className="grid size-11 shrink-0 place-items-center rounded-full bg-soot text-white" aria-label="Invia domanda">
            <ArrowUp className="size-5" />
          </button>
        </form>
      </aside>
    </div>
  );
}
