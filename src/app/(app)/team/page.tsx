import { ExportButton } from "@/components/export-button";
import { Avatar, Badge, Card, PageHeader, ScorePill, formatDate, formatMinutes } from "@/components/ui";
import { getMembers } from "@/lib/data";

export default async function TeamPage() {
  const members = await getMembers();

  return (
    <>
      <PageHeader
        title="Team"
        description="Ogni percorso parte dal ruolo e dal livello della persona. Progressi per persona e per squadra."
        action={<ExportButton members={members} />}
      />

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Persona</th>
              <th className="px-5 py-3 font-medium">Area</th>
              <th className="px-5 py-3 font-medium">Livello</th>
              <th className="px-5 py-3 font-medium">Pratica</th>
              <th className="px-5 py-3 font-medium">Role play</th>
              <th className="px-5 py-3 font-medium">Punteggio</th>
              <th className="px-5 py-3 font-medium">Trend</th>
              <th className="px-5 py-3 font-medium">Ultima attività</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-surface-muted/60">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} />
                    <div>
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-muted">{m.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3"><Badge>{m.area}</Badge></td>
                <td className="px-5 py-3 text-muted">{m.level}</td>
                <td className="px-5 py-3">{formatMinutes(m.practiceMinutes)}</td>
                <td className="px-5 py-3">{m.roleplays}</td>
                <td className="px-5 py-3"><ScorePill score={m.avgScore} /></td>
                <td className="px-5 py-3 font-medium text-success">+{m.trend.toFixed(1)}</td>
                <td className="px-5 py-3 text-muted">{formatDate(m.lastActive)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
