// Dati demo: usati quando Supabase non è configurato. Stessi contenuti del seed SQL
// (rigenera con `npx tsx scripts/gen-seed.ts`). Azienda inventata: Nordica Assicurazioni.
import type { DocumentItem, ExpertNote, Lesson, Member, Scenario, Session } from "./types";

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
  { id: "m4", name: "Luca Ferri", role: "Operatore customer care", area: "Servizio clienti", level: "Intermedio", practiceMinutes: 140, roleplays: 10, avgScore: 3.9, trend: -0.3, lastActive: "2026-10-22" },
  { id: "m5", name: "Elena Marchi", role: "Team leader customer care", area: "Servizio clienti", level: "Senior", practiceMinutes: 120, roleplays: 8, avgScore: 4.1, trend: 0.2, lastActive: "2026-10-21" },
  { id: "m6", name: "Davide Russo", role: "Area manager", area: "Manager", level: "Senior", practiceMinutes: 75, roleplays: 5, avgScore: 3.8, trend: 0.3, lastActive: "2026-10-20" },
  { id: "m7", name: "Chiara Galli", role: "Neoassunta vendite", area: "Neoassunti", level: "Junior", practiceMinutes: 60, roleplays: 6, avgScore: 3.1, trend: 1.4, lastActive: "2026-10-24" },
  { id: "m8", name: "Paolo Greco", role: "Neoassunto customer care", area: "Neoassunti", level: "Junior", practiceMinutes: 42, roleplays: 4, avgScore: 2.9, trend: -0.5, lastActive: "2026-10-19" },
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
  { id: "l5", documentId: "d1", title: "Lo sconto: fino a dove puoi arrivare", minutes: 6, progress: 0, chapters: ["Il tetto del 10%", "Chi approva oltre il tetto", "Cosa proporre prima dello sconto"] },
  { id: "l6", documentId: "d1", title: "Casa + Auto: la doppia polizza", minutes: 4, progress: 0, chapters: ["A chi conviene", "Il risparmio sul totale", "Come proporla"] },
  { id: "l3", documentId: "d2", title: "Reclamo: i primi 60 secondi", minutes: 4, progress: 0, chapters: ["Ascoltare senza interrompere", "Riformulare", "Dare un tempo certo"] },
  { id: "l7", documentId: "d2", title: "Il reclamo scritto: risposta in 48 ore", minutes: 5, progress: 0, chapters: ["Cosa deve contenere", "Il tono giusto", "Quando chiudere la pratica"] },
  { id: "l8", documentId: "d2", title: "Quando passare al responsabile", minutes: 3, progress: 0, chapters: ["I tre casi previsti", "Come fare il passaggio"] },
  { id: "l4", documentId: "d3", title: "Auto Plus: il prodotto in due minuti", minutes: 3, progress: 30, chapters: ["A chi serve", "Le coperture chiave", "Il prezzo"] },
  { id: "l9", documentId: "d3", title: "Le domande più frequenti su Auto Plus", minutes: 4, progress: 0, chapters: ["Franchigia", "Carro attrezzi", "Auto sostitutiva"] },
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
      { at: "00:42", competency: "Ascolto attivo", kind: "positivo", quote: "Capisco, un aumento di 50 euro non fa piacere. Posso spiegarle da dove arriva?", text: "Hai riformulato la richiesta del cliente prima di rispondere: si è sentito capito." },
      { at: "01:35", competency: "Argomentare con i dati", kind: "positivo", quote: "Nella sua zona i sinistri per allagamento sono cresciuti dell'8%.", text: "Citare il +8% di sinistri in zona ha reso l'aumento comprensibile." },
      { at: "02:50", competency: "Generare opzioni", kind: "migliora", quote: "Va bene, le applico il 10%: è il massimo che posso fare.", text: "Hai offerto subito lo sconto massimo. Prova prima a proporre la franchigia più alta." },
      { at: "03:40", competency: "Interessi e posizioni", kind: "positivo", quote: "Per lei conta più il totale o la rata mensile?", text: "Hai scoperto che al cliente interessa la rata mensile, non il totale annuo." },
    ],
  },
  {
    id: "r6", scenarioId: "s1", memberId: "m1", date: "2026-10-23", durationSec: 298, score: 4.6,
    competencyScores: { "Argomentare con i dati": 4.7, "Generare opzioni": 4.5, "Interessi e posizioni": 4.6 },
    feedback: [
      { at: "00:30", competency: "Interessi e posizioni", kind: "positivo", quote: "Prima di parlare di prezzo: cosa è cambiato per il negozio quest'anno?", text: "Sei partita dal cliente, non dallo sconto: la trattativa si è aperta subito." },
      { at: "02:15", competency: "Generare opzioni", kind: "positivo", quote: "Posso alzare la franchigia a 500 euro: il premio scende del 7%.", text: "Un'alternativa concreta allo sconto, con il numero giusto." },
      { at: "04:05", competency: "Argomentare con i dati", kind: "migliora", quote: "Il listino è questo, purtroppo.", text: "Qui il listino è suonato come un muro: aggiungi il perché dell'aumento." },
    ],
  },
  {
    id: "r5", scenarioId: "s2", memberId: "m3", date: "2026-10-23", durationSec: 265, score: 3.6,
    competencyScores: { "Ascolto attivo": 3.9, "Gestire le obiezioni": 3.3 },
    feedback: [
      { at: "00:35", competency: "Ascolto attivo", kind: "positivo", quote: "Mi racconta cosa le hanno offerto, esattamente?", text: "Domanda aperta al momento giusto: Anna ha spiegato tutta l'offerta del concorrente." },
      { at: "02:05", competency: "Gestire le obiezioni", kind: "migliora", quote: "Anche noi possiamo farle uno sconto.", text: "Hai rincorso il prezzo. Prima ricorda ad Anna cosa perderebbe cambiando: sei anni senza un sinistro contestato." },
      { at: "03:50", competency: "Gestire le obiezioni", kind: "positivo", quote: "Le mando il confronto per iscritto, così decide con calma.", text: "Hai tolto pressione e tenuto aperta la porta." },
    ],
  },
  {
    id: "r2", scenarioId: "s3", memberId: "m4", date: "2026-10-22", durationSec: 281, score: 3.7,
    competencyScores: { "Ascolto attivo": 3.9, "Tono di voce": 3.4, "Gestire le obiezioni": 3.8 },
    feedback: [
      { at: "00:15", competency: "Tono di voce", kind: "migliora", quote: "Sì, sì, ho capito, ma deve lasciarmi controllare.", text: "Il ritmo è accelerato quando il cliente ha alzato la voce: rallenta e abbassa il tono." },
      { at: "01:20", competency: "Ascolto attivo", kind: "positivo", quote: "Mi dica tutto, la ascolto.", text: "Hai lasciato sfogare il cliente senza interromperlo." },
      { at: "03:05", competency: "Gestire le obiezioni", kind: "positivo", quote: "Il bonifico parte venerdì: le mando la conferma via mail.", text: "Hai dato una data certa per il rimborso." },
    ],
  },
  {
    id: "r3", scenarioId: "s5", memberId: "m7", date: "2026-10-21", durationSec: 198, score: 3.2,
    competencyScores: { "Argomentare con i dati": 2.9, "Ascolto attivo": 3.5 },
    feedback: [
      { at: "00:30", competency: "Argomentare con i dati", kind: "migliora", quote: "Auto Plus copre furto, incendio, cristalli, eventi atmosferici, atti vandalici…", text: "Hai elencato tutte le coperture: scegline due legate al bisogno della cliente." },
      { at: "02:10", competency: "Ascolto attivo", kind: "positivo", quote: "Quanti chilometri fa in un anno, più o meno?", text: "Buona domanda aperta sulle abitudini di guida." },
    ],
  },
  {
    id: "r4", scenarioId: "s3", memberId: "m8", date: "2026-10-19", durationSec: 240, score: 2.6,
    competencyScores: { "Ascolto attivo": 2.8, "Tono di voce": 2.4 },
    feedback: [
      { at: "00:20", competency: "Tono di voce", kind: "migliora", quote: "Signor Franco, si calmi, così non risolviamo.", text: "Chiedere di calmarsi alza la tensione: riconosci prima il disagio." },
      { at: "01:40", competency: "Ascolto attivo", kind: "migliora", quote: "Il sistema dice che la pratica è in lavorazione.", text: "Hai risposto con la procedura prima di capire cosa serviva a Franco." },
      { at: "03:10", competency: "Tono di voce", kind: "positivo", quote: "La richiamo io giovedì alle 10, dal mio numero diretto.", text: "Un impegno con giorno e ora: il cliente si è fermato." },
    ],
  },
];

// Le note degli esperti (non sono ancora in Supabase: arrivano dal documento d4 e dalle note a voce)
export const expertNotes: ExpertNote[] = [
  { id: "n1", author: "Giulia Rinaldi", role: "Account manager · la migliore sui rinnovi", text: "Al rinnovo non parto mai dallo sconto: prima chiedo cosa è cambiato per il cliente quest'anno.", date: "2026-10-24" },
  { id: "n2", author: "Elena Marchi", role: "Team leader customer care", text: "Col cliente arrabbiato ripeto la sua frase prima di rispondere. Si sente ascoltato e abbassa la voce.", date: "2026-10-22" },
  { id: "n3", author: "Davide Russo", role: "Area manager", text: "Nel riscontro difficile parto dal numero, non dalla persona: «Il trimestre è al 62% dell'obiettivo».", date: "2026-10-17" },
];

// Pratica della squadra per settimana: i minuti e i role play sommano ai totali delle persone
export const weekly = [
  { week: "S37", minutes: 80, roleplays: 5, score: 3.2 },
  { week: "S38", minutes: 105, roleplays: 7, score: 3.3 },
  { week: "S39", minutes: 130, roleplays: 9, score: 3.4 },
  { week: "S40", minutes: 150, roleplays: 11, score: 3.5 },
  { week: "S41", minutes: 207, roleplays: 15, score: 3.6 },
  { week: "S42", minutes: 240, roleplays: 18, score: 3.8 },
];
