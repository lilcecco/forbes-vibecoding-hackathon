import { Heart, MessageCircle, Play, Repeat2 } from "lucide-react";
import { CoachMark } from "../logo";
import { PersonaPortrait } from "../persona";

// Le cinque uscite della campagna LinkedIn: 2 video verticali e 3 post, dalla strategia di go to market.
// Instagram e TikTok sono esclusi apposta: il direttore commerciale non decide lì.
export function SocialWall() {
  return (
    <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0">
      {/* Video 1 · Tu cosa rispondi? */}
      <li className="w-[64vw] flex-none snap-start md:w-auto">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[var(--radius-card)] bg-soot text-white">
          <PersonaPortrait scenarioId="s1" className="absolute inset-0 h-full w-full" label="Il cliente AI" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 text-xs">
            <span className="num rounded-full bg-soot/80 px-2 py-1">0:30</span>
            <span className="rounded-full bg-soot/80 px-2 py-1">Video</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-soot/90 p-4">
            <p className="text-[15px] leading-snug">«Il vostro concorrente mi fa il 15% in meno. Perché dovrei rinnovare?»</p>
            <p className="mt-2 flex items-center gap-1.5 text-[17px] font-semibold uppercase tracking-tight text-brand">
              <Play className="size-3.5 fill-current" /> Tu cosa rispondi?
            </p>
          </div>
        </div>
        <Caption kind="Video 1 · verticale 30 s" text="Il venditore risponde, l'avatar insiste, poi il voto. «Allenati sul cliente finto. Vinci con quello vero.»" />
      </li>

      {/* Post 1 · per il direttore commerciale */}
      <li className="w-[64vw] flex-none snap-start md:w-auto">
        <div className="flex aspect-[9/16] flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white text-soot">
          <div className="flex items-center gap-2 p-3">
            <CoachMark className="size-8" />
            <div className="min-w-0 leading-tight">
              <div className="text-sm font-semibold">Coach</div>
              <div className="text-xs text-muted">Sponsorizzato</div>
            </div>
          </div>
          <p className="px-3 text-[13px] leading-snug">Il tuo miglior venditore ha imparato a gestire lo sconto al rinnovo perdendo i primi dieci clienti.</p>
          <div className="m-3 flex flex-1 flex-col justify-end rounded-[var(--radius-control)] bg-brand p-4">
            <p className="text-[22px] font-semibold leading-[1.1] tracking-tight">E se avesse potuto sbagliare con un cliente finto?</p>
            <p className="mt-3 text-[13px]">Demo di 15 minuti →</p>
          </div>
          <div className="num flex items-center gap-4 border-t border-border px-3 py-2.5 text-xs text-muted">
            <span className="flex items-center gap-1"><Heart className="size-3.5" /> 128</span>
            <span className="flex items-center gap-1"><MessageCircle className="size-3.5" /> 14</span>
            <span className="flex items-center gap-1"><Repeat2 className="size-3.5" /> 9</span>
          </div>
        </div>
        <Caption kind="Post 1 · direttore commerciale" text="L'errore fatto sul cliente vero, e quello fatto sul cliente finto." />
      </li>

      {/* Post 3 · il dato */}
      <li className="w-[64vw] flex-none snap-start md:w-auto">
        <div className="flex aspect-[9/16] flex-col rounded-[var(--radius-card)] bg-soot-2 p-4 text-white">
          <span className="text-xs text-on-soot-muted">Una squadra vendite, una settimana</span>
          <dl className="mt-auto space-y-4">
            <div>
              <dd className="num text-[40px] font-semibold leading-none tracking-tight text-brand">3h 20m</dd>
              <dt className="mt-1 text-[13px] text-on-soot-muted">di pratica</dt>
            </div>
            <div>
              <dd className="num text-[40px] font-semibold leading-none tracking-tight">11</dd>
              <dt className="mt-1 text-[13px] text-on-soot-muted">role play</dt>
            </div>
            <div>
              <dd className="num text-[40px] font-semibold leading-none tracking-tight">4,2<span className="text-base font-normal">/5</span></dd>
              <dt className="mt-1 text-[13px] text-on-soot-muted">in «argomentare con i dati»</dt>
            </div>
          </dl>
          <p className="mt-5 text-[13px] leading-snug">In aula non avresti saputo nessuno di questi numeri.</p>
        </div>
        <Caption kind="Post 3 · il dato" text="Tre numeri di una settimana vera, senza commento." />
      </li>

      {/* Post 2 · per HR e formazione */}
      <li className="w-[64vw] flex-none snap-start md:w-auto">
        <div className="flex aspect-[9/16] flex-col rounded-[var(--radius-card)] bg-surface-muted p-4 text-soot">
          <span className="text-xs font-medium">Per HR e formazione</span>
          <p className="mt-6 text-[15px] leading-snug text-muted">Ogni anno la tua azienda investe nella formazione dei dipendenti.</p>
          <p className="mt-auto text-[28px] font-semibold leading-[1.05] tracking-tight">Quella formazione, la stai misurando?</p>
          <div data-ui className="mt-4 space-y-1.5 rounded-[var(--radius-control)] bg-white p-3 text-[12px]">
            {[["Ore di pratica", 78], ["Role play fatti", 62], ["Progressi", 54]].map(([l, w]) => (
              <div key={l as string}>
                <div className="flex justify-between"><span>{l}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-surface-muted"><div className="h-full rounded-full bg-data" style={{ width: `${w}%` }} /></div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px]">Scopri come finanziarla con Fondimpresa →</p>
        </div>
        <Caption kind="Post 2 · HR e formazione" text="Ore, role play e progressi per persona e squadra, esportabili in Excel." />
      </li>

      {/* Video 2 · Aula contro Coach */}
      <li className="w-[64vw] flex-none snap-start md:w-auto">
        <div className="relative grid aspect-[9/16] grid-rows-[auto_1fr] overflow-hidden rounded-[var(--radius-card)] bg-soot text-white">
          <div className="grid grid-cols-2 text-center text-xs font-medium">
            <span className="bg-soot-3 py-2">Aula</span>
            <span className="bg-brand py-2 text-soot">Coach</span>
          </div>
          <ul className="grid grid-rows-3 text-[13px] leading-snug">
            {[
              ["Una volta l'anno.", "Ogni volta che serve."],
              ["Non sai chi ha capito.", "Lo vedi in tempo reale."],
              ["La paghi a parte.", "Con Fondimpresa."],
            ].map(([a, b]) => (
              <li key={a} className="grid grid-cols-2 border-t border-soot-3">
                <span className="flex items-center p-2.5 text-on-soot-muted">{a}</span>
                <span className="flex items-center bg-soot-2 p-2.5 font-medium">{b}</span>
              </li>
            ))}
          </ul>
          <span className="num absolute bottom-3 right-3 rounded-full bg-soot/80 px-2 py-1 text-xs">0:30</span>
        </div>
        <Caption kind="Video 2 · Aula contro Coach" text="Schermo diviso, tre confronti, chiusura «Prenota una demo»." />
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
