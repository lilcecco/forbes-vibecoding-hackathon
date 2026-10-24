import { ScenarioLibrary } from "@/components/scenario-library";
import { competencyAverages, getScenarios, getSessions, recommendScenario } from "@/lib/data";

const order = { Difficile: 0, Media: 1, Facile: 2 } as const;
const areas = ["Vendite", "Servizio clienti", "Manager", "Neoassunti"];

export default async function RoleplayPage() {
  const [scenarios, sessions] = await Promise.all([getScenarios(), getSessions()]);
  const sorted = [...scenarios].sort((a, b) => areas.indexOf(a.area) - areas.indexOf(b.area) || order[a.difficulty] - order[b.difficulty]);

  // Ultimo voto per scenario
  const lastScores: Record<string, number> = {};
  [...sessions].sort((a, b) => a.date.localeCompare(b.date)).forEach((s) => (lastScores[s.scenarioId] = s.score));

  const comps = competencyAverages(sessions).filter((c) => c.value !== null) as { name: string; value: number }[];
  const weakest = comps.sort((a, b) => a.value - b.value)[0];
  const featured = recommendScenario(scenarios, weakest?.name);

  return <ScenarioLibrary scenarios={sorted} lastScores={lastScores} featuredId={featured.id} weakest={weakest} />;
}
