import { LessonPlayer } from "@/components/lesson-player";
import { PageHeader } from "@/components/ui";
import { getLessons } from "@/lib/data";

export default async function ImparaPage() {
  const lessons = await getLessons();
  return (
    <>
      <PageHeader
        title="Impara"
        description="Un docente AI ti spiega i contenuti a voce. Puoi interromperlo e chiedere quando vuoi."
      />
      <LessonPlayer lessons={lessons} />
    </>
  );
}
