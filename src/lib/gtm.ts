// Numeri del piano di go to market mostrati nella landing.
// TUTTI IPOTESI del team: il team strategia li corregge qui e la landing si aggiorna.
// I totali sono calcolati da questi valori, non scritti a mano.

export const price = { perSeatMonth: 19, currency: "€" };

export const icp = {
  who: "Aziende italiane da 50 a 500 dipendenti con una rete di vendita o un customer care",
  buyer: "Direttore HR, responsabile formazione o direttore vendite",
  sectors: ["Assicurazioni", "Banche", "Retail", "Pharma", "Automotive", "Utility"],
  seatsPerCustomer: 80,
};

export const unit = {
  grossMargin: 0.8,
  lifetimeYears: 3, // churn annuo del 33%
};

export const funnel = [
  { step: "Contatti qualificati", value: 400 },
  { step: "Demo fatte", value: 80 },
  { step: "Pilota di 30 giorni", value: 20 },
  { step: "Clienti paganti", value: 8 },
];

export const budget = [
  { item: "LinkedIn: annunci e contenuti per HR e direttori vendite", channel: "Digitale", amount: 15000 },
  { item: "Eventi HR e fiere della formazione, con demo dal vivo", channel: "Fisico", amount: 12000 },
  { item: "Partner: consulenti HR e società di formazione, a commissione", channel: "Partner", amount: 10000 },
  { item: "Outbound: liste, strumenti e sequenze email", channel: "Digitale", amount: 8000 },
  { item: "Piloti gratuiti di 30 giorni per i primi 20 clienti", channel: "Prodotto", amount: 5000 },
];

export const channels = [
  { name: "Consulenti HR e società di formazione", why: "Hanno già la fiducia di chi decide in azienda: aggiungono Coach ai loro corsi e prendono una commissione su ogni posto." },
  { name: "LinkedIn", why: "Raggiunge per ruolo chi decide: direttori HR e direttori vendite delle aziende tra 50 e 500 dipendenti." },
  { name: "Eventi HR e fiere", why: "Il role play si prova in 60 secondi dal telefono: la demo dal vivo convince più di una brochure." },
];

export const guideMetric = { name: "Ore di pratica per persona al mese", target: "2 ore" };

// Valori derivati
export const arrPerCustomer = icp.seatsPerCustomer * price.perSeatMonth * 12;
export const ltv = Math.round(arrPerCustomer * unit.grossMargin * unit.lifetimeYears);
export const budgetTotal = budget.reduce((s, b) => s + b.amount, 0);
export const customers = funnel[funnel.length - 1].value;
export const cac = Math.round(budgetTotal / customers);
export const ltvToCac = ltv / cac;
export const paybackMonths = cac / ((arrPerCustomer * unit.grossMargin) / 12);

// Confronto con l'aula per il cliente tipo: 2 giornate per persona a 300 € (ipotesi)
export const classroomCost = icp.seatsPerCustomer * 2 * 300;
export const classroomRatio = classroomCost / arrPerCustomer;

export const eur = (n: number) => `${n.toLocaleString("it-IT")} €`;
