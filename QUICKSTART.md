# Quick Start Guide

## 🚀 Run the Application

### Step 1: Start the API Server

Open PowerShell and run:

```powershell
cd "c:\Users\65943\Desktop\CC0002 App\ntu-starwars-planner\apps\api"
npm install
npm run dev
```

You should see:
```
API listening on :4000
```

**Note**: The API will use mock data by default. To use Supabase, create a `.env` file with your credentials (see `.env.example`).

### Step 2: Start the Web App

Open a **NEW PowerShell window** and run:

```powershell
cd "c:\Users\65943\Desktop\CC0002 App\ntu-starwars-planner\apps\web"
npm install
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Step 3: Open Your Browser

Visit **http://localhost:5173**

## 🎮 Usage

1. **Search for modules** like "CZ2001" or "Algorithms"
2. Click **"+"** to add modules to your selection
3. Enter preferences like:
   - "least number of days"
   - "finish by 5pm"
   - "avoid monday"
4. Click **"✨ Auto-Schedule"**
5. View your optimized timetable!

## 🧪 Try These Test Cases

### Test Case 1: Minimize Days
- **Modules**: CZ2001, CZ2002, CZ2005
- **Preferences**: "least number of days, finish by 5pm"
- **Expected**: Schedule on 2-3 days max

### Test Case 2: No Mornings
- **Modules**: CZ2001, CZ2006
- **Preferences**: "start after 10, avoid monday"
- **Expected**: All classes after 10 AM, no Monday classes

### Test Case 3: Compact Week
- **Modules**: CZ2002, CZ2005
- **Preferences**: "minimize days, end by 17:00"
- **Expected**: Minimum days with early finish

## 🔧 Troubleshooting

### Port Already in Use

If port 4000 or 5173 is already in use:

**For API (port 4000):**
Edit `apps/api/.env` and change `PORT=4000` to another port like `PORT=4001`

**For Web (port 5173):**
Edit `apps/web/vite.config.js` and change the port number

### Module Dependencies

If you see errors about missing modules:

```powershell
# In apps/api
npm install

# In apps/web
npm install
```

### API Connection Failed

Make sure:
1. The API is running on port 4000
2. Check `apps/web/src/api.js` has the correct baseURL
3. No firewall is blocking localhost connections

## 📚 Sample Modules Available

- **CZ2001** — Algorithms (3 AU)
- **CZ2002** — Database Systems (3 AU)
- **CZ2005** — Operating Systems (3 AU)
- **CZ2006** — Software Engineering (3 AU)
- **CZ3001** — Advanced Computer Architecture (4 AU)
- **CZ3003** — Software Systems Analysis & Design (4 AU)
- **CZ3005** — Artificial Intelligence (3 AU)
- And more...

## 🎯 Natural Language Patterns

| Say this | To achieve |
|----------|------------|
| "least number of days" | Minimize campus days |
| "minimize days" | Same as above |
| "finish by 5pm" | End by 5 PM |
| "end by 17:00" | End by 5 PM |
| "start after 10" | No classes before 10 AM |
| "avoid monday" | Skip Monday |
| "prefer friday" | Favor Friday slots |
| "no morning classes" | Avoid early classes |

## ✅ Next Steps

- Try different module combinations
- Experiment with preference phrases
- Check the solver score (lower = better schedule)
- Look at the generated timetable grid

Happy planning! 🌟
