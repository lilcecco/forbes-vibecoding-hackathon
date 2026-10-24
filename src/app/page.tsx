import { Logo } from "@/components/logo";
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
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Logo />
        <Link href="/dashboard" className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90">
          Prova la demo
        </Link>
      </header>

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
        <div className="mx-auto max-w-md px-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Un prezzo semplice</h2>
          <div className="mt-8 rounded-2xl border border-border bg-surface p-8">
            <div className="text-5xl font-semibold">19 €</div>
            <div className="text-sm text-muted">per dipendente al mese · fatturazione annuale</div>
            <ul className="mt-6 space-y-2 text-left text-sm">
              {["Lezioni e role play illimitati", "Dashboard per HR e manager", "Esportazione in Excel", "Supporto per la pratica Fondimpresa"].map((f) => (
                <li key={f} className="flex items-center gap-2"><Check className="size-4 text-success" /> {f}</li>
              ))}
            </ul>
            <Link href="/dashboard" className="mt-6 block rounded-lg bg-brand px-5 py-3 font-medium text-brand-foreground hover:bg-brand/90">
              Prova gratis per 14 giorni
            </Link>
            <p className="mt-3 text-xs text-muted">Prezzo indicativo (ipotesi)</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        Coach · Vibecoding Hackathon Next Leaders × Forbes · 2026
      </footer>
    </div>
  );
}
