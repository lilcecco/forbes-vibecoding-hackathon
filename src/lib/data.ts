// Accesso ai dati: legge da Supabase se configurato, altrimenti usa i dati demo.
import * as mock from "./mock";
import { createClient, isSupabaseConfigured } from "./supabase/server";
import type { DocumentItem, Lesson, Member, Scenario, Session } from "./types";

const toCamel = (s: string) => s.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());

function camelize<T>(row: Record<string, unknown>): T {
  return Object.fromEntries(
    Object.entries(row).map(([k, v]) => [toCamel(k), v]),
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

export const COMPETENCIES = mock.COMPETENCIES;
export const weekly = mock.weekly;
