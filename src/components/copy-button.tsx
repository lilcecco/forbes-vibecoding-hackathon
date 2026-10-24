"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui";

export function CopyButton({ text, label = "Copia il testo" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Appunti non disponibili (es. pagina non sicura): il testo resta selezionabile a mano
    }
  }

  return (
    <Button variant="secondary" onClick={copy} className="px-3 py-1.5 text-xs">
      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
      {copied ? "Copiato" : label}
    </Button>
  );
}
