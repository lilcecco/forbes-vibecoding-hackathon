"use client";

import clsx from "clsx";
import { Mic } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PersonaPortrait } from "../persona";
import { fmt1 } from "../ui";

type Option = { text: string; score: number; competency: string; good: boolean; note: string };
type Demo = { id: string; label: string; who: string; line: string; options: Option[] };

const DEMOS: Demo[] = [
  {
    id: "s1",
    label: "Lo sconto al rinnovo",
    who: "Roberto, titolare di un negozio",
    line: "Il rinnovo costa 50 euro in più. Voglio il 15% di sconto, o vado altrove.",
    options: [
      { text: "Per lei conta più il totale o la rata mensile?", score: 4.6, competency: "Interessi e posizioni", good: true, note: "Hai cercato cosa gli interessa davvero: la trattativa si apre." },
      { text: "Va bene, le applico il 10%: è il massimo.", score: 2.1, competency: "Generare opzioni", good: false, note: "Hai dato via lo sconto massimo al primo no. Prima proponi la franchigia." },
      { text: "Il listino è questo, purtroppo.", score: 1.8, competency: "Argomentare con i dati", good: false, note: "Il listino senza un perché suona come un muro: cita il +8% di sinistri in zona." },
    ],
  },
  {
    id: "s3",
    label: "Il cliente arrabbiato",
    who: "Franco, rimborso in ritardo",
    line: "Sono tre settimane che aspetto il rimborso! Tre settimane!",
    options: [
      { text: "Si calmi, così non risolviamo.", score: 1.6, competency: "Tono di voce", good: false, note: "Chiedere di calmarsi alza la tensione. Riconosci prima il disagio." },
      { text: "Ha ragione, sono troppe. Mi dà il numero della pratica?", score: 4.7, competency: "Ascolto attivo", good: true, note: "Hai riconosciuto il problema e sei passato subito ai fatti." },
      { text: "La pratica risulta in lavorazione.", score: 2.3, competency: "Ascolto attivo", good: false, note: "Hai risposto con la procedura prima di capire cosa serve a Franco." },
    ],
  },
  {
    id: "s4",
    label: "Il riscontro difficile",
    who: "Stefano, il tuo collaboratore",
    line: "È per i numeri del trimestre? Guarda che non è colpa mia.",
    options: [
      { text: "Lo sai anche tu che così non va.", score: 1.9, competency: "Tono di voce", good: false, note: "Parti dalla persona, non dal numero: Stefano si chiude." },
      { text: "Ne parliamo un'altra volta.", score: 1.5, competency: "Interessi e posizioni", good: false, note: "Rimandare lascia il problema dov'è." },
      { text: "Il trimestre è al 62%. Capiamo insieme cosa è successo.", score: 4.5, competency: "Tono di voce", good: true, note: "Il numero prima della persona: il riscontro resta un fatto, non un giudizio." },
    ],
  },
];

// La cosa viva della pagina: rispondi al cliente e ricevi il voto del coach, subito
export function HeroDemo() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const [fade, setFade] = useState(false);
  const demo = DEMOS[i];

  // Mossa firma: finché nessuno tocca, gli scenari si alternano con una dissolvenza lenta
  useEffect(() => {
    if (touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      setFade(true);
      setTimeout(() => {
        setI((v) => (v + 1) % DEMOS.length);
        setFade(false);
      }, 800);
    }, 6400);
    return () => clearInterval(t);
  }, [touched]);

  function choose(idx: number) {
    setTouched(true);
    setPicked(idx);
  }

  const answer = picked !== null ? demo.options[picked] : null;

  return (
    <div data-ui className="overflow-hidden rounded-[var(--radius-card)] bg-soot-2 text-white">
      <div className="flex gap-1.5 overflow-x-auto p-3" role="tablist" aria-label="Scegli lo scenario">
        {DEMOS.map((d, k) => (
          <button
            key={d.id}
            role="tab"
            aria-selected={k === i}
            onClick={() => {
              setTouched(true);
              setI(k);
              setPicked(null);
            }}
            className={clsx("h-9 flex-none rounded-full px-3.5 text-sm transition-colors", k === i ? "bg-brand font-medium text-soot" : "bg-soot-3 text-white hover:bg-[#363636]")}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className={clsx("transition-opacity duration-[800ms]", fade ? "opacity-0" : "opacity-100")}>
        <div className="relative">
          <PersonaPortrait scenarioId={demo.id} speaking={picked === null && !fade} className="aspect-[16/10] w-full" label={demo.who} />
          <div className="absolute inset-x-3 bottom-3 rounded-[var(--radius-control)] bg-soot/90 p-3">
            <div className="text-xs text-on-soot-muted">{demo.who}</div>
            <p className="mt-0.5 text-[17px] leading-snug">«{demo.line}»</p>
          </div>
          <span className="num absolute left-3 top-3 inline-flex h-7 items-center gap-1.5 rounded-full bg-soot/80 px-2.5 text-xs">
            <span className="size-1.5 rounded-full bg-danger" /> 00:12
          </span>
        </div>

        <div className="p-3">
          {!answer ? (
            <>
              <div className="flex items-center gap-2 px-1 pb-2 text-sm text-on-soot-muted">
                <Mic className="size-4" /> Cosa rispondi? Scegli una frase.
              </div>
              <ul className="space-y-1.5">
                {demo.options.map((o, k) => (
                  <li key={o.text}>
                    <button
                      onClick={() => choose(k)}
                      className="w-full rounded-[var(--radius-control)] bg-soot-3 px-3.5 py-3 text-left text-[15px] leading-snug transition-[background-color,transform] hover:bg-[#363636] active:scale-[0.99]"
                    >
                      {o.text}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="rounded-[var(--radius-control)] bg-white p-4 text-soot" aria-live="polite">
              <div className="flex items-start gap-4">
                <div className="num text-[44px] font-semibold leading-none tracking-tight">
                  {fmt1(answer.score)}
                  <span className="text-base font-normal text-muted">/5</span>
                </div>
                <div className="min-w-0">
                  <div className={clsx("text-sm font-medium", answer.good ? "text-success" : "text-danger")}>
                    00:12 · {answer.good ? "Ottimo" : "Da migliorare"} · {answer.competency}
                  </div>
                  <p className="mt-1 text-[15px] leading-snug">{answer.note}</p>
                </div>
              </div>
              <p className="mt-3 text-[15px]">
                <mark className="rounded bg-brand px-1">«{answer.text}»</mark>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={() => setPicked(null)} className="h-10 rounded-[var(--radius-control)] border border-control px-4 text-sm font-medium hover:bg-surface-muted">
                  Prova un'altra risposta
                </button>
                <Link href={`/roleplay/${demo.id}`} className="inline-flex h-10 items-center rounded-[var(--radius-control)] bg-soot px-4 text-sm font-medium text-white hover:bg-soot-3">
                  Fai il role play intero
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
