export function parsePreferences(msg) {
  const text = (msg || '').toLowerCase()
  const prefers = {
    minimize_days: /least number of days|minimi[sz]e days|fewer days|compact week/.test(text),
    no_morning: /no (early )?morning|start after (9|10|11)/.test(text),
    early_finish: /end early|finish by|no classes after/.test(text),
    avoid_days: [],
    prefer_days: [],
    earliest_start: null,
    latest_end: null
  }

  const dayMap = { mon:1, tue:2, wed:3, thu:4, fri:5, sat:6, sun:7 }
  Object.entries(dayMap).forEach(([k, v]) => {
    const reAvoid = new RegExp(`avoid ${k}|no ${k}`)
    const rePrefer = new RegExp(`prefer ${k}|${k} only`)
    if (reAvoid.test(text)) prefers.avoid_days.push(v)
    if (rePrefer.test(text)) prefers.prefer_days.push(v)
  })

  const startMatch = text.match(/start after (\d{1,2})(?::(\d{2}))?/) // start after 10[:30]
  if (startMatch) prefers.earliest_start = `${startMatch[1].padStart(2,'0')}:${(startMatch[2]||'00')}`

  const endMatch = text.match(/(finish by|end by|no classes after) (\d{1,2})(?::(\d{2}))?/)
  if (endMatch) prefers.latest_end = `${endMatch[2].padStart(2,'0')}:${(endMatch[3]||'00')}`

  return prefers
}
