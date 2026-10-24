// Accesso ai dati: legge da Supabase se configurato, altrimenti usa i dati demo.
import * as mock from "./mock";
import { createClient, isSupabaseConfigured } from "./supabase/server";
import type { DocumentItem, Lesson, Member, Scenario, Session } from "./types";

const toCamel = (s: string) => s.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());

function camelize<T>(row: Record<string, unknown>): T {
  return Object.fromEntries(
    Object.entries(row).map(([k, v]) => [toCamel(k), typeof v === "string" && /^\d+\.\d+$/.test(v) ? Number(v) : v]),
  ) as T;
}

async function fromTable<T>(table: string, fallback: T[], order?: string): Promise<T[]> {
  if (!isSupabaseConfigured) return fallback;
  const supabase = await createClient();
  let query = supabase.from(table).select("*");
  if (order) query = query.order(order, { ascending: false });
  const { data, error } = await query;
  if (error || !data) {
    console.error(`[data] ${table}:`, error?.message);
    return fallback;
  }
  return data.map((r) => camelize<T>(r));
}

export const getMembers = () => fromTable<Member>("members", mock.members);
export const getDocuments = () => fromTable<DocumentItem>("documents", mock.documents, "uploaded_at");
export const getLessons = () => fromTable<Lesson>("lessons", mock.lessons);
export const getScenarios = () => fromTable<Scenario>("scenarios", mock.scenarios);
export const getSessions = () => fromTable<Session>("sessions", mock.sessions, "date");

export async function getScenario(id: string) {
  return (await getScenarios()).find((s) => s.id === id);
}

export async function getSession(id: string) {
  return (await getSessions()).find((s) => s.id === id);
}

export async function getMember(id: string) {
  return (await getMembers()).find((m) => m.id === id);
}

export const COMPETENCIES = mock.COMPETENCIES;
export const weekly = mock.weekly;
export const expertNotes = mock.expertNotes;

// Media per competenza calcolata da un insieme di sessioni
export function competencyAverages(list: Session[]) {
  return COMPETENCIES.map((name) => {
    const vals = list.map((s) => s.competencyScores[name]).filter((v): v is number => v !== undefined);
    return { name, value: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null, count: vals.length };
  });
}

// Andamento del punteggio nelle 6 settimane: l'ultima settimana è la media attuale,
// la variazione delle ultime 4 settimane è il trend della persona
export function scoreHistory(m: Member) {
  return weekly.map((w, i) => ({
    week: w.week,
    score: Math.min(5, Math.max(1, Math.round((m.avgScore - (m.trend * (5 - i)) / 4) * 10) / 10)),
  }));
}

// Il prossimo scenario consigliato: allena la competenza più debole, ma non è quello appena fatto
export function recommendScenario(all: Scenario[], weakest: string | undefined, excludeId?: string) {
  const pool = all.filter((s) => s.id !== excludeId);
  return pool.find((s) => weakest && s.competencies.includes(weakest)) ?? pool[0];
}

export const READY_THRESHOLD = 4;
