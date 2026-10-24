"use client";

import clsx from "clsx";
import { Mic, MicOff, PhoneOff, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Scenario } from "@/lib/types";
import { Badge, Button, Card } from "./ui";

// Copione demo: l'avatar "parla" e la trascrizione scorre come in una chiamata vera
const SCRIPT: { from: "avatar" | "tu"; text: string }[] = [
  { from: "avatar", text: "Buongiorno. Ho visto il rinnovo: 640 euro, l'anno scorso erano 590. Così non ci siamo." },
  { from: "tu", text: "Capisco, un aumento di 50 euro non fa piacere. Posso spiegarle da dove arriva?" },
  { from: "avatar", text: "Me lo spieghi pure, ma io voglio il 15% di sconto, altrimenti vado altrove." },
  { from: "tu", text: "Nella sua zona i sinistri per allagamento sono cresciuti dell'8%. Per lei conta più il totale o la rata mensile?" },
  { from: "avatar", text: "Beh… la rata. A fine mese è quella che pesa." },
  { from: "tu", text: "Allora le propongo due strade: franchigia più alta o pagamento mensile senza costi. Quale preferisce?" },
];

export function RoleplayRoom({ scenario }: { scenario: Scenario }) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [lines, setLines] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (lines >= SCRIPT.length) return;
    const t = setTimeout(() => setLines((l) => l + 1), 3500);
    return () => clearTimeout(t);
  }, [lines]);

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const avatarSpeaking = SCRIPT[lines - 1]?.from === "avatar";
  const covered = Math.min(scenario.competencies.length, Math.floor(lines / 2));

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-950">
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3">
              <div
                className={clsx(
                  "grid size-28 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-orange-300 text-3xl font-semibold text-slate-800 transition-shadow md:size-36",
                  avatarSpeaking && "shadow-[0_0_0_10px_rgba(255,255,255,0.12)]",
                )}
              >
                {scenario.persona.charAt(0)}
              </div>
              <div className="text-sm text-white/90">{scenario.persona}</div>
            </div>
          </div>
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge tone="danger">● REC</Badge>
            <span className="rounded-full bg-black/40 px-2 py-0.5 font-mono text-xs text-white">{mmss}</span>
          </div>
          <div className="absolute right-3 top-3 grid h-16 w-24 place-items-center rounded-lg border border-white/20 bg-slate-700 text-xs text-white/70 md:h-24 md:w-36">
            <Video className="size-5" />
            Tu
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <Button variant="secondary" onClick={() => setMuted((m) => !m)} aria-label="Microfono">
            {muted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
            {muted ? "Microfono spento" : "Microfono"}
          </Button>
          <Button className="bg-danger hover:bg-danger/90" onClick={() => router.push("/report/r1")}>
            <PhoneOff className="size-4" /> Termina e ricevi il voto
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{scenario.title}</h3>
            <span className="text-xs text-muted">{covered} di {scenario.competencies.length}</span>
          </div>
          <ul className="mt-3 space-y-2">
            {scenario.competencies.map((c, i) => (
              <li key={c} className="flex items-center gap-2 text-sm">
                <span className={clsx("size-2 rounded-full", i < covered ? "bg-success" : "bg-border")} />
                <span className={i < covered ? "" : "text-muted"}>{c}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="max-h-80 overflow-y-auto">
          <h3 className="mb-3 font-semibold">Trascrizione</h3>
          <div className="space-y-2">
            {SCRIPT.slice(0, lines).map((l, i) => (
              <div key={i} className={clsx("rounded-lg px-3 py-2 text-sm", l.from === "tu" ? "bg-brand-soft" : "bg-surface-muted")}>
                <div className="mb-0.5 text-xs font-medium text-muted">{l.from === "tu" ? "Tu" : scenario.persona.split(",")[0]}</div>
                {l.text}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
