import { Badge, Card, PageHeader, formatDate } from "@/components/ui";
import { UploadDropzone } from "@/components/upload-dropzone";
import { getDocuments } from "@/lib/data";
import { FileText, Lightbulb } from "lucide-react";

export default async function ContenutiPage() {
  const documents = await getDocuments();

  return (
    <>
      <PageHeader
        title="Contenuti"
        description="Carica i materiali dell'azienda. Gli esperti aggiungono come lavorano davvero."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UploadDropzone />
        </div>
        <Card className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <Lightbulb className="size-4 text-warning" /> Il sapere degli esperti
          </div>
          <p className="text-sm text-muted">
            Chiedi ai tuoi migliori venditori di caricare le loro note: Coach le trasforma in esempi
            dentro lezioni e role play.
          </p>
        </Card>
      </div>

      <Card className="mt-4 p-0">
        <div className="border-b border-border px-5 py-4 font-semibold">Documenti caricati</div>
        <ul className="divide-y divide-border">
          {documents.map((d) => (
            <li key={d.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
              <div className="grid size-9 place-items-center rounded-lg bg-surface-muted">
                <FileText className="size-4 text-muted" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{d.name}</div>
                <div className="text-xs text-muted">
                  {d.uploadedBy} · {formatDate(d.uploadedAt)} · {d.sizeKb} KB
                </div>
              </div>
              <Badge>{d.kind}</Badge>
              {d.status === "pronto" ? (
                <Badge tone="success">{d.lessons} lezioni</Badge>
              ) : (
                <Badge tone="warning">In elaborazione</Badge>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
