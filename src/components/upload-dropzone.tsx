"use client";

import { FileUp, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

// Demo: simula il caricamento e l'elaborazione del documento in lezioni e scenari
export function UploadDropzone() {
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const steps = ["Lettura del documento…", "Creazione delle lezioni…", "Generazione degli scenari…", "Pronto!"];

  function start(name: string) {
    setFile(name);
    setStep(0);
    steps.forEach((_, i) => setTimeout(() => setStep(i), i * 1200));
  }

  return (
    <div
      onClick={() => input.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const f = e.dataTransfer.files[0];
        if (f) start(f.name);
      }}
      className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface p-8 text-center transition-colors hover:border-brand hover:bg-brand-soft/40"
    >
      <input
        ref={input}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.md,.txt,.xlsx"
        onChange={(e) => e.target.files?.[0] && start(e.target.files[0].name)}
      />
      {file ? (
        <>
          {step < steps.length - 1 ? (
            <Loader2 className="size-8 animate-spin text-brand" />
          ) : (
            <FileUp className="size-8 text-success" />
          )}
          <div className="text-sm font-medium">{file}</div>
          <div className="text-sm text-muted">{steps[step]}</div>
        </>
      ) : (
        <>
          <div className="grid size-12 place-items-center rounded-full bg-brand-soft">
            <FileUp className="size-6 text-brand" />
          </div>
          <div className="font-medium">Trascina qui un listino, una procedura o una scheda prodotto</div>
          <div className="text-sm text-muted">PDF, Word, Excel o testo · Coach ne ricava lezioni e role play</div>
        </>
      )}
    </div>
  );
}
