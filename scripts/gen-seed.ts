// Genera supabase/seed.sql dai dati demo: npx tsx scripts/gen-seed.ts
import { writeFileSync } from "node:fs";
import * as m from "../src/lib/mock";

const snake = (s: string) => s.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
const lit = (v: unknown): string => {
  // Array di stringhe → text[]; array di oggetti (es. feedback) → jsonb
  if (Array.isArray(v) && v.every((x) => typeof x === "string")) return `array[${v.map(lit).join(",")}]::text[]`;
  if (typeof v === "object" && v !== null) return `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;
  if (typeof v === "number") return String(v);
  return `'${String(v).replace(/'/g, "''")}'`;
};
const insert = (table: string, rows: object[]) =>
  rows
    .map((r) => {
      const cols = Object.keys(r).map(snake).join(", ");
      const vals = Object.values(r).map(lit).join(", ");
      return `insert into public.${table} (${cols}) values (${vals});`;
    })
    .join("\n");

const sql = [
  "-- Generato da scripts/gen-seed.ts",
  insert("members", m.members),
  insert("documents", m.documents),
  insert("lessons", m.lessons),
  insert("scenarios", m.scenarios),
  insert("sessions", m.sessions),
].join("\n\n");

writeFileSync("supabase/seed.sql", sql + "\n");
console.log("supabase/seed.sql scritto");
