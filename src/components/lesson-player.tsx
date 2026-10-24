"use client";

import clsx from "clsx";
import { CheckCircle2, Hand, Pause, Play, Send } from "lucide-react";
import { useEffect, useState } from "react";
import type { Lesson } from "@/lib/types";
import { Badge, Button, Card, Progress } from "./ui";

// Demo del docente AI: spiega a voce per capitoli, si può interrompere e fare domande
export function LessonPlayer({ lessons }: { lessons: Lesson[] }) {
  const [selected, setSelected] = useState(lessons[1] ?? lessons[0]);
  const [playing, setPlaying] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [asking, setAsking] = useState(false);
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ from: "tu" | "docente"; text: string }[]>([]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setChapter((c) => Math.min(c + 1, selected.chapters.length - 1)), 4000);
    return () => clearInterval(t);
  }, [playing, selected]);

  function ask() {
    if (!question.trim()) return;
    setChat((c) => [
      ...c,
      { from: "tu", text: question },
      {
        from: "docente",
        text: "Ottima domanda. Nel listino 2027 lo sconto massimo al rinnovo è il 10%: oltre serve l'approvazione del responsabile d'area. Prima di arrivarci, proponi la franchigia più alta, che abbassa il premio del 7%.",
      },
    ]);
    setQuestion("");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-3">
        {lessons.map((l) => (
          <button
            key={l.id}
            onClick={() => {
              setSelected(l);
              setChapter(0);
              setPlaying(false);
              setChat([]);
            }}
            className={clsx(
              "w-full rounded-xl border bg-surface p-4 text-left transition-colors",
              selected.id === l.id ? "border-brand ring-2 ring-brand/15" : "border-border hover:border-brand/40",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">{l.title}</span>
              {l.progress === 100 && <CheckCircle2 className="size-4 shrink-0 text-success" />}
            </div>
            <div className="mt-1 text-xs text-muted">{l.minutes} min · {l.chapters.length} capitoli</div>
            <Progress value={l.progress} className="mt-3" />
          </button>
        ))}
      </div>

      <Card className="lg:col-span-2">
        <div className="flex flex-col items-center gap-4 rounded-xl bg-gradient-to-br from-brand to-indigo-800 p-8 text-white">
          <div className="grid size-20 place-items-center rounded-full bg-white/15 text-2xl font-semibold">AI</div>
          <div className="text-center">
            <div className="text-sm opacity-80">Il tuo docente</div>
            <div className="text-lg font-semibold">{selected.title}</div>
          </div>
          <div className="flex h-10 items-center gap-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className={clsx("w-1 rounded-full bg-white/80", playing ? "animate-wave" : "")}
                style={{ height: `${20 + ((i * 37) % 80)}%`, animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setPlaying((p) => !p)} className="bg-white text-brand hover:bg-white/90">
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
              {playing ? "Pausa" : "Ascolta"}
            </Button>
            <Button
              onClick={() => {
                setPlaying(false);
                setAsking(true);
              }}
              className="border border-white/40 bg-transparent text-white hover:bg-white/10"
            >
              <Hand className="size-4" /> Interrompi e chiedi
            </Button>
          </div>
        </div>

        <ol className="mt-5 space-y-2">
          {selected.chapters.map((c, i) => (
            <li key={c} className="flex items-center gap-3 text-sm">
              <span
                className={clsx(
                  "grid size-6 place-items-center rounded-full text-xs font-medium",
                  i < chapter ? "bg-success text-white" : i === chapter ? "bg-brand text-white" : "bg-surface-muted text-muted",
                )}
              >
                {i + 1}
              </span>
              <span className={i === chapter ? "font-medium" : "text-muted"}>{c}</span>
              {i === chapter && playing && <Badge tone="brand">In ascolto</Badge>}
            </li>
          ))}
        </ol>

        {asking && (
          <div className="mt-5 rounded-xl border border-border bg-surface-muted p-4">
            <div className="space-y-2">
              {chat.map((m, i) => (
                <div key={i} className={clsx("max-w-[85%] rounded-lg px-3 py-2 text-sm", m.from === "tu" ? "ml-auto bg-brand text-white" : "bg-surface")}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ask()}
                placeholder="Es. Qual è lo sconto massimo al rinnovo?"
                className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
              />
              <Button onClick={ask} aria-label="Invia domanda">
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
