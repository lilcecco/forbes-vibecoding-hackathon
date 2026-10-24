// Contenuti social pronti da pubblicare: post LinkedIn, video verticali, carosello, materiali per lo stand.
// Prezzi e cifre vengono da src/lib/gtm.ts (la strategia del team), così sito, post e piano dicono gli stessi numeri.
import type { Scene } from "@/components/video-reel";
import { arrPerCustomer, eur, icp, partnerCommission, plans, price } from "./gtm";

// Fondimpresa: dati del manuale dei casi della gara (p. 4)
const fund = { unspent: "1,07 miliardi", perWorkerYear: 74, expiryYears: 2, exampleEmployees: 400 };
const fundPerYear = fund.perWorkerYear * fund.exampleEmployees; // nostro conto
const classroomPerPerson = 835; // mediana Cegos per una giornata d'aula (manuale p. 4)
const trial = plans[0]; // Prova: 30 giorni, fino a 10 venditori

export const tagline = "Allenati sul cliente finto. Vinci con quello vero.";

export const plan = [
  { day: "Lunedì", what: "Post: un dato che fa male", example: "Il miliardo di Fondimpresa non speso" },
  { day: "Mercoledì", what: "Video verticale: una conversazione difficile", example: "Il cliente che chiede il 15%" },
  { day: "Giovedì", what: "Post: partner ed eventi", example: "Batti il cliente AI, allo stand" },
  { day: "Venerdì", what: "Post: un fondatore racconta", example: "Un posto comprato non è un posto usato" },
];

export type Video = {
  id: string;
  title: string;
  format: string;
  hook: string;
  scenes: Scene[];
  caption: string;
};

export const videos: Video[] = [
  {
    id: "sconto",
    title: "Tu cosa rispondi?",
    format: "30 secondi · 9:16 · LinkedIn e YouTube Shorts",
    hook: "La conversazione che ogni venditore teme, risolta in trenta secondi.",
    scenes: [
      { seconds: 4, kind: "quote", eyebrow: "Roberto, il cliente · avatar", text: "«Il vostro concorrente mi fa il 15% in meno. Perché dovrei rinnovare?»" },
      { seconds: 4, kind: "stat", text: "Tu cosa rispondi?", sub: "Il tuo venditore regala il margine o trova un'altra strada?" },
      { seconds: 6, kind: "quote", eyebrow: "Marco, venditore", text: "«Per lei conta più il totale o la rata mensile?»" },
      { seconds: 7, kind: "card", eyebrow: "Il coach · minuto 02:50", text: "Hai offerto subito lo sconto massimo. Prova prima la franchigia più alta.", sub: "Ogni commento è legato al punto esatto della conversazione." },
      { seconds: 5, kind: "stat", text: "4,2", sub: "su 5. Domani rifà il role play." },
      { seconds: 4, kind: "logo", text: tagline, sub: "Coach · finanziabile con Fondimpresa" },
    ],
    caption: `«Il vostro concorrente mi fa il 15% in meno. Perché dovrei rinnovare?»

Il tuo venditore regala il margine o trova un'altra strada?

Con Coach si allena prima, contro un cliente AI che risponde e insiste. Il coach lo ferma nel punto esatto, minuto 02:50, e gli dice cosa provare.

${tagline}
Prova lo stesso role play dal telefono: link nei commenti.

#vendite #formazione #assicurazioni`,
  },
  {
    id: "listino",
    title: "Dal listino al role play",
    format: "30 secondi · 9:16 · registrazione dello schermo",
    hook: "Il prodotto in un colpo d'occhio: carichi un PDF, ti alleni.",
    scenes: [
      { seconds: 5, kind: "card", eyebrow: "1 · Carica", text: "Listino Polizze Casa 2027.pdf", sub: "Caricato da Elena, HR" },
      { seconds: 5, kind: "card", eyebrow: "In meno di un minuto", text: "Lezioni e scenari di role play pronti", sub: "Il docente AI lo spiega a voce" },
      { seconds: 6, kind: "quote", eyebrow: "2 · Impara · interrompi e chiedi", text: "«Qual è lo sconto massimo che posso fare al rinnovo?»" },
      { seconds: 6, kind: "quote", eyebrow: "3 · Allenati · cliente AI", text: "«Così non ci siamo: l'anno scorso pagavo 590 euro.»" },
      { seconds: 4, kind: "stat", eyebrow: "4 · Migliora", text: "4,2", sub: "il voto del coach, competenza per competenza" },
      { seconds: 4, kind: "logo", text: "Il listino nuovo, imparato da tutti in un giorno.", sub: "Coach" },
    ],
    caption: `Lunedì arriva il listino nuovo. Mercoledì i venditori lo devono vendere.

Con Coach lo carichi, il docente AI lo spiega a voce a ognuno, e un cliente AI chiede lo sconto. Il coach dà il voto.

Carica → Impara → Allenati → Migliora. Tutto in un giorno.

#formazione #HR #vendite`,
  },
  {
    id: "aula",
    title: "Aula o Coach",
    format: "25 secondi · 9:16 · grafica animata",
    hook: "Il confronto che l'HR fa in testa, messo in numeri.",
    scenes: [
      { seconds: 5, kind: "stat", eyebrow: "Un'aula", text: eur(classroomPerPerson), sub: "a partecipante, una volta l'anno" },
      { seconds: 5, kind: "stat", eyebrow: "Chi ha imparato?", text: "?", sub: "Nessun voto. Nessun dato." },
      { seconds: 5, kind: "stat", eyebrow: "Coach", text: `${price.perSeatMonth} €`, sub: "a venditore al mese, ogni giorno" },
      { seconds: 5, kind: "card", eyebrow: "Nella dashboard HR", text: "Voto su 12 competenze, per persona", sub: "Chi si allena, chi è pronto, chi no. Si esporta in Excel." },
      { seconds: 5, kind: "logo", text: "Si paga col conto Fondimpresa che hai già.", sub: "Coach" },
    ],
    caption: `Una giornata d'aula: ${eur(classroomPerPerson)} a partecipante. Una volta l'anno. Nessuno sa chi ha imparato.

Coach: ${price.perSeatMonth} € a venditore al mese. Ci si allena ogni giorno, sul proprio listino, e l'HR vede chi è pronto.

E si paga col conto formazione Fondimpresa.

#HR #formazione #Fondimpresa`,
  },
];

export type Post = {
  id: string;
  day: string;
  title: string;
  text: string;
  visual: { big: string; small: string };
  source?: string;
};

export const posts: Post[] = [
  {
    id: "fondo",
    day: "Lunedì",
    title: "Il miliardo che scade",
    visual: { big: fund.unspent, small: "non spesi nei conti formazione di Fondimpresa" },
    text: `${fund.unspent} di euro.

È quanto le aziende italiane hanno lasciato nei conti formazione di Fondimpresa a fine 2025. I saldi non spesi scadono dopo ${fund.expiryYears} anni.

Un'azienda da ${fund.exampleEmployees} dipendenti accantona circa ${eur(fundPerYear)} l'anno.
Con ${eur(arrPerCustomer)} alleni ${icp.seatsPerCustomer} venditori per un anno intero.

Coach trasforma il tuo listino in lezioni a voce e in role play con un cliente AI. Il coach dà il voto, tu vedi chi è pronto.

Scrivi FONDO nei commenti: ti diciamo come usarlo prima che scada.

#HR #formazione #Fondimpresa`,
    source: `Manuale dei casi p. 4. ${eur(fundPerYear)} = ${fund.perWorkerYear} € × ${fund.exampleEmployees} dipendenti (nostro conto).`,
  },
  {
    id: "sconto",
    day: "Mercoledì",
    title: "Il cliente vuole il 15%",
    visual: { big: "02:50", small: "«Hai offerto subito lo sconto massimo.»" },
    text: `«Il vostro concorrente mi fa il 15% in meno. Perché dovrei rinnovare?»

Quanti dei tuoi venditori sanno cosa rispondere, senza regalare il margine?

Marco ci ha provato con Coach, contro un cliente AI che fa Roberto, titolare di un negozio.
02:50, il coach lo ferma: «Hai offerto subito lo sconto massimo. Prova prima la franchigia più alta.»
03:40, scopre che a Roberto interessa la rata mensile, non il totale.

Voto: 4,2 su 5. Il giorno dopo rifà il role play.

${tagline}`,
  },
  {
    id: "stand",
    day: "Giovedì",
    title: "Batti il cliente AI",
    visual: { big: "3 minuti", small: "Batti il cliente AI · allo stand di Coach" },
    text: `Al prossimo Italian Insurtech Summit vi aspettiamo allo stand con una sfida.

Tre minuti contro un cliente AI che vuole il 15% di sconto e non molla.
Il coach vi dà il voto su ogni competenza. La classifica è sul maxischermo.

Chi vince porta la sua squadra a provare Coach gratis per 30 giorni.

Portate il vostro miglior venditore. ${tagline}

#assicurazioni #insurtech #vendite`,
  },
  {
    id: "partner",
    day: "Giovedì",
    title: "Per consulenti ed enti formativi",
    visual: { big: eur(partnerCommission), small: "a voi, per ogni azienda che porta Coach nei suoi venditori" },
    text: `Sei un consulente del lavoro, un agente o un ente formativo?

I tuoi clienti hanno un conto Fondimpresa e venditori da formare. Tu hai la loro fiducia.

Coach è un prodotto pronto da inserire nei piani finanziati: lezioni a voce e role play con un cliente AI, sul listino dell'azienda, con il voto per ogni venditore.

Per ogni azienda che porti, il 10% del primo anno: circa ${eur(partnerCommission)}. Paghiamo solo a risultato.

Scrivici: ti mandiamo il kit per il partner.`,
  },
  {
    id: "posti",
    day: "Venerdì",
    title: "Un posto comprato non è un posto usato",
    visual: { big: "1%", small: "degli allievi attivi in una settimana, in una grande piattaforma" },
    text: `Comprare la formazione è facile. Farla usare no.

Un cliente di BetterUp aveva assegnato il 2% dei posti che pagava. GoodHabitz dice che circa l'1% dei suoi allievi è attivo in una settimana.
Quando Learnn mette gli allenamenti in calendario, l'uso passa dal 23% a oltre l'80%.

Per questo la prova di Coach dura ${trial.unit.replace("per ", "")}, con una data: «il listino nuovo parte il 1° febbraio, entro quel giorno cinque role play a testa».
E il direttore commerciale vede ogni settimana chi si è allenato.

Se il numero scende, lo sai prima del rinnovo. Non dopo.`,
    source: "Manuale dei casi p. 2 e 3.",
  },
];

export const carousel = {
  title: "5 frasi che fanno perdere un rinnovo",
  slides: [
    { quote: "«Le faccio subito lo sconto massimo.»", why: "Hai regalato il margine prima di sapere cosa conta per lui." },
    { quote: "«È il listino, non posso farci niente.»", why: "Il cliente sente: il tuo problema non mi interessa." },
    { quote: "«Le mando tutto per mail.»", why: "La conversazione finisce lì, e decide da solo." },
    { quote: "«Sì, ma…»", why: "Alla parola «ma» il cliente smette di ascoltare." },
    { quote: "«Ci pensi e mi richiama.»", why: "Non richiama. Proponi due strade e una data." },
  ],
  cta: `Allenale prima, con un cliente AI. ${tagline}`,
};

export const printed = [
  {
    title: "Cartolina per lo stand",
    format: "A6, fronte e retro",
    front: tagline,
    back: `Prova gratis per 30 giorni, ${trial.for.toLowerCase()}. Poi ${price.perSeatMonth} € a venditore al mese, finanziabile col conto Fondimpresa. Inquadra il codice e batti il cliente AI adesso.`,
  },
  {
    title: "Roll-up per lo stand",
    format: "85 × 200 cm",
    front: "Batti il cliente AI. Tre minuti, un voto, la classifica.",
    back: "Coach · il simulatore di volo per i tuoi venditori · finanziabile con Fondimpresa",
  },
];
