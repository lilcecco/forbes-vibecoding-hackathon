"use client";

import { Download } from "lucide-react";
import type { Member } from "@/lib/types";
import { Button } from "./ui";

// Esporta i progressi della squadra in CSV (si apre in Excel)
export function ExportButton({ members, label = "Esporta in Excel" }: { members: Member[]; label?: string }) {
  function download() {
    const header = ["Nome", "Ruolo", "Area", "Livello", "Minuti di pratica", "Role play", "Punteggio medio", "Trend"];
    const rows = members.map((m) => [m.name, m.role, m.area, m.level, m.practiceMinutes, m.roleplays, String(m.avgScore).replace(".", ","), String(m.trend).replace(".", ",")]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "coach-progressi-squadra.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="secondary" onClick={download}>
      <Download className="size-4" /> {label}
    </Button>
  );
}
