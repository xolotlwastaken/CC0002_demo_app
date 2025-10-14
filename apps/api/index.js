import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { parsePreferences } from './lib/prefsParser.js'
import { solveSchedule } from './lib/solver.js'
import { modules as mockModules, class_indexes as mockClassIndexes } from './mockData.js'

const app = express()
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ntustarwarsapp.vercel.app'
  ],
  credentials: true
}))
app.use(express.json())

let supabase = null
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false }
  })
} else {
  console.warn('SUPABASE_URL or SUPABASE_SERVICE_KEY not set — using in-memory mock data')
}

app.get('/health', (_, res) => res.json({ ok: true }))

app.get('/modules', async (req, res) => {
  const q = req.query.q?.toUpperCase()
  if (!supabase) {
    const data = mockModules.filter(m => !q || m.code.includes(q)).slice(0,200)
    return res.json(data)
  }
  let query = supabase.from('modules').select('*').limit(200)
  if (q) query = query.ilike('code', `%${q}%`)
  const { data, error } = await query
  if (error) return res.status(500).json({ error: error.message })
  res.json(data || [])
})

app.get('/modules/:code/indexes', async (req, res) => {
  const code = req.params.code.toUpperCase()
  if (!supabase) {
    const data = mockClassIndexes.filter(ci => ci.module_code === code).sort((a,b) => (a.day_of_week - b.day_of_week) || a.start_time.localeCompare(b.start_time))
    return res.json(data)
  }
  const { data, error } = await supabase
    .from('class_indexes')
    .select('*')
    .eq('module_code', code)
    .order('day_of_week')
    .order('start_time')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data || [])
})

app.post('/schedule/auto', async (req, res) => {
  const Schema = z.object({
    message: z.string(),
    modules: z.array(z.string()).min(1)
  })
  const parse = Schema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: parse.error.issues })

  const { message, modules } = parse.data

  let rows = []
  if (!supabase) {
    rows = mockClassIndexes.filter(ci => modules.map(m=>m.toUpperCase()).includes(ci.module_code))
  } else {
    const { data: dbrows, error } = await supabase
      .from('class_indexes')
      .select('*')
      .in('module_code', modules.map(m => m.toUpperCase()))
    if (error) return res.status(500).json({ error: error.message })
    rows = dbrows || []
  }

  const constraints = parsePreferences(message)
  const solution = solveSchedule(rows, constraints)
  if (!solution) return res.status(409).json({ error: 'No feasible schedule found' })
  res.json(solution)
})

// Start server (for local development and Vercel)
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`API listening on :${port}`)
})

// Export for Vercel serverless deployment
export default app
