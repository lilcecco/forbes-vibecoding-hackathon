import { AudienceDeck } from "@/components/landing/audience-deck";
import { HeroDemo } from "@/components/landing/hero-demo";
import { RevealOnScroll } from "@/components/landing/reveal";
import { CoachMark, Logo } from "@/components/logo";
import { PersonaPortrait } from "@/components/persona";
import {
  arrPerCustomer,
  budget,
  budgetTotal,
  cac,
  channels,
  classroomCost,
  classroomRatio,
  customers,
  eur,
  funnel,
  guideMetric,
  icp,
  ltv,
  ltvToCac,
  paybackMonths,
  price,
  unit,
} from "@/lib/gtm";
import { ArrowRight, Check, FileText } from "lucide-react";
import Link from "next/link";

// Margini e asse della pagina: 12 colonne, l'asse è all'inizio della 6ª (circa 42%)
const frame = "mx-auto w-full max-w-[1440px] px-4 md:px-8";
const fmtX = (n: number) => n.toFixed(1).replace(".", ",");

const POSTS = [
  { word: "15%", caption: "Reel · il cliente che chiede lo sconto", bg: "#0f0f0f", ink: "#dafa9c" },
  { word: "4,2", caption: "Post · il voto di Marco", bg: "#dafa9c", ink: "#0f0f0f" },
  { word: "02:50", caption: "Carosello · il minuto sbagliato", bg: "#ffffff", ink: "#0f0f0f" },
  { word: "Rata", caption: "Reel · totale o rata?", bg: "#eef0e8", ink: "#0f0f0f" },
  { word: "No.", caption: "Post · il no detto con tatto", bg: "#dafa9c", ink: "#0f0f0f" },
  { word: "+8%", caption: "Carosello · il numero da citare", bg: "#0f0f0f", ink: "#ffffff" },
  { word: "60″", caption: "Reel · prova dal telefono", bg: "#eef0e8", ink: "#0f0f0f" },
  { word: "Franco", caption: "Reel · il cliente arrabbiato", bg: "#ffffff", ink: "#0f0f0f" },
];

const POST_COPY = [
  {
    kind: "Post LinkedIn",
    text: "Il tuo venditore migliore non regala lo sconto al primo no. Gli altri sì. Con Coach ogni persona del team prova la trattativa con un cliente AI, sui vostri listini, e riceve un voto al minuto esatto. Prova un role play dal telefono: coach.ai/prova",
  },
  {
    kind: "Reel 9:16 · 30 secondi",
    text: "Scena 1: Roberto chiede il 15%. Scena 2: tre risposte sullo schermo, il pubblico sceglie. Scena 3: il coach dà il voto, 1,8 contro 4,6. Chiusura: «Allenati prima della telefonata vera.»",
  },
  {
    kind: "Carosello · 5 slide",
    text: "1. La formazione in aula finisce il venerdì. 2. Il cliente chiama il lunedì. 3. Carica il listino: nasce la lezione. 4. Allenati col cliente AI. 5. Il coach ti dice dove hai perso la trattativa.",
  },
];

export default function LandingPage() {
  const maxBudget = Math.max(...budget.map((b) => b.amount));
  return (
    <div className="bg-soot text-white">
      <RevealOnScroll />

      {/* Navigazione */}
      <header className={`${frame} flex h-16 items-center justify-between gap-6`}>
        <Logo tone="dark" />
        <nav className="hidden items-center gap-7 text-[15px] text-on-soot-muted md:flex" aria-label="Sezioni">
          <a href="#come-funziona" className="hover:text-white">Come funziona</a>
          <a href="#per-chi" className="hover:text-white">Per chi è</a>
          <a href="#prezzi" className="hover:text-white">Prezzi</a>
          <a href="#piano" className="hover:text-white">Il piano</a>
        </nav>
        <Link href="/dashboard" className="inline-flex h-10 items-center rounded-[var(--radius-control)] bg-brand px-4 text-[15px] font-medium text-soot transition-transform hover:bg-[#cdf27f] active:scale-95">
          Apri la demo
        </Link>
      </header>

      {/* 1 · Hero: la promessa a sinistra, il role play da provare a destra */}
      <section className={`${frame} grid gap-10 pb-16 pt-8 md:pb-24 md:pt-14 lg:grid-cols-12 lg:gap-8`}>
        <div className="flex flex-col lg:col-span-5 lg:pt-10">
          <h1 className="reveal text-[clamp(44px,5vw,76px)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Il coach AI che allena il tuo team
          </h1>
          <p className="reveal mt-8 max-w-[38ch] text-[clamp(18px,1.5vw,22px)] leading-[1.45] text-[#d6d7d0]">
            Carichi un listino o una procedura. Coach la spiega a voce, fa il cliente che chiede lo sconto e dà il voto a ogni risposta.
          </p>
          <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#prova" className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-control)] bg-brand px-5 text-base font-medium text-soot transition-transform hover:bg-[#cdf27f] active:scale-95">
              Prova un role play <ArrowRight className="size-4" />
            </a>
            <Link href="/dashboard" className="text-base font-medium underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand">
              Guarda la dashboard
            </Link>
          </div>
          <p className="reveal mt-auto hidden pt-12 text-[15px] text-on-soot-muted lg:block">
            {price.perSeatMonth} € per persona al mese · per aziende da 50 a 500 dipendenti
          </p>
        </div>
        <div id="prova" className="reveal scroll-mt-6 lg:col-span-6 lg:col-start-7">
          <HeroDemo />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Link href="/report/r1" className="group overflow-hidden rounded-[var(--radius-control)] bg-soot-2 transition-colors hover:bg-soot-3">
              <div className="num flex h-20 items-end gap-1 px-4 pb-3 text-[32px] font-semibold leading-none text-brand">
                4,2<span className="pb-1 text-sm font-normal text-on-soot-muted">/5</span>
              </div>
              <div className="flex items-center justify-between bg-white px-4 py-2.5 text-[15px] font-medium text-soot">
                Il report di Marco <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
            <Link href="/dashboard" className="group overflow-hidden rounded-[var(--radius-control)] bg-soot-2 transition-colors hover:bg-soot-3">
              <div className="flex h-20 items-end gap-1 px-4 pb-3" aria-hidden>
                {[80, 105, 130, 150, 207, 240].map((m, i) => (
                  <span key={m} className={i === 5 ? "w-3 rounded-sm bg-brand" : "w-3 rounded-sm bg-soot-3"} style={{ height: `${(m / 240) * 56}px` }} />
                ))}
              </div>
              <div className="flex items-center justify-between bg-white px-4 py-2.5 text-[15px] font-medium text-soot">
                La dashboard HR <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2 · Come funziona: cosa dai e cosa ti torna */}
      <section id="come-funziona" className="scroll-mt-4 bg-white py-[clamp(88px,12vw,176px)] text-soot">
        <div className={`${frame} grid gap-10 lg:grid-cols-12 lg:gap-8`}>
          <div className="lg:col-span-5">
            <h2 className="reveal max-w-[12ch] text-[clamp(36px,3.6vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
              Dai un documento, ricevi un allenamento
            </h2>
            <p className="reveal mt-6 max-w-[34ch] text-lg leading-[1.5] text-muted">
              Quattro passi, dal listino al voto. Nessuno deve scrivere un corso: lo ricava Coach da quello che l&apos;azienda ha già.
            </p>
          </div>
          <ol className="space-y-[88px] lg:col-span-7 lg:col-start-6">
            <li className="max-w-[560px]">
              <h3 className="reveal text-[22px] font-semibold leading-snug">Prima carichi il listino.</h3>
              <div data-ui className="reveal mt-4 flex items-center gap-3 rounded-[var(--radius-control)] bg-surface-muted p-5">
                <FileText className="size-5 shrink-0" strokeWidth={1.75} />
                <span className="min-w-0 flex-1 truncate font-medium">Listino Polizze Casa 2027.pdf</span>
                <span className="num shrink-0 text-sm text-muted">820 KB</span>
              </div>
              <div data-ui className="reveal mt-3 rounded-[var(--radius-control)] border border-border p-5 md:ml-14">
                <div className="text-sm text-muted">Pronto in 4 minuti</div>
                <ul className="mt-2 space-y-1.5 text-[15px]">
                  {["Il nuovo listino Casa in 5 minuti", "Come presentare l'aumento al rinnovo", "Lo sconto: fino a dove puoi arrivare", "Casa + Auto: la doppia polizza"].map((l) => (
                    <li key={l} className="flex items-center gap-2">
                      <Check className="size-4 text-success" /> {l}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="max-w-[560px]">
              <h3 className="reveal text-[22px] font-semibold leading-snug">Poi il docente lo spiega a voce, e risponde alle domande.</h3>
              <div data-ui className="reveal mt-4 rounded-[var(--radius-control)] bg-surface-muted p-5 text-[15px]">
                <span className="text-muted">Chiara chiede: </span>Qual è lo sconto massimo al rinnovo?
              </div>
              <div data-ui className="reveal mt-3 flex gap-3 rounded-[var(--radius-control)] border border-border p-5 md:ml-14">
                <CoachMark className="size-9" />
                <div className="text-[15px] leading-snug">
                  Il 10%. Oltre serve l&apos;approvazione del responsabile d&apos;area: prima prova la franchigia più alta, che abbassa il premio del 7%.
                  <span className="mt-2 block w-fit rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-medium">Listino p. 4</span>
                </div>
              </div>
            </li>
            <li className="max-w-[560px]">
              <h3 className="reveal text-[22px] font-semibold leading-snug">Quindi si allena con un cliente che non regala niente.</h3>
              <div data-ui className="reveal mt-4 flex items-center gap-4 rounded-[var(--radius-control)] bg-surface-muted p-4">
                <PersonaPortrait scenarioId="s1" className="size-16 shrink-0 rounded-full" />
                <p className="text-[15px] leading-snug">
                  <span className="text-muted">Roberto: </span>«Voglio il 15% di sconto, altrimenti vado altrove.»
                </p>
              </div>
              <div data-ui className="reveal mt-3 rounded-[var(--radius-control)] border border-border p-5 md:ml-14">
                <p className="text-[15px] leading-snug">
                  <mark className="rounded bg-brand px-1">«Nella sua zona i sinistri sono cresciuti dell&apos;8%. Per lei conta più il totale o la rata?»</mark>
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                  <span className="rounded-full bg-soot px-2.5 py-1 text-brand">✓ Argomentare con i dati</span>
                  <span className="rounded-full bg-soot px-2.5 py-1 text-brand">✓ Interessi e posizioni</span>
                </div>
              </div>
            </li>
            <li>
              <h3 className="reveal max-w-[560px] text-[22px] font-semibold leading-snug">Infine il coach dà il voto, al minuto esatto.</h3>
              <div data-ui className="reveal mt-4 grid gap-5 rounded-[var(--radius-card)] border border-border p-5 md:max-w-[760px] md:grid-cols-[150px_minmax(0,1fr)] md:p-6">
                <div>
                  <div className="num text-[56px] font-semibold leading-none tracking-tight">
                    4,2<span className="text-lg font-normal text-muted">/5</span>
                  </div>
                  <div className="mt-2 text-sm text-muted">Marco · 3 min 52 s</div>
                </div>
                <ul className="space-y-3 text-[15px] leading-snug">
                  <li className="flex gap-3">
                    <span className="num shrink-0 font-medium">00:42</span>
                    <span><span className="font-medium text-success">Ottimo.</span> Hai riformulato la richiesta prima di rispondere.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="num shrink-0 font-medium">02:50</span>
                    <span><span className="font-medium text-danger">Da migliorare.</span> Hai offerto subito lo sconto massimo: prima la franchigia.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="num shrink-0 font-medium">03:40</span>
                    <span><span className="font-medium text-success">Ottimo.</span> Hai scoperto che a Roberto interessa la rata.</span>
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* 3 · Per chi è */}
      <section id="per-chi" className="scroll-mt-4 bg-white pb-[clamp(88px,12vw,176px)] text-soot">
        <div className={frame}>
          <h2 className="reveal text-[clamp(40px,4.2vw,64px)] font-semibold leading-[1.05] tracking-[-0.025em]">Per chi parla coi clienti</h2>
          <p className="reveal mt-4 max-w-[52ch] text-lg leading-[1.5] text-muted">
            Ogni persona parte dal suo ruolo e dal suo livello. Settori: {icp.sectors.join(", ")}.
          </p>
          <div className="reveal mt-10">
            <AudienceDeck />
          </div>
        </div>
      </section>

      {/* 4 · Prezzi: due campi di colore che si toccano */}
      <section id="prezzi" className="scroll-mt-4 grid text-soot lg:min-h-[86svh] lg:grid-cols-12">
        <div className="order-2 flex flex-col bg-[#eef0e8] p-6 md:p-10 lg:order-1 lg:col-span-5">
          <h2 className="text-[clamp(36px,4vw,64px)] font-semibold leading-none tracking-[-0.025em]">Enterprise</h2>
          <p className="mt-4 max-w-[28ch] text-xl leading-snug">Per chi ha più di 500 persone o più sedi.</p>
          <p className="mt-6 max-w-[42ch] text-[17px] leading-[1.55] text-muted">
            Tutto il piano Team, più scenari scritti con voi sui vostri casi, accesso con le credenziali aziendali e un referente dedicato.
          </p>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-10">
            <span className="text-[clamp(40px,5vw,80px)] font-semibold leading-none tracking-tight">Su misura</span>
            <a href="mailto:ciao@coach.ai?subject=Coach%20Enterprise" className="inline-flex h-12 items-center rounded-[var(--radius-control)] bg-soot px-5 font-medium text-white hover:bg-soot-3">
              Scrivici
            </a>
          </div>
        </div>
        <div className="order-1 flex flex-col bg-brand p-6 md:p-10 lg:order-2 lg:col-span-7">
          <h2 className="text-[clamp(36px,4vw,64px)] font-semibold leading-none tracking-[-0.025em]">Team</h2>
          <p className="mt-4 max-w-[28ch] text-xl leading-snug">Per un&apos;azienda da 50 a 500 persone che vende o assiste clienti.</p>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.55]">
            Lezioni e role play illimitati, tutti i documenti che volete, la dashboard per HR e manager con l&apos;esportazione in Excel. I primi 30 giorni sono di prova, senza pagare.
          </p>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-10">
            <span className="num text-[clamp(88px,10vw,160px)] font-semibold leading-[0.85] tracking-[-0.04em]">
              {price.perSeatMonth} €<span className="ml-2 align-top text-lg font-normal tracking-normal">per persona al mese</span>
            </span>
            <Link href="/dashboard" className="inline-flex h-12 items-center rounded-[var(--radius-control)] bg-soot px-5 font-medium text-white hover:bg-soot-3">
              Prova 30 giorni
            </Link>
          </div>
          <p className="mt-4 text-sm">Prezzo di lancio, ipotesi del team.</p>
        </div>
      </section>

      {/* 5 · Il numero che regge il piano */}
      <section className="flex min-h-[90svh] flex-col bg-white py-16 text-soot md:py-24">
        <div className={`${frame} grid flex-1 lg:grid-cols-12`}>
          <div className="flex flex-col lg:col-span-12">
            <h2 className="reveal max-w-[20ch] text-[clamp(28px,2.8vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em]">
              Ogni euro speso per un cliente ne torna sette
            </h2>
            <div className="mt-[22vh] grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="reveal num text-[clamp(180px,23vw,360px)] font-semibold leading-[0.8] tracking-[-0.05em]">
                  {fmtX(ltvToCac)}
                  <span className="align-top text-[0.33em] tracking-normal">×</span>
                </div>
                <p className="reveal mt-6 max-w-[34ch] text-[17px] leading-[1.5]">
                  Il valore di un cliente nella sua vita ({eur(ltv)}) diviso il costo per acquisirlo ({eur(cac)}). Ipotesi su un cliente da {icp.seatsPerCustomer} posti.
                </p>
              </div>
              <dl data-ui className="reveal grid grid-cols-2 gap-x-6 gap-y-5 text-[15px] lg:col-span-5">
                <div>
                  <dt className="text-muted">Ricavo annuo per cliente</dt>
                  <dd className="num mt-1 text-2xl font-semibold">{eur(arrPerCustomer)}</dd>
                </div>
                <div>
                  <dt className="text-muted">Costo per cliente acquisito</dt>
                  <dd className="num mt-1 text-2xl font-semibold">{eur(cac)}</dd>
                </div>
                <div>
                  <dt className="text-muted">Valore del cliente in {unit.lifetimeYears} anni</dt>
                  <dd className="num mt-1 text-2xl font-semibold">{eur(ltv)}</dd>
                </div>
                <div>
                  <dt className="text-muted">Il costo si ripaga in</dt>
                  <dd className="num mt-1 text-2xl font-semibold">{fmtX(paybackMonths)} mesi</dd>
                </div>
                <div className="col-span-2 text-sm text-muted">
                  Margine lordo {unit.grossMargin * 100}%, vita media {unit.lifetimeYears} anni. Tutti i numeri sono ipotesi del team.
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · Il piano di lancio */}
      <section id="piano" className="scroll-mt-4 py-[clamp(88px,12vw,176px)]">
        <div className={`${frame} grid gap-12 lg:grid-cols-12 lg:gap-8`}>
          <div className="lg:col-span-5">
            <h2 className="reveal max-w-[12ch] text-[clamp(36px,3.6vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
              Il piano dei primi {customers} clienti
            </h2>
            <p className="reveal mt-6 max-w-[36ch] text-lg leading-[1.5] text-[#d6d7d0]">
              {icp.who}. Compra il {icp.buyer.toLowerCase()}. Metrica guida: {guideMetric.name.toLowerCase()}, obiettivo {guideMetric.target}.
            </p>
            <p className="reveal mt-6 max-w-[36ch] text-[15px] leading-[1.5] text-on-soot-muted">
              Per il cliente tipo l&apos;aula costerebbe {eur(classroomCost)} l&apos;anno (2 giornate a persona a 300 €): Coach costa {fmtX(classroomRatio)} volte meno.
            </p>
          </div>

          <div className="space-y-14 lg:col-span-7 lg:col-start-6">
            <div className="reveal">
              <h3 className="text-[22px] font-semibold">Il budget: {eur(budgetTotal)}</h3>
              <table data-ui className="mt-5 w-full text-[15px]">
                <tbody>
                  {budget.map((b) => (
                    <tr key={b.item} className="border-t border-soot-3">
                      <td className="py-3 pr-4">
                        {b.item}
                        <div className="mt-2 h-1.5 rounded-full bg-soot-3">
                          <div className="h-full rounded-full bg-brand" style={{ width: `${(b.amount / maxBudget) * 100}%` }} />
                        </div>
                      </td>
                      <td className="w-24 py-3 text-on-soot-muted">{b.channel}</td>
                      <td className="num w-24 py-3 text-right font-semibold">{eur(b.amount)}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-white">
                    <td className="py-3 font-semibold" colSpan={2}>Totale</td>
                    <td className="num py-3 text-right font-semibold">{eur(budgetTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="reveal">
              <h3 className="text-[22px] font-semibold">L&apos;imbuto</h3>
              <ol data-ui className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {funnel.map((f, i) => (
                  <li key={f.step} className="rounded-[var(--radius-control)] bg-soot-2 p-4">
                    <div className="num text-[32px] font-semibold leading-none">{f.value}</div>
                    <div className="mt-2 text-[15px] text-[#d6d7d0]">{f.step}</div>
                    <div className="num mt-1 text-sm text-on-soot-muted">{i === 0 ? "dal budget" : `${Math.round((f.value / funnel[i - 1].value) * 100)}% del passo prima`}</div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="reveal">
              <h3 className="text-[22px] font-semibold">I canali, e perché</h3>
              <ul className="mt-5 space-y-5">
                {channels.map((c) => (
                  <li key={c.name} className="grid gap-1 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6">
                    <span className="font-semibold text-brand">{c.name}</span>
                    <span className="text-[17px] leading-[1.5] text-[#d6d7d0]">{c.why}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · Sui social: un muro di copertine */}
      <section id="social" className="bg-white py-[clamp(88px,12vw,176px)] text-soot">
        <div className={frame}>
          <h2 className="reveal text-[clamp(36px,3.6vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">Pronti da pubblicare</h2>
          <p className="reveal mt-4 max-w-[48ch] text-lg leading-[1.5] text-muted">Copertine e testi per LinkedIn e Instagram, presi dai role play veri della demo.</p>
          <ul className="mt-10 grid grid-cols-2 gap-1.5 md:grid-cols-4 md:gap-2">
            {POSTS.map((p) => (
              <li key={p.word} className="reveal relative grid aspect-square place-items-center rounded-[var(--radius-control)]" style={{ background: p.bg, color: p.ink, boxShadow: p.bg === "#ffffff" ? "inset 0 0 0 1px #e2e4da" : undefined }}>
                <span className="num text-[clamp(44px,8vw,128px)] font-semibold leading-none tracking-[-0.04em]">{p.word}</span>
                <span className="absolute inset-x-3 bottom-3 text-center text-[13px] opacity-80 md:bottom-4">{p.caption}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {POST_COPY.map((p) => (
              <div key={p.kind} className="reveal">
                <h3 className="text-[17px] font-semibold">{p.kind}</h3>
                <p className="mt-2 text-[16px] leading-[1.55]">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · Chiusura */}
      <section className="bg-brand py-[clamp(72px,9vw,128px)] text-soot">
        <div className={`${frame} grid items-end gap-8 lg:grid-cols-12`}>
          <p className="reveal text-[clamp(26px,2.6vw,36px)] font-medium leading-[1.2] tracking-[-0.015em] lg:col-span-8">
            Il tuo team può iniziare lunedì.{" "}
            <a href="#prova" className="underline decoration-[4px] underline-offset-[6px] hover:decoration-soot/50">
              Prova un role play adesso
            </a>
            , dal telefono, in 60 secondi.
          </p>
          <p className="reveal text-[17px] leading-[1.5] lg:col-span-4">Nessuna registrazione: la demo usa i dati di Nordica Assicurazioni, un&apos;azienda inventata.</p>
        </div>
      </section>

      {/* 9 · Footer: il contatto è il titolo */}
      <footer className="pb-24 pt-16 md:pb-10">
        <div className={`${frame} flex min-h-[60svh] flex-col`}>
          <div className="flex flex-wrap items-start justify-between gap-6 text-[15px] text-on-soot-muted">
            <div className="flex items-center gap-3">
              <CoachMark className="size-7" />
              <span>Coach · il coach AI per chi parla coi clienti</span>
            </div>
            <a href="#" className="hover:text-white">Torna su</a>
          </div>
          <a href="mailto:ciao@coach.ai" className="mt-auto block break-all pt-24 text-[clamp(48px,11vw,180px)] font-semibold leading-[0.9] tracking-[-0.04em] hover:text-brand">
            ciao@coach.ai
          </a>
          <div className="mt-8 flex flex-col gap-2 border-t border-soot-3 pt-5 text-sm text-on-soot-muted md:flex-row md:justify-between">
            <span>
              <Link href="/dashboard" className="hover:text-white">Demo</Link> · <a href="#prezzi" className="hover:text-white">Prezzi</a> · <a href="#piano" className="hover:text-white">Il piano</a>
            </span>
            <span>Vibecoding Hackathon · Next Leaders × Forbes</span>
            <span>Italia, 2026</span>
          </div>
        </div>
      </footer>

      {/* Telefono: l'azione resta a un tocco */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-soot-3 bg-soot p-3 md:hidden">
        <a href="#prova" className="flex h-12 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-brand text-base font-medium text-soot">
          Prova un role play <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}
