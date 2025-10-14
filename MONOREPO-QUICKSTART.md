# ⚡ Quick Start - Monorepo Deployment

Deploy both frontend and backend together in **one** Vercel project!

## 🎯 One-Command Deploy

```powershell
# From project root
vercel --prod
```

That's it! ✨

---

## 📋 What You Get

- **Single URL**: `https://your-app.vercel.app`
- **Frontend**: Root path `/`
- **Backend API**: `/api/*` routes
- **No CORS issues**: Same domain!

---

## 🚀 Step-by-Step (First Time)

### 1. Install Vercel CLI

```powershell
npm install -g vercel
```

### 2. Login

```powershell
vercel login
```

### 3. Deploy

```powershell
# From project root
vercel
```

Follow prompts:
- Set up and deploy? **Yes**
- Which scope? **(your account)**
- Link to existing project? **No**
- Project name? **ntu-starwars-planner**
- In which directory? **./  (root)**
- Want to override settings? **No**

### 4. Production Deploy

```powershell
vercel --prod
```

---

## ✅ Testing

Visit these URLs after deployment:

```
Frontend:  https://your-app.vercel.app
API:       https://your-app.vercel.app/api/health
Modules:   https://your-app.vercel.app/api/modules
```

---

## 🔧 Configuration Already Done

These files are already configured for monorepo deployment:

✅ `vercel.json` - Vercel configuration
✅ `api/serverless.js` - API wrapper
✅ `apps/api/index.js` - Exports app for serverless
✅ `apps/web/src/api.js` - Uses relative path in production

---

## 🎨 Architecture

```
Production:
  https://your-app.vercel.app/          → React Frontend
  https://your-app.vercel.app/api/*     → Express API

Development:
  http://localhost:5173/                → React (Vite)
  http://localhost:4000/                → Express API
```

---

## 🐛 Troubleshooting

### API Returns 404

Run from project root, not subdirectory:
```powershell
cd "C:\Users\65943\Desktop\CC0002 App\ntu-starwars-planner"
vercel --prod
```

### Build Fails

Test build locally first:
```powershell
cd apps/web
npm run build
```

### Environment Variables

Add in Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`
3. Redeploy

---

## 💡 Pro Tips

1. **Always deploy from root directory**
2. **Commit changes before deploying**
3. **Use preview deployments for testing** (just run `vercel`)
4. **Production deploy** when ready (`vercel --prod`)

---

## 🔄 Continuous Deployment

Connect to GitHub for auto-deploy:

1. Go to Vercel Dashboard → Your Project → Settings → Git
2. Connect your repository
3. Enable production branch (main)

Now every `git push` automatically deploys! 🎉

---

## 📚 Full Guide

For detailed documentation, see:
- **DEPLOY-MONOREPO.md** - Complete monorepo guide
- **VERCEL-GUIDE.md** - General Vercel reference

---

**Deployment Time**: ~3 minutes  
**Difficulty**: ⭐☆☆☆☆ (Very Easy)
