import { useEffect, useMemo, useState } from 'react'
import { api } from './api'

function Timetable({ blocks }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const startHour = 8, endHour = 20
  const hourHeight = 60 // pixels per hour

  const toY = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number)
    return ((h + m / 60) - startHour) * hourHeight
  }

  const moduleColors = useMemo(() => {
    const colors = [
      '#e5f0ff', '#ffe5f0', '#f0ffe5', '#fff0e5', '#f0e5ff',
      '#e5fff0', '#ffe5e5', '#e5ffff', '#ffffe5'
    ]
    const uniqueModules = [...new Set(blocks.map(b => b.module_code))]
    return uniqueModules.reduce((acc, mod, idx) => {
      acc[mod] = colors[idx % colors.length]
      return acc
    }, {})
  }, [blocks])

  return (
    <div className="timetable-container">
      <div className="timetable">
        <div className="time-column">
          <div className="time-header"></div>
          {[...Array(endHour - startHour + 1)].map((_, i) => (
            <div key={i} className="time-label">
              {(startHour + i).toString().padStart(2, '0')}:00
            </div>
          ))}
        </div>

        {days.map((day, dayIdx) => (
          <div key={day} className="day-column">
            <div className="day-header">{day}</div>
            <div className="day-grid">
              {[...Array(endHour - startHour)].map((_, i) => (
                <div key={i} className="hour-slot"></div>
              ))}
              {blocks
                .filter(b => b.day_of_week === dayIdx + 1)
                .map((block, idx) => (
                  <div
                    key={idx}
                    className="class-block"
                    style={{
                      top: `${toY(block.start_time)}px`,
                      height: `${toY(block.end_time) - toY(block.start_time)}px`,
                      backgroundColor: moduleColors[block.module_code],
                    }}
                  >
                    <div className="block-code">{block.module_code}</div>
                    <div className="block-type">{block.type}</div>
                    <div className="block-time">{block.start_time} – {block.end_time}</div>
                    <div className="block-venue">{block.venue}</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [modules, setModules] = useState([])
  const [selected, setSelected] = useState([])
  const [message, setMessage] = useState('I want the least number of days and start after 10am.')
  const [solution, setSolution] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/modules')
        setModules(data)
      } catch (err) {
        console.error('Failed to load modules:', err)
        setError('Failed to load modules. Is the API running?')
      }
    })()
  }, [])

  const filtered = useMemo(() => {
    if (!query) return modules.slice(0, 50)
    return modules.filter(m => 
      m.code.toUpperCase().includes(query.toUpperCase()) ||
      m.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 50)
  }, [modules, query])

  async function runAuto() {
    if (!selected.length) return
    
    setLoading(true)
    setError(null)
    
    try {
      const modCodes = selected.map(s => s.code)
      const { data } = await api.post('/schedule/auto', { 
        message, 
        modules: modCodes 
      })
      setSolution(data)
    } catch (err) {
      console.error('Scheduling failed:', err)
      setError(err.response?.data?.error || 'Failed to generate schedule')
      setSolution(null)
    } finally {
      setLoading(false)
    }
  }

  const addModule = (module) => {
    if (!selected.some(s => s.code === module.code)) {
      setSelected(prev => [...prev, module])
      setSolution(null) // Clear solution when modules change
    }
  }

  const removeModule = (code) => {
    setSelected(prev => prev.filter(s => s.code !== code))
    setSolution(null) // Clear solution when modules change
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌟 NTU STAR WARS Planner</h1>
        <p>Plan your modules and auto-generate an optimal timetable</p>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <div className="section">
            <h2>Search Modules</h2>
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by code or title (e.g., CZ2001)"
            />
          </div>

          <div className="section module-list">
            <h3>Available Modules ({filtered.length})</h3>
            <div className="scrollable-list">
              {filtered.map(m => (
                <div key={m.code} className="module-item">
                  <div className="module-info">
                    <strong>{m.code}</strong>
                    <span className="module-title">{m.title}</span>
                    <span className="module-au">{m.au} AU</span>
                  </div>
                  <button 
                    className="btn-add"
                    onClick={() => addModule(m)}
                    disabled={selected.some(s => s.code === m.code)}
                  >
                    {selected.some(s => s.code === m.code) ? '✓' : '+'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="section">
            <div className="section-header">
              <h2>Selected Modules ({selected.length})</h2>
              {selected.length > 0 && (
                <button className="btn-clear" onClick={() => {
                  setSelected([])
                  setSolution(null)
                }}>
                  Clear All
                </button>
              )}
            </div>
            <div className="selected-list">
              {selected.length === 0 ? (
                <p className="empty-state">No modules selected yet</p>
              ) : (
                selected.map(s => (
                  <div key={s.code} className="selected-item">
                    <span>
                      <strong>{s.code}</strong> — {s.title}
                    </span>
                    <button className="btn-remove" onClick={() => removeModule(s.code)}>
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="section">
            <h2>Preferences (Natural Language)</h2>
            <textarea
              className="prefs-textarea"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="e.g., least number of days, finish by 5pm, avoid Monday, no morning classes"
            />
            <div className="hint">
              💡 Try: "minimize days", "start after 10", "finish by 17:00", "avoid friday"
            </div>
          </div>

          <div className="section">
            <button
              className="btn-schedule"
              onClick={runAuto}
              disabled={!selected.length || loading}
            >
              {loading ? '⏳ Generating...' : '✨ Auto-Schedule'}
            </button>
            {error && <div className="error-message">❌ {error}</div>}
          </div>
        </div>
      </div>

      <div className="timetable-section">
        <h2>Generated Timetable</h2>
        {!solution && !error && (
          <div className="empty-timetable">
            <p>Select modules and click "Auto-Schedule" to generate your timetable</p>
          </div>
        )}
        {solution && (
          <>
            <div className="solution-stats">
              <span>📊 Score: {solution.score.toFixed(1)}</span>
              <span>📅 Days: {new Set(solution.assignments.map(a => a.day_of_week)).size}</span>
              <span>📚 Classes: {solution.assignments.length}</span>
            </div>
            <Timetable
              blocks={solution.assignments.map(a => ({
                module_code: a.module_code,
                day_of_week: a.day_of_week,
                start_time: `${String(Math.floor(a.start / 60)).padStart(2, '0')}:${String(a.start % 60).padStart(2, '0')}`,
                end_time: `${String(Math.floor(a.end / 60)).padStart(2, '0')}:${String(a.end % 60).padStart(2, '0')}`,
                venue: a.venue,
                type: a.type
              }))}
            />
          </>
        )}
      </div>
    </div>
  )
}
