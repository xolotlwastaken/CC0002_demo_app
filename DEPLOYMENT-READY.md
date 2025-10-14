# 🎉 Monorepo Deployment - Ready to Go!

Your NTU STAR WARS Planner is now **fully configured for monorepo deployment**! 🚀

---

## ✅ What's Been Set Up

All the configuration is **already done** for you:

### 1. **vercel.json** (Root Configuration)
- ✅ Builds both frontend and backend
- ✅ Routes API requests to `/api/*`
- ✅ Serves frontend from root

### 2. **api/serverless.js** (API Wrapper)
- ✅ Wraps Express app as serverless function
- ✅ Handles all API routes

### 3. **apps/api/index.js** (Backend)
- ✅ Exports app for Vercel
- ✅ Only starts server in development
- ✅ Works with both local and production

### 4. **apps/web/src/api.js** (Frontend)
- ✅ Uses `/api` in production (same domain)
- ✅ Uses `localhost:4000` in development
- ✅ Automatic environment detection

---

## 🚀 Deploy Now (3 Steps)

### Step 1: Install Vercel CLI

```powershell
npm install -g vercel
```

### Step 2: Login

```powershell
vercel login
```

### Step 3: Deploy

```powershell
# Make sure you're in the project root
cd "C:\Users\65943\Desktop\CC0002 App\ntu-starwars-planner"

# Deploy to production
vercel --prod
```

**That's it!** ✨

---

## 🌐 Your Deployment URLs

After deployment, you'll get:

```
✅ Production: https://ntu-starwars-planner.vercel.app

Test these endpoints:
- Frontend:    https://your-app.vercel.app/
- API Health:  https://your-app.vercel.app/api/health
- Get Modules: https://your-app.vercel.app/api/modules
```

---

## 🎯 Quick Test Commands

Test your deployment with curl or browser:

```powershell
# Health check
curl https://your-app.vercel.app/api/health
# Expected: {"ok":true}

# Get modules
curl https://your-app.vercel.app/api/modules
# Expected: Array of modules

# Frontend (open in browser)
start https://your-app.vercel.app
```

---

## 🔧 Optional: Environment Variables

If you want to use Supabase (instead of mock data):

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add these:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

5. Redeploy:

```powershell
vercel --prod
```

---

## 🎓 For Students: Share Your Work

Your deployment URL is perfect for:

- **Assignment submissions**: Single URL to submit
- **Presentations**: Easy to demo in class
- **Portfolio**: Add to your resume/LinkedIn
- **Sharing**: Send to friends, classmates, professors

Example submission format:
```
Project: NTU STAR WARS Planner
Live Demo: https://ntu-starwars-planner.vercel.app
GitHub: https://github.com/xolotlwastaken/CC0002_demo_app
```

---

## 🔄 Development Workflow

### Local Development

```powershell
# Terminal 1: API
cd apps/api
npm run dev

# Terminal 2: Frontend
cd apps/web
npm run dev
```

Visit: `http://localhost:5173`

### Deploy Changes

```powershell
# 1. Make your changes
# 2. Test locally
# 3. Commit to git
git add .
git commit -m "Your changes"
git push

# 4. Deploy
vercel --prod
```

### Automatic Deployment (Optional)

Connect to GitHub for auto-deploy:

1. Go to Vercel Dashboard → Your Project
2. Settings → Git → Connect Repository
3. Select `xolotlwastaken/CC0002_demo_app`
4. Enable production branch deployment

Now every `git push` automatically deploys! 🎉

---

## 🐛 Troubleshooting

### "Command not found: vercel"

Install Vercel CLI:
```powershell
npm install -g vercel
```

### "No Vercel credentials found"

Login first:
```powershell
vercel login
```

### Build Fails

Test build locally:
```powershell
cd apps/web
npm run build
```

Check for errors and fix before deploying.

### API Returns 404

Ensure you're deploying from project root:
```powershell
cd "C:\Users\65943\Desktop\CC0002 App\ntu-starwars-planner"
vercel --prod
```

### Frontend Can't Connect to API

Check browser console. API should be at `/api/health`:
```
https://your-app.vercel.app/api/health
```

---

## 📊 What Happens During Deployment

1. **Vercel reads** `vercel.json`
2. **Installs dependencies** for both API and web
3. **Builds frontend** (React/Vite)
4. **Packages API** as serverless function
5. **Sets up routing**:
   - `/api/*` → API serverless function
   - `/*` → Frontend static files
6. **Deploys to global CDN**
7. **Gives you a URL** ✨

---

## 🎨 Architecture

```
Your Deployment
├── https://your-app.vercel.app/
│   ├── /                    → React Frontend (Static)
│   ├── /api/health          → Express API (Serverless)
│   ├── /api/modules         → Express API (Serverless)
│   └── /api/schedule/auto   → Express API (Serverless)
```

**Same domain = No CORS issues!** ✅

---

## 💰 Cost

**FREE** on Vercel's Hobby tier:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Serverless functions

**More than enough for student projects!** 🎓

---

## 📚 Additional Resources

- **[MONOREPO-QUICKSTART.md](./MONOREPO-QUICKSTART.md)** - Quick reference
- **[DEPLOY-MONOREPO.md](./DEPLOY-MONOREPO.md)** - Detailed guide
- **[WHICH-DEPLOYMENT.md](./WHICH-DEPLOYMENT.md)** - Compare deployment options
- [Vercel Documentation](https://vercel.com/docs)

---

## 🎉 Ready to Deploy?

Everything is configured and ready! Just run:

```powershell
vercel --prod
```

**Good luck with your project!** 🌟

---

## 📝 Deployment Checklist

Before deploying:

- [ ] Code is working locally
- [ ] `npm run dev` works for both API and frontend
- [ ] All changes are committed to git
- [ ] Vercel CLI is installed (`vercel --version`)
- [ ] You're in the project root directory

After deploying:

- [ ] Frontend loads without errors
- [ ] `/api/health` returns `{"ok":true}`
- [ ] Module search works
- [ ] Auto-schedule generates timetable
- [ ] No console errors in browser

---

**You're all set! Happy deploying!** 🚀🎓
