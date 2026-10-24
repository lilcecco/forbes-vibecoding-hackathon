import { CopyButton } from "@/components/copy-button";
import { CoachMark } from "@/components/logo";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { Badge, Card } from "@/components/ui";
import { VideoReel } from "@/components/video-reel";
import { carousel, plan, posts, printed, videos } from "@/lib/social";
import { QrCode } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coach — Contenuti social pronti da pubblicare",
  description: "Post LinkedIn, video verticali, un carosello e i materiali per le cene: pronti da usare.",
};

function PostHeader() {
  return (
    <div className="flex items-center gap-2">
      <CoachMark className="size-10" />
      <div>
        <div className="text-sm font-semibold">Coach</div>
        <div className="text-xs text-muted">Pagina LinkedIn · Formazione aziendale</div>
      </div>
    </div>
  );
}

export default function SocialPage() {
  return (
    <div className="bg-surface">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="pb-6 pt-10 md:pt-16">
          <Badge tone="brand">Contenuti social · pronti da pubblicare</Badge>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">Tre post e un video a settimana, su LinkedIn</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            È dove i responsabili del personale e i direttori commerciali leggono di lavoro. Pubblicano la pagina di Coach e i due fondatori;
            gli stessi video girano su YouTube Shorts. Niente Instagram e TikTok: il nostro compratore non sceglie lì la formazione.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {plan.map((p) => (
              <Card key={p.day}>
                <div className="text-xs font-semibold uppercase tracking-wider text-data">{p.day}</div>
                <div className="mt-1 font-semibold">{p.what}</div>
                <div className="mt-1 text-sm text-muted">Esempio: {p.example}</div>
              </Card>
            ))}
          </div>
        </div>

        <section className="border-t border-border py-12">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">I video</h2>
          <p className="mt-2 text-muted">Tocca un video per guardarlo. Sotto ci sono le scene per il montaggio e il testo del post.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {videos.map((v) => (
              <Card key={v.id} className="flex flex-col">
                <VideoReel scenes={v.scenes} />
                <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                <div className="text-xs text-muted">{v.format}</div>
                <p className="mt-2 text-sm">{v.hook}</p>
                <details className="mt-3 rounded-lg bg-surface-muted p-3 text-sm">
                  <summary className="cursor-pointer font-medium">Le scene, una per una</summary>
                  <ol className="mt-2 space-y-1.5">
                    {v.scenes.map((s, i) => (
                      <li key={i} className="text-muted">
                        <span className="font-mono text-xs text-foreground">{s.seconds}s</span> · {s.eyebrow ? `${s.eyebrow}: ` : ""}
                        <span className="text-foreground">{s.text}</span>
                        {s.sub ? ` ${s.sub}` : ""}
                      </li>
                    ))}
                  </ol>
                </details>
                <div className="mt-3 flex-1 whitespace-pre-line rounded-lg border border-border p-3 text-sm">{v.caption}</div>
                <div className="mt-3"><CopyButton text={v.caption} label="Copia il testo del post" /></div>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-12">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">I post</h2>
          <p className="mt-2 text-muted">Testo e immagine, come appaiono nel feed.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <Card key={p.id} className="flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <PostHeader />
                  <Badge>{p.day}</Badge>
                </div>
                <div className="mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed">{p.text}</div>
                <div className="mt-4 rounded-xl bg-soot p-6 text-white">
                  <div className="text-4xl font-semibold tracking-tight text-brand">{p.visual.big}</div>
                  <div className="mt-1 text-sm opacity-80">{p.visual.small}</div>
                </div>
                {p.source && <p className="mt-2 text-xs text-muted">Fonte: {p.source}</p>}
                <div className="mt-3"><CopyButton text={p.text} /></div>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-12">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Il carosello</h2>
          <p className="mt-2 text-muted">{carousel.title}: sette slide quadrate, si scorrono di lato.</p>
          <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 md:mx-0 md:px-0">
            <div className="grid aspect-square w-60 shrink-0 snap-start place-items-center rounded-2xl bg-brand p-6 text-center text-brand-foreground">
              <div className="text-2xl font-semibold leading-tight">{carousel.title}</div>
            </div>
            {carousel.slides.map((s, i) => (
              <div key={i} className="flex aspect-square w-60 shrink-0 snap-start flex-col justify-between rounded-2xl border border-border bg-background p-5">
                <span className="text-xs font-semibold text-data">{i + 1} di {carousel.slides.length}</span>
                <p className="text-lg font-semibold leading-snug">{s.quote}</p>
                <p className="text-sm text-muted">{s.why}</p>
              </div>
            ))}
            <div className="grid aspect-square w-60 shrink-0 snap-start place-items-center rounded-2xl bg-foreground p-6 text-center text-surface">
              <div className="text-lg font-semibold leading-snug">{carousel.cta}</div>
            </div>
          </div>
          <div className="mt-3">
            <CopyButton
              text={[carousel.title, ...carousel.slides.map((s, i) => `${i + 1}. ${s.quote} ${s.why}`), carousel.cta].join("\n\n")}
              label="Copia i testi delle slide"
            />
          </div>
        </section>

        <section className="border-t border-border py-12">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Per le cene e gli eventi</h2>
          <p className="mt-2 text-muted">Il fisico porta allo stesso posto del digitale: il codice apre il role play dal telefono.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {printed.map((m) => (
              <Card key={m.title}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold">{m.title}</h3>
                  <Badge>{m.format}</Badge>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="flex min-h-40 flex-col justify-between rounded-xl bg-brand p-4 text-brand-foreground">
                    <span className="text-xs opacity-70">Fronte</span>
                    <p className="text-lg font-semibold leading-snug">{m.front}</p>
                  </div>
                  <div className="flex min-h-40 flex-col justify-between rounded-xl border border-border p-4">
                    <span className="text-xs text-muted">Retro</span>
                    <p className="text-sm">{m.back}</p>
                    <QrCode className="size-10 text-foreground" aria-label="Codice QR che apre il role play" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
