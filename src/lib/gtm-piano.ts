// Piano di go to market di Coach: prezzo, imbuto, budget, canali e metriche.
// Ogni numero ha una fonte (il manuale dei casi della gara, con la pagina) oppure è un'ipotesi nostra.
// I numeri derivati (CAC, LTV, ROI, somma del budget) si calcolano qui: se cambiate un'ipotesi, si aggiorna tutto.

export const MANUALE = "Manuale dei casi, sintesi";

// useGrouping "always": in italiano Intl non separa le migliaia sotto 10.000 ("5000 €")
const eur = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0, useGrouping: "always" });
const num = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 1, useGrouping: "always" });
export const formatEur = (n: number) => eur.format(n);
export const formatNum = (n: number) => num.format(n);
export const formatPct = (n: number) => `${num.format(Math.round(n * 1000) / 10)}%`;

// Prezzo
export const pricing = {
  seatPrice: 19, // € a persona al mese. Ipotesi, nella fascia 15-20 € per i piccoli team (manuale p. 3 e 14)
  seats: 50, // posti del primo contratto: una coorte da circa 50 posti (manuale p. 5)
  pilotWeeks: 8,
  pilotMonths: 2,
  classroomPerPerson: 835, // mediana Cegos per partecipante a una giornata d'aula (manuale p. 4)
  directAwardCap: 140_000, // soglia dell'affidamento diretto (manuale p. 4 e 14)
};
export const pilotPrice = pricing.seats * pricing.seatPrice * pricing.pilotMonths; // 1.900 €
export const acv = pricing.seats * pricing.seatPrice * 12; // ricavo per cliente in un anno: 11.400 €

// Economia del cliente
export const unit = {
  grossMargin: 0.7, // ipotesi, la stessa del conto d'esempio del manuale (p. 14)
  lifetimeYears: 3, // ipotesi prudente: Udemy Business trattiene l'82% della spesa dei clienti piccoli (manuale p. 4)
};
export const ltv = acv * unit.grossMargin * unit.lifetimeYears; // 23.940 €
export const ltvTwoYears = acv * unit.grossMargin * 2; // come nel conto d'esempio del manuale

// Fondimpresa
export const fund = {
  perWorkerYear: 74, // accredito medio a lavoratore l'anno (manuale p. 4)
  unspentBillions: 1.07, // saldi non spesi a fine 2025 (manuale p. 2 e 4)
  expiryYears: 2, // i saldi non spesi scadono dopo due anni (manuale p. 4)
  avgPlan: 10_600, // valore medio di un piano (manuale p. 4)
  exampleEmployees: 400, // l'azienda tipo del nostro ICP (ipotesi)
};
export const fundPerYearExample = fund.perWorkerYear * fund.exampleEmployees; // 29.600 €

// Imbuto: sei mesi, da novembre 2026 ad aprile 2027. Tutte ipotesi.
export const funnel = [
  { step: "Vedono", detail: "Post e annunci LinkedIn, newsletter degli enti partner, inviti alle cene", value: 40_000 },
  { step: "Cliccano", detail: "Aprono il sito e provano un role play dal telefono", value: 2_000 },
  { step: "Provano", detail: "Primo incontro con un role play sul loro listino", value: 100 },
  { step: "Pilota pagato", detail: `${pricing.seats} posti, ${pricing.pilotWeeks} settimane, una data di fine`, value: 20 },
  { step: "Pagano l'anno", detail: `Contratto annuale da ${pricing.seats} posti`, value: 10 },
];
export const customers = funnel[funnel.length - 1].value;
export const pilots = funnel[3].value;

// Budget da 50.000 €, voce per voce
export type Lever = "Convenzioni" | "Fisico" | "Pubblicità" | "Contenuti" | "Partnership" | "Vendita diretta" | "Fiducia" | "Riserva";

export const budget: { item: string; detail: string; amount: number; lever: Lever; source?: string }[] = [
  { item: "Commissioni agli enti di formazione", detail: `Il 25% del primo anno sui 4 clienti che portano (4 × ${formatEur(acv)} × 25%). Se ne portano meno, la differenza torna nella riserva.`, amount: 11_400, lever: "Convenzioni", source: "Quota ai rivenditori di formazione dal 20 al 30%: manuale p. 5 e 14" },
  { item: "Kit per gli enti partner", detail: "La scheda del piano Fondimpresa già scritta, la demo col loro marchio, due giornate per formare i loro formatori.", amount: 1_600, lever: "Convenzioni" },
  { item: "Quattro cene per responsabili del personale", detail: "Dieci HR dello stesso settore e un role play dal vivo sulla loro squadra: Milano due volte, Roma, Torino. 2.500 € l'una.", amount: 10_000, lever: "Fisico", source: "La mossa da copiare per le medie imprese: manuale p. 4" },
  { item: "Materiali per le cene", detail: "Due tablet per la prova dal vivo, cartoline col QR, un roll-up.", amount: 1_500, lever: "Fisico" },
  { item: "LinkedIn Ads", detail: "Solo per chi ha già visto la demo e per gli inviti alle cene: verso una demo, LinkedIn rende 0,58 € per euro nel primo anno.", amount: 4_000, lever: "Pubblicità", source: "Manuale p. 4 e 13" },
  { item: "Google Ads sulla ricerca", detail: "Solo ricerche di chi sta già comprando: «formazione finanziata Fondimpresa», «role play vendita».", amount: 3_000, lever: "Pubblicità" },
  { item: "Produzione dei contenuti social", detail: "Video verticali con l'avatar, montaggio e grafiche per tre post a settimana, per sei mesi.", amount: 3_500, lever: "Contenuti" },
  { item: "Una pagina per ogni domanda", detail: "Venti pagine, una per conversazione difficile e settore: «Il cliente chiede lo sconto al rinnovo».", amount: 2_000, lever: "Contenuti", source: "Lezione 2: manuale p. 2" },
  { item: "Partnership con Zucchetti HR", detail: "I progressi di Coach nel software del personale e un webinar con i loro rivenditori.", amount: 3_000, lever: "Partnership", source: "Zucchetti: i rivenditori gestiscono nove clienti su dieci, manuale p. 4" },
  { item: "Strumenti di vendita", detail: "Due licenze LinkedIn Sales Navigator, CRM e invio delle mail per sei mesi.", amount: 1_500, lever: "Vendita diretta" },
  { item: "Parere legale su AI Act e privacy", detail: "I punteggi dati da un'AI ai lavoratori sono ad alto rischio per l'AI Act: lo verifichiamo prima del primo pilota.", amount: 2_500, lever: "Fiducia", source: "Manuale p. 4" },
  { item: "Tre casi misurati", detail: "Prima e dopo, contro un gruppo che non si è allenato, sui primi tre clienti.", amount: 1_500, lever: "Fiducia", source: "Manuale p. 4" },
  { item: "Riserva per gli esperimenti", detail: "A febbraio va tutta al canale con il CAC più basso.", amount: 4_500, lever: "Riserva" },
];
export const BUDGET_TOTAL = 50_000;
export const budgetSum = budget.reduce((s, b) => s + b.amount, 0);
if (budgetSum !== BUDGET_TOTAL) throw new Error(`Il budget somma ${budgetSum}, non ${BUDGET_TOTAL}`);

export const budgetByLever = (Object.entries(
  budget.reduce<Record<string, number>>((acc, b) => ({ ...acc, [b.lever]: (acc[b.lever] ?? 0) + b.amount }), {}),
) as [Lever, number][]).sort((a, b) => b[1] - a[1]);

// Digitale e fisico: le stesse voci, raggruppate
export const split = {
  digitale: budget.filter((b) => ["Pubblicità", "Contenuti", "Vendita diretta"].includes(b.lever)).reduce((s, b) => s + b.amount, 0),
  fisico: budget.filter((b) => b.lever === "Fisico").reduce((s, b) => s + b.amount, 0),
  partner: budget.filter((b) => ["Convenzioni", "Partnership"].includes(b.lever)).reduce((s, b) => s + b.amount, 0),
  altro: budget.filter((b) => ["Fiducia", "Riserva"].includes(b.lever)).reduce((s, b) => s + b.amount, 0),
};

// Metriche
export const cac = BUDGET_TOTAL / customers; // 5.000 €
export const ltvOverCac = ltv / cac;
export const ltvOverCacTwoYears = ltvTwoYears / cac;
export const firstYearRevenue = customers * acv + (pilots - customers) * pilotPrice; // i piloti non convertiti pagano comunque
export const firstYearMargin = firstYearRevenue * unit.grossMargin;
export const roi = (firstYearMargin - BUDGET_TOTAL) / BUDGET_TOTAL;
export const paybackMonths = cac / ((acv * unit.grossMargin) / 12);

// Canali di vendita: da chi passiamo per arrivare all'azienda. Incontri e clienti sono ipotesi.
export const channels = [
  {
    name: "Enti di formazione titolati Fondimpresa",
    lever: "Convenzione",
    cost: 13_000,
    meetings: 32,
    customers: 4,
    why: "Progettano già i piani formativi dei nostri clienti e li fanno pagare al fondo. Aggiungono un modulo misurabile col loro marchio e prendono il 25% del primo anno.",
    stop: "Su dieci enti contattati, almeno due prenotano una coorte con una data (soglia del manuale, p. 7). Altrimenti cambiamo la proposta.",
  },
  {
    name: "Cene per responsabili del personale",
    lever: "Fisico",
    cost: 11_500,
    meetings: 12,
    customers: 2,
    why: "Dieci HR dello stesso settore si fidano l'uno dell'altro più che di un annuncio. Il role play si prova dal vivo, sulla loro squadra.",
    stop: "Le prime due cene portano sei primi appuntamenti e un ordine mediano di almeno 21 posti (soglia del manuale, p. 4). Altrimenti le altre due si annullano e 5.000 € vanno alla riserva.",
  },
  {
    name: "LinkedIn: post, fondatori e retargeting",
    lever: "Contenuti e pubblicità",
    cost: 9_000,
    meetings: 36,
    customers: 2,
    why: "È dove responsabili del personale e direttori commerciali leggono di lavoro. I fondatori scrivono ogni giorno a chi ha visto la demo.",
    stop: "Se dopo 2.000 € un primo incontro costa più di 250 €, gli annunci si fermano. Restano i post e i messaggi dei fondatori.",
  },
  {
    name: "Una pagina per ogni domanda, e Google",
    lever: "Digitale",
    cost: 5_000,
    meetings: 10,
    customers: 1,
    why: "Chi cerca «come rispondere al cliente che chiede lo sconto» ha già il problema. La pagina risponde e fa provare quel role play.",
    stop: "Una parola chiave si spegne dopo 60 clic senza una richiesta di demo.",
  },
  {
    name: "Zucchetti HR e i suoi rivenditori",
    lever: "Partnership",
    cost: 3_000,
    meetings: 10,
    customers: 1,
    why: "I loro rivenditori gestiscono nove clienti su dieci (manuale, p. 4). Per loro Coach è un modulo in più da vendere a clienti che hanno già.",
    stop: "Se entro gennaio i rivenditori non nominano cinque aziende, la partnership resta solo tecnica.",
  },
];
const channelMeetings = channels.reduce((s, c) => s + c.meetings, 0);
const channelCustomers = channels.reduce((s, c) => s + c.customers, 0);
if (channelMeetings !== funnel[2].value || channelCustomers !== customers) {
  throw new Error("I canali non tornano con l'imbuto");
}
export const sharedCost = BUDGET_TOTAL - channels.reduce((s, c) => s + c.cost, 0); // fiducia e riserva

// Metrica guida
export const northStar = {
  name: "Posti attivi a settimana",
  definition: "Le persone che hanno fatto almeno un role play negli ultimi sette giorni, sul totale dei posti pagati.",
  target: 0.6,
  why: "Un posto comprato e un posto usato sono due cose diverse: GoodHabitz dice che circa l'1% dei suoi allievi è attivo in una settimana, mentre Learnn passa dal 23% a oltre l'80% quando gli allenamenti sono in calendario (manuale p. 2 e 3). Mandiamo questo numero all'HR ogni lunedì, prima che lo chieda.",
};
export const paidSeats = customers * pricing.seats;

// Calendario
export const timeline = [
  { when: "Novembre 2026", what: "Firmiamo sei enti di formazione con il kit. Partono i post su LinkedIn e le prime dieci pagine. Parere legale sull'AI Act." },
  { when: "Dicembre 2026", what: "Due cene a Milano, assicurazioni e banche: è il trimestre in cui gli HR scrivono il budget dell'anno dopo (manuale p. 4). LinkedIn Ads sugli invitati." },
  { when: "Gennaio 2027", what: "Partono i piloti, ognuno con una data: «il listino 2027 parte il 1° febbraio, entro quel giorno ognuno fa cinque role play». Cene a Roma e Torino. Webinar con Zucchetti." },
  { when: "Febbraio 2027", what: "Controllo dei canali: la riserva va a quello col CAC più basso. Primi casi misurati contro il gruppo di controllo." },
  { when: "Marzo e aprile 2027", what: "I piloti diventano contratti annuali. Pubblichiamo i tre casi e prepariamo il modulo per il catalogo IVASS, che le reti assicurative scelgono a settembre (manuale p. 7)." },
];
