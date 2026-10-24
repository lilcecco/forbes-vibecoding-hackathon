"use client";

import clsx from "clsx";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { FeedbackItem } from "@/lib/types";
import { mmss } from "./ui";

const toSec = (at: string) => {
  const [m, s] = at.split(":").map(Number);
  return m * 60 + s;
};

// La conversazione intera come onda, con i segni del coach al minuto esatto.
// Toccare un momento lo riascolta (demo: il cursore parte da lì).
export function ReportTimeline({ feedback, durationSec, personaName }: { feedback: FeedbackItem[]; durationSec: number; personaName: string }) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((v) => (v + 1 >= durationSec ? (setPlaying(false), durationSec) : v + 1)), 250);
    return () => clearInterval(id);
  }, [playing, durationSec]);

  // il momento più vicino già passato si accende mentre il cursore avanza
  useEffect(() => {
    if (!playing) return;
    const idx = feedback.map((f) => toSec(f.at)).filter((s) => s <= t).length - 1;
    if (idx >= 0) setActive(idx);
  }, [t, playing, feedback]);

  const good = feedback.filter((f) => f.kind === "positivo").length;
  const bars = 96;

  function jump(i: number) {
    setActive(i);
    setT(toSec(feedback[i].at));
    setPlaying(true);
    document.getElementById(`m-${i}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  return (
    <div>
      <div className="rounded-[var(--radius-card)] border border-border bg-surface p-4 md:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-base font-semibold">La conversazione, momento per momento</h2>
          <span className="num text-sm text-muted">
            <span className="text-success">{good} ottimi</span> · <span className="text-danger">{feedback.length - good} da migliorare</span>
          </span>
        </div>
        <div className="relative mt-5 h-16">
          <div className="absolute inset-0 flex items-center gap-[2px]" aria-hidden>
            {Array.from({ length: bars }).map((_, i) => {
              const h = 18 + Math.abs(Math.sin(i * 1.7) * 52) + ((i * 13) % 19);
              const passed = (i / bars) * durationSec <= t;
              return <span key={i} className={clsx("flex-1 rounded-full", passed ? "bg-soot" : "bg-control")} style={{ height: `${Math.min(100, h).toFixed(2)}%` }} />;
            })}
          </div>
          {feedback.map((f, i) => (
            <button
              key={i}
              onClick={() => jump(i)}
              className={clsx(
                "absolute -top-2 size-4 -translate-x-1/2 rounded-full border-2 border-surface transition-transform hover:scale-125",
                f.kind === "positivo" ? "bg-success" : "bg-danger",
                active === i && "scale-125 ring-2 ring-soot",
              )}
              style={{ left: `${(toSec(f.at) / durationSec) * 100}%` }}
              aria-label={`Vai al minuto ${f.at}: ${f.kind === "positivo" ? "ottimo" : "da migliorare"}, ${f.competency}`}
            />
          ))}
          <span className="absolute -bottom-1 top-0 w-0.5 bg-data" style={{ left: `${(t / durationSec) * 100}%` }} aria-hidden />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => (t >= durationSec ? (setT(0), setPlaying(true)) : setPlaying((p) => !p))}
            className="grid size-10 place-items-center rounded-full bg-soot text-white"
            aria-label={playing ? "Pausa" : "Riascolta"}
          >
            {playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
          </button>
          <span className="num text-sm text-muted">
            {mmss(t)} / {mmss(durationSec)}
          </span>
        </div>
      </div>

      <ol className="relative mt-4 space-y-3 border-l-2 border-border pl-5 md:ml-2">
        {feedback.map((f, i) => (
          <li
            key={i}
            id={`m-${i}`}
            className={clsx(
              "relative rounded-[var(--radius-card)] border bg-surface p-4 transition-colors",
              f.kind === "migliora" ? "border-danger/40" : "border-border",
              active === i && "ring-2 ring-soot",
            )}
          >
            <span className={clsx("absolute -left-[29px] top-5 size-3.5 rounded-full border-2 border-background", f.kind === "positivo" ? "bg-success" : "bg-danger")} />
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => jump(i)} className="num inline-flex h-7 items-center gap-1 rounded-full bg-surface-muted px-2.5 text-sm font-medium hover:bg-control">
                <Play className="size-3 fill-current" /> {f.at}
              </button>
              <span className={clsx("text-sm font-medium", f.kind === "positivo" ? "text-success" : "text-danger")}>
                {f.kind === "positivo" ? "Ottimo" : "Da migliorare"} · {f.competency}
              </span>
            </div>
            {f.quote && (
              <p className="mt-2 text-[15px]">
                <span className="text-muted">Tu: </span>
                <mark className="rounded bg-brand px-1 text-foreground [box-decoration-break:clone]">«{f.quote}»</mark>
              </p>
            )}
            <p className="mt-2 text-[15px] leading-snug">{f.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 pl-7 text-sm text-muted">Conversazione con {personaName}. I segni sono messi dal coach durante la chiamata.</p>
    </div>
  );
}
