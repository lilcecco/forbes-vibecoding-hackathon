"use client";

import clsx from "clsx";
import { Check, FileUp, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { buttonClass } from "./ui";

const STEPS = ["Lettura del documento", "Creazione delle lezioni", "Generazione degli scenari", "Pronto"];

// Demo: simula il caricamento e l'elaborazione del documento in lezioni e scenari
export function UploadDropzone() {
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [over, setOver] = useState(false);

  function start(name: string) {
    setFile(name);
    setStep(0);
    STEPS.forEach((_, i) => setTimeout(() => setStep(i), i * 1300));
  }

  const done = file && step === STEPS.length - 1;

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const f = e.dataTransfer.files[0];
        if (f) start(f.name);
      }}
      className={clsx(
        "rounded-[var(--radius-card)] border-2 border-dashed p-5 transition-colors md:p-6",
        over ? "border-soot bg-brand-soft" : "border-control bg-surface",
      )}
    >
      <input
        ref={input}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.md,.txt,.xlsx,.ppt,.pptx"
        onChange={(e) => e.target.files?.[0] && start(e.target.files[0].name)}
      />
      {!file ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-muted">
            <FileUp className="size-5" strokeWidth={1.75} />
          </div>
          <div className="flex-1">
            <div className="font-medium">Trascina qui un listino, una procedura o una scheda prodotto</div>
            <div className="mt-0.5 text-sm text-muted">PDF, Word, Excel, PowerPoint o testo, fino a 50 MB. Coach ne ricava lezioni e role play.</div>
          </div>
          <button onClick={() => input.current?.click()} className={buttonClass("primary")}>
            Scegli un file
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3">
            <div className={clsx("grid size-10 shrink-0 place-items-center rounded-full", done ? "bg-brand" : "bg-surface-muted")}>
              {done ? <Check className="size-5" /> : <Loader2 className="size-5 animate-spin" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{file}</div>
              <div className="text-sm text-muted" aria-live="polite">
                {done ? "Pronto: 3 lezioni e 2 scenari di role play" : `${STEPS[step]}…`}
              </div>
            </div>
            {done && (
              <Link href="/impara" className={buttonClass("secondary", "sm")}>
                Vai alle lezioni
              </Link>
            )}
          </div>
          <ol className="mt-4 grid grid-cols-4 gap-2">
            {STEPS.map((s, i) => (
              <li key={s}>
                <div className={clsx("h-1.5 rounded-full transition-colors duration-500", i <= step ? "bg-soot" : "bg-surface-muted")} />
                <div className={clsx("mt-1.5 text-xs", i <= step ? "text-foreground" : "text-muted")}>{s}</div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
