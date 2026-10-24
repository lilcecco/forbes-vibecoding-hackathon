"use client";

import { Mic, Plus, Square } from "lucide-react";
import { useEffect, useState } from "react";
import type { ExpertNote } from "@/lib/types";
import { Avatar, Button, formatDate, mmss } from "./ui";

// Note dei migliori: come lavorano davvero. Demo della registrazione a voce.
export function ExpertNotes({ notes }: { notes: ExpertNote[] }) {
  const [list, setList] = useState(notes);
  const [recording, setRecording] = useState(false);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  function stop() {
    setRecording(false);
    setList((l) => [
      {
        id: `n${l.length + 1}`,
        author: "Elena Marchi",
        role: "Team leader customer care · nota a voce",
        text: "Prima di chiudere la telefonata ripeto al cliente cosa succede adesso e quando lo richiamo.",
        date: "2026-10-24",
      },
      ...l,
    ]);
    setSec(0);
  }

  return (
    <div className="rounded-[var(--radius-card)] bg-soot p-5 text-white">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-base font-semibold">Il sapere degli esperti</h2>
        <span className="num text-sm text-on-soot-muted">{list.length} note</span>
      </div>
      <p className="mt-1 text-sm text-on-soot-muted">Come lavorano davvero i migliori. Coach le usa come esempi nelle lezioni e nei role play.</p>
      <ul className="mt-4 space-y-3">
        {list.map((n) => (
          <li key={n.id} className="rounded-[var(--radius-control)] bg-soot-2 p-3">
            <p className="text-[15px] leading-snug">«{n.text}»</p>
            <div className="mt-2 flex items-center gap-2">
              <Avatar name={n.author} className="size-6 text-[11px]" />
              <span className="truncate text-sm text-on-soot-muted">
                {n.author} · {formatDate(n.date)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        {recording ? (
          <Button variant="brand" onClick={stop} className="flex-1">
            <Square className="size-3.5 fill-current" /> Ferma <span className="num">{mmss(sec)}</span>
          </Button>
        ) : (
          <Button variant="brand" onClick={() => setRecording(true)} className="flex-1">
            <Mic className="size-4" /> Registra una nota a voce
          </Button>
        )}
        <Button className="border border-soot-3 bg-transparent hover:bg-soot-2" aria-label="Scrivi una nota">
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  );
}
