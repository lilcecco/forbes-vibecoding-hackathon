"use client";

import clsx from "clsx";
import { ChevronLeft, Lightbulb, Mic, MicOff, Pause, Play, PhoneOff, Video, VideoOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Scenario } from "@/lib/types";
import { PersonaPortrait } from "./persona";
import { mmss } from "./ui";

type Line = { from: "avatar" | "tu"; text: string; hits?: string[] };
type Shown = Line & { at: number };

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

// In modalità dal vivo le competenze si riconoscono da segnali semplici nella frase detta.
// È una stima per la demo: il voto vero arriva nel report.
const SIGNALS: Record<string, RegExp> = {
  "Ascolto attivo": /\?|capisco|mi dica|mi racconta|se ho capito|quindi lei/i,
  "Tono di voce": /ha ragione|mi dispiace|grazie|capisco/i,
  "Argomentare con i dati": /\d|per ?cento|euro/i,
  "Generare opzioni": /propong|oppure|alternativ|due strade|possiamo|potrei/i,
  "Interessi e posizioni": /cosa (le|ti) (serve|interessa|preme)|conta (di )?più|per lei è|per te è|preferisce/i,
  "Gestire le obiezioni": /però|in realtà|controlliamo|confront|rispetto a|la differenza/i,
};
const detectHits = (text: string, competencies: string[]) => competencies.filter((c) => SIGNALS[c]?.test(text));

// Web Speech API: in Chrome, Edge e Safari, non ancora nei tipi DOM di TypeScript
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};
const getRecognition = (): (new () => Recognition) | undefined => {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
};

export function RoleplayRoom({ scenario, reportId }: { scenario: Scenario; reportId: string }) {
  const router = useRouter();
  const script = SCRIPTS[scenario.id] ?? SCRIPTS.s1;
  const avatarLines = script.filter((l) => l.from === "avatar");
  const [mode, setMode] = useState<"demo" | "live">("demo");
  const [seconds, setSeconds] = useState(0);
  const [feedLines, setFeedLines] = useState<Shown[]>([{ ...script[0], at: 2 }]);
  const [demoIdx, setDemoIdx] = useState(1);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hint, setHint] = useState(false);
  const [interim, setInterim] = useState("");
  const [avatarTalking, setAvatarTalking] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [canTranscribe, setCanTranscribe] = useState(true);
  const [camOn, setCamOn] = useState(false);
  const feed = useRef<HTMLOListElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const recognition = useRef<Recognition | null>(null);
  const listening = useRef(false);
  const avatarIdx = useRef(1);
  const secondsRef = useRef(0);
  secondsRef.current = seconds;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [paused]);

  // Demo: il copione scorre da solo, una battuta ogni 3,8 secondi
  useEffect(() => {
    if (mode !== "demo" || paused || demoIdx >= script.length) return;
    const t = setTimeout(() => {
      setFeedLines((f) => [...f, { ...script[demoIdx], at: secondsRef.current }]);
      setDemoIdx((i) => i + 1);
    }, 3800);
    return () => clearTimeout(t);
  }, [mode, demoIdx, paused, script]);

  useEffect(() => {
    feed.current?.lastElementChild?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [feedLines, interim]);

  // Dal vivo: dopo ogni frase finita, il cliente AI risponde con la battuta successiva
  const onFinal = useCallback(
    (text: string) => {
      const clean = text.trim();
      if (!clean) return;
      setFeedLines((f) => [...f, { from: "tu", text: clean.charAt(0).toUpperCase() + clean.slice(1), hits: detectHits(clean, scenario.competencies), at: secondsRef.current }]);
      const next = avatarLines[avatarIdx.current];
      if (!next) return;
      avatarIdx.current += 1;
      setTimeout(() => {
        setFeedLines((f) => [...f, { ...next, at: secondsRef.current }]);
        setAvatarTalking(true);
        setTimeout(() => setAvatarTalking(false), 2800);
      }, 1200);
    },
    [avatarLines, scenario.competencies],
  );
  const onFinalRef = useRef(onFinal);
  onFinalRef.current = onFinal;

  const stopAll = useCallback(() => {
    listening.current = false;
    recognition.current?.stop();
    stream.current?.getTracks().forEach((t) => t.stop());
  }, []);

  useEffect(() => stopAll, [stopAll]);

  useEffect(() => {
    setCanTranscribe(Boolean(getRecognition()));
  }, []);

  async function startLive() {
    setNotice(null);
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: true });
      stream.current = media;
      if (video.current) video.current.srcObject = media;
      setCamOn(true);
    } catch {
      setNotice("Webcam o microfono non disponibili: consenti l'accesso dal browser e riprova. Intanto la demo continua col copione.");
      return;
    }
    const Rec = getRecognition();
    if (!Rec) {
      setNotice("La trascrizione dal vivo funziona in Chrome, Edge e Safari. Qui vedi la webcam, la conversazione segue il copione.");
      return;
    }
    const rec = new Rec();
    rec.lang = "it-IT";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let partial = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) onFinalRef.current(r[0].transcript);
        else partial += r[0].transcript;
      }
      setInterim(partial);
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        listening.current = false;
        setNotice("Il browser non permette la trascrizione: la webcam resta accesa, la conversazione segue il copione.");
        setMode("demo");
      }
    };
    // Il riconoscimento si ferma da solo dopo un silenzio: riparte finché stiamo ascoltando
    rec.onend = () => {
      if (listening.current) {
        try {
          rec.start();
        } catch {}
      }
    };
    recognition.current = rec;
    // La chiamata ricomincia: prima battuta del cliente, poi parli tu
    avatarIdx.current = 1;
    setFeedLines([{ ...avatarLines[0], at: 0 }]);
    setSeconds(0);
    setMode("live");
  }

  // Microfono, pausa e trascrizione restano allineati
  useEffect(() => {
    const rec = recognition.current;
    if (mode !== "live" || !rec) return;
    const should = !muted && !paused;
    stream.current?.getAudioTracks().forEach((t) => (t.enabled = !muted));
    if (should && !listening.current) {
      listening.current = true;
      try {
        rec.start();
      } catch {}
    } else if (!should && listening.current) {
      listening.current = false;
      rec.stop();
      setInterim("");
    }
  }, [mode, muted, paused]);

  useEffect(() => {
    stream.current?.getVideoTracks().forEach((t) => (t.enabled = !camOff));
  }, [camOff]);

  const covered = new Set(feedLines.flatMap((l) => l.hits ?? []));
  const last = feedLines[feedLines.length - 1];
  const live = mode === "live";
  const hasCam = camOn;
  const speaking = !paused && (live ? avatarTalking : last?.from === "avatar");
  const youSpeaking = !paused && !muted && (live ? interim.length > 0 : last?.from === "tu");
  const name = scenario.persona.split(",")[0];
  const finished = live ? avatarIdx.current >= avatarLines.length && last?.from === "avatar" : demoIdx >= script.length;

  function end() {
    stopAll();
    router.push(`/report/${reportId}`);
  }

  return (
    <div className="flex min-h-dvh flex-col bg-soot text-white">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-soot-3 px-4 py-3 md:px-6">
        <Link href="/roleplay" onClick={stopAll} className="-ml-2 grid size-10 place-items-center rounded-full hover:bg-soot-2" aria-label="Torna agli scenari">
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
          onClick={end}
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

            {/* Il riquadro di chi si allena: la webcam, o l'invito ad accenderla */}
            <div
              className={clsx(
                "absolute right-3 top-3 overflow-hidden rounded-[var(--radius-control)] border bg-soot-2 text-sm",
                "h-24 w-32 md:h-36 md:w-48",
                youSpeaking ? "border-brand" : "border-soot-3",
              )}
            >
              <video ref={video} autoPlay playsInline muted className={clsx("h-full w-full -scale-x-100 object-cover", (!hasCam || camOff) && "hidden")} />
              {(!hasCam || camOff) && (
                <div className="flex h-full flex-col items-center justify-center gap-2 p-2 text-center">
                  {hasCam ? (
                    <>
                      <VideoOff className="size-5 text-on-soot-muted" />
                      <span>Tu · webcam spenta</span>
                    </>
                  ) : (
                    <button onClick={startLive} className="inline-flex flex-col items-center gap-1.5 rounded-[var(--radius-control)] px-2 py-1 hover:bg-soot-3">
                      <Video className="size-5 text-brand" />
                      <span className="font-medium leading-tight">Accendi webcam e microfono</span>
                    </button>
                  )}
                </div>
              )}
              {hasCam && !camOff && (
                <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1.5 rounded-full bg-soot/80 px-2 py-0.5 text-xs">
                  <span className="flex h-3 items-end gap-0.5" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <span key={i} className={clsx("w-0.5 rounded-full", youSpeaking ? "animate-wave bg-brand" : "bg-on-soot-muted")} style={{ height: `${50 + i * 25}%`, animationDelay: `${i * 90}ms` }} />
                    ))}
                  </span>
                  {muted ? "Tu · muto" : "Tu"}
                </span>
              )}
            </div>
          </div>

          {notice && (
            <div className="rounded-[var(--radius-control)] border border-soot-3 px-4 py-3 text-[15px] text-on-soot-muted" role="status">
              {notice}
            </div>
          )}

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
              onClick={() => (hasCam ? setCamOff((c) => !c) : startLive())}
              className={clsx("grid size-12 place-items-center rounded-full border border-soot-3 hover:bg-soot-2", hasCam && camOff && "border-danger bg-danger")}
              aria-label={!hasCam ? "Accendi la webcam" : camOff ? "Riaccendi la webcam" : "Spegni la webcam"}
              aria-pressed={hasCam && !camOff}
            >
              {hasCam && !camOff ? <Video className="size-5" /> : <VideoOff className="size-5" />}
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
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-base font-semibold">Trascrizione dal vivo</h2>
              <span className="text-xs text-on-soot-muted">{live ? "dal tuo microfono" : canTranscribe ? "copione demo" : "copione demo · trascrizione non supportata"}</span>
            </div>
            <ol ref={feed} className="mt-3 flex-1 space-y-3 overflow-y-auto lg:max-h-[52vh]">
              {feedLines.map((l, i) => (
                <li key={i} className={clsx("rounded-[var(--radius-control)] px-3 py-2 text-[15px] leading-snug", l.from === "tu" ? "bg-brand text-soot" : "bg-soot-2")}>
                  <div className={clsx("mb-0.5 text-xs", l.from === "tu" ? "text-soot/70" : "text-on-soot-muted")}>
                    <span className="num">{mmss(l.at)}</span> · {l.from === "tu" ? "Tu" : name}
                  </div>
                  {l.text}
                  {l.hits && l.hits.length > 0 && (
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
              {live && interim && (
                <li className="rounded-[var(--radius-control)] border border-dashed border-brand px-3 py-2 text-[15px] leading-snug text-white/80">
                  <div className="mb-0.5 text-xs text-on-soot-muted">Tu · sta parlando</div>
                  {interim}
                </li>
              )}
              {!paused && !finished && !interim && (
                <li className="px-3 text-sm text-on-soot-muted">{live ? (muted ? "microfono spento" : "ti ascolto, rispondi a voce…") : "sta ascoltando…"}</li>
              )}
              {finished && <li className="px-3 text-sm text-on-soot-muted">Fine del dialogo: termina per ricevere il voto.</li>}
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
