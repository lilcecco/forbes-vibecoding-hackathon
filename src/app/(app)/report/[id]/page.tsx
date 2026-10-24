import { Avatar, Badge, Card, PageHeader, Progress } from "@/components/ui";
import { getMembers, getScenario, getSession } from "@/lib/data";
import { ArrowLeft, RotateCcw, ThumbsUp, Wrench } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession(id);
  if (!session) notFound();
  const [scenario, members] = await Promise.all([getScenario(session.scenarioId), getMembers()]);
  const member = members.find((m) => m.id === session.memberId);
  const minutes = `${Math.floor(session.durationSec / 60)}:${String(session.durationSec % 60).padStart(2, "0")}`;

  return (
    <>
      <Link href="/roleplay" className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="size-4" /> Role play
      </Link>
      <PageHeader
        title="Il voto del coach"
        description={`${scenario?.title} · ${minutes} min`}
        action={
          <Link
            href={`/roleplay/${session.scenarioId}`}
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90"
          >
            <RotateCcw className="size-4" /> Rifai il role play
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="flex flex-col items-center text-center">
          {member && (
            <div className="flex items-center gap-2 self-start">
              <Avatar name={member.name} />
              <div className="text-left text-sm">
                <div className="font-medium">{member.name}</div>
                <div className="text-xs text-muted">{member.role}</div>
              </div>
            </div>
          )}
          <div className="mt-6 text-6xl font-semibold tracking-tight text-brand">{session.score.toFixed(1)}</div>
          <div className="text-sm text-muted">su 5</div>
          <ul className="mt-6 w-full space-y-3 text-left">
            {Object.entries(session.competencyScores).map(([name, value]) => (
              <li key={name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{name}</span>
                  <span className="font-medium">{value.toFixed(1)}</span>
                </div>
                <Progress value={(value / 5) * 100} />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="font-semibold">Riscontro momento per momento</h3>
          <p className="text-sm text-muted">Ogni commento è legato al punto esatto della conversazione.</p>
          <ol className="relative mt-5 space-y-5 border-l border-border pl-6">
            {session.feedback.map((f, i) => (
              <li key={i} className="relative">
                <span
                  className={`absolute -left-[33px] grid size-5 place-items-center rounded-full ${f.kind === "positivo" ? "bg-success" : "bg-warning"} text-white`}
                >
                  {f.kind === "positivo" ? <ThumbsUp className="size-3" /> : <Wrench className="size-3" />}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-muted">{f.at}</span>
                  <Badge tone={f.kind === "positivo" ? "success" : "warning"}>{f.competency}</Badge>
                </div>
                <p className="mt-1 text-sm">{f.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-lg bg-brand-soft p-4 text-sm">
            <span className="font-semibold text-brand">Prossimo allenamento: </span>
            il coach ti propone «La chiamata per trattenere il cliente» per lavorare su Generare opzioni.
          </div>
        </Card>
      </div>
    </>
  );
}
