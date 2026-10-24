export type Area = "Vendite" | "Servizio clienti" | "Manager" | "Neoassunti";

export type Member = {
  id: string;
  name: string;
  role: string;
  area: Area;
  level: "Junior" | "Intermedio" | "Senior";
  practiceMinutes: number;
  roleplays: number;
  avgScore: number; // 0-5
  trend: number; // variazione punteggio ultime 4 settimane
  lastActive: string;
};

export type DocumentItem = {
  id: string;
  name: string;
  kind: "Listino" | "Procedura" | "Scheda prodotto" | "Best practice";
  status: "pronto" | "in elaborazione";
  lessons: number;
  sizeKb: number;
  uploadedAt: string;
  uploadedBy: string;
};

export type Lesson = {
  id: string;
  documentId: string;
  title: string;
  minutes: number;
  progress: number; // 0-100
  chapters: string[];
};

export type Scenario = {
  id: string;
  title: string;
  persona: string;
  personaRole: "Cliente" | "Collega" | "Compratore" | "Collaboratore";
  area: Area;
  difficulty: "Facile" | "Media" | "Difficile";
  minutes: number;
  description: string;
  competencies: string[];
};

export type FeedbackItem = {
  at: string; // mm:ss nella conversazione
  competency: string;
  kind: "positivo" | "migliora";
  text: string;
  quote?: string; // la frase detta in quel momento
};

export type Session = {
  id: string;
  scenarioId: string;
  memberId: string;
  date: string;
  durationSec: number;
  score: number; // 0-5
  competencyScores: Record<string, number>;
  feedback: FeedbackItem[];
};

export type ExpertNote = {
  id: string;
  author: string;
  role: string;
  text: string;
  date: string;
};
