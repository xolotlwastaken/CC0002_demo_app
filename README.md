# NTU STAR WARS Planner — Starter

Minimal local scaffold for the NTU STAR WARS Planner (React frontend, Express backend, Supabase schema).

See `supabase/seed.sql` for DB schema and sample data. Run the API in `apps/api` and the web app in `apps/web`.

Quick start (Windows PowerShell):

```powershell
cd "c:/Users/65943/Desktop/CC0002 App/ntu-starwars-planner/apps/api"
npm install
npm run dev

# in a separate shell
cd "c:/Users/65943/Desktop/CC0002 App/ntu-starwars-planner/apps/web"
npm install
npm run dev
```

You will need a Supabase project to run with `supabase/seed.sql` (paste into SQL editor) and set `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in `apps/api/.env`.
