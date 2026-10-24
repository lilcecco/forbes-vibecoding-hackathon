// Dati demo: usati quando Supabase non è configurato. Stessi contenuti del seed SQL.
import type { DocumentItem, Lesson, Member, Scenario, Session } from "./types";

export const COMPETENCIES = [
  "Ascolto attivo",
  "Tono di voce",
  "Argomentare con i dati",
  "Generare opzioni",
  "Interessi e posizioni",
  "Gestire le obiezioni",
];

export const members: Member[] = [
  { id: "m1", name: "Giulia Rinaldi", role: "Account manager", area: "Vendite", level: "Senior", practiceMinutes: 212, roleplays: 14, avgScore: 4.4, trend: 0.6, lastActive: "2026-10-24" },
  { id: "m2", name: "Marco Bellini", role: "Sales executive", area: "Vendite", level: "Intermedio", practiceMinutes: 168, roleplays: 11, avgScore: 4.2, trend: 0.9, lastActive: "2026-10-24" },
  { id: "m3", name: "Sara Conti", role: "Sales executive", area: "Vendite", level: "Junior", practiceMinutes: 95, roleplays: 7, avgScore: 3.6, trend: 1.1, lastActive: "2026-10-23" },
  { id: "m4", name: "Luca Ferri", role: "Operatore customer care", area: "Servizio clienti", level: "Intermedio", practiceMinutes: 140, roleplays: 10, avgScore: 3.9, trend: 0.4, lastActive: "2026-10-22" },
  { id: "m5", name: "Elena Marchi", role: "Team leader customer care", area: "Servizio clienti", level: "Senior", practiceMinutes: 120, roleplays: 8, avgScore: 4.1, trend: 0.2, lastActive: "2026-10-21" },
  { id: "m6", name: "Davide Russo", role: "Area manager", area: "Manager", level: "Senior", practiceMinutes: 75, roleplays: 5, avgScore: 3.8, trend: 0.3, lastActive: "2026-10-20" },
  { id: "m7", name: "Chiara Galli", role: "Neoassunta vendite", area: "Neoassunti", level: "Junior", practiceMinutes: 60, roleplays: 6, avgScore: 3.1, trend: 1.4, lastActive: "2026-10-24" },
  { id: "m8", name: "Paolo Greco", role: "Neoassunto customer care", area: "Neoassunti", level: "Junior", practiceMinutes: 42, roleplays: 4, avgScore: 2.9, trend: 0.8, lastActive: "2026-10-19" },
];

export const documents: DocumentItem[] = [
  { id: "d1", name: "Listino Polizze Casa 2027.pdf", kind: "Listino", status: "pronto", lessons: 4, sizeKb: 820, uploadedAt: "2026-10-20", uploadedBy: "Elena Marchi" },
  { id: "d2", name: "Procedura gestione reclami.docx", kind: "Procedura", status: "pronto", lessons: 3, sizeKb: 240, uploadedAt: "2026-10-18", uploadedBy: "Elena Marchi" },
  { id: "d3", name: "Scheda prodotto Auto Plus.pdf", kind: "Scheda prodotto", status: "pronto", lessons: 2, sizeKb: 510, uploadedAt: "2026-10-15", uploadedBy: "Davide Russo" },
  { id: "d4", name: "Come chiudo un rinnovo — note di Giulia.md", kind: "Best practice", status: "in elaborazione", lessons: 0, sizeKb: 12, uploadedAt: "2026-10-24", uploadedBy: "Giulia Rinaldi" },
];

export const lessons: Lesson[] = [
  { id: "l1", documentId: "d1", title: "Il nuovo listino Casa in 5 minuti", minutes: 5, progress: 100, chapters: ["Cosa cambia nel 2027", "Le tre fasce di prezzo", "Gli sconti consentiti", "Domande frequenti"] },
  { id: "l2", documentId: "d1", title: "Come presentare l'aumento al rinnovo", minutes: 7, progress: 60, chapters: ["Perché aumenta", "I numeri da citare", "Le alternative da proporre"] },
  { id: "l3", documentId: "d2", title: "Reclamo: i primi 60 secondi", minutes: 4, progress: 0, chapters: ["Ascoltare senza interrompere", "Riformulare", "Dare un tempo certo"] },
  { id: "l4", documentId: "d3", title: "Auto Plus: il prodotto in due minuti", minutes: 3, progress: 30, chapters: ["A chi serve", "Le coperture chiave", "Il prezzo"] },
];

export const scenarios: Scenario[] = [
  { id: "s1", title: "Il rinnovo con sconto", persona: "Roberto, titolare di un negozio", personaRole: "Compratore", area: "Vendite", difficulty: "Difficile", minutes: 6, description: "Il cliente rinnova la polizza Casa ma chiede il 15% di sconto, oltre il massimo consentito.", competencies: ["Argomentare con i dati", "Generare opzioni", "Interessi e posizioni"] },
  { id: "s2", title: "La chiamata per trattenere il cliente", persona: "Anna, cliente da 6 anni", personaRole: "Cliente", area: "Vendite", difficulty: "Media", minutes: 5, description: "La cliente ha ricevuto un'offerta da un concorrente e vuole disdire.", competencies: ["Ascolto attivo", "Gestire le obiezioni"] },
  { id: "s3", title: "Il cliente arrabbiato", persona: "Franco, sinistro non rimborsato", personaRole: "Cliente", area: "Servizio clienti", difficulty: "Difficile", minutes: 5, description: "Il rimborso è in ritardo di tre settimane. Franco alza la voce dal primo secondo.", competencies: ["Ascolto attivo", "Tono di voce"] },
  { id: "s4", title: "Il riscontro difficile", persona: "Stefano, collaboratore", personaRole: "Collaboratore", area: "Manager", difficulty: "Media", minutes: 8, description: "Devi dire a un collaboratore che i suoi risultati del trimestre non bastano.", competencies: ["Tono di voce", "Interessi e posizioni"] },
  { id: "s5", title: "La prima telefonata", persona: "Laura, potenziale cliente", personaRole: "Cliente", area: "Neoassunti", difficulty: "Facile", minutes: 4, description: "Presenta Auto Plus in due minuti a chi non ti conosce.", competencies: ["Argomentare con i dati", "Ascolto attivo"] },
  { id: "s6", title: "Il collega che non collabora", persona: "Matteo, ufficio sinistri", personaRole: "Collega", area: "Servizio clienti", difficulty: "Media", minutes: 5, description: "Ti serve una pratica entro domani, ma il collega ha altre priorità.", competencies: ["Generare opzioni", "Interessi e posizioni"] },
];

export const sessions: Session[] = [
  {
    id: "r1", scenarioId: "s1", memberId: "m2", date: "2026-10-24", durationSec: 232, score: 4.2,
    competencyScores: { "Ascolto attivo": 4.5, "Tono di voce": 4.0, "Argomentare con i dati": 4.2, "Generare opzioni": 3.8, "Interessi e posizioni": 4.4 },
    feedback: [
      { at: "00:42", competency: "Ascolto attivo", kind: "positivo", text: "Hai riformulato la richiesta del cliente prima di rispondere: si è sentito capito." },
      { at: "01:35", competency: "Argomentare con i dati", kind: "positivo", text: "Citare il +8% di sinistri in zona ha reso l'aumento comprensibile." },
      { at: "02:50", competency: "Generare opzioni", kind: "migliora", text: "Hai offerto subito lo sconto massimo. Prova prima a proporre la franchigia più alta." },
      { at: "03:40", competency: "Interessi e posizioni", kind: "positivo", text: "Hai scoperto che al cliente interessa la rata mensile, non il totale annuo." },
    ],
  },
  {
    id: "r2", scenarioId: "s3", memberId: "m4", date: "2026-10-22", durationSec: 281, score: 3.7,
    competencyScores: { "Ascolto attivo": 3.9, "Tono di voce": 3.4, "Gestire le obiezioni": 3.8 },
    feedback: [
      { at: "00:15", competency: "Tono di voce", kind: "migliora", text: "Il ritmo è accelerato quando il cliente ha alzato la voce: rallenta e abbassa il tono." },
      { at: "01:20", competency: "Ascolto attivo", kind: "positivo", text: "Hai lasciato sfogare il cliente senza interromperlo." },
      { at: "03:05", competency: "Gestire le obiezioni", kind: "positivo", text: "Hai dato una data certa per il rimborso." },
    ],
  },
  {
    id: "r3", scenarioId: "s5", memberId: "m7", date: "2026-10-24", durationSec: 198, score: 3.2,
    competencyScores: { "Argomentare con i dati": 2.9, "Ascolto attivo": 3.5 },
    feedback: [
      { at: "00:30", competency: "Argomentare con i dati", kind: "migliora", text: "Hai elencato tutte le coperture: scegline due legate al bisogno della cliente." },
      { at: "02:10", competency: "Ascolto attivo", kind: "positivo", text: "Buona domanda aperta sulle abitudini di guida." },
    ],
  },
];

// Andamento settimanale della squadra (ore di pratica e punteggio medio)
export const weekly = [
  { week: "S37", hours: 9, score: 3.4 },
  { week: "S38", hours: 12, score: 3.5 },
  { week: "S39", hours: 15, score: 3.7 },
  { week: "S40", hours: 14, score: 3.8 },
  { week: "S41", hours: 18, score: 3.9 },
  { week: "S42", hours: 21, score: 4.0 },
];
