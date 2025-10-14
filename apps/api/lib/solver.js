function timeToMin(t) { if (!t) return 0; const [h,m] = t.split(':').map(Number); return h*60 + (m||0) }
function overlap(a, b) { return Math.max(a.start, b.start) < Math.min(a.end, b.end) }

function scoreSolution(assignments, constraints) {
  const days = new Set(assignments.map(a => a.day_of_week))
  let score = 0
  score -= days.size * 10

  const latestEndByDay = {}
  assignments.forEach(a => {
    latestEndByDay[a.day_of_week] = Math.max(latestEndByDay[a.day_of_week]||0, a.end)
  })
  Object.values(latestEndByDay).forEach(end => { score -= end/60 })

  if (constraints.no_morning) {
    assignments.forEach(a => { if ((a.start/60) < 10) score -= 5 })
  }

  if (constraints.prefer_days?.length) {
    assignments.forEach(a => { if (constraints.prefer_days.includes(a.day_of_week)) score += 2 })
  }

  return score
}

export function solveSchedule(rows, constraints) {
  // Normalize rows (could be empty)
  const blocks = (rows || []).map(r => ({
    module_code: r.module_code,
    index_code: r.index_code,
    day_of_week: r.day_of_week,
    start: timeToMin(r.start_time || r.start),
    end: timeToMin(r.end_time || r.end),
    venue: r.venue,
    type: r.type
  }))

  // Group by module -> index -> blocks
  const byModule = {}
  for (const b of blocks) {
    if (!byModule[b.module_code]) byModule[b.module_code] = {}
    const key = `${b.module_code}::${b.index_code}`
    if (!byModule[b.module_code][key]) byModule[b.module_code][key] = []
    byModule[b.module_code][key].push(b)
  }

  const modules = Object.keys(byModule)
  const choicesPerModule = modules.map(m => Object.values(byModule[m]))

  function respectsConstraints(block) {
    if (!block) return false
    if (constraints.avoid_days?.includes(block.day_of_week)) return false
    if (constraints.earliest_start && block.start < timeToMin(constraints.earliest_start)) return false
    if (constraints.latest_end && block.end > timeToMin(constraints.latest_end)) return false
    return true
  }

  const filtered = choicesPerModule.map(options => options.filter(opt => opt.every(respectsConstraints)))
  if (filtered.some(opts => opts.length === 0)) return null

  let best = null
  function backtrack(i, picked) {
    if (i === modules.length) {
      const flat = picked.flat()
      const s = scoreSolution(flat, constraints)
      if (!best || s > best.score) best = { score: s, assignments: flat }
      return
    }
    for (const opt of filtered[i]) {
      // check conflicts
      const flatPicked = picked.flat()
      let hasClash = false
      for (const p of flatPicked) {
        for (const b of opt) {
          if (p.day_of_week === b.day_of_week && overlap(p, b)) { hasClash = true; break }
        }
        if (hasClash) break
      }
      if (hasClash) continue
      picked.push(opt)
      backtrack(i+1, picked)
      picked.pop()
    }
  }
  backtrack(0, [])
  return best
}
