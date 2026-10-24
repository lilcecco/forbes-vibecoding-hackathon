import { Heart, MessageCircle, Play, Repeat2 } from "lucide-react";
import { CoachMark } from "../logo";
import { PersonaPortrait } from "../persona";

// Le cinque copertine della campagna: reel, post LinkedIn, carosello, reel, post.
// Sono costruite con gli stessi scenari della demo, nel formato in cui escono.
export function SocialWall() {
  return (
    <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0">
      {/* 1 · Reel: il cliente che chiede lo sconto */}
      <li className="w-[64vw] flex-none snap-start md:w-auto">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[var(--radius-card)] bg-soot text-white">
          <PersonaPortrait scenarioId="s1" className="absolute inset-0 h-full w-full object-cover" label="Roberto" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 text-xs">
            <span className="num rounded-full bg-soot/80 px-2 py-1">0:30</span>
            <span className="rounded-full bg-soot/80 px-2 py-1">Reel</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-soot/90 p-4">
            <p className="text-[22px] font-semibold leading-[1.05] tracking-tight">«Voglio il 15% di sconto.»</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-brand">
              <Play className="size-3.5 fill-current" /> Tu cosa rispondi?
            </p>
          </div>
        </div>
        <Caption kind="Reel 9:16 · Instagram" text="Tre risposte sullo schermo, il coach dà il voto alla fine." />
      </li>

      {/* 2 · Post LinkedIn: il voto di Marco */}
      <li className="w-[64vw] flex-none snap-start md:w-auto">
        <div className="flex aspect-[9/16] flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white text-soot">
          <div className="flex items-center gap-2 p-3">
            <CoachMark className="size-8" />
            <div className="min-w-0 leading-tight">
              <div className="text-sm font-semibold">Coach</div>
              <div className="text-xs text-muted">Sponsorizzato</div>
            </div>
          </div>
          <p className="px-3 text-[13px] leading-snug">Il tuo venditore migliore non regala lo sconto al primo no. Gli altri sì.</p>
          <div className="m-3 flex flex-1 flex-col justify-between rounded-[var(--radius-control)] bg-brand p-4">
            <span className="text-xs font-medium">Il report di Marco</span>
            <div>
              <div className="num text-[56px] font-semibold leading-none tracking-[-0.04em]">
                4,2<span className="text-base font-normal tracking-normal">/5</span>
              </div>
              <p className="mt-2 text-[13px] leading-snug">Al minuto 03:40 ha scoperto che al cliente interessa la rata.</p>
            </div>
          </div>
          <div className="num flex items-center gap-4 border-t border-border px-3 py-2.5 text-xs text-muted">
            <span className="flex items-center gap-1"><Heart className="size-3.5" /> 128</span>
            <span className="flex items-center gap-1"><MessageCircle className="size-3.5" /> 14</span>
            <span className="flex items-center gap-1"><Repeat2 className="size-3.5" /> 9</span>
          </div>
        </div>
        <Caption kind="Post LinkedIn" text="Per direttori HR e vendite: il voto al minuto esatto." />
      </li>

      {/* 3 · Carosello: dall'aula alla telefonata */}
      <li className="w-[64vw] flex-none snap-start md:w-auto">
        <div className="relative aspect-[9/16]">
          <div className="absolute inset-0 translate-x-2 -translate-y-2 rounded-[var(--radius-card)] bg-[#bfe86c]" aria-hidden />
          <div className="absolute inset-0 flex flex-col rounded-[var(--radius-card)] bg-brand p-4 text-soot">
            <span className="num text-xs font-medium">1 / 5</span>
            <p className="mt-auto text-[26px] font-semibold leading-[1.05] tracking-tight">La formazione in aula finisce il venerdì.</p>
            <p className="mt-3 text-sm">Il cliente chiama il lunedì.</p>
            <div className="mt-5 flex gap-1.5" aria-hidden>
              {[0, 1, 2, 3, 4].map((d) => (
                <span key={d} className={d === 0 ? "h-1.5 w-5 rounded-full bg-soot" : "size-1.5 rounded-full bg-soot/30"} />
              ))}
            </div>
          </div>
        </div>
        <Caption kind="Carosello · 5 slide" text="Carica il listino, nasce la lezione, ti alleni, il coach ti corregge." />
      </li>

      {/* 4 · Reel: il cliente arrabbiato, due risposte a confronto */}
      <li className="w-[64vw] flex-none snap-start md:w-auto">
        <div className="relative flex aspect-[9/16] flex-col overflow-hidden rounded-[var(--radius-card)] bg-soot-2 text-white">
          <PersonaPortrait scenarioId="s3" className="h-[48%] w-full object-cover" label="Franco" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 text-xs">
            <span className="num rounded-full bg-soot/80 px-2 py-1">0:24</span>
            <span className="rounded-full bg-soot/80 px-2 py-1">Reel</span>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-3">
            <p className="text-[15px] font-semibold leading-tight">«Sono tre settimane che aspetto!»</p>
            <div className="mt-auto rounded-[var(--radius-control)] bg-soot-3 p-2.5 text-[13px] leading-snug">
              «Si calmi.» <span className="num float-right font-semibold text-[#ff8a80]">1,6</span>
            </div>
            <div className="rounded-[var(--radius-control)] bg-brand p-2.5 text-[13px] leading-snug text-soot">
              «Ha ragione, sono troppe.» <span className="num float-right font-semibold">4,7</span>
            </div>
          </div>
        </div>
        <Caption kind="Reel 9:16 · TikTok" text="Stessa frase del cliente, due risposte, due voti." />
      </li>

      {/* 5 · Post: il numero da citare */}
      <li className="w-[64vw] flex-none snap-start md:w-auto">
        <div className="flex aspect-[9/16] flex-col rounded-[var(--radius-card)] bg-surface-muted p-4 text-soot">
          <span className="text-xs font-medium">Il consiglio del coach</span>
          <p className="mt-6 text-[15px] leading-snug text-muted line-through decoration-danger decoration-2">«Il listino è questo, purtroppo.»</p>
          <p className="mt-3 text-[17px] font-medium leading-snug">
            <mark className="rounded bg-brand px-1">«Nella sua zona i sinistri sono cresciuti dell&apos;8%.»</mark>
          </p>
          <div className="num mt-auto text-[64px] font-semibold leading-none tracking-[-0.04em]">+8%</div>
          <p className="mt-2 text-[13px] leading-snug">Un numero vale più di uno sconto.</p>
        </div>
        <Caption kind="Post Instagram e LinkedIn" text="La frase sbagliata, la frase giusta, il dato del listino." />
      </li>
    </ul>
  );
}

function Caption({ kind, text }: { kind: string; text: string }) {
  return (
    <div className="mt-3">
      <div className="text-[15px] font-semibold">{kind}</div>
      <p className="mt-0.5 text-sm leading-snug text-muted">{text}</p>
    </div>
  );
}
