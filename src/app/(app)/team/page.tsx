import { ExportButton } from "@/components/export-button";
import { Avatar, Badge, Card, Delta, PageHeader, ScorePill, fmt1, formatDate, formatMinutes } from "@/components/ui";
import { READY_THRESHOLD, getMembers } from "@/lib/data";
import type { Area } from "@/lib/types";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const AREAS: Area[] = ["Vendite", "Servizio clienti", "Manager", "Neoassunti"];

// Stato di una persona: pronta per il cliente vero, in calo, o in allenamento
const status = (score: number, trend: number) =>
  score >= READY_THRESHOLD
    ? { label: "Pronta", tone: "success" as const }
    : trend < 0
      ? { label: "Da seguire", tone: "danger" as const }
      : { label: "In allenamento", tone: "neutral" as const };

export default async function TeamPage() {
  const members = await getMembers();
  const sorted = [...members].sort((a, b) => b.avgScore - a.avgScore);
  const ready = members.filter((m) => m.avgScore >= READY_THRESHOLD).length;
  const falling = members.filter((m) => m.trend < 0).length;

  // Una riga per area: persone, media e pratica
  const areas = AREAS.map((area) => {
    const list = members.filter((m) => m.area === area);
    return {
      area,
      count: list.length,
      avg: list.length ? list.reduce((s, m) => s + m.avgScore, 0) / list.length : 0,
      minutes: list.reduce((s, m) => s + m.practiceMinutes, 0),
    };
  }).filter((a) => a.count > 0);

  return (
    <>
      <PageHeader
        description={
          <>
            {members.length} persone, <b className="font-medium text-foreground">{ready} pronte</b> per il cliente vero, {falling} in calo. Tocca una persona
            per il suo percorso.
          </>
        }
        action={<ExportButton members={members} />}
      />

      <Card className="grid grid-cols-2 p-0 lg:grid-cols-4">
        {areas.map((a, i) => (
          <div
            key={a.area}
            className={clsx(
              "p-4 md:p-5",
              i % 2 === 1 && "border-l border-border",
              i >= 2 && "border-t border-border lg:border-t-0",
              i === 2 && "lg:border-l",
            )}
          >
            <div className="text-sm text-muted">{a.area}</div>
            <div className="num mt-1 text-[28px] font-medium leading-tight tracking-tight">
              {fmt1(a.avg)}
              <span className="text-base font-normal text-muted">/5</span>
            </div>
            <div className="num mt-1 text-sm text-muted">
              {a.count} {a.count === 1 ? "persona" : "persone"} · {formatMinutes(a.minutes)}
            </div>
          </div>
        ))}
      </Card>

      {/* Telefono: una riga per persona */}
      <Card className="mt-4 p-0 md:hidden">
        <ul className="divide-y divide-rule">
          {sorted.map((m) => {
            const st = status(m.avgScore, m.trend);
            return (
              <li key={m.id}>
                <Link href={`/team/${m.id}`} className="flex items-center gap-3 px-4 py-3 active:bg-surface-muted">
                  <Avatar name={m.name} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{m.name}</div>
                    <div className="truncate text-sm text-muted">
                      {m.role} · <Delta value={m.trend} />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <ScorePill score={m.avgScore} />
                    <Badge tone={st.tone}>{st.label}</Badge>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* Desktop: tabella completa */}
      <Card className="mt-4 hidden overflow-x-auto p-0 md:block">
        <table className="w-full min-w-[820px] whitespace-nowrap text-sm">
          <thead className="border-b border-border text-left text-muted">
            <tr>
              <th className="py-3 pl-5 pr-3 font-medium">Persona</th>
              <th className="px-3 py-3 font-medium">Area</th>
              <th className="px-3 py-3 font-medium">Livello</th>
              <th className="px-3 py-3 text-right font-medium">Pratica</th>
              <th className="px-3 py-3 text-right font-medium">Role play</th>
              <th className="px-3 py-3 font-medium">Punteggio</th>
              <th className="px-3 py-3 font-medium">4 settimane</th>
              <th className="px-3 py-3 font-medium">Stato</th>
              <th className="px-3 py-3 font-medium">Ultima attività</th>
              <th className="w-8" aria-hidden />
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {sorted.map((m) => {
              const st = status(m.avgScore, m.trend);
              return (
                <tr key={m.id} className="group relative hover:bg-surface-muted/60">
                  <td className="px-3 py-3">
                    <Link href={`/team/${m.id}`} className="flex items-center gap-3 after:absolute after:inset-0">
                      <Avatar name={m.name} />
                      <div>
                        <div className="font-medium group-hover:underline">{m.name}</div>
                        <div className="text-muted">{m.role}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-3 py-3">{m.area}</td>
                  <td className="px-3 py-3 text-muted">{m.level}</td>
                  <td className="num px-3 py-3 text-right">{formatMinutes(m.practiceMinutes)}</td>
                  <td className="num px-3 py-3 text-right">{m.roleplays}</td>
                  <td className="px-3 py-3"><ScorePill score={m.avgScore} /></td>
                  <td className="px-3 py-3"><Delta value={m.trend} /></td>
                  <td className="px-3 py-3"><Badge tone={st.tone}>{st.label}</Badge></td>
                  <td className="px-3 py-3 text-muted">{formatDate(m.lastActive)}</td>
                  <td className="pr-4 text-muted"><ChevronRight className="size-4" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <p className="mt-3 text-sm text-muted">Pronta: media dei voti del coach da {fmt1(READY_THRESHOLD)} in su. Da seguire: sotto la soglia e in calo nelle ultime 4 settimane.</p>
    </>
  );
}
