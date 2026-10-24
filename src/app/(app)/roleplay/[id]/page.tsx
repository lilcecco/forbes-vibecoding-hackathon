import { RoleplayRoom } from "@/components/roleplay-room";
import { PageHeader } from "@/components/ui";
import { getScenario } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RoleplaySessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scenario = await getScenario(id);
  if (!scenario) notFound();

  return (
    <>
      <Link href="/roleplay" className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="size-4" /> Tutti gli scenari
      </Link>
      <PageHeader title={scenario.title} description={scenario.description} />
      <RoleplayRoom scenario={scenario} />
    </>
  );
}
