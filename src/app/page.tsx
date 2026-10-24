import { HeroDemo } from "@/components/landing/hero-demo";
import { RevealOnScroll } from "@/components/landing/reveal";
import { SocialWall } from "@/components/landing/social-wall";
import { CoachMark, Logo } from "@/components/logo";
import { PersonaPortrait } from "@/components/persona";
import {
  alternatives,
  arrPerCustomer,
  breakEvenCustomers,
  budget,
  budgetTotal,
  cac,
  channels,
  customers,
  eur,
  firstYearMargin,
  firstYearRevenue,
  funnel,
  funnelTop,
  guideMetric,
  icp,
  juryQA,
  ltv,
  ltvToCac,
  monthlyMargin,
  nextPhase,
  notChosen,
  num,
  partnerCommission,
  paybackMonths,
  perChannel,
  phases,
  pitchLine,
  plans,
  price,
  roiFirstYear,
  unit,
  valueProp,
} from "@/lib/gtm";
import { ArrowRight, Check, FileText, Plus } from "lucide-react";
import Link from "next/link";

// Margini della pagina: 12 colonne, 32px ai lati su desktop e 16px sul telefono
const frame = "mx-auto w-full max-w-[1320px] px-4 md:px-8";
const fmtX = (n: number) => n.toFixed(1).replace(".", ",");
const h2 = "reveal text-[clamp(36px,3.6vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]";
const h3 = "text-[22px] font-semibold tracking-tight";

const AUDIENCE = [
  { title: "Vendite", tone: "#dafa9c", text: "Lo sconto al rinnovo, la chiamata per trattenere il cliente, il listino nuovo da presentare.", scenario: { id: "s1", name: "Lo sconto al rinnovo" } },
  { title: "Servizio clienti", tone: "#cdf283", text: "Il cliente arrabbiato, il sinistro da spiegare, il no detto con tatto.", scenario: { id: "s3", name: "Il cliente arrabbiato" } },
  { title: "Manager", tone: "#bfe86c", text: "Il riscontro difficile, la valutazione annuale, il cambiamento da annunciare alla squadra.", scenario: { id: "s4", name: "Il riscontro difficile" } },
  { title: "Neoassunti", tone: "#e8fcc4", text: "La prima telefonata, il prodotto in due minuti, la domanda a cui non sai ancora rispondere.", scenario: { id: "s5", name: "La prima telefonata" } },
];

const POST_COPY = [
  {
    kind: "Post LinkedIn 1 · direttore commerciale",
    text: "Il tuo miglior venditore ha imparato a gestire lo sconto al rinnovo perdendo i primi dieci clienti. E se avesse potuto sbagliare con un cliente finto? Con Coach ogni venditore si allena in video con un avatar AI che interrompe, insiste e chiede lo sconto. Dopo ogni role play riceve un voto su 12 competenze, legato al momento esatto della conversazione. Se la tua azienda aderisce a Fondimpresa, la formazione è finanziabile. Demo di 15 minuti →",
  },
  {
    kind: "Post LinkedIn 2 · HR e formazione",
    text: "Ogni anno la tua azienda investe nella formazione dei dipendenti. Domanda: quella formazione, la stai misurando? Con Coach vedi per ogni persona e ogni squadra ore di pratica, role play fatti e progressi. E li esporti in Excel. La formazione che si aggiorna il giorno dopo e dice chi sa farlo davvero. Scopri come finanziarla con Fondimpresa →",
  },
  {
    kind: "Post LinkedIn 3 · il dato",
    text: "Una squadra vendite, una settimana: 3h 20m di pratica. 11 role play. 4,2 su 5 in «argomentare con i dati». In aula non avresti saputo nessuno di questi numeri. Coach. Il simulatore di volo per i tuoi venditori →",
  },
];

export default function LandingPage() {
  const maxBudget = Math.max(...budget.map((b) => b.amount));
  const maxLeads = Math.max(...funnelTop.map((f) => f.leads));
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
          <a href="#strategia" className="hover:text-white">Piano</a>
          <a href="#social" className="hover:text-white">Social</a>
        </nav>
        <Link href="/dashboard" className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-control)] bg-brand px-4 text-[15px] font-medium text-soot transition-transform hover:bg-[#cdf27f] active:scale-95">
          Prova la demo <ArrowRight className="size-4" />
        </Link>
      </header>

      {/* Hero: proposta a sinistra, demo da toccare a destra */}
      <section className={`${frame} grid items-center gap-10 pb-14 pt-6 md:pb-20 md:pt-10 lg:grid-cols-2 lg:gap-12`}>
        <div className="flex flex-col">
          <h1 className="reveal max-w-[14ch] text-[clamp(42px,4.6vw,72px)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Il tuo team si allena sui tuoi documenti
          </h1>
          <p className="reveal mt-7 max-w-[40ch] text-[clamp(18px,1.5vw,22px)] leading-[1.45] text-[#d6d7d0]">
            Il simulatore di volo per i venditori: carichi listini e procedure, Coach crea lezioni a voce e role play con un cliente AI, poi dà un voto a ogni risposta.
          </p>
          <div className="reveal mt-8 flex flex-wrap items-center gap-3">
            <Link href="/dashboard" className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-control)] bg-brand px-5 text-base font-medium text-soot transition-transform hover:bg-[#cdf27f] active:scale-95">
              Prova la demo <ArrowRight className="size-4" />
            </Link>
            <a href="#prezzi" className="inline-flex h-12 items-center rounded-[var(--radius-control)] border border-soot-3 px-5 text-base font-medium hover:bg-soot-2">
              Vedi i prezzi
            </a>
          </div>
          <p className="reveal mt-6 text-[15px] text-on-soot-muted">
            {price.perSeatMonth} € a venditore al mese · finanziabile con Fondimpresa · demo di Nordica Assicurazioni, un&apos;azienda d&apos;esempio
          </p>
        </div>
        <div id="prova" className="reveal scroll-mt-6">
          <HeroDemo />
        </div>
      </section>

      {/* Come funziona: i quattro passi, ognuno col suo pezzo di prodotto */}
      <section id="come-funziona" className="scroll-mt-4 bg-white py-14 text-soot md:py-20">
        <div className={frame}>
          <div className="grid gap-6 lg:grid-cols-12">
            <h2 className={`${h2} lg:col-span-6`}>Dal listino al voto, in quattro passi</h2>
            <p className="reveal max-w-[44ch] text-lg leading-[1.5] text-muted lg:col-span-5 lg:col-start-8 lg:self-end">
              Nessuno deve scrivere un corso: Coach lo ricava da quello che l&apos;azienda ha già, e il team si allena dal telefono.
            </p>
          </div>

          <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <li className="reveal flex flex-col rounded-[var(--radius-card)] bg-surface-muted p-5">
              <h3 className="text-[24px] font-semibold tracking-tight">Carica</h3>
              <p className="mt-1 text-[15px] text-muted">Listini, procedure, schede prodotto.</p>
              <div data-ui className="mt-5 flex-1 rounded-[var(--radius-control)] bg-white p-4">
                <div className="flex items-center gap-2.5">
                  <FileText className="size-5 shrink-0" strokeWidth={1.75} />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">Listino Polizze Casa 2027.pdf</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-muted">
                  <div className="h-full w-full rounded-full bg-data" />
                </div>
                <ul className="mt-3 space-y-1.5 text-[13px]">
                  {["Il nuovo listino Casa", "L'aumento al rinnovo", "Fino a dove arriva lo sconto", "Casa + Auto"].map((l) => (
                    <li key={l} className="flex items-center gap-2">
                      <Check className="size-3.5 shrink-0 text-success" /> {l}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted">4 lezioni pronte in 4 minuti</p>
              </div>
            </li>

            <li className="reveal flex flex-col rounded-[var(--radius-card)] bg-surface-muted p-5">
              <h3 className="text-[24px] font-semibold tracking-tight">Impara</h3>
              <p className="mt-1 text-[15px] text-muted">Il docente AI spiega a voce e risponde.</p>
              <div data-ui className="mt-5 flex-1 space-y-2.5 rounded-[var(--radius-control)] bg-white p-4 text-[13px] leading-snug">
                <div className="flex items-center gap-2.5">
                  <CoachMark className="size-8" speaking />
                  <div className="flex h-6 flex-1 items-center gap-0.5" aria-hidden>
                    {[6, 12, 18, 10, 20, 14, 8, 16, 11, 19, 7, 13].map((h, k) => (
                      <span key={k} className="animate-wave w-1 rounded-full bg-soot" style={{ height: h, animationDelay: `${k * 70}ms` }} />
                    ))}
                  </div>
                </div>
                <p className="ml-auto w-fit max-w-[85%] rounded-[var(--radius-control)] bg-brand px-2.5 py-1.5">Qual è lo sconto massimo al rinnovo?</p>
                <p className="max-w-[90%] rounded-[var(--radius-control)] bg-surface-muted px-2.5 py-1.5">
                  Il 10%. Oltre serve il responsabile d&apos;area. <span className="font-medium">Listino p. 4</span>
                </p>
              </div>
            </li>

            <li className="reveal flex flex-col rounded-[var(--radius-card)] bg-surface-muted p-5">
              <h3 className="text-[24px] font-semibold tracking-tight">Allenati</h3>
              <p className="mt-1 text-[15px] text-muted">Un cliente che interrompe e insiste.</p>
              <div data-ui className="mt-5 flex-1 overflow-hidden rounded-[var(--radius-control)] bg-soot-2 text-white">
                <PersonaPortrait scenarioId="s1" className="aspect-[16/9] w-full" label="Roberto" />
                <div className="space-y-2 p-3 text-[13px] leading-snug">
                  <p className="text-on-soot-muted">Roberto: «Voglio il 15% di sconto.»</p>
                  <p>Tu: «Per lei conta più il totale o la rata?»</p>
                  <span className="inline-block rounded-full bg-brand px-2 py-0.5 text-xs text-soot">Interessi e posizioni</span>
                </div>
              </div>
            </li>

            <li className="reveal flex flex-col rounded-[var(--radius-card)] bg-surface-muted p-5">
              <h3 className="text-[24px] font-semibold tracking-tight">Migliora</h3>
              <p className="mt-1 text-[15px] text-muted">Il voto su 12 competenze, al minuto esatto.</p>
              <div data-ui className="mt-5 flex-1 rounded-[var(--radius-control)] bg-white p-4">
                <div className="num text-[44px] font-semibold leading-none tracking-tight">
                  4,2<span className="text-base font-normal text-muted">/5</span>
                </div>
                <ul className="mt-3 space-y-2 text-[13px] leading-snug">
                  <li className="flex gap-2">
                    <span className="num font-medium">00:42</span>
                    <span><span className="font-medium text-success">Ottimo.</span> Hai riformulato la richiesta.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="num font-medium">02:50</span>
                    <span><span className="font-medium text-danger">Da migliorare.</span> Lo sconto massimo subito.</span>
                  </li>
                </ul>
                <Link href="/report/r1" className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium underline decoration-brand decoration-2 underline-offset-4">
                  Apri il report <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Per chi è, e in quali settori */}
      <section id="per-chi" className="scroll-mt-4 bg-white pb-14 text-soot md:pb-20">
        <div className={`${frame} grid gap-10 lg:grid-cols-12 lg:gap-8`}>
          <div className="lg:col-span-7">
            <h2 className={h2}>Per chi parla coi clienti</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {AUDIENCE.map((a) => (
                <li key={a.title} className="reveal flex flex-col rounded-[var(--radius-card)] p-5" style={{ background: a.tone }}>
                  <h3 className="text-2xl font-semibold tracking-tight">{a.title}</h3>
                  <p className="mt-2 text-[15px] leading-snug">{a.text}</p>
                  <Link href={`/roleplay/${a.scenario.id}`} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-[15px] font-medium underline decoration-2 underline-offset-4">
                    Prova «{a.scenario.name}» <ArrowRight className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-2">
            <h3 className={`reveal ${h3}`}>Settori</h3>
            <p className="reveal mt-2 text-[17px] leading-[1.5] text-muted">Partiamo dalle assicurazioni, poi tutti i settori dove si vende con un listino che cambia.</p>
            <ul className="reveal mt-5 flex flex-wrap gap-2">
              {icp.sectors.map((s) => (
                <li
                  key={s}
                  className={s === icp.focusSector ? "rounded-full bg-soot px-4 py-2 text-[15px] font-medium text-brand" : "rounded-full border border-control px-4 py-2 text-[15px] font-medium"}
                >
                  {s}
                </li>
              ))}
            </ul>
            <h3 className="reveal mt-8 border-t border-border pt-5 text-[17px] font-semibold">Perché le assicurazioni</h3>
            <ul className="reveal mt-3 space-y-2.5 text-[15px] leading-snug">
              {icp.why.map((w) => (
                <li key={w} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" /> {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Prezzi: prova, Team, Enterprise */}
      <section id="prezzi" className="scroll-mt-4 bg-surface-muted py-14 text-soot md:py-20">
        <div className={frame}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className={h2}>Prezzi</h2>
            <p className="reveal max-w-[52ch] text-[15px] text-muted">
              {price.perSeatMonth} € a venditore al mese sono {eur(price.perSeatMonth * 12)} l&apos;anno a persona: più o meno un solo giorno di corso in aula. Prezzi ipotesi del team, IVA esclusa.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {plans.map((p) => (
              <li
                key={p.name}
                className={
                  p.recommended
                    ? "reveal flex flex-col rounded-[var(--radius-card)] bg-brand p-6 md:p-8"
                    : "reveal flex flex-col rounded-[var(--radius-card)] bg-white p-6 md:p-8"
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[28px] font-semibold tracking-tight">{p.name}</h3>
                  {p.recommended && <span className="rounded-full bg-soot px-3 py-1 text-xs font-medium text-brand">Consigliato</span>}
                </div>
                <p className={p.recommended ? "mt-1 text-[15px]" : "mt-1 text-[15px] text-muted"}>{p.for}</p>
                <div className="num mt-6 text-[clamp(44px,4.4vw,64px)] font-semibold leading-none tracking-[-0.04em]">
                  {p.price === null ? "Su misura" : `${p.price} €`}
                  {p.unit && <span className="ml-2 text-base font-normal tracking-normal">{p.unit}</span>}
                </div>
                <ul className="mt-6 space-y-2.5 text-[15px]">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  {p.price === null ? (
                    <a href="mailto:ciao@coach.ai?subject=Coach%20Enterprise" className="inline-flex h-12 w-full items-center justify-center rounded-[var(--radius-control)] border border-soot px-5 font-medium hover:bg-surface-muted">
                      {p.cta}
                    </a>
                  ) : (
                    <Link
                      href="/dashboard"
                      className={
                        p.recommended
                          ? "inline-flex h-12 w-full items-center justify-center rounded-[var(--radius-control)] bg-soot px-5 font-medium text-white hover:bg-soot-3"
                          : "inline-flex h-12 w-full items-center justify-center rounded-[var(--radius-control)] border border-soot px-5 font-medium hover:bg-surface-muted"
                      }
                    >
                      {p.cta}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="reveal mt-6 text-[15px] text-muted">
            Cliente tipo: {price.perSeatMonth} € × {icp.seatsPerCustomer} venditori × 12 mesi = <span className="num font-semibold text-soot">{eur(arrPerCustomer)} l&apos;anno</span>. Contratto annuale, perché si incastra con i piani formativi Fondimpresa.
          </p>
        </div>
      </section>

      {/* Strategia: a chi vendiamo, contro cosa, in quali fasi */}
      <section id="strategia" className="scroll-mt-4 bg-white py-14 text-soot md:py-20">
        <div className={frame}>
          <div className="grid gap-6 lg:grid-cols-12">
            <h2 className={`${h2} lg:col-span-6`}>Il piano: {customers} clienti in 6 mesi</h2>
            <p className="reveal max-w-[46ch] text-lg leading-[1.5] text-muted lg:col-span-5 lg:col-start-8 lg:self-end">{valueProp}</p>
          </div>

          {/* Cliente ideale e chi compra */}
          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <div className="reveal rounded-[var(--radius-card)] bg-soot p-6 text-white lg:col-span-5">
              <span className="text-sm text-on-soot-muted">Cliente ideale</span>
              <p className="mt-3 text-[clamp(24px,2.2vw,32px)] font-semibold leading-[1.15] tracking-tight">{icp.who}</p>
              <p className="mt-3 text-[17px] text-[#d6d7d0]">
                Con una rete commerciale di {icp.sellers}, {icp.extra}.
              </p>
              <h3 className="mt-6 text-[15px] font-semibold">Dove li troviamo</h3>
              <ul className="mt-2 space-y-2 text-[15px] leading-snug">
                {icp.where.map((w) => (
                  <li key={w.name}>
                    <span className="font-medium text-brand">{w.name}</span> <span className="text-[#d6d7d0]">· {w.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-on-soot-muted">Primi prospect da verificare: Net Insurance, Assimoco, Bene Assicurazioni, Nobis Assicurazioni e i grandi broker AIBA.</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1">
              {icp.buyers.map((b) => (
                <li key={b.role} className="reveal grid gap-2 rounded-[var(--radius-card)] bg-surface-muted p-5 lg:grid-cols-[160px_minmax(0,1fr)] lg:gap-6">
                  <div>
                    <div className="text-sm text-muted">{b.role}</div>
                    <div className="mt-1 text-[17px] font-semibold leading-snug">{b.who}</div>
                  </div>
                  <p className="text-[17px] leading-snug">{b.say}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Rispetto a cosa usano oggi */}
          <div className="reveal mt-14">
            <h3 className={h3}>Rispetto a cosa usano oggi</h3>
            <div data-ui className="mt-5 overflow-hidden rounded-[var(--radius-card)] border border-border">
              <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1.4fr)] bg-surface-muted px-5 py-3 text-sm text-muted md:grid">
                <span>Alternativa</span>
                <span>Il suo limite</span>
                <span>Con Coach</span>
              </div>
              {alternatives.map((a) => (
                <div key={a.name} className="grid gap-1 border-t border-border px-5 py-4 first:border-t-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1.4fr)] md:gap-4 md:first:border-t">
                  <span className="font-semibold">{a.name}</span>
                  <span className="text-muted">{a.limit}</span>
                  <span className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" /> {a.coach}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[15px] text-muted">Fondimpresa non è un concorrente: è il portafoglio del cliente. L&apos;azienda ci ha già versato i contributi per la formazione e può usarli per pagare Coach.</p>
          </div>

          {/* Le 4 fasi */}
          <div className="reveal mt-14">
            <h3 className={h3}>Quattro fasi in sei mesi</h3>
            <ol className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {phases.map((ph, i) => (
                <li key={ph.name} className={i === phases.length - 1 ? "flex flex-col rounded-[var(--radius-card)] bg-brand p-5" : "flex flex-col rounded-[var(--radius-card)] bg-surface-muted p-5"}>
                  <span className="text-sm font-medium">{ph.when}</span>
                  <h4 className="mt-1 text-[19px] font-semibold leading-snug">{ph.name}</h4>
                  <p className="mt-2 text-[15px] leading-snug">{ph.what}</p>
                  <p className="mt-auto border-t border-soot/10 pt-3 text-[15px] font-medium">{ph.result}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 max-w-[80ch] text-[15px] text-muted">Dopo i 6 mesi: {nextPhase}</p>
          </div>
        </div>
      </section>

      {/* I numeri: unit economics, imbuto, budget, canali */}
      <section id="piano" className="scroll-mt-4 py-14 md:py-20">
        <div className={frame}>
          <p className="reveal max-w-[24ch] text-[clamp(32px,3.6vw,56px)] font-semibold leading-[1.08] tracking-[-0.025em]">
            «{pitchLine}»
          </p>
          <p className="reveal mt-4 text-[15px] text-on-soot-muted">Tutti i numeri sono ipotesi di lavoro del team, dichiarate come tali.</p>

          <dl data-ui className="reveal mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.5fr)]">
            <div className="flex flex-col rounded-[var(--radius-card)] bg-soot-2 p-5">
              <dt className="text-sm text-on-soot-muted">Costo per cliente (CAC)</dt>
              <dd className="num mt-5 text-[40px] font-semibold leading-none">{eur(cac)}</dd>
              <dd className="mt-auto pt-4 text-sm text-on-soot-muted">{eur(budgetTotal)} ÷ {customers} clienti</dd>
            </div>
            <div className="flex flex-col rounded-[var(--radius-card)] bg-soot-2 p-5">
              <dt className="text-sm text-on-soot-muted">Valore del cliente (LTV)</dt>
              <dd className="num mt-5 text-[40px] font-semibold leading-none">{eur(ltv)}</dd>
              <dd className="mt-auto pt-4 text-sm text-on-soot-muted">{eur(arrPerCustomer)} × {unit.grossMargin * 100}% × {unit.lifetimeYears} anni</dd>
            </div>
            <div className="flex flex-col rounded-[var(--radius-card)] bg-soot-2 p-5">
              <dt className="text-sm text-on-soot-muted">LTV / CAC</dt>
              <dd className="num mt-5 text-[40px] font-semibold leading-none text-brand">{fmtX(ltvToCac)}</dd>
              <dd className="mt-auto pt-4 text-sm text-on-soot-muted">la soglia minima è 3</dd>
            </div>
            <div className="flex flex-col rounded-[var(--radius-card)] bg-soot-2 p-5">
              <dt className="text-sm text-on-soot-muted">ROI primo anno</dt>
              <dd className="num mt-5 text-[40px] font-semibold leading-none">+{Math.round(roiFirstYear * 100)}%</dd>
              <dd className="mt-auto pt-4 text-sm text-on-soot-muted">si ripaga in {fmtX(paybackMonths)} mesi a cliente</dd>
            </div>
            <div className="rounded-[var(--radius-card)] bg-brand p-5 text-soot sm:col-span-2 lg:col-span-1">
              <dt className="text-sm">Budget di lancio</dt>
              <dd className="num mt-3 text-[40px] font-semibold leading-none">{eur(budgetTotal)}</dd>
              <dd className="mt-4 space-y-1.5">
                {budget.map((b) => (
                  <div key={b.item} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 text-xs">
                    <span className="truncate">{b.item}</span>
                    <span className="num font-medium">{eur(b.amount)}</span>
                    <span className="col-span-2 mt-0.5 h-1.5 rounded-full bg-soot/15">
                      <span className="block h-full rounded-full bg-soot" style={{ width: `${(b.amount / maxBudget) * 100}%` }} />
                    </span>
                  </div>
                ))}
              </dd>
            </div>
          </dl>

          {/* I conti passo per passo */}
          <div className="reveal mt-4 grid gap-3 text-[15px] md:grid-cols-4">
            {[
              ["Ricavo per cliente", `${price.perSeatMonth} € × ${icp.seatsPerCustomer} × 12 = ${eur(arrPerCustomer)} l'anno`],
              ["Primo anno", `${eur(firstYearRevenue)} di ricavi, ${eur(firstYearMargin)} dopo i costi`],
              ["Recupero del CAC", `${eur(Math.round(monthlyMargin))} al mese di margine per cliente`],
              ["Punto di pareggio", `bastano ${breakEvenCustomers} clienti per ripagare ${eur(budgetTotal)}; ne prevediamo ${customers}`],
            ].map(([t, d]) => (
              <div key={t} className="rounded-[var(--radius-control)] border border-soot-3 p-4">
                <div className="font-semibold">{t}</div>
                <div className="num mt-1 leading-snug text-[#d6d7d0]">{d}</div>
              </div>
            ))}
          </div>

          {/* Imbuto */}
          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="reveal lg:col-span-7">
              <h3 className={h3}>L&apos;imbuto, canale per canale</h3>
              <table data-ui className="mt-5 w-full text-[15px]">
                <thead>
                  <tr className="text-left text-sm text-on-soot-muted">
                    <th className="pb-2 font-normal">Canale</th>
                    <th className="pb-2 text-right font-normal">Vedono</th>
                    <th className="pb-2 text-right font-normal">Cliccano</th>
                    <th className="w-[38%] pb-2 pl-4 font-normal">Lasciano il contatto</th>
                  </tr>
                </thead>
                <tbody>
                  {funnelTop.map((f) => (
                    <tr key={f.channel} className="border-t border-soot-3">
                      <td className="py-3 pr-3 leading-snug">
                        {f.channel}
                        {f.note && <div className="text-xs text-on-soot-muted">{f.note}</div>}
                      </td>
                      <td className="num py-3 text-right text-[#d6d7d0]">{f.see === null ? "–" : num(f.see)}</td>
                      <td className="num py-3 text-right text-[#d6d7d0]">{f.click === null ? "–" : num(f.click)}</td>
                      <td className="py-3 pl-4">
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 flex-1 rounded-full bg-soot-3">
                            <span className="block h-full rounded-full bg-brand" style={{ width: `${(f.leads / maxLeads) * 100}%` }} />
                          </span>
                          <span className="num w-9 text-right font-semibold">{f.leads}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-white">
                    <td className="py-3 font-semibold">Totale</td>
                    <td className="num py-3 text-right font-semibold">~{num(380000)}</td>
                    <td className="num py-3 text-right font-semibold">~{num(2850)}</td>
                    <td className="num py-3 pl-4 text-right font-semibold">{funnel[0].value}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-sm text-on-soot-muted">Controllo su LinkedIn Ads: 60 contatti × 25% = 15 demo, 12.000 € ÷ 15 = 800 € a demo, esattamente l&apos;obiettivo della regola di stop.</p>
            </div>
            <div className="reveal lg:col-span-5">
              <h3 className={h3}>Poi, uguale per tutti</h3>
              <ol data-ui className="mt-5 space-y-2">
                {funnel.map((f, i) => (
                  <li key={f.step} className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 rounded-[var(--radius-control)] bg-soot-2 p-4" style={{ marginRight: `${i * 6}%` }}>
                    <span className="num text-[32px] font-semibold leading-none">{f.value}</span>
                    <span>
                      <span className="block text-[15px] font-medium">{f.step}</span>
                      <span className="block text-sm text-on-soot-muted">{f.plain}</span>
                    </span>
                    <span className="num text-sm text-brand">{i === 0 ? "" : `${Math.round((f.value / funnel[i - 1].value) * 100)}%`}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-sm text-on-soot-muted">Clienti per canale: partner 4 · evento 3 · LinkedIn 2 · mail 1.</p>
            </div>
          </div>

          {/* Canali */}
          <div className="reveal mt-14">
            <h3 className={h3}>Le cinque leve, e perché</h3>
            <ul className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {channels.map((c) => (
                <li key={c.name} className="flex flex-col rounded-[var(--radius-card)] bg-soot-2 p-5">
                  <span className="text-xs text-on-soot-muted">{c.kind}</span>
                  <h4 className="mt-1 text-[19px] font-semibold text-brand">{c.name}</h4>
                  <p className="mt-2 text-[15px] leading-snug">{c.what}</p>
                  <p className="mt-3 text-[15px] leading-snug text-[#d6d7d0]">{c.why}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] text-[#d6d7d0]">
              Scartati:{" "}
              {notChosen.map((n, i) => (
                <span key={n.name}>
                  <span className="font-semibold text-white">{n.name}</span>, {n.why}
                  {i < notChosen.length - 1 ? "; " : "."}
                </span>
              ))}{" "}
              Digitale e fisico dicono la stessa cosa e chiedono la stessa cosa: una demo di 15 minuti, dal post LinkedIn al QR sullo stand.
            </p>
          </div>

          {/* Budget e costo per canale */}
          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="reveal lg:col-span-7">
              <h3 className={h3}>Dove va ogni euro</h3>
              <table data-ui className="mt-5 w-full text-[15px]">
                <tbody>
                  {budget.map((b) => (
                    <tr key={b.item} className="border-t border-soot-3">
                      <td className="py-3 pr-4 leading-snug">
                        <span className="font-medium">{b.item}</span>
                        <div className="text-sm text-on-soot-muted">{b.use}</div>
                      </td>
                      <td className="num w-14 py-3 text-right text-on-soot-muted">{Math.round((b.amount / budgetTotal) * 100)}%</td>
                      <td className="num w-24 py-3 text-right font-semibold">{eur(b.amount)}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-white">
                    <td className="py-3 font-semibold">Totale</td>
                    <td className="num py-3 text-right">100%</td>
                    <td className="num py-3 text-right font-semibold">{eur(budgetTotal)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-sm text-on-soot-muted">Le commissioni ai consulenti (10% del primo anno, circa {eur(partnerCommission)} per un cliente tipo) si pagano con i ricavi, non con questo budget.</p>
            </div>
            <div className="reveal space-y-8 lg:col-span-5">
              <div>
                <h3 className={h3}>Quanto costa un cliente, per canale</h3>
                <ul data-ui className="mt-5 space-y-2">
                  {[...perChannel]
                    .sort((a, b) => a.spend / a.customers - b.spend / b.customers)
                    .map((c, i) => (
                      <li key={c.channel} className={i === 0 ? "flex items-center justify-between rounded-[var(--radius-control)] bg-brand p-4 text-soot" : "flex items-center justify-between rounded-[var(--radius-control)] bg-soot-2 p-4"}>
                        <span>
                          <span className="block font-medium">{c.channel}</span>
                          <span className={i === 0 ? "block text-sm" : "block text-sm text-on-soot-muted"}>{eur(c.spend)} · {c.customers} clienti</span>
                        </span>
                        <span className="num text-[22px] font-semibold">{eur(c.spend / c.customers)}</span>
                      </li>
                    ))}
                </ul>
                <p className="mt-3 text-sm text-on-soot-muted">I partner costano meno: dal mese 4 lì va la riserva e parte del budget LinkedIn Ads.</p>
              </div>
              <div className="rounded-[var(--radius-card)] border border-soot-3 p-5">
                <span className="text-sm text-on-soot-muted">Metrica guida, ogni lunedì</span>
                <p className="mt-2 flex items-baseline gap-3">
                  <span className="num text-[56px] font-semibold leading-none text-brand">{guideMetric.target}</span>
                  <span className="text-[17px] font-medium">{guideMetric.name.toLowerCase()}</span>
                </p>
                <p className="mt-2 text-[15px] leading-snug text-[#d6d7d0]">75 demo in 26 settimane. {guideMetric.rule}</p>
              </div>
            </div>
          </div>

          {/* Le domande della giuria */}
          <div className="reveal mt-14">
            <h3 className={h3}>Le domande che ci farete</h3>
            <div className="mt-5 grid gap-x-8 md:grid-cols-2">
              {juryQA.map((q) => (
                <details key={q.q} className="group border-t border-soot-3 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium">
                    {q.q}
                    <Plus className="size-4 shrink-0 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="mt-2 text-[15px] leading-[1.55] text-[#d6d7d0]">{q.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sui social: la campagna LinkedIn */}
      <section id="social" className="scroll-mt-4 bg-white py-14 text-soot md:py-20">
        <div className={frame}>
          <div className="grid gap-6 lg:grid-cols-12">
            <h2 className={`${h2} lg:col-span-6`}>Sui social</h2>
            <p className="reveal max-w-[46ch] text-lg leading-[1.5] text-muted lg:col-span-5 lg:col-start-8 lg:self-end">
              LinkedIn, 3 post a settimana e 1 video verticale: è dove stanno direttori commerciali e HR. Pronti da pubblicare domani, così come sono.
            </p>
          </div>
          <div className="reveal mt-8">
            <SocialWall />
          </div>
          <Link href="/social" className="mt-6 inline-flex items-center gap-1 text-[15px] font-medium underline decoration-brand decoration-2 underline-offset-4">
            Tutti i contenuti: video da guardare, post da copiare, carosello, materiali per lo stand <ArrowRight className="size-4" />
          </Link>
          <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-3">
            {POST_COPY.map((p) => (
              <div key={p.kind} className="reveal">
                <h3 className="text-[17px] font-semibold">{p.kind}</h3>
                <p className="mt-2 text-[16px] leading-[1.55]">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiusura: la banda scura del wireframe */}
      <section className="bg-white pb-14 text-soot md:pb-20">
        <div className={frame}>
          <div className="reveal flex flex-col gap-6 rounded-[var(--radius-card)] bg-soot p-6 text-white md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="text-[clamp(26px,2.6vw,36px)] font-semibold leading-[1.15] tracking-[-0.015em]">Allenati sul cliente finto. Vinci con quello vero.</p>
              <p className="mt-2 text-[15px] text-on-soot-muted">Prova Coach con i dati di Nordica Assicurazioni, un&apos;azienda d&apos;esempio: dal telefono, in 60 secondi.</p>
            </div>
            <Link href="/dashboard" className="inline-flex h-12 flex-none items-center justify-center gap-2 rounded-[var(--radius-control)] bg-brand px-6 text-base font-medium text-soot hover:bg-[#cdf27f]">
              Prova la demo <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-24 pt-12 md:pb-10">
        <div className={frame}>
          <div className="flex flex-wrap items-start justify-between gap-6 text-[15px] text-on-soot-muted">
            <div className="flex items-center gap-3">
              <CoachMark className="size-7" />
              <span>Coach · il simulatore di volo per i venditori</span>
            </div>
            <a href="#" className="hover:text-white">Torna su</a>
          </div>
          <a href="mailto:ciao@coach.ai" className="mt-10 block break-all text-[clamp(44px,9vw,148px)] font-semibold leading-[0.9] tracking-[-0.04em] hover:text-brand">
            ciao@coach.ai
          </a>
          <div className="mt-8 flex flex-col gap-2 border-t border-soot-3 pt-5 text-sm text-on-soot-muted md:flex-row md:justify-between">
            <span>
              <Link href="/dashboard" className="hover:text-white">Demo</Link> · <a href="#prezzi" className="hover:text-white">Prezzi</a> · <a href="#strategia" className="hover:text-white">Piano</a> · <a href="#social" className="hover:text-white">Social</a>
            </span>
            <span>Vibecoding Hackathon · Next Leaders × Forbes</span>
            <span>Italia, 2026</span>
          </div>
        </div>
      </footer>

      {/* Telefono: la demo resta a un tocco */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-soot-3 bg-soot p-3 md:hidden">
        <Link href="/dashboard" className="flex h-12 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-brand text-base font-medium text-soot">
          Prova la demo <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
