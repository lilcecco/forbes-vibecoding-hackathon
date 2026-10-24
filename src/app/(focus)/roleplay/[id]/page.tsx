import { RoleplayRoom } from "@/components/roleplay-room";
import { getScenario, getSessions } from "@/lib/data";
import { notFound } from "next/navigation";

// Sessione a schermo intero, senza sidebar: come una videochiamata
export default async function RoleplaySessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [scenario, sessions] = await Promise.all([getScenario(id), getSessions()]);
  if (!scenario) notFound();
  const report = sessions.filter((s) => s.scenarioId === id).sort((a, b) => b.score - a.score)[0] ?? sessions[0];

  return <RoleplayRoom scenario={scenario} reportId={report.id} />;
}
