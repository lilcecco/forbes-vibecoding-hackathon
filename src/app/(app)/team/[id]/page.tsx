import { AssignButton } from "@/components/assign-button";
import { CompetencyCompare, ScoreLine } from "@/components/charts";
import { PersonaPortrait } from "@/components/persona";
import { Avatar, Badge, Card, CardTitle, Delta, ScorePill, buttonClass, fmt1, formatDate, formatMinutes, mmss } from "@/components/ui";
import { READY_THRESHOLD, competencyAverages, expertNotes, getMember, getScenarios, getSessions, recommendScenario, scoreHistory } from "@/lib/data";
import clsx from "clsx";
import { ArrowLeft, Play, Quote } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getMember(id);
  if (!member) notFound();
  const [sessions, scenarios] = await Promise.all([getSessions(), getScenarios()]);

  const mine = sessions.filter((s) => s.memberId === member.id).sort((a, b) => b.date.localeCompare(a.date));
  const myAvg = competencyAverages(mine);
  const teamAvg = competencyAverages(sessions);
  const rows = myAvg.map((c, i) => ({ name: c.name, mine: c.value, team: teamAvg[i].value }));
  const weakest = myAvg.filter((c) => c.value !== null).sort((a, b) => (a.value ?? 0) - (b.value ?? 0))[0];
  const strongest = myAvg.filter((c) => c.value !== null).sort((a, b) => (b.value ?? 0) - (a.value ?? 0))[0];
  const next = recommendScenario(scenarios, weakest?.name, mine[0]?.scenarioId);
  const history = scoreHistory(member);
  const notes = expertNotes.filter((n) => n.author === member.name);
  const toGo = Math.max(0, READY_THRESHOLD - member.avgScore);

  const kpis = [
    { label: "Punteggio medio", value: fmt1(member.avgScore), unit: "/5", sub: <Delta value={member.trend} suffix="in 4 settimane" /> },
    { label: "Tempo di pratica", value: formatMinutes(member.practiceMinutes), sub: <>ultima attività {formatDate(member.lastActive)}</> },
    { label: "Role play", value: String(member.roleplays), sub: <>{mine.length} con il report del coach</> },
    {
      label: "Per il cliente vero",
      value: toGo === 0 ? "Pronta" : `−${fmt1(toGo)}`,
      sub: toGo === 0 ? <>sopra la soglia di {fmt1(READY_THRESHOLD)}</> : <>alla soglia di {fmt1(READY_THRESHOLD)}</>,
    },
  ];

  return (
    <>
      <Link href="/team" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="size-4" /> Team
      </Link>

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={member.name} className="size-14 text-base" />
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight">{member.name}</h2>
            <p className="text-[15px] text-muted">
              {member.role} · {member.area} · {member.level}
            </p>
          </div>
        </div>
        {next && <AssignButton scenario={next.title} size="md" variant="primary" />}
      </div>

      <Card className="grid grid-cols-2 p-0 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className={clsx(
              "p-4 md:p-5",
              i % 2 === 1 && "border-l border-border",
              i >= 2 && "border-t border-border lg:border-t-0",
              i === 2 && "lg:border-l",
            )}
          >
            <div className="text-sm text-muted">{k.label}</div>
            <div className="num mt-1 text-[28px] font-medium leading-tight tracking-tight">
              {k.value}
              {k.unit && <span className="text-base font-normal text-muted">{k.unit}</span>}
            </div>
            <div className="mt-1 text-sm text-muted">{k.sub}</div>
          </div>
        ))}
      </Card>

      <div className="mt-4 grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle aside="ultime 6 settimane">Andamento del punteggio</CardTitle>
          <div className="mt-4">
            <ScoreLine data={history} />
          </div>
          <p className="mt-1 text-sm text-muted">
            La linea tratteggiata è la soglia di {fmt1(READY_THRESHOLD)}: sopra si è pronti per il cliente vero.
          </p>
        </Card>

        <Card>
          <CardTitle aside="su 5">Competenze</CardTitle>
          <div className="mt-4">
            <CompetencyCompare rows={rows} />
          </div>
          <p className="mt-4 text-sm text-muted">
            {weakest && strongest
              ? `Il punto forte è ${strongest.name.toLowerCase()}, da allenare ${weakest.name.toLowerCase()}. Il segno verde è la media del team.`
              : "Ancora nessun role play valutato. Il segno verde è la media del team."}
          </p>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle aside={`${mine.length} report`}>Role play valutati</CardTitle>
          {mine.length === 0 ? (
            <p className="mt-3 text-[15px] text-muted">
              Nessun report del coach nelle ultime settimane. Assegna uno scenario per partire.
            </p>
          ) : (
            <ul className="mt-2">
              {mine.map((s) => {
                const sc = scenarios.find((x) => x.id === s.scenarioId);
                const tip = s.feedback.find((f) => f.kind === "migliora");
                return (
                  <li key={s.id} className="border-b border-rule last:border-0">
                    <Link href={`/report/${s.id}`} className="-mx-2 flex items-start gap-3 rounded-[var(--radius-control)] px-2 py-3 hover:bg-surface-muted">
                      <PersonaPortrait scenarioId={s.scenarioId} className="size-10 shrink-0 rounded-full" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="truncate text-sm font-medium">{sc?.title}</span>
                          <ScorePill score={s.score} />
                        </div>
                        <div className="num text-sm text-muted">
                          {formatDate(s.date)} · {mmss(s.durationSec)} · {sc?.persona}
                        </div>
                        {tip && (
                          <p className="mt-1.5 text-sm leading-snug">
                            <span className="text-muted">Da migliorare, {tip.competency.toLowerCase()}:</span> {tip.text}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <div className="space-y-4">
          {next && (
            <div className="overflow-hidden rounded-[var(--radius-card)] bg-brand">
              <div className="grid grid-cols-[96px_minmax(0,1fr)]">
                <PersonaPortrait scenarioId={next.id} className="h-full w-full" />
                <div className="p-4">
                  <div className="text-sm">Prossimo allenamento consigliato</div>
                  <h2 className="mt-0.5 text-lg font-semibold leading-tight">{next.title}</h2>
                  <p className="mt-1 text-sm">
                    {weakest ? `Allena ${weakest.name.toLowerCase()}.` : next.description} {next.minutes} minuti con {next.persona.split(",")[0]}.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 border-t border-soot/10 p-3">
                <Link href={`/roleplay/${next.id}`} className={clsx(buttonClass("primary"), "flex-1")}>
                  <Play className="size-4 fill-current" /> Prova lo scenario
                </Link>
              </div>
            </div>
          )}

          {notes.length > 0 && (
            <Card>
              <CardTitle aside={<Badge tone="brand">Esperta del team</Badge>}>Cosa insegna agli altri</CardTitle>
              <ul className="mt-3 space-y-3">
                {notes.map((n) => (
                  <li key={n.id} className="flex gap-2 text-[15px] leading-snug">
                    <Quote className="mt-0.5 size-4 shrink-0 text-muted" />
                    <div>
                      {n.text}
                      <div className="mt-1 text-sm text-muted">{formatDate(n.date)} · nelle lezioni del team</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
