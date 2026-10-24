"use client";

import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CARDS = [
  { title: "Vendite", tone: "#dafa9c", text: "Lo sconto al rinnovo, la chiamata per trattenere il cliente, il listino nuovo da presentare.", scenario: { id: "s1", name: "Il rinnovo con sconto" } },
  { title: "Servizio clienti", tone: "#cdf283", text: "Il cliente arrabbiato, il disservizio da spiegare, il no detto con tatto.", scenario: { id: "s3", name: "Il cliente arrabbiato" } },
  { title: "Manager", tone: "#bfe86c", text: "Il riscontro difficile, la valutazione annuale, il cambiamento da annunciare alla squadra.", scenario: { id: "s4", name: "Il riscontro difficile" } },
  { title: "Neoassunti", tone: "#e8fcc4", text: "La prima telefonata, il prodotto in due minuti, la domanda a cui non sai ancora rispondere.", scenario: { id: "s5", name: "La prima telefonata" } },
];

// Carte che si piegano in dorsi: una è aperta, le altre restano strette col nome
export function AudienceDeck() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <div className="hidden h-[380px] gap-2 md:flex">
        {CARDS.map((c, i) => {
          const isOpen = i === open;
          return (
            <button
              key={c.title}
              onClick={() => setOpen(i)}
              aria-expanded={isOpen}
              className={clsx(
                "relative overflow-hidden rounded-[var(--radius-card)] text-left text-soot transition-[flex-grow] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]",
                isOpen ? "grow-[6]" : "grow-[1] hover:grow-[1.25]",
              )}
              style={{ background: c.tone, flexBasis: 0 }}
            >
              <div className={clsx("absolute inset-0 flex flex-col p-8 transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}>
                <h3 className="text-[30px] font-semibold leading-[1.1] tracking-tight">{c.title}</h3>
                <p className="mt-4 max-w-md text-lg leading-snug">{c.text}</p>
                <span className="mt-auto flex items-center justify-between gap-4 text-base">
                  <span>Scenario d&apos;esempio: {c.scenario.name}</span>
                </span>
              </div>
              {!isOpen && <span className="absolute left-6 top-8 whitespace-nowrap text-[30px] font-semibold tracking-tight [writing-mode:vertical-rl]">{c.title}</span>}
            </button>
          );
        })}
      </div>
      <div className="mt-6 hidden items-center justify-between text-[17px] md:flex">
        <span>4 aree, 6 scenari pronti. Ogni azienda aggiunge i suoi dai documenti.</span>
        <Link href={`/roleplay/${CARDS[open].scenario.id}`} className="inline-flex items-center gap-2 font-medium underline decoration-2 underline-offset-4">
          Prova «{CARDS[open].scenario.name}» <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Telefono: carte in colonna */}
      <ul className="space-y-3 md:hidden">
        {CARDS.map((c) => (
          <li key={c.title} className="rounded-[var(--radius-card)] p-5 text-soot" style={{ background: c.tone }}>
            <h3 className="text-2xl font-semibold tracking-tight">{c.title}</h3>
            <p className="mt-2 text-base leading-snug">{c.text}</p>
            <Link href={`/roleplay/${c.scenario.id}`} className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium underline decoration-2 underline-offset-4">
              Prova «{c.scenario.name}» <ArrowRight className="size-4" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
