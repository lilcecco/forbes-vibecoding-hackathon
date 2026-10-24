# Coach — Brief per il team design

**Prodotto:** Coach, un formatore AI personale per ogni dipendente (B2B).
**Chi compra:** chi dirige il personale, le vendite o la formazione (HR, L&D, direttore vendite).
**Chi usa:** i dipendenti (vendite, customer care, manager, neoassunti).
**Vincolo della giuria:** si apre da telefono e il prodotto si capisce in 5 secondi.

Il flusso del prodotto è in 4 passi — **Carica → Impara → Allenati → Migliora** — e le pagine lo seguono.

## Layout

SaaS classico:
- **Sidebar** a sinistra (248px su desktop, drawer su mobile): logo, 5 voci, box "Finanziabile con Fondimpresa" in fondo.
- **Header** in alto (64px, sticky): titolo pagina, ricerca, notifiche, utente (Elena Marchi, HR · Nordica Assicurazioni — azienda inventata).
- Contenuto su sfondo grigio chiaro, card bianche con bordo sottile, raggio 12px.

Design token in `src/app/globals.css` (colori brand, superfici, testo, stati). Oggi brand = indigo `#4f46e5`, font Geist. Cambiate lì e si aggiorna tutto.

## Pagine (7)

| # | Pagina | URL | Per chi | Passo |
|---|--------|-----|---------|-------|
| 0 | Landing | `/` | Giuria / chi compra | — |
| 1 | Dashboard | `/dashboard` | HR / manager | Migliora |
| 2 | Contenuti | `/contenuti` | HR / esperti | Carica |
| 3 | Impara | `/impara` | Dipendente | Impara |
| 4 | Role play (libreria) | `/roleplay` | Dipendente | Allenati |
| 4a | Sessione role play | `/roleplay/[id]` | Dipendente | Allenati |
| 4b | Report del coach | `/report/[id]` | Dipendente / manager | Migliora |
| 5 | Team | `/team` | HR / manager | Migliora |

### 0. Landing (`/`)
È la consegna obbligatoria per Coach. Sezioni: hero con promessa + CTA "Prova un role play" e "Guarda la dashboard"; 4 passi; "Per chi" (Vendite, Servizio clienti, Manager, Neoassunti); prezzo (19 €/dipendente/mese — ipotesi); footer.
**Da aggiungere (contenuti del team strategia):** sezioni Strategia GTM, Numeri (ICP, CAC, LTV, ROI), Budget 50k, Canali, Contenuti social.

### 1. Dashboard (`/dashboard`)
- 4 KPI: tempo di pratica, role play completati, punteggio medio, persone pronte (≥ 4/5)
- Grafico ore di pratica per settimana
- Barre di punteggio medio per competenza
- Ultimi role play (cliccabili → report)
- "Chi migliora di più"
- Bottone **Esporta in Excel** (scarica CSV)

### 2. Contenuti (`/contenuti`)
- Dropzone per caricare listino / procedura / scheda prodotto, con stati animati (lettura → lezioni → scenari → pronto)
- Box "Il sapere degli esperti" (le note dei migliori venditori)
- Lista documenti: tipo, chi l'ha caricato, data, stato (pronto con N lezioni / in elaborazione)

### 3. Impara (`/impara`)
- Lista lezioni generate dai documenti, con progresso
- Player del **docente AI**: avatar, onda audio animata, Ascolta/Pausa, capitoli che avanzano
- **Interrompi e chiedi**: chat con il docente (risposta demo)

### 4. Role play (`/roleplay`)
- Scenari raggruppati per area; card con ruolo dell'avatar (Cliente / Collega / Compratore / Collaboratore), difficoltà, durata, competenze allenate, CTA "Inizia"

### 4a. Sessione (`/roleplay/[id]`)
- Finestra "videochiamata" con avatar (oggi un cerchio con iniziale: **serve visual dell'avatar**), REC + timer, riquadro "Tu"
- Checklist competenze che si spuntano ("3 di 5")
- Trascrizione che scorre in tempo reale
- Microfono on/off, **Termina e ricevi il voto**

### 4b. Report (`/report/[id]`)
- Voto grande (es. 4,2/5) + barre per competenza
- **Timeline del riscontro**: ogni commento legato al minuto esatto della conversazione (positivo / da migliorare)
- Prossimo allenamento consigliato + "Rifai il role play"

### 5. Team (`/team`)
- Tabella persone: area, livello, tempo di pratica, role play, punteggio, trend, ultima attività
- Esporta in Excel

## Componenti riusabili
Card, Badge (neutral / brand / success / warning / danger), Button (primary / secondary / ghost), Progress bar, ScorePill (colore in base al voto), Avatar con iniziali, PageHeader (titolo + descrizione + azione).

## Cosa serve dal design
1. Logo e colore brand definitivi
2. Visual dell'avatar per il role play (illustrazione o foto) e del docente AI
3. Hero della landing (mockup del prodotto su telefono)
4. Stile del grafico della dashboard
5. Template per post e video social (stanno nel sito)
