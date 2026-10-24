"use client";

import clsx from "clsx";
import { ChevronLeft, Lightbulb, Mic, MicOff, Pause, Play, PhoneOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Scenario } from "@/lib/types";
import { PersonaPortrait } from "./persona";
import { mmss } from "./ui";

type Line = { from: "avatar" | "tu"; text: string; hits?: string[] };

// Copioni demo: l'avatar parla e la trascrizione scorre come in una chiamata vera
const SCRIPTS: Record<string, Line[]> = {
  s1: [
    { from: "avatar", text: "Buongiorno. Ho visto il rinnovo: 640 euro, l'anno scorso erano 590. Così non ci siamo." },
    { from: "tu", text: "Capisco, un aumento di 50 euro non fa piacere. Posso spiegarle da dove arriva?" },
    { from: "avatar", text: "Me lo spieghi pure, ma io voglio il 15% di sconto, altrimenti vado altrove." },
    { from: "tu", text: "Nella sua zona i sinistri per allagamento sono cresciuti dell'8%. Per lei conta più il totale o la rata mensile?", hits: ["Argomentare con i dati", "Interessi e posizioni"] },
    { from: "avatar", text: "Beh… la rata. A fine mese è quella che pesa." },
    { from: "tu", text: "Allora le propongo due strade: franchigia più alta o pagamento mensile senza costi. Quale preferisce?", hits: ["Generare opzioni"] },
    { from: "avatar", text: "Mi faccia vedere i numeri della franchigia." },
  ],
  s2: [
    { from: "avatar", text: "Le dico subito: mi hanno offerto la stessa polizza a 120 euro in meno. Voglio disdire." },
    { from: "tu", text: "Grazie di avermelo detto. Mi racconta cosa le hanno offerto, esattamente?", hits: ["Ascolto attivo"] },
    { from: "avatar", text: "Casa e furto, stessa franchigia. Mi sembra uguale." },
    { from: "tu", text: "Controlliamo insieme: da noi l'allagamento è incluso e in sei anni non ha mai avuto un sinistro contestato.", hits: ["Gestire le obiezioni"] },
    { from: "avatar", text: "Questo non lo sapevo. Me lo manda per iscritto?" },
  ],
  s3: [
    { from: "avatar", text: "Sono tre settimane che aspetto il rimborso! Tre settimane!" },
    { from: "tu", text: "Ha ragione, tre settimane sono troppe. Mi dice il numero della pratica?", hits: ["Ascolto attivo"] },
    { from: "avatar", text: "4471. E non mi dica che è in lavorazione." },
    { from: "tu", text: "La vedo: mancava la firma del perito, è arrivata ieri." },
    { from: "avatar", text: "E quindi? Quando arrivano i soldi?" },
    { from: "tu", text: "Il bonifico parte venerdì. La richiamo io giovedì alle 10 per confermarlo.", hits: ["Tono di voce"] },
  ],
  s4: [
    { from: "avatar", text: "Mi hai chiesto di vederci. È per i numeri del trimestre?" },
    { from: "tu", text: "Sì. Il trimestre è al 62% dell'obiettivo e voglio capire con te cosa è successo.", hits: ["Tono di voce"] },
    { from: "avatar", text: "Ho perso due clienti grandi, non è colpa mia." },
    { from: "tu", text: "Ti credo. Cosa ti serve per recuperarli nei prossimi due mesi?", hits: ["Interessi e posizioni"] },
  ],
  s5: [
    { from: "avatar", text: "Pronto? Chi parla?" },
    { from: "tu", text: "Buongiorno, sono di Nordica Assicurazioni. Ha due minuti? Le chiedo prima quanti chilometri fa in un anno.", hits: ["Ascolto attivo"] },
    { from: "avatar", text: "Sui 20.000, per lavoro." },
    { from: "tu", text: "Con 20.000 chilometri l'auto sostitutiva di Auto Plus le evita giorni a piedi: è inclusa.", hits: ["Argomentare con i dati"] },
  ],
  s6: [
    { from: "avatar", text: "Oggi non riesco, ho dieci pratiche aperte." },
    { from: "tu", text: "Capisco. A te cosa serve per chiudere la mia entro domani?", hits: ["Interessi e posizioni"] },
    { from: "avatar", text: "Che qualcuno mi mandi i documenti già controllati." },
    { from: "tu", text: "Te li mando io entro le 15, già in ordine. Così ci stai dentro?", hits: ["Generare opzioni"] },
  ],
};

const HINTS: Record<string, string> = {
  s1: "Prima dello sconto: chiedi cosa conta per lui, totale o rata.",
  s2: "Non rincorrere il prezzo: ricorda cosa perderebbe cambiando.",
  s3: "Riconosci il disagio prima di parlare della pratica.",
  s4: "Parti dal numero, non dalla persona.",
  s5: "Una domanda sul cliente prima di parlare del prodotto.",
  s6: "Chiedi cosa serve al collega, poi offri un aiuto concreto.",
};

export function RoleplayRoom({ scenario, reportId }: { scenario: Scenario; reportId: string }) {
  const router = useRouter();
  const script = SCRIPTS[scenario.id] ?? SCRIPTS.s1;
  const [seconds, setSeconds] = useState(0);
  const [lines, setLines] = useState(1);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hint, setHint] = useState(false);
  const feed = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    if (paused || lines >= script.length) return;
    const t = setTimeout(() => setLines((l) => l + 1), 3800);
    return () => clearTimeout(t);
  }, [lines, paused, script.length]);

  useEffect(() => {
    feed.current?.lastElementChild?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [lines]);

  const shown = script.slice(0, lines);
  const covered = new Set(shown.flatMap((l) => l.hits ?? []));
  const speaking = !paused && shown[shown.length - 1]?.from === "avatar";
  const youSpeaking = !paused && !muted && shown[shown.length - 1]?.from === "tu";
  const name = scenario.persona.split(",")[0];
  // tempo della conversazione al momento di ogni battuta (per la trascrizione)
  const at = (i: number) => mmss(i * 4 + 2);

  return (
    <div className="flex min-h-dvh flex-col bg-soot text-white">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-soot-3 px-4 py-3 md:px-6">
        <Link href="/roleplay" className="-ml-2 grid size-10 place-items-center rounded-full hover:bg-soot-2" aria-label="Torna agli scenari">
          <ChevronLeft className="size-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold">{scenario.title}</h1>
          <div className="truncate text-sm text-on-soot-muted">
            con {scenario.persona} · {scenario.personaRole.toLowerCase()}
          </div>
        </div>
        <span className="num inline-flex h-8 items-center gap-2 rounded-full border border-soot-3 px-3 text-sm">
          <span className={clsx("size-2 rounded-full bg-danger", !paused && "animate-pulse")} /> {mmss(seconds)} / {mmss(scenario.minutes * 60)}
        </span>
        <span className="num inline-flex h-8 items-center rounded-full bg-brand px-3 text-sm font-medium text-soot">
          Competenze {covered.size} di {scenario.competencies.length}
        </span>
        <button
          onClick={() => router.push(`/report/${reportId}`)}
          className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-control)] bg-danger px-4 text-sm font-medium transition-transform hover:bg-[#a91d22] active:scale-95"
        >
          <PhoneOff className="size-4" /> Termina e ricevi il voto
        </button>
      </header>

      <div className="grid flex-1 gap-4 p-4 md:p-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section className="flex min-w-0 flex-col gap-4" aria-label="Videochiamata">
          <div className="relative overflow-hidden rounded-[var(--radius-card)]">
            <PersonaPortrait scenarioId={scenario.id} speaking={speaking} className="aspect-[4/3] w-full md:aspect-video" label={`${name}, ${scenario.personaRole}`} />
            <div className="absolute bottom-3 left-3 rounded-full bg-soot/80 px-3 py-1 text-sm">
              {name} {speaking && <span className="text-brand">· parla</span>}
            </div>
            <div className="absolute right-3 top-3 grid h-20 w-28 place-items-center rounded-[var(--radius-control)] border border-soot-3 bg-soot-2 text-sm md:h-28 md:w-40">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-6 items-end gap-0.5" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className={clsx("w-1 rounded-full", youSpeaking ? "animate-wave bg-brand" : "bg-soot-3")} style={{ height: `${40 + ((i * 29) % 60)}%`, animationDelay: `${i * 90}ms` }} />
                  ))}
                </div>
                <span>{muted ? "Tu · muto" : "Tu"}</span>
              </div>
            </div>
          </div>

          {hint && (
            <div className="rounded-[var(--radius-control)] bg-brand px-4 py-3 text-[15px] text-soot" role="status">
              <b className="font-semibold">Il coach suggerisce:</b> {HINTS[scenario.id] ?? HINTS.s1}
            </div>
          )}

          <div className="flex items-center justify-center gap-4 pb-2">
            <button onClick={() => setPaused((p) => !p)} className="grid size-12 place-items-center rounded-full border border-soot-3 hover:bg-soot-2" aria-label={paused ? "Riprendi" : "Pausa"}>
              {paused ? <Play className="size-5" /> : <Pause className="size-5" />}
            </button>
            <button
              onClick={() => setMuted((m) => !m)}
              className={clsx("grid size-[72px] place-items-center rounded-full transition-transform active:scale-95", muted ? "bg-danger text-white" : "bg-white text-soot")}
              aria-label={muted ? "Accendi il microfono" : "Spegni il microfono"}
              aria-pressed={muted}
            >
              {muted ? <MicOff className="size-7" /> : <Mic className="size-7" />}
            </button>
            <button onClick={() => setHint((h) => !h)} className="grid size-12 place-items-center rounded-full border border-soot-3 hover:bg-soot-2" aria-label="Suggerimento del coach" aria-pressed={hint}>
              <Lightbulb className="size-5" />
            </button>
          </div>
        </section>

        <aside className="flex min-h-0 flex-col gap-4">
          <div className="flex min-h-[280px] flex-1 flex-col rounded-[var(--radius-card)] border border-soot-3 p-4">
            <h2 className="text-base font-semibold">Trascrizione dal vivo</h2>
            <ol ref={feed} className="mt-3 flex-1 space-y-3 overflow-y-auto lg:max-h-[52vh]">
              {shown.map((l, i) => (
                <li key={i} className={clsx("rounded-[var(--radius-control)] px-3 py-2 text-[15px] leading-snug", l.from === "tu" ? "bg-brand text-soot" : "bg-soot-2")}>
                  <div className={clsx("mb-0.5 text-xs", l.from === "tu" ? "text-soot/70" : "text-on-soot-muted")}>
                    <span className="num">{at(i)}</span> · {l.from === "tu" ? "Tu" : name}
                  </div>
                  {l.text}
                  {l.hits && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {l.hits.map((h) => (
                        <span key={h} className="rounded-full bg-soot px-2 py-0.5 text-xs text-brand">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              {lines < script.length && !paused && <li className="px-3 text-sm text-on-soot-muted">sta ascoltando…</li>}
            </ol>
          </div>
          <div className="rounded-[var(--radius-card)] border border-soot-3 p-4">
            <h2 className="text-base font-semibold">In valutazione</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {scenario.competencies.map((c) => (
                <li
                  key={c}
                  className={clsx(
                    "rounded-full px-3 py-1 text-sm transition-colors duration-500",
                    covered.has(c) ? "bg-brand font-medium text-soot" : "border border-soot-3 text-on-soot-muted",
                  )}
                >
                  {covered.has(c) ? "✓ " : ""}
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
