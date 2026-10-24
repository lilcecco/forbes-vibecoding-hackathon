import { ExpertNotes } from "@/components/expert-notes";
import { Badge, Card, PageHeader, formatDate } from "@/components/ui";
import { UploadDropzone } from "@/components/upload-dropzone";
import { expertNotes, getDocuments, getLessons } from "@/lib/data";
import type { DocumentItem } from "@/lib/types";
import clsx from "clsx";
import { FileText } from "lucide-react";
import Link from "next/link";

const KINDS: DocumentItem["kind"][] = ["Listino", "Procedura", "Scheda prodotto", "Best practice"];

export default async function ContenutiPage({ searchParams }: { searchParams: Promise<{ tipo?: string }> }) {
  const { tipo } = await searchParams;
  const [documents, lessons] = await Promise.all([getDocuments(), getLessons()]);
  const shown = tipo ? documents.filter((d) => d.kind === tipo) : documents;
  const totalLessons = documents.reduce((s, d) => s + d.lessons, 0);
  const processing = documents.filter((d) => d.status === "in elaborazione").length;

  const chip = (label: string, count: number, value?: string) => {
    const on = (tipo ?? undefined) === value;
    return (
      <Link
        key={label}
        href={value ? `/contenuti?tipo=${encodeURIComponent(value)}` : "/contenuti"}
        aria-current={on ? "true" : undefined}
        className={clsx(
          "inline-flex h-8 flex-none items-center gap-1.5 rounded-full border px-3 text-sm transition-colors",
          on ? "border-soot bg-soot text-white" : "border-control bg-surface hover:bg-surface-muted",
        )}
      >
        {label} <span className={clsx("num", on ? "text-white/70" : "text-muted")}>{count}</span>
      </Link>
    );
  };

  return (
    <>
      <PageHeader
        description={`${documents.length} documenti, ${totalLessons} lezioni generate${processing ? `, ${processing} in elaborazione` : ""}.`}
      />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-4">
          <UploadDropzone />

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0" aria-label="Filtra per tipo">
            {chip("Tutti", documents.length)}
            {KINDS.map((k) => chip(k, documents.filter((d) => d.kind === k).length, k))}
          </div>

          <Card className="p-0">
            {/* Desktop: tabella */}
            <table className="hidden w-full text-sm md:table">
              <thead>
                <tr className="text-left text-sm text-muted">
                  <th className="px-5 pb-2 pt-4 font-normal">Documento</th>
                  <th className="px-3 pb-2 pt-4 font-normal">Tipo</th>
                  <th className="px-3 pb-2 pt-4 font-normal">Caricato da</th>
                  <th className="px-3 pb-2 pt-4 text-right font-normal">Data</th>
                  <th className="px-3 pb-2 pt-4 font-normal">Stato</th>
                  <th className="px-5 pb-2 pt-4 text-right font-normal">Lezioni</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((d) => (
                  <tr key={d.id} className="border-t border-rule">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <FileText className="size-4 shrink-0 text-muted" strokeWidth={1.75} />
                        <span className="font-medium">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-muted">{d.kind}</td>
                    <td className="px-3 py-3 text-muted">{d.uploadedBy}</td>
                    <td className="num px-3 py-3 text-right text-muted">{formatDate(d.uploadedAt)}</td>
                    <td className="px-3 py-3">
                      {d.status === "pronto" ? <Badge tone="success">Pronto</Badge> : <Badge tone="warning">In elaborazione</Badge>}
                    </td>
                    <td className="num px-5 py-3 text-right">
                      {d.status === "pronto" ? (
                        <Link href="/impara" className="font-medium hover:underline">
                          {d.lessons}
                        </Link>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Telefono: righe su due linee */}
            <ul className="md:hidden">
              {shown.map((d) => (
                <li key={d.id} className="border-t border-rule px-4 py-3 first:border-0">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-medium">{d.name}</span>
                    {d.status === "pronto" ? <Badge tone="success">{d.lessons} lezioni</Badge> : <Badge tone="warning">In elaborazione</Badge>}
                  </div>
                  <div className="mt-1 text-sm text-muted">
                    {d.kind} · {d.uploadedBy} · {formatDate(d.uploadedAt)}
                  </div>
                </li>
              ))}
            </ul>
            {shown.length === 0 && <p className="px-5 py-6 text-sm text-muted">Nessun documento di questo tipo. Caricane uno qui sopra.</p>}
          </Card>
          <p className="text-sm text-muted">
            Le lezioni di ogni documento sono in <Link href="/impara" className="font-medium text-foreground hover:underline">Impara</Link>:{" "}
            {lessons.length} pronte da ascoltare.
          </p>
        </div>

        <ExpertNotes notes={expertNotes} />
      </div>
    </>
  );
}
