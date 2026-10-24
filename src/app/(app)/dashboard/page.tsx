import { AssignButton } from "@/components/assign-button";
import { ReadinessStrip, WeeklyChart } from "@/components/charts";
import { ExportButton } from "@/components/export-button";
import { Avatar, Card, CardTitle, Delta, PageHeader, ScorePill, fmt1, formatDate, formatMinutes } from "@/components/ui";
import { READY_THRESHOLD, competencyAverages, getMembers, getScenarios, getSessions, recommendScenario, weekly } from "@/lib/data";
import clsx from "clsx";
import Link from "next/link";

export default async function DashboardPage() {
  const [members, sessions, scenarios] = await Promise.all([getMembers(), getSessions(), getScenarios()]);

  const totalMinutes = members.reduce((s, m) => s + m.practiceMinutes, 0);
  const totalRoleplays = members.reduce((s, m) => s + m.roleplays, 0);
  const avgScore = members.reduce((s, m) => s + m.avgScore, 0) / members.length;
  const ready = members.filter((m) => m.avgScore >= READY_THRESHOLD).length;

  // Controllo: le settimane sommano ai totali delle persone
  console.assert(weekly.reduce((s, w) => s + w.minutes, 0) === totalMinutes, "minuti settimanali ≠ totale");
  console.assert(weekly.reduce((s, w) => s + w.roleplays, 0) === totalRoleplays, "role play settimanali ≠ totale");

  const [prev, cur] = weekly.slice(-2);
  const first = weekly[0];

  const competencies = competencyAverages(sessions).filter((c) => c.value !== null) as { name: string; value: number }[];
  const weakestTeam = [...competencies].sort((a, b) => a.value - b.value)[0];

  const weakestOf = (memberId: string) => {
    const mine = competencyAverages(sessions.filter((s) => s.memberId === memberId)).filter((c) => c.value !== null);
    return mine.sort((a, b) => (a.value ?? 0) - (b.value ?? 0))[0];
  };

  const falling = members.filter((m) => m.trend < 0).sort((a, b) => a.trend - b.trend);
  const improvers = [...members].filter((m) => m.trend > 0).sort((a, b) => b.trend - a.trend).slice(0, 3);
  const latest = [...sessions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const worst = falling[0];
  const worstWeak = worst && weakestOf(worst.id);

  const kpis = [
    { label: "Tempo di pratica", value: formatMinutes(totalMinutes), sub: <>+{cur.minutes - prev.minutes} m nella {cur.week} rispetto alla {prev.week}</> },
    { label: "Role play completati", value: String(totalRoleplays), sub: <>{cur.roleplays} nella {cur.week}, {prev.roleplays} nella {prev.week}</> },
    { label: "Punteggio medio", value: fmt1(avgScore), unit: "/5", sub: <Delta value={Math.round((cur.score - first.score) * 10) / 10} suffix={`dalla ${first.week}`} /> },
    { label: "Persone pronte", value: String(ready), unit: `/${members.length}`, sub: <>punteggio da {fmt1(READY_THRESHOLD)} in su</> },
  ];

  return (
    <>
      <PageHeader
        description={
          worst ? (
            <>
              Ultime 6 settimane, {members.length} persone. <b className="font-medium text-foreground">{worst.name}</b> è sceso di{" "}
              {fmt1(Math.abs(worst.trend))} in 4 settimane{worstWeak?.value != null && <> · {worstWeak.name.toLowerCase()} {fmt1(worstWeak.value)}</>}.
            </>
          ) : (
            `Ultime 6 settimane, ${members.length} persone.`
          )
        }
        action={<ExportButton members={members} />}
      />

      {/* KPI: un solo contenitore diviso in quattro */}
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

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <WeeklyChart data={weekly} />
        </Card>
        <Card>
          <ReadinessStrip people={members} threshold={READY_THRESHOLD} />
        </Card>
      </div>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-3">
        <Card>
          <CardTitle aside="su 5">Competenze del team</CardTitle>
          <ul className="mt-4 space-y-3.5">
            {competencies.map((c) => (
              <li key={c.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{c.name}</span>
                  <span className={clsx("num font-semibold", c.name === weakestTeam?.name && "text-danger")}>{fmt1(c.value)}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-muted">
                  <div className={clsx("h-full rounded-full", c.name === weakestTeam?.name ? "bg-danger" : "bg-soot")} style={{ width: `${(c.value / 5) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">Dai {sessions.length} role play valutati. La più debole è {weakestTeam?.name.toLowerCase()}.</p>
        </Card>

        <Card>
          <CardTitle aside={<Link href="/team" className="font-medium text-foreground hover:underline">Vedi il team</Link>}>Ultimi role play</CardTitle>
          <ul className="mt-2">
            {latest.map((s) => {
              const m = members.find((x) => x.id === s.memberId);
              const sc = scenarios.find((x) => x.id === s.scenarioId);
              return (
                <li key={s.id} className="border-b border-rule last:border-0">
                  <Link href={`/report/${s.id}`} className="-mx-2 flex items-center gap-3 rounded-[var(--radius-control)] px-2 py-2.5 hover:bg-surface-muted">
                    <Avatar name={m?.name ?? "?"} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{m?.name}</div>
                      <div className="truncate text-sm text-muted">
                        {sc?.title} · {formatDate(s.date)}
                      </div>
                    </div>
                    <ScorePill score={s.score} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <CardTitle aside="ultime 4 settimane">Da seguire</CardTitle>
          <ul className="mt-3 space-y-3">
            {falling.map((m) => {
              const weak = weakestOf(m.id);
              const sc = recommendScenario(scenarios, weak?.name);
              return (
                <li key={m.id} className="rounded-[var(--radius-control)] bg-danger-soft/60 p-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} />
                    <Link href={`/team/${m.id}`} className="min-w-0 flex-1 hover:underline">
                      <div className="truncate text-sm font-medium">{m.name}</div>
                      <div className="truncate text-sm text-muted">
                        {weak?.value != null ? `${weak.name} ${fmt1(weak.value)}` : m.role}
                      </div>
                    </Link>
                    <Delta value={m.trend} />
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2 pl-11">
                    <span className="truncate text-sm text-muted">{sc?.title}</span>
                    <AssignButton scenario={sc?.title ?? ""} />
                  </div>
                </li>
              );
            })}
          </ul>
          <h3 className="mt-5 text-sm font-semibold">Chi migliora di più</h3>
          <ul className="mt-2">
            {improvers.map((m) => (
              <li key={m.id}>
                <Link href={`/team/${m.id}`} className="-mx-2 flex items-center gap-3 rounded-[var(--radius-control)] px-2 py-2 hover:bg-surface-muted">
                  <Avatar name={m.name} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{m.name}</div>
                    <div className="text-sm text-muted">{m.area}</div>
                  </div>
                  <Delta value={m.trend} />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
