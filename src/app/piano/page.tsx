import { SiteFooter, SiteHeader } from "@/components/site-header";
import { Badge, Card } from "@/components/ui";
import {
  acv,
  BUDGET_TOTAL,
  budget,
  budgetByLever,
  budgetSum,
  cac,
  channels,
  customers,
  firstYearMargin,
  firstYearRevenue,
  formatEur,
  formatNum,
  formatPct,
  fund,
  fundPerYearExample,
  funnel,
  ltv,
  ltvOverCac,
  ltvOverCacTwoYears,
  ltvTwoYears,
  northStar,
  paidSeats,
  paybackMonths,
  pilotPrice,
  pilots,
  pricing,
  roi,
  sharedCost,
  split,
  timeline,
  unit,
} from "@/lib/gtm";
import { ArrowDown, ArrowRight, Building2, CalendarDays, Check, Handshake, Megaphone, MapPin, Search, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coach — Il piano di go to market",
  description: "ICP, prezzo, imbuto, CAC, LTV, ROI e il budget da 50.000 euro, voce per voce.",
};

const sections = [
  { id: "numeri", label: "Numeri" },
  { id: "cliente", label: "Cliente" },
  { id: "imbuto", label: "Imbuto" },
  { id: "budget", label: "Budget" },
  { id: "canali", label: "Canali" },
  { id: "fondimpresa", label: "Fondimpresa" },
  { id: "calendario", label: "Calendario" },
];

function Fonte({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-xs text-muted">{children}</p>;
}

function Ipotesi() {
  return <Badge tone="warning">ipotesi</Badge>;
}

function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border py-12 md:py-16">
      <div className="text-xs font-semibold uppercase tracking-wider text-brand">{eyebrow}</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {intro && <p className="mt-2 max-w-3xl text-muted">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Stat({ label, value, note, highlight }: { label: string; value: string; note: string; highlight?: boolean }) {
  return (
    <Card className={highlight ? "border-brand/40 bg-brand-soft" : ""}>
      <div className="text-sm text-muted">{label}</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{value}</div>
      <div className="mt-2 text-xs text-muted">{note}</div>
    </Card>
  );
}

const levers = [
  { icon: Megaphone, title: "Contenuti social", text: "LinkedIn, tre post a settimana: la pagina di Coach e i due fondatori. Video verticali con l'avatar, la conversazione difficile in trenta secondi. I contenuti sono pronti nella pagina Social.", link: "/social" },
  { icon: Search, title: "Pubblicità a pagamento", text: `LinkedIn Ads per 4.000 € solo su chi ha già visto la demo, Google Ads per 3.000 € solo su ricerche di chi compra. Meta a zero: il nostro compratore non sceglie la formazione su Instagram, e verso i professionisti italiani un euro su Meta rende 0,28 € (manuale p. 13).` },
  { icon: MapPin, title: "Fisico e digitale", text: "Fisico: quattro cene da dieci HR dello stesso settore, con il role play provato dal vivo. Digitale: una pagina per ogni conversazione difficile, che risponde a chi la cerca su Google. Parlano alla stessa persona." },
  { icon: Building2, title: "Convenzioni", text: "Gli enti di formazione titolati Fondimpresa hanno già i nostri clienti e i loro piani. Gli diamo il modulo col loro marchio, la scheda del piano scritta e il 25% del primo anno." },
  { icon: Handshake, title: "Partnership", text: "Zucchetti HR: i progressi di Coach entrano nel software del personale che l'azienda usa già, e i loro rivenditori lo propongono ai loro clienti." },
];

const journey = [
  "Elena, HR di un'assicurazione da 400 persone, legge su LinkedIn il post sul miliardo di Fondimpresa non speso.",
  "Prova dal telefono il role play «Il rinnovo con sconto» e riceve l'invito alla cena di Milano.",
  "A cena prova un role play sul suo listino 2027, davanti ad altri nove HR del settore.",
  "Il suo ente di formazione le manda il piano Fondimpresa già scritto, con Coach dentro.",
  `Pilota di ${pricing.pilotWeeks} settimane su ${pricing.seats} persone, con una data: il listino parte il 1° febbraio.`,
  `Ogni lunedì riceve i posti attivi. Ad aprile firma l'anno: ${formatEur(acv)}.`,
];

export default function PianoPage() {
  const maxLever = budgetByLever[0][1];
  return (
    <div className="bg-surface">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="pb-4 pt-10 md:pt-16">
          <Badge tone="brand">Go to market · novembre 2026 – aprile 2027</Badge>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Dieci aziende in sei mesi, con 50.000 euro
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Entriamo dagli enti di formazione che hanno già i nostri clienti, li incontriamo a cena e li facciamo pagare
            col conto Fondimpresa che hanno già. LinkedIn e Google accelerano quello che converte.
          </p>
          <nav className="mt-6 flex flex-wrap gap-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-full border border-border px-3 py-1 text-sm hover:bg-surface-muted">
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <Section id="numeri" eyebrow="I numeri" title="Il modello regge: ogni cliente vale quasi cinque volte quello che costa">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="CAC" value={formatEur(cac)} note={`${formatEur(BUDGET_TOTAL)} diviso ${customers} clienti`} />
            <Stat label="LTV" value={formatEur(ltv)} note={`${formatEur(acv)} l'anno × margine ${formatPct(unit.grossMargin)} × ${unit.lifetimeYears} anni`} />
            <Stat label="LTV su CAC" value={`${formatNum(ltvOverCac)}×`} note={`Serve almeno 3×. Con 2 anni di vita, come il manuale: ${formatNum(ltvOverCacTwoYears)}×`} highlight />
            <Stat label="ROI del primo anno" value={`+${formatPct(roi)}`} note={`Margine ${formatEur(firstYearMargin)} meno ${formatEur(BUDGET_TOTAL)}, diviso ${formatEur(BUDGET_TOTAL)}`} highlight />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Card>
              <div className="text-sm text-muted">Il cliente si ripaga in</div>
              <div className="mt-1 text-2xl font-semibold">{formatNum(paybackMonths)} mesi</div>
              <div className="mt-2 text-xs text-muted">CAC diviso il margine mensile di un cliente ({formatEur((acv * unit.grossMargin) / 12)})</div>
            </Card>
            <Card>
              <div className="text-sm text-muted">Ricavi del primo anno</div>
              <div className="mt-1 text-2xl font-semibold">{formatEur(firstYearRevenue)}</div>
              <div className="mt-2 text-xs text-muted">
                {customers} contratti da {formatEur(acv)} + {pilots - customers} piloti non rinnovati da {formatEur(pilotPrice)}
              </div>
            </Card>
            <Card className="border-brand/40">
              <div className="text-sm text-muted">Metrica guida, ogni lunedì</div>
              <div className="mt-1 text-2xl font-semibold">{northStar.name}</div>
              <div className="mt-2 text-xs text-muted">
                Obiettivo {formatPct(northStar.target)}: {formatNum(paidSeats * northStar.target)} persone su {paidSeats} posti pagati.
              </div>
            </Card>
          </div>
          <Card className="mt-4 bg-background">
            <h3 className="font-semibold">Da dove vengono</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex gap-2"><Ipotesi /> Margine lordo del {formatPct(unit.grossMargin)}, lo stesso del conto d&apos;esempio del manuale (p. 14).</li>
              <li className="flex gap-2"><Ipotesi /> Vita del cliente di {unit.lifetimeYears} anni: prudente, perché Udemy Business trattiene l&apos;82% della spesa dei clienti piccoli (manuale p. 4). Con 2 anni l&apos;LTV è {formatEur(ltvTwoYears)} e il rapporto resta {formatNum(ltvOverCacTwoYears)}×.</li>
              <li className="flex gap-2"><Ipotesi /> Le percentuali dell&apos;imbuto e i clienti per canale: le verifichiamo con le soglie del manuale prima di spendere il resto.</li>
              <li className="flex gap-2"><Badge tone="success">fonte</Badge> Prezzi, commissioni, Fondimpresa e soglie dei test: manuale dei casi della gara, pagina per pagina.</li>
            </ul>
          </Card>
        </Section>

        <Section id="cliente" eyebrow="ICP, proposta di valore e prezzo" title="Chi compra, perché sceglie noi, quanto paga">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <div className="flex items-center gap-2"><Users className="size-4 text-brand" /><h3 className="font-semibold">Il cliente ideale</h3></div>
              <p className="mt-3 text-lg font-medium">
                Il responsabile del personale di un&apos;azienda da 200 a 1.000 dipendenti, con almeno 50 persone che parlano coi clienti.
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div><dt className="font-medium">Dove sta</dt><dd className="text-muted">Assicurazioni, banche, energia e telecomunicazioni, in Lombardia, Lazio e Piemonte. Su LinkedIn, nei piani di un ente di formazione, dentro il software del personale.</dd></div>
                <div><dt className="font-medium">Che problema ha</dt><dd className="text-muted">Un listino nuovo ogni anno e una rete che lo deve vendere. L&apos;aula costa {formatEur(pricing.classroomPerPerson)} a partecipante (mediana Cegos, manuale p. 4) e nessuno sa chi ha imparato davvero.</dd></div>
                <div><dt className="font-medium">Quando compra</dt><dd className="text-muted">Nell&apos;ultimo trimestre, quando scrive il budget dell&apos;anno dopo (manuale p. 4). Cioè adesso.</dd></div>
                <div><dt className="font-medium">Chi lo aiuta a decidere</dt><dd className="text-muted">Il direttore commerciale, che ha già un numero da riportare: i giorni che servono a un nuovo venditore per chiudere il primo contratto.</dd></div>
                <div><dt className="font-medium">Dove ne troviamo dieci domani</dt><dd className="text-muted">Su Sales Navigator con questi filtri, e tra i clienti dei sei enti di formazione partner.</dd></div>
              </dl>
              <div className="mt-4 rounded-lg bg-surface-muted p-3 text-sm">
                <span className="font-medium">Per esempio:</span> Elena Marchi, HR di Nordica Assicurazioni (inventata), 400 dipendenti, 120 a contatto coi clienti.
                Accantona circa {formatEur(fundPerYearExample)} l&apos;anno su Fondimpresa ({fund.perWorkerYear} € × {fund.exampleEmployees}, nostro conto).
              </div>
            </Card>

            <div className="grid gap-4">
              <Card className="border-brand/40 bg-brand-soft">
                <h3 className="font-semibold">La proposta di valore</h3>
                <p className="mt-3 text-lg font-medium">
                  Il listino nuovo diventa allenamento per tutta la rete in un giorno, e sai chi è pronto prima che parli con un cliente vero. Lo paghi col conto Fondimpresa che hai già.
                </p>
                <p className="mt-3 text-sm text-muted">Oggi: un&apos;aula all&apos;anno, uguale per tutti, senza un voto. Con Coach: ogni persona si allena quando vuole, sul suo caso, e il coach dà il voto al minuto.</p>
              </Card>
              <Card>
                <h3 className="font-semibold">Il prezzo</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border p-3">
                    <div className="text-xs text-muted">Pilota con una data</div>
                    <div className="text-2xl font-semibold">{formatEur(pilotPrice)}</div>
                    <div className="text-xs text-muted">{pricing.seats} posti, {pricing.pilotWeeks} settimane, una squadra e una competenza</div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="text-xs text-muted">Poi, l&apos;anno</div>
                    <div className="text-2xl font-semibold">{pricing.seatPrice} €</div>
                    <div className="text-xs text-muted">a persona al mese: {formatEur(acv)} l&apos;anno per {pricing.seats} posti</div>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> Il pilota costa {formatEur(pilotPrice / pricing.seats)} a persona, contro {formatEur(pricing.classroomPerPerson)} di una giornata d&apos;aula.</li>
                  <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> Un anno costa il {formatPct(acv / fundPerYearExample)} di quello che l&apos;azienda tipo accantona su Fondimpresa.</li>
                  <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> Prezzo in pagina e avviso 30 giorni prima di ogni rinnovo: niente rinnovi a sorpresa (lezione 1 e 9 del manuale).</li>
                  <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> Ben sotto i {formatEur(pricing.directAwardCap)} dell&apos;affidamento diretto: nessuna gara.</li>
                </ul>
                <Fonte>Il prezzo di {pricing.seatPrice} € è un&apos;ipotesi nella fascia di 15-20 € per i piccoli team (manuale p. 3 e 14); i {pricing.seats} posti sono la coorte tipica (p. 5).</Fonte>
              </Card>
            </div>
          </div>
        </Section>

        <Section id="imbuto" eyebrow="L'imbuto" title="Da 40.000 persone che ci vedono a 10 che pagano l'anno" intro="Sei mesi, tutti i canali insieme. Ogni passaggio è un'ipotesi che misuriamo ogni settimana.">
          <ol className="grid gap-3 md:grid-cols-5">
            {funnel.map((f, i) => (
              <li key={f.step} className="relative">
                <Card className="md:h-full">
                  <div className="text-xs font-medium text-muted">0{i + 1} · {f.step}</div>
                  <div className="mt-1 text-3xl font-semibold tracking-tight">{formatNum(f.value)}</div>
                  <div className="mt-2 text-xs text-muted">{f.detail}</div>
                </Card>
                {i < funnel.length - 1 && (
                  <div className="my-1 flex items-center justify-center gap-1 text-sm font-medium text-brand md:absolute md:-right-3 md:top-1/2 md:z-10 md:my-0 md:-translate-y-1/2 md:rounded-full md:border md:border-border md:bg-surface md:px-1.5 md:py-0.5 md:text-xs">
                    <ArrowDown className="size-3.5 md:hidden" />
                    {formatPct(funnel[i + 1].value / f.value)}
                  </div>
                )}
              </li>
            ))}
          </ol>
          <Fonte>Il passaggio dal primo incontro al pilota (20%) sta sopra la soglia del manuale per andare avanti: almeno uno su dieci accetta (p. 4).</Fonte>
        </Section>

        <Section id="budget" eyebrow="Il budget" title="50.000 euro, voce per voce" intro="Un terzo va a chi ci porta i clienti, quasi un quarto all'incontro di persona, il resto al digitale e a quello che ci rende credibili.">
          <div className="grid gap-4 lg:grid-cols-5">
            <Card className="lg:col-span-2">
              <h3 className="font-semibold">Per leva</h3>
              <ul className="mt-4 space-y-3">
                {budgetByLever.map(([lever, amount]) => (
                  <li key={lever} title={`${lever}: ${formatEur(amount)} (${formatPct(amount / BUDGET_TOTAL)})`}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{lever}</span>
                      <span className="font-medium tabular-nums">{formatEur(amount)} <span className="text-muted">· {formatPct(amount / BUDGET_TOTAL)}</span></span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-muted">
                      <div className="h-2 rounded-full bg-brand" style={{ width: `${(amount / maxLever) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-surface-muted p-3"><div className="text-xs text-muted">Partner</div><div className="font-semibold">{formatEur(split.partner)}</div></div>
                <div className="rounded-lg bg-surface-muted p-3"><div className="text-xs text-muted">Digitale</div><div className="font-semibold">{formatEur(split.digitale)}</div></div>
                <div className="rounded-lg bg-surface-muted p-3"><div className="text-xs text-muted">Fisico</div><div className="font-semibold">{formatEur(split.fisico)}</div></div>
                <div className="rounded-lg bg-surface-muted p-3"><div className="text-xs text-muted">Fiducia e riserva</div><div className="font-semibold">{formatEur(split.altro)}</div></div>
              </div>
            </Card>

            <Card className="lg:col-span-3">
              <h3 className="font-semibold">Ogni voce</h3>
              <ul className="mt-3 divide-y divide-border">
                {budget.map((b) => (
                  <li key={b.item} className="flex gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{b.item}</span>
                        <Badge>{b.lever}</Badge>
                      </div>
                      <p className="mt-0.5 text-sm text-muted">{b.detail}</p>
                      {b.source ? <p className="mt-0.5 text-xs text-success">Fonte: {b.source}</p> : <p className="mt-0.5 text-xs text-warning">Importo: ipotesi</p>}
                    </div>
                    <div className="shrink-0 text-right font-semibold tabular-nums">{formatEur(b.amount)}</div>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex items-center justify-between rounded-lg bg-brand-soft px-3 py-3 font-semibold">
                <span className="flex items-center gap-2"><Check className="size-4 text-success" /> Totale: i conti tornano</span>
                <span className="tabular-nums">{formatEur(budgetSum)}</span>
              </div>
            </Card>
          </div>
        </Section>

        <Section id="canali" eyebrow="I canali" title="Da chi passiamo per arrivare all'azienda" intro="Cinque canali, ognuno con un costo, i clienti che ci aspettiamo e il punto in cui smettiamo.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {channels.map((c) => (
              <Card key={c.name} className="flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{c.name}</h3>
                  <Badge tone="brand">{c.lever}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted">{c.why}</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-surface-muted p-2"><div className="text-xs text-muted">Costo</div><div className="text-sm font-semibold">{formatEur(c.cost)}</div></div>
                  <div className="rounded-lg bg-surface-muted p-2"><div className="text-xs text-muted">Incontri</div><div className="text-sm font-semibold">{c.meetings}</div></div>
                  <div className="rounded-lg bg-surface-muted p-2"><div className="text-xs text-muted">Clienti</div><div className="text-sm font-semibold">{c.customers}</div></div>
                </div>
                <div className="mt-2 text-sm">CAC del canale: <span className="font-semibold">{formatEur(c.cost / c.customers)}</span></div>
                <p className="mt-3 rounded-lg border border-dashed border-border p-3 text-xs text-muted"><span className="font-medium text-foreground">Quando smettiamo: </span>{c.stop}</p>
              </Card>
            ))}
            <Card className="flex flex-col justify-center bg-background">
              <p className="text-sm text-muted">
                I {formatEur(sharedCost)} che restano (parere legale, casi misurati, riserva) servono a tutti i canali: per questo il CAC medio è {formatEur(cac)}.
                Le convenzioni hanno il CAC più basso: lì va la riserva, se le soglie tengono.
              </p>
            </Card>
          </div>

          <h3 className="mt-12 text-xl font-semibold">Le cinque leve</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {levers.map(({ icon: Icon, title, text, link }) => (
              <Card key={title}>
                <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand"><Icon className="size-4" /></span>
                <h4 className="mt-3 font-semibold">{title}</h4>
                <p className="mt-1 text-sm text-muted">{text}</p>
                {link && <Link href={link} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand">Vedi i contenuti <ArrowRight className="size-3.5" /></Link>}
              </Card>
            ))}
          </div>

          <h3 className="mt-12 text-xl font-semibold">Digitale e fisico parlano alla stessa persona</h3>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {journey.map((j, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-border p-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-semibold text-brand-foreground">{i + 1}</span>
                <span className="text-sm">{j}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="fondimpresa" eyebrow="La leva Fondimpresa" title="La formazione è già pagata: va solo spesa" intro={`A fine 2025 le aziende avevano lasciato ${formatNum(fund.unspentBillions)} miliardi di euro nei conti formazione di Fondimpresa, e i saldi non spesi scadono dopo ${fund.expiryYears} anni (manuale p. 4).`}>
          <div className="grid gap-4 lg:grid-cols-3">
            <Card>
              <h3 className="font-semibold">A chi parliamo</h3>
              <ul className="mt-3 space-y-3 text-sm">
                <li><span className="font-medium">Al responsabile del personale</span>, che sceglie e firma.</li>
                <li><span className="font-medium">All&apos;ente di formazione titolato</span>, che progetta il piano, lo presenta e lo rendiconta: è lui che fa pagare il fondo.</li>
                <li><span className="font-medium">Al consulente che gestisce il conto formazione</span>, che sa quanto c&apos;è e quando scade.</li>
              </ul>
            </Card>
            <Card>
              <h3 className="font-semibold">Con che cosa</h3>
              <ul className="mt-3 space-y-3 text-sm">
                <li><span className="font-medium">Una mail all&apos;ente</span>, qui sotto, pronta da mandare.</li>
                <li><span className="font-medium">Un post su LinkedIn</span> per l&apos;HR: il miliardo non speso (nella pagina Social).</li>
                <li><span className="font-medium">Un incontro di 20 minuti</span> a tre, HR, ente e noi, con la scheda del piano già scritta e un role play sul loro listino.</li>
              </ul>
            </Card>
            <Card>
              <h3 className="font-semibold">Quanto pesa il resto</h3>
              <ul className="mt-3 space-y-3 text-sm">
                <li><span className="font-medium">LinkedIn Ads: 4.000 €</span>, l&apos;8% del budget, solo per chi ha visto la demo e per gli inviti alle cene.</li>
                <li><span className="font-medium">Google Ads: 3.000 €</span>, solo sulle ricerche «formazione finanziata».</li>
                <li><span className="font-medium">Meta Ads: 0 €.</span> Il nostro compratore non c&apos;è, e la copertura comprata è in affitto (lezione 10).</li>
              </ul>
            </Card>
          </div>
          <Card className="mt-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">La mail all&apos;ente di formazione</h3>
              <Badge tone="brand">pronta da mandare</Badge>
            </div>
            <div className="mt-3 whitespace-pre-line rounded-lg bg-surface-muted p-4 text-sm leading-relaxed">
              {`Oggetto: Un modulo di role play per i vostri piani Fondimpresa, già pronto

Buongiorno [Nome],
nei piani che progettate per i vostri clienti c'è quasi sempre una parte su vendita o servizio clienti. È la più difficile da far praticare: in aula non si riesce a fare una simulazione a testa per cento persone.

Coach la fa con un avatar in video che fa il cliente, e un coach AI che dà il voto minuto per minuto. Il cliente carica il suo listino e il giorno dopo ognuno si allena.

Per voi: il modulo entra nel piano col vostro marchio, vi diamo la scheda del progetto già scritta e il 25% del primo anno su ogni cliente che portate.
Per il cliente: un pilota di ${pricing.pilotWeeks} settimane su ${pricing.seats} persone costa ${formatEur(pilotPrice)}, finanziabile col conto formazione.

Le va una chiamata di 20 minuti la settimana prossima? Le mostro un role play sul listino di un vostro cliente.

[Firma]`}
            </div>
          </Card>
        </Section>

        <Section id="calendario" eyebrow="In che ordine" title="Sei mesi, partendo da quando si scrivono i budget">
          <ol className="relative space-y-6 border-l border-border pl-6">
            {timeline.map((t) => (
              <li key={t.when} className="relative">
                <span className="absolute -left-[33px] grid size-5 place-items-center rounded-full bg-brand text-brand-foreground">
                  <CalendarDays className="size-3" />
                </span>
                <div className="font-semibold">{t.when}</div>
                <p className="mt-1 max-w-3xl text-sm text-muted">{t.what}</p>
              </li>
            ))}
          </ol>
          <Card className="mt-8 bg-background">
            <h3 className="font-semibold">I rischi che guardiamo</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><span className="font-medium">Posti comprati e non usati.</span> Per questo la metrica guida sono i posti attivi, e ogni pilota ha una data.</li>
              <li><span className="font-medium">AI Act.</span> I punteggi ai lavoratori sono ad alto rischio: parere legale prima del primo pilota.</li>
              <li><span className="font-medium">La pubblicità costa più di quanto rende.</span> LinkedIn verso una demo rende 0,58 € per euro: per questo è solo l&apos;8% del budget, con un punto di stop.</li>
            </ul>
          </Card>
        </Section>
      </div>

      <SiteFooter />
    </div>
  );
}
