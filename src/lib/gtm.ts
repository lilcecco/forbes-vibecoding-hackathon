// Strategia di go to market mostrata nella landing, presa da docs "Coach – Strategia di go to market".
// TUTTI i numeri senza fonte sono IPOTESI di lavoro del team: si correggono qui e la landing si aggiorna.
// I valori derivati sono calcolati da questi, non scritti a mano.

export const price = { perSeatMonth: 25, currency: "€", contract: "Contratto annuale" };

export const pitchLine = "Un cliente ci costa 5.000 €, ci rende 40.500 €, e in meno di 5 mesi è già in pari.";
export const valueProp =
  "Il simulatore di volo per i tuoi venditori: si allenano con un cliente AI prima di affrontare quello vero, e la formazione si paga con Fondimpresa.";

export const icp = {
  who: "Compagnie e agenzie assicurative italiane con 100–500 dipendenti",
  sellers: "30–150 venditori",
  extra: "aderenti a Fondimpresa",
  sectors: ["Assicurazioni", "Banche", "Retail", "Pharma", "Automotive", "Utility"],
  focusSector: "Assicurazioni",
  seatsPerCustomer: 60,
  why: [
    "Prodotti e listini cambiano spesso: i venditori vanno riformati di continuo.",
    "Ogni giorno ci sono conversazioni difficili: rinnovi, richieste di sconto, sinistri.",
    "La formazione la fanno già: Coach la rende più efficace e misurabile.",
  ],
  where: [
    { name: "Albo IVASS", text: "l'elenco ufficiale di imprese e intermediari assicurativi" },
    { name: "LinkedIn", text: "settore Assicurazioni, 51–500 dipendenti, direttori commerciali e HR" },
    { name: "SNA, ANAPA e AIBA", text: "le associazioni di agenti e broker" },
    { name: "Italian Insurtech Summit", text: "e Italy Insurance Forum, gli eventi di settore" },
  ],
  buyers: [
    { role: "Ha il problema", who: "Direttore commerciale", say: "«I tuoi venditori si allenano prima, non sul cliente vero»" },
    { role: "Ha il budget", who: "Responsabile HR e formazione", say: "«Formazione misurabile, esportabile in Excel, finanziabile con Fondimpresa»" },
    { role: "Ci porta il cliente", who: "Consulente del lavoro o ente formativo", say: "«Un prodotto pronto da inserire nei piani Fondimpresa»" },
  ],
};

export const alternatives = [
  { name: "Corso in aula", limit: "Costa, si fa una volta, dopo una settimana si dimentica", coach: "Ci si allena ogni volta che serve" },
  { name: "Corsi online registrati", limit: "Si guarda, non si pratica", coach: "Si parla con un cliente che risponde e insiste" },
  { name: "Imparare sul campo", limit: "Gli errori si fanno con i clienti veri", coach: "Gli errori si fanno con il cliente finto" },
  { name: "Nessuna misura", limit: "Non sai chi ha imparato", coach: "Voto su 12 competenze, dashboard, export Excel" },
];

// I tre piani della landing: il prezzo del Team è quello usato nei conti qui sotto
export const plans = [
  {
    name: "Prova",
    price: 0 as number | null,
    unit: "per 30 giorni",
    for: "Fino a 10 venditori",
    features: ["Lezioni e role play completi", "Il direttore commerciale vede i progressi", "Nessun pagamento, nessun vincolo"],
    cta: "Inizia la prova",
    recommended: false,
  },
  {
    name: "Team",
    price: price.perSeatMonth as number | null,
    unit: "a venditore al mese",
    for: "Da 30 a 150 venditori · contratto annuale",
    features: ["Lezioni e role play illimitati", "Voto su 12 competenze per ogni sessione", "Dashboard HR con esportazione in Excel", "Finanziabile con il conto Fondimpresa"],
    cta: "Prova la demo",
    recommended: true,
  },
  {
    name: "Enterprise",
    price: null as number | null,
    unit: "",
    for: "Grandi gruppi assicurativi e reti di agenzie",
    features: ["Tutto il piano Team", "Scenari scritti con voi sui vostri casi", "Accesso con le credenziali aziendali", "Un referente dedicato"],
    cta: "Contattaci",
    recommended: false,
  },
];

export const unit = {
  grossMargin: 0.75, // su 100 € incassati ne restano 75 dopo AI, video, server e assistenza
  lifetimeYears: 3, // 2 clienti su 3 rinnovano ogni anno
};

export const phases = [
  { name: "Prepariamo il terreno", when: "Mese 1", what: "Sito, kit per i partner, 3 aziende pilota gratuite", result: "Primi casi reali da mostrare" },
  { name: "Partiamo dai partner", when: "Mesi 1–2", what: "Consulenti ed enti formativi propongono Coach nei piani Fondimpresa; post LinkedIn e mail ai direttori commerciali", result: "Primi contatti caldi" },
  { name: "Accendiamo l'attenzione", when: "Mese 3", what: "Stand a un evento assicurativo con la sfida «Batti il cliente AI» e LinkedIn Ads", result: "Picco di contatti e demo" },
  { name: "Convertiamo e ottimizziamo", when: "Mesi 4–6", what: "Le prove gratuite diventano contratti; il budget va sul canale che costa meno", result: "10 clienti paganti" },
];

export const nextPhase = "Con 10 clienti e i loro risultati in mano, puntiamo a un grande gruppo assicurativo e alla sua rete di agenzie: un solo accordo vale migliaia di venditori.";

export const channels = [
  { name: "Contenuti social", kind: "Digitale", what: "LinkedIn: 3 post a settimana e 1 video verticale", why: "È dove stanno direttori commerciali e HR. Instagram e TikTok no: il nostro compratore non decide lì." },
  { name: "LinkedIn Ads", kind: "Digitale", what: "Annunci mirati per ruolo, settore e dimensione aziendale", why: "Solo LinkedIn raggiunge «direttore commerciale, assicurazioni, 100–500 dipendenti». Obiettivo 800 € a demo: se dopo 2 mesi supera 1.000 €, il budget passa ai partner." },
  { name: "Evento fisico", kind: "Fisico", what: "Stand all'Italian Insurtech Summit con la classifica «Batti il cliente AI»", why: "Il prodotto si capisce provandolo: 3 minuti di role play valgono più di 10 slide." },
  { name: "Convenzioni", kind: "Fisico", what: "Consulenti del lavoro (ANCL) e agenti (SNA, ANAPA): 10% del primo anno per ogni azienda portata", why: "Hanno già i nostri clienti e la loro fiducia. Noi paghiamo solo a risultato." },
  { name: "Partnership", kind: "Fisico", what: "Un ente formativo qualificato Fondimpresa inserisce Coach nei piani finanziati", why: "Noi portiamo il prodotto, loro la burocrazia: per l'azienda è formazione senza pensieri." },
];

export const notChosen = [
  { name: "Meta", why: "mira B2B debole: il direttore commerciale lì non compra formazione" },
  { name: "Google nei primi 6 mesi", why: "quasi nessuno cerca «role play AI»; dal mese 4 un test da 1.000 € su «formazione finanziata Fondimpresa vendite»" },
];

export const funnelTop = [
  { channel: "LinkedIn Ads", see: 300000, click: 1500, leads: 60, note: "12.000 €, circa 8 € a clic" },
  { channel: "Post LinkedIn", see: 80000, click: 800, leads: 20, note: "" },
  { channel: "Evento (stand)", see: 1500, click: 400, leads: 100, note: "400 provano la sfida" },
  { channel: "Mail dirette", see: 1000, click: 150, leads: 30, note: "" },
  { channel: "Partner", see: null as number | null, click: null as number | null, leads: 90, note: "30 consulenti × 3 aziende" },
];

export const funnel = [
  { step: "Contatti interessati", value: 300, plain: "Ci hanno lasciato un contatto" },
  { step: "Demo fatte", value: 75, plain: "1 su 4 vuole vedere il prodotto" },
  { step: "Prove gratuite", value: 25, plain: "1 su 3 vuole provarlo" },
  { step: "Clienti paganti", value: 10, plain: "2 su 5 poi comprano" },
];

export const budget = [
  { item: "LinkedIn Ads", use: "Raggiungere direttori commerciali e HR", amount: 12000 },
  { item: "Evento fisico", use: "Stand, allestimento, materiali, trasferta", amount: 12000 },
  { item: "Programma partner", use: "Kit, formazione dei consulenti, incentivi di lancio", amount: 10000 },
  { item: "Produzione contenuti", use: "Video, grafiche, casi studio", amount: 6000 },
  { item: "Strumenti per le mail", use: "Sales Navigator, CRM, invio mail", amount: 4000 },
  { item: "Prove gratuite", use: "Costi AI e avvio dei clienti in prova", amount: 4000 },
  { item: "Riserva", use: "Test e imprevisti", amount: 2000 },
];

// Clienti portati da ogni canale e spesa diretta del canale
export const perChannel = [
  { channel: "Partner", spend: 10000, customers: 4 },
  { channel: "Evento", spend: 12000, customers: 3 },
  { channel: "Mail", spend: 4000, customers: 1 },
  { channel: "LinkedIn Ads", spend: 12000, customers: 2 },
];

export const guideMetric = { name: "Demo prenotate a settimana", target: 3, rule: "Se scendiamo sotto le 3 per due settimane di fila, cambiamo messaggio o canale." };

export const juryQA = [
  { q: "Perché niente Google?", a: "La categoria è nuova: quasi nessuno cerca «role play AI per venditori». Lo testiamo dal mese 4 con 1.000 € della riserva, sulle ricerche legate a Fondimpresa." },
  { q: "Da dove vengono i numeri?", a: "Sono ipotesi prudenti, dichiarate. Le conversioni dell'imbuto sono 1 su 4, 1 su 3 e 2 su 5: nessuna è esagerata." },
  { q: "E se i clienti non restano 3 anni?", a: "Anche con un solo anno l'LTV è 13.500 €, cioè 2,7 volte il CAC. E per ripagare il budget bastano 4 clienti." },
  { q: "Il ROI non è troppo ottimista?", a: "È calcolato sui ricavi annui che i 10 clienti ci portano, non sull'incasso dell'anno solare: i clienti arrivano nel corso dei 6 mesi." },
  { q: "Perché non Instagram o TikTok?", a: "Il nostro compratore è un direttore commerciale: decide su LinkedIn e alle fiere di settore." },
  { q: "Perché Fondimpresa?", a: "Toglie l'obiezione numero uno, il prezzo: l'azienda paga con soldi che ha già versato per la formazione." },
];

// Valori derivati
export const arrPerCustomer = icp.seatsPerCustomer * price.perSeatMonth * 12; // 18.000
export const ltv = Math.round(arrPerCustomer * unit.grossMargin * unit.lifetimeYears); // 40.500
export const budgetTotal = budget.reduce((s, b) => s + b.amount, 0); // 50.000
export const customers = funnel[funnel.length - 1].value; // 10
export const cac = Math.round(budgetTotal / customers); // 5.000
export const ltvToCac = ltv / cac; // 8,1
export const monthlyMargin = (arrPerCustomer * unit.grossMargin) / 12; // 1.125
export const paybackMonths = cac / monthlyMargin; // 4,4
export const firstYearRevenue = customers * arrPerCustomer; // 180.000
export const firstYearMargin = firstYearRevenue * unit.grossMargin; // 135.000
export const roiFirstYear = (firstYearMargin - budgetTotal) / budgetTotal; // 1,7
export const breakEvenCustomers = Math.ceil(budgetTotal / (arrPerCustomer * unit.grossMargin)); // 4
export const partnerCommission = Math.round(arrPerCustomer * 0.1); // 1.800

// Punto delle migliaia anche a 4 cifre (5.000), che toLocaleString("it-IT") non mette
export const num = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const eur = (n: number) => `${num(n)} €`;
