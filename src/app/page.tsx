import { SiteFooter, SiteHeader } from "@/components/site-header";
import { acv, BUDGET_TOTAL, cac, customers, formatEur, formatNum, formatPct, ltv, ltvOverCac, pilotPrice, pricing, roi } from "@/lib/gtm";
import { ArrowRight, BarChart3, BookOpen, Check, FileUp, MessagesSquare } from "lucide-react";
import Link from "next/link";

const steps = [
  { icon: FileUp, title: "Carica", text: "Un listino, una procedura, una scheda prodotto. Gli esperti aggiungono come lavorano." },
  { icon: BookOpen, title: "Impara", text: "Un docente AI la spiega a voce a ciascuno. Puoi interrompere e chiedere." },
  { icon: MessagesSquare, title: "Allenati", text: "Role play in video con un avatar che fa il cliente, il collega o il collaboratore." },
  { icon: BarChart3, title: "Migliora", text: "Il coach dà il voto. Ogni role play prepara il successivo, finché sei pronto." },
];

const audiences = [
  { title: "Vendite", text: "Lo sconto al rinnovo, la chiamata per trattenere il cliente, il listino nuovo." },
  { title: "Servizio clienti", text: "Il cliente arrabbiato, il disservizio da spiegare, il no detto con tatto." },
  { title: "Manager", text: "Il riscontro difficile, la valutazione annuale, il cambiamento da annunciare." },
  { title: "Neoassunti", text: "La prima telefonata, il prodotto in due minuti, la domanda a cui non sai rispondere." },
];

export default function LandingPage() {
  return (
    <div className="bg-surface">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 text-center md:px-6 md:pt-20">
        <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
          Formazione finanziabile con Fondimpresa
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Un formatore AI personale per ogni dipendente
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
          Carichi un listino o una procedura. Un docente AI la spiega a voce, un avatar in video fa il cliente che
          chiede lo sconto, e un coach dà il voto.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/roleplay/s1" className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 font-medium text-brand-foreground hover:bg-brand/90">
            Prova un role play <ArrowRight className="size-4" />
          </Link>
          <Link href="/dashboard" className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3 font-medium hover:bg-surface-muted">
            Guarda la dashboard
          </Link>
        </div>
        <Link href="/piano#numeri" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
          Il piano di go to market in numeri <ArrowRight className="size-3.5" />
        </Link>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight">Dal documento all&apos;allenamento, in quattro passi</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand"><Icon className="size-4" /></span>
                  <span className="text-xs font-medium text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">Per le conversazioni che contano di più</h2>
        <p className="mt-2 text-muted">Rispetto all&apos;aula, si aggiorna il giorno dopo e dice chi sa farlo davvero.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-xl border border-border p-5">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Un prezzo semplice, e una data</h2>
          <p className="mt-2 text-muted">Si parte con un pilota che ha una fine. Si paga col conto Fondimpresa, tramite il tuo ente di formazione.</p>
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="text-sm font-medium text-muted">Pilota</div>
              <div className="mt-1 text-4xl font-semibold">{formatEur(pilotPrice)}</div>
              <div className="text-sm text-muted">{pricing.seats} persone · {pricing.pilotWeeks} settimane · una competenza</div>
              <ul className="mt-5 space-y-2 text-sm">
                {["Il tuo listino diventa lezioni e role play", "Una data di fine: il giorno del listino nuovo", `${formatEur(pilotPrice / pricing.seats)} a persona, contro ${formatEur(pricing.classroomPerPerson)} di un'aula`].map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> {f}</li>
                ))}
              </ul>
              <Link href="/roleplay/s1" className="mt-6 block rounded-lg bg-brand px-5 py-3 text-center font-medium text-brand-foreground hover:bg-brand/90">
                Prova un role play adesso
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="text-sm font-medium text-muted">Poi, l&apos;anno</div>
              <div className="mt-1 text-4xl font-semibold">{pricing.seatPrice} €</div>
              <div className="text-sm text-muted">a persona al mese · fatturazione annuale</div>
              <ul className="mt-5 space-y-2 text-sm">
                {["Lezioni e role play illimitati", "Dashboard per HR e manager, ogni lunedì", "Esportazione in Excel", "Avviso 30 giorni prima di ogni rinnovo"].map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> {f}</li>
                ))}
              </ul>
              <Link href="/dashboard" className="mt-6 block rounded-lg border border-border px-5 py-3 text-center font-medium hover:bg-surface-muted">
                Guarda la dashboard
              </Link>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">Prezzi indicativi (ipotesi), nella fascia del manuale dei casi per i piccoli team.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">Per la giuria</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Il piano in quattro numeri</h2>
            <p className="mt-1 text-muted">{customers} aziende in sei mesi con {formatEur(BUDGET_TOTAL)}, passando dagli enti di formazione Fondimpresa.</p>
          </div>
          <Link href="/piano" className="inline-flex items-center gap-1 font-medium text-brand">
            Il piano completo <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "CAC", value: formatEur(cac), note: "costo per cliente" },
            { label: "LTV", value: formatEur(ltv), note: `${formatNum(ltvOverCac)} volte il CAC` },
            { label: "ROI primo anno", value: `+${formatPct(roi)}`, note: "sul margine lordo" },
            { label: "Contratto annuo", value: formatEur(acv), note: `${pricing.seats} posti a ${pricing.seatPrice} €` },
          ].map((s) => (
            <Link key={s.label} href="/piano#numeri" className="rounded-xl border border-border p-4 transition-colors hover:border-brand/40 hover:bg-brand-soft">
              <div className="text-sm text-muted">{s.label}</div>
              <div className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-muted">{s.note}</div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
