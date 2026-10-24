import { LessonPlayer } from "@/components/lesson-player";
import { getDocuments, getLessons } from "@/lib/data";

export default async function ImparaPage() {
  const [lessons, documents] = await Promise.all([getLessons(), getDocuments()]);
  return <LessonPlayer lessons={lessons} documents={documents} />;
}
