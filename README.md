# NTU STAR WARS Planner 🌟# NTU STAR WARS Planner — Starter



A minimal but complete end-to-end implementation for planning NTU course timetables. Built with **React (Vite)** frontend, **Node.js (Express)** backend, and **Supabase** (Postgres + Auth) for the database.Minimal local scaffold for the NTU STAR WARS Planner (React frontend, Express backend, Supabase schema).



## ✨ FeaturesSee `supabase/seed.sql` for DB schema and sample data. Run the API in `apps/api` and the web app in `apps/web`.



- 🔍 **Module Search & Selection** — Browse and select from NTU's course catalogQuick start (Windows PowerShell):

- 🤖 **Natural Language Preferences** — Describe your ideal schedule in plain English

- 📅 **Auto-Schedule Generation** — AI-powered timetable optimization with backtracking solver```powershell

- 📊 **Visual Timetable Grid** — Interactive week view with drag-and-drop supportcd "c:/Users/65943/Desktop/CC0002 App/ntu-starwars-planner/apps/api"

- ⚡ **Constraint-Based Scheduling** — Respects time preferences, minimizes days, avoids conflictsnpm install

- 🎨 **Modern UI** — Clean, responsive interface with real-time feedbacknpm run dev



## 🏗️ Architecture# in a separate shell

cd "c:/Users/65943/Desktop/CC0002 App/ntu-starwars-planner/apps/web"

```npm install

ntu-starwars-planner/npm run dev

├── apps/```

│   ├── web/              # React + Vite frontend

│   │   ├── src/You will need a Supabase project to run with `supabase/seed.sql` (paste into SQL editor) and set `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in `apps/api/.env`.

│   │   │   ├── App.jsx   # Main UI component
│   │   │   ├── api.js    # API client
│   │   │   └── main.jsx  # Entry point
│   │   └── index.html
│   └── api/              # Node + Express backend
│       ├── index.js      # API server
│       ├── mockData.js   # Sample data fallback
│       └── lib/
│           ├── prefsParser.js  # NL → constraints
│           └── solver.js        # Scheduling algorithm
└── supabase/
    ├── seed.sql          # Database schema + sample data
    └── policies.sql      # Row Level Security
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- (Optional) Supabase account for cloud database

### 1. Clone & Install

```powershell
cd "c:/Users/65943/Desktop/CC0002 App/ntu-starwars-planner"
```

### 2. Setup Backend (API)

```powershell
cd apps/api
npm install
```

**Option A: Use Mock Data (Fastest)**

No setup needed! The API will automatically use in-memory mock data if no Supabase credentials are provided.

**Option B: Use Supabase (Recommended)**

1. Create a free Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and paste/run contents of `supabase/seed.sql`
3. Get your project URL and service key from Settings → API
4. Create `.env` file in `apps/api/`:

```env
PORT=4000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

**Start the API:**

```powershell
npm run dev
# API running at http://localhost:4000
```

### 3. Setup Frontend (Web)

Open a **new terminal**:

```powershell
cd apps/web
npm install
npm run dev
# Web app running at http://localhost:5173
```

### 4. Open in Browser

Visit **http://localhost:5173** and start planning! 🎉

## 📖 How to Use

1. **Search Modules** — Type a course code (e.g., "CZ2001") or keyword in the search box
2. **Select Modules** — Click the "+" button to add modules to your plan
3. **Set Preferences** — Describe your ideal schedule using natural language:
   - "least number of days"
   - "finish by 5pm"
   - "avoid Monday"
   - "start after 10"
   - "no morning classes"
4. **Auto-Schedule** — Click the "✨ Auto-Schedule" button
5. **View Timetable** — Your optimized schedule appears in the visual grid

## 🧠 How the Scheduler Works

The auto-scheduler uses a **constraint-based backtracking algorithm**:

1. **Parse** natural language preferences into constraint flags
2. **Filter** class indexes that violate hard constraints (time windows, avoid days)
3. **Backtrack** through module index combinations, rejecting time clashes
4. **Score** feasible schedules based on:
   - Fewer campus days (weighted heavily)
   - Earlier finish times
   - Preferred day patterns
   - Morning vs afternoon preferences
5. **Return** the highest-scoring schedule

This approach handles 4-8 modules × 2-5 indexes efficiently. For larger problems, consider upgrading to OR-Tools CP-SAT.

## 🎯 Example Preference Phrases

| Phrase | Effect |
|--------|--------|
| "least number of days" | Minimizes unique days on campus |
| "finish by 5pm" / "end by 17:00" | No classes after 5 PM |
| "start after 10" | No classes before 10 AM |
| "avoid monday" | Excludes all Monday slots |
| "prefer friday" | Boosts Friday selections |
| "no morning classes" | Penalizes classes before 10 AM |

## 🧪 Testing with Sample Data

The seed.sql includes these sample modules:

- **CZ2001** — Algorithms (3 AU)
- **CZ2002** — Database Systems (3 AU)
- **CZ2005** — Operating Systems (3 AU)
- **CZ2006** — Software Engineering (3 AU)
- And more...

Try scheduling combinations like:
- CZ2001, CZ2002, CZ2005 with "least days, finish by 5pm"
- CZ2001, CZ2006 with "avoid monday, start after 10"

## 🛠️ API Endpoints

### `GET /health`
Health check — returns `{ ok: true }`

### `GET /modules?q=<query>`
List modules with optional search filter
- **Query param**: `q` (optional) — search by code or title
- **Returns**: Array of module objects

### `GET /modules/:code/indexes`
Get class indexes for a specific module
- **Path param**: `code` — module code (e.g., CZ2001)
- **Returns**: Array of class index objects

### `POST /schedule/auto`
Generate optimized timetable
- **Body**:
  ```json
  {
    "message": "least number of days, finish by 5pm",
    "modules": ["CZ2001", "CZ2002", "CZ2005"]
  }
  ```
- **Returns**:
  ```json
  {
    "score": 12.5,
    "assignments": [
      {
        "module_code": "CZ2001",
        "index_code": "102",
        "day_of_week": 2,
        "start": 870,
        "end": 990,
        "venue": "LT2",
        "type": "LEC"
      }
    ]
  }
  ```

## 🔧 Development

### Project Structure

- **Frontend (React)**: Uses Vite for fast HMR, Axios for API calls
- **Backend (Express)**: RESTful API with Zod validation
- **Database (Postgres)**: Supabase for hosted DB or use mock data
- **Solver**: Custom backtracking algorithm with scoring heuristics

### Adding New Modules

**With Supabase:**

```sql
INSERT INTO modules (code, title, au) VALUES
  ('CZ3005', 'Artificial Intelligence', 3);

INSERT INTO class_indexes (module_code, index_code, day_of_week, start_time, end_time, venue, type) VALUES
  ('CZ3005', '301', 1, '09:30', '11:30', 'LT5', 'LEC'),
  ('CZ3005', '301', 3, '14:30', '15:30', 'TR+6', 'TUT');
```

**With Mock Data:**

Edit `apps/api/mockData.js` and add to the `modules` and `class_indexes` arrays.

## 🚧 Future Enhancements

- ✅ Real NTU data integration (via web scraping or API)
- ✅ Prerequisite validation with dependency graphs
- ✅ Multiple objective presets (min gaps, compact mornings)
- ✅ Seat availability awareness
- ✅ User authentication & saved plans (Supabase Auth + RLS)
- ✅ Explainability logs (why constraints excluded options)
- ✅ Advanced solver (OR-Tools CP-SAT for 10+ modules)
- ✅ Mobile-responsive drag-and-drop
- ✅ Export to calendar (iCal, Google Calendar)

## 📝 License

MIT — feel free to use this for your own course planning projects!

## 🙏 Acknowledgments

Inspired by NTU's STARS planner system. Built for educational purposes to demonstrate full-stack development with React, Node.js, and intelligent scheduling algorithms.

---

**Made with ❤️ for NTU students** 🎓
