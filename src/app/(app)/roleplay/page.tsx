import { Badge, Card, PageHeader } from "@/components/ui";
import { getScenarios } from "@/lib/data";
import { Clock, Play } from "lucide-react";
import Link from "next/link";

const difficultyTone = { Facile: "success", Media: "warning", Difficile: "danger" } as const;

export default async function RoleplayPage() {
  const scenarios = await getScenarios();
  const areas = [...new Set(scenarios.map((s) => s.area))];

  return (
    <>
      <PageHeader
        title="Role play"
        description="Allenati in video con un avatar che fa il cliente, il collega o il collaboratore. In privato."
      />

      {areas.map((area) => (
        <section key={area} className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">{area}</h3>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {scenarios
              .filter((s) => s.area === area)
              .map((s) => (
                <Card key={s.id} className="flex flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <Badge tone="brand">{s.personaRole}</Badge>
                    <Badge tone={difficultyTone[s.difficulty]}>{s.difficulty}</Badge>
                  </div>
                  <h4 className="mt-3 font-semibold">{s.title}</h4>
                  <p className="mt-1 text-sm text-muted">{s.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {s.competencies.map((c) => (
                      <Badge key={c}>{c}</Badge>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Clock className="size-3.5" /> {s.minutes} min · {s.persona}
                    </span>
                    <Link
                      href={`/roleplay/${s.id}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-brand-foreground hover:bg-brand/90"
                    >
                      <Play className="size-3.5" /> Inizia
                    </Link>
                  </div>
                </Card>
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
