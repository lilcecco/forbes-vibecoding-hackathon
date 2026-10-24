// Contenuti social pronti da pubblicare: post LinkedIn, video verticali, carosello, materiali per le cene.
// Le cifre vengono da src/lib/gtm.ts, così post e piano dicono gli stessi numeri.
import type { Scene } from "@/components/video-reel";
import { acv, formatEur, formatNum, fund, fundPerYearExample, pilotPrice, pricing } from "./gtm";

export const plan = [
  { day: "Lunedì", what: "Un dato che fa male", example: "Il miliardo di Fondimpresa non speso" },
  { day: "Mercoledì", what: "Una conversazione difficile, in video", example: "Il cliente che chiede il 15%" },
  { day: "Venerdì", what: "Un fondatore racconta cosa ha visto", example: "Un posto comprato non è un posto usato" },
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
    title: "Il 15% di sconto",
    format: "30 secondi · 9:16 · LinkedIn e YouTube Shorts",
    hook: "La conversazione che ogni venditore teme, risolta in trenta secondi.",
    scenes: [
      { seconds: 4, kind: "quote", eyebrow: "Roberto, il cliente · avatar", text: "«Voglio il 15% di sconto, altrimenti vado altrove.»" },
      { seconds: 4, kind: "stat", text: "E adesso?", sub: "Il tuo venditore cosa risponde?" },
      { seconds: 6, kind: "quote", eyebrow: "Marco, sales executive", text: "«Per lei conta più il totale o la rata mensile?»" },
      { seconds: 7, kind: "card", eyebrow: "Il coach · minuto 02:50", text: "Hai offerto subito lo sconto massimo. Prova prima la franchigia più alta.", sub: "Ogni commento è legato al punto esatto della conversazione." },
      { seconds: 5, kind: "stat", text: "4,2", sub: "su 5. Domani rifà il role play." },
      { seconds: 4, kind: "logo", text: "Allena la conversazione che porta i soldi.", sub: "Coach · finanziabile con Fondimpresa" },
    ],
    caption: `«Voglio il 15% di sconto, altrimenti vado altrove.»

Il tuo venditore regala il margine o trova un'altra strada?

Con Coach si allena prima, contro un avatar che fa il cliente. Il coach lo ferma nel punto esatto, minuto 02:50, e gli dice cosa provare.

Prova lo stesso role play dal telefono: link nei commenti.

#vendite #formazione #assicurazioni`,
  },
  {
    id: "listino",
    title: "Dal listino al role play",
    format: "30 secondi · 9:16 · registrazione dello schermo",
    hook: "Il prodotto in un colpo d'occhio: carichi un PDF, ti alleni.",
    scenes: [
      { seconds: 5, kind: "card", eyebrow: "1 · Carica", text: "Listino Polizze Casa 2027.pdf", sub: "820 KB · caricato da Elena, HR" },
      { seconds: 5, kind: "card", eyebrow: "In meno di un minuto", text: "4 lezioni · 6 scenari di role play", sub: "Il docente AI lo spiega a voce" },
      { seconds: 6, kind: "quote", eyebrow: "2 · Impara · interrompi e chiedi", text: "«Qual è lo sconto massimo che posso fare al rinnovo?»" },
      { seconds: 6, kind: "quote", eyebrow: "3 · Allenati · avatar", text: "«Così non ci siamo: l'anno scorso pagavo 590 euro.»" },
      { seconds: 4, kind: "stat", eyebrow: "4 · Migliora", text: "3h 20m", sub: "di pratica della squadra vendite, oggi" },
      { seconds: 4, kind: "logo", text: "Il listino nuovo, imparato da tutti in un giorno.", sub: "Coach" },
    ],
    caption: `Lunedì arriva il listino nuovo. Mercoledì i venditori lo devono vendere.

Con Coach lo carichi, il docente AI lo spiega a voce a ognuno, e un avatar fa il cliente che chiede lo sconto. Il coach dà il voto.

Carica → Impara → Allenati → Migliora. Tutto in un giorno.

#formazione #HR #vendite`,
  },
  {
    id: "aula",
    title: "Aula o Coach",
    format: "25 secondi · 9:16 · grafica animata",
    hook: "Il confronto che l'HR fa in testa, messo in numeri.",
    scenes: [
      { seconds: 5, kind: "stat", eyebrow: "Un'aula", text: formatEur(pricing.classroomPerPerson), sub: "a partecipante, una volta l'anno" },
      { seconds: 5, kind: "stat", eyebrow: "Chi ha imparato?", text: "?", sub: "Nessun voto. Nessun dato." },
      { seconds: 5, kind: "stat", eyebrow: "Coach", text: `${pricing.seatPrice} €`, sub: "a persona al mese, ogni giorno" },
      { seconds: 5, kind: "card", eyebrow: "Ogni lunedì", text: "Posti attivi: 64%", sub: "Chi si allena, chi è pronto, chi no" },
      { seconds: 5, kind: "logo", text: "Si paga col conto Fondimpresa che hai già.", sub: "Coach" },
    ],
    caption: `Una giornata d'aula: ${formatEur(pricing.classroomPerPerson)} a partecipante (mediana Cegos). Una volta l'anno. Nessuno sa chi ha imparato.

Coach: ${pricing.seatPrice} € a persona al mese. Ci si allena ogni giorno, sul proprio listino, e ogni lunedì l'HR vede chi è pronto.

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
    visual: { big: `${formatNum(fund.unspentBillions)} miliardi`, small: "non spesi nei conti formazione di Fondimpresa" },
    text: `${formatNum(fund.unspentBillions)} miliardi di euro.

È quanto le aziende italiane hanno lasciato nei conti formazione di Fondimpresa a fine 2025. I saldi non spesi scadono dopo ${fund.expiryYears} anni.

Un'azienda da ${fund.exampleEmployees} dipendenti accantona circa ${formatEur(fundPerYearExample)} l'anno.
Con ${formatEur(acv)} alleni ${pricing.seats} persone che parlano coi clienti, per un anno intero.

Coach trasforma il tuo listino in lezioni a voce e in role play con un avatar che fa il cliente. Il coach dà il voto, tu vedi chi è pronto.

Scrivi FONDO nei commenti: ti diciamo come usarlo prima che scada.

#HR #formazione #Fondimpresa`,
    source: `Manuale dei casi p. 4. ${formatEur(fundPerYearExample)} = ${fund.perWorkerYear} € × ${fund.exampleEmployees} dipendenti (nostro conto).`,
  },
  {
    id: "sconto",
    day: "Mercoledì",
    title: "Il cliente vuole il 15%",
    visual: { big: "02:50", small: "«Hai offerto subito lo sconto massimo.»" },
    text: `«Voglio il 15% di sconto, altrimenti vado altrove.»

Quanti dei tuoi venditori sanno cosa rispondere, senza regalare il margine?

Marco ci ha provato con Coach, contro un avatar che fa Roberto, titolare di un negozio.
02:50, il coach lo ferma: «Hai offerto subito lo sconto massimo. Prova prima la franchigia più alta.»
03:40, scopre che a Roberto interessa la rata mensile, non il totale.

Voto: 4,2 su 5. Il giorno dopo rifà il role play.

Prova lo stesso scenario dal telefono: link nei commenti.`,
  },
  {
    id: "posti",
    day: "Venerdì",
    title: "Un posto comprato non è un posto usato",
    visual: { big: "1%", small: "degli allievi attivi in una settimana, in una grande piattaforma" },
    text: `Comprare la formazione è facile. Farla usare no.

Un cliente di BetterUp aveva assegnato il 2% dei posti che pagava. GoodHabitz dice che circa l'1% dei suoi allievi è attivo in una settimana.
Quando Learnn mette gli allenamenti in calendario, l'uso passa dal 23% a oltre l'80%.

Per questo in Coach ogni pilota ha una data: «il listino nuovo parte il 1° febbraio, entro quel giorno cinque role play a testa».
E ogni lunedì l'HR riceve un numero solo: quante persone si sono allenate negli ultimi sette giorni.

Se il numero scende, lo sai prima del rinnovo. Non dopo.`,
    source: "Manuale dei casi p. 2 e 3.",
  },
  {
    id: "cena",
    day: "Invito",
    title: "La cena di Milano",
    visual: { big: "10 posti", small: "Milano · giovedì 3 dicembre · ore 20" },
    text: `Milano, giovedì 3 dicembre, ore 20.
Dieci responsabili del personale delle assicurazioni, una cena, nessuna slide.

Portate il vostro listino 2027: lo trasformiamo in un role play e lo provate dal vivo sulla vostra squadra.
Si esce col voto del coach e con un piano Fondimpresa già scritto da un ente di formazione.

10 posti. Scriveteci in privato.`,
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
  cta: "Allenale prima, con un avatar che fa il cliente. Coach.",
};

export const printed = [
  {
    title: "Cartolina per le cene",
    format: "A6, fronte e retro",
    front: "Il tuo listino 2027, imparato da tutti entro febbraio.",
    back: `Pilota: ${pricing.seats} persone, ${pricing.pilotWeeks} settimane, ${formatEur(pilotPrice)}. Finanziabile con il conto formazione Fondimpresa. Inquadra il codice e prova un role play adesso.`,
  },
  {
    title: "Roll-up per gli eventi degli enti partner",
    format: "85 × 200 cm",
    front: "Prova un role play in tre minuti. Il coach ti dà il voto.",
    back: "Coach · un formatore AI personale per ogni dipendente · finanziabile con Fondimpresa",
  },
];
