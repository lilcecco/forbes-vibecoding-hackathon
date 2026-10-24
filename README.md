# Coach — Vibecoding Hackathon (Next Leaders × Forbes)

Un formatore AI personale per ogni dipendente. Next.js 15 (App Router) + Tailwind 4 + Supabase.

## Avvio

Serve Node 20+ (`nvm use`).

```bash
npm install
npm run dev
```

Senza `.env.local` l'app usa i dati demo di `src/lib/mock.ts`. Per collegare Supabase copia `.env.example` in `.env.local`.

## Supabase

- Schema: `supabase/migrations/20261024000000_init.sql` (tabelle + RLS in sola lettura per la demo)
- Dati demo: `supabase/seed.sql`, generato con `npx tsx scripts/gen-seed.ts`

## Struttura

- `src/app/page.tsx` — landing
- `src/app/(app)/*` — pagine dell'app con sidebar e header (`src/components/app-shell.tsx`)
- `src/lib/data.ts` — accesso ai dati (Supabase o demo)
- `DESIGN_BRIEF.md` — pagine e funzioni per il team design

## Documentazione del team

Stato del progetto, setup, regole di lavoro e checklist di consegna: [Coach — Documentazione del team](https://claude.ai/artifact/Gx6zKktMX9gRJ9XNKMkFM9). Aggiornate il registro delle modifiche a ogni cambiamento importante.
