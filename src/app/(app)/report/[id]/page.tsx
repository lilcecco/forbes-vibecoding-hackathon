import { PersonaPortrait } from "@/components/persona";
import { ReportTimeline } from "@/components/report-timeline";
import { Avatar, Card, CardTitle, buttonClass, fmt1, formatDate, mmss } from "@/components/ui";
import { getMembers, getScenario, getScenarios, getSession, getSessions, recommendScenario } from "@/lib/data";
import clsx from "clsx";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const verdict = (s: number) => (s >= 4 ? "Pronto per il cliente vero" : s >= 3 ? "Sulla buona strada" : "Da riallenare");

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession(id);
  if (!session) notFound();
  const [scenario, members, scenarios, sessions] = await Promise.all([getScenario(session.scenarioId), getMembers(), getScenarios(), getSessions()]);
  const member = members.find((m) => m.id === session.memberId);
  const scores = Object.entries(session.competencyScores).sort((a, b) => b[1] - a[1]);
  const weakest = scores[scores.length - 1];
  const next = recommendScenario(scenarios, weakest?.[0], session.scenarioId);
  const sameScenario = sessions.filter((s) => s.scenarioId === session.scenarioId);
  const teamAvg = sameScenario.reduce((s, x) => s + x.score, 0) / sameScenario.length;
  const firstGood = session.feedback.find((f) => f.kind === "positivo");
  const ring = 2 * Math.PI * 52;

  return (
    <>
      <Link href="/roleplay" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="size-4" /> Role play
      </Link>

      <div className="grid items-start gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-3">
              {member && <Avatar name={member.name} />}
              <div className="min-w-0 text-sm">
                <div className="truncate font-medium">{member?.name}</div>
                <div className="truncate text-muted">
                  {scenario?.title} · {formatDate(session.date)} · {mmss(session.durationSec)}
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-5">
              <svg viewBox="0 0 120 120" className="size-28 shrink-0" role="img" aria-label={`Voto ${fmt1(session.score)} su 5`}>
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--surface-muted)" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="var(--data)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(session.score / 5) * ring} ${ring}`}
                  transform="rotate(-90 60 60)"
                />
                <text x="60" y="66" textAnchor="middle" fontSize="30" fontWeight="600" fill="var(--foreground)">
                  {fmt1(session.score)}
                </text>
                <text x="60" y="86" textAnchor="middle" fontSize="12" fill="var(--muted)">
                  su 5
                </text>
              </svg>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{verdict(session.score)}</h2>
                {sameScenario.length > 1 && (
                  <p className="num mt-1 text-sm text-muted">Media del team in questo scenario: {fmt1(teamAvg)}</p>
                )}
              </div>
            </div>
            {firstGood && <p className="mt-4 text-[15px] leading-snug">{firstGood.text}</p>}
          </Card>

          <Card>
            <CardTitle aside="su 5">Per competenza</CardTitle>
            <ul className="mt-4 space-y-3.5">
              {scores.map(([name, value]) => (
                <li key={name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{name}</span>
                    <span className={clsx("num font-semibold", name === weakest?.[0] && "text-danger")}>{fmt1(value)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-muted">
                    <div className={clsx("h-full rounded-full", name === weakest?.[0] ? "bg-danger" : "bg-soot")} style={{ width: `${(value / 5) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {next && (
            <div className="overflow-hidden rounded-[var(--radius-card)] bg-brand">
              <div className="grid grid-cols-[96px_minmax(0,1fr)]">
                <PersonaPortrait scenarioId={next.id} className="h-full w-full" />
                <div className="p-4">
                  <div className="text-sm">Prossimo allenamento</div>
                  <h2 className="mt-0.5 text-lg font-semibold leading-tight">{next.title}</h2>
                  <p className="mt-1 text-sm">Allena {weakest?.[0].toLowerCase()}, il tuo punto più debole qui.</p>
                </div>
              </div>
              <div className="flex gap-2 border-t border-soot/10 p-3">
                <Link href={`/roleplay/${next.id}`} className={clsx(buttonClass("primary"), "flex-1")}>
                  <Play className="size-4 fill-current" /> Inizia
                </Link>
                <Link href={`/roleplay/${session.scenarioId}`} className={clsx(buttonClass("secondary"), "flex-1 border-soot/20 bg-transparent hover:bg-white/40")}>
                  <RotateCcw className="size-4" /> Rifai il role play
                </Link>
              </div>
            </div>
          )}
        </div>

        <ReportTimeline feedback={session.feedback} durationSec={session.durationSec} personaName={scenario?.persona ?? ""} />
      </div>
    </>
  );
}
