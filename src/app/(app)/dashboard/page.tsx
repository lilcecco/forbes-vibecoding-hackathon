import { ExportButton } from "@/components/export-button";
import { Avatar, Badge, Card, PageHeader, Progress, ScorePill, formatDate, formatMinutes } from "@/components/ui";
import { COMPETENCIES, getMembers, getScenarios, getSessions, weekly } from "@/lib/data";
import { Clock, MessagesSquare, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const [members, sessions, scenarios] = await Promise.all([getMembers(), getSessions(), getScenarios()]);

  const totalMinutes = members.reduce((s, m) => s + m.practiceMinutes, 0);
  const totalRoleplays = members.reduce((s, m) => s + m.roleplays, 0);
  const avgScore = members.reduce((s, m) => s + m.avgScore, 0) / members.length;
  const ready = members.filter((m) => m.avgScore >= 4).length;

  // Media per competenza calcolata dalle sessioni
  const competencyAvg = COMPETENCIES.map((c) => {
    const vals = sessions.map((s) => s.competencyScores[c]).filter((v): v is number => v !== undefined);
    return { name: c, value: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0 };
  }).filter((c) => c.value > 0);

  const maxHours = Math.max(...weekly.map((w) => w.hours));
  const improvers = [...members].sort((a, b) => b.trend - a.trend).slice(0, 4);

  const kpis = [
    { label: "Tempo di pratica", value: formatMinutes(totalMinutes), icon: Clock, delta: "+18% vs mese scorso" },
    { label: "Role play completati", value: totalRoleplays, icon: MessagesSquare, delta: "+12 questa settimana" },
    { label: "Punteggio medio", value: avgScore.toFixed(1), icon: Star, delta: "+0,4 in 6 settimane" },
    { label: "Persone pronte", value: `${ready}/${members.length}`, icon: TrendingUp, delta: "punteggio ≥ 4" },
  ];

  return (
    <>
      <PageHeader
        title="Buongiorno, Elena"
        description="Chi migliora, mentre succede. I dati si aggiornano a fine di ogni sessione."
        action={<ExportButton members={members} />}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map(({ label, value, icon: Icon, delta }) => (
          <Card key={label} className="p-4">
            <div className="flex items-center justify-between text-sm text-muted">
              {label}
              <Icon className="size-4" />
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
            <div className="mt-1 text-xs text-success">{delta}</div>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Ore di pratica a settimana</h3>
            <Badge tone="brand">Squadra</Badge>
          </div>
          <div className="mt-6 flex h-44 items-end gap-3">
            {weekly.map((w) => (
              <div key={w.week} className="flex h-full flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium">{w.hours}h</span>
                <div className="flex w-full flex-1 items-end">
                  <div className="w-full rounded-t-md bg-brand/80" style={{ height: `${(w.hours / maxHours) * 100}%` }} />
                </div>
                <span className="text-xs text-muted">{w.week}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold">Competenze della squadra</h3>
          <ul className="mt-4 space-y-3">
            {competencyAvg.map((c) => (
              <li key={c.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{c.name}</span>
                  <span className="font-medium">{c.value.toFixed(1)}</span>
                </div>
                <Progress value={(c.value / 5) * 100} />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="font-semibold">Ultimi role play</h3>
          <ul className="mt-3 divide-y divide-border">
            {sessions.map((s) => {
              const m = members.find((x) => x.id === s.memberId);
              const sc = scenarios.find((x) => x.id === s.scenarioId);
              return (
                <li key={s.id}>
                  <Link href={`/report/${s.id}`} className="flex items-center gap-3 py-3 hover:opacity-80">
                    <Avatar name={m?.name ?? "?"} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{m?.name}</div>
                      <div className="truncate text-xs text-muted">{sc?.title} · {formatDate(s.date)}</div>
                    </div>
                    <ScorePill score={s.score} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <h3 className="font-semibold">Chi migliora di più</h3>
          <ul className="mt-3 space-y-3">
            {improvers.map((m) => (
              <li key={m.id} className="flex items-center gap-3">
                <Avatar name={m.name} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{m.name}</div>
                  <div className="text-xs text-muted">{m.area}</div>
                </div>
                <span className="text-sm font-medium text-success">+{m.trend.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
