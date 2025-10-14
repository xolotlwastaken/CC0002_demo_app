# 🚀 Deploy Frontend + Backend Together (Single Vercel Project)

## Overview

Instead of deploying two separate projects, you can deploy **both frontend and backend as one monorepo** on Vercel. This is simpler to manage and gives you a single deployment URL.

---

## 📋 Architecture

With this approach:
- Frontend: Root of your deployment (e.g., `https://ntu-planner.vercel.app`)
- Backend API: Serverless functions at `/api/*` (e.g., `https://ntu-planner.vercel.app/api/modules`)

---

## 🎯 Method 1: Vercel Dashboard (Easiest)

### Step 1: Restructure for Monorepo Deployment

First, we need to create a configuration that tells Vercel how to handle both apps.

**Create `vercel.json` in project root:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/web/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "apps/web/dist"
      }
    },
    {
      "src": "apps/api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "apps/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "apps/web/dist/$1"
    }
  ],
  "installCommand": "npm install --prefix apps/web && npm install --prefix apps/api",
  "buildCommand": "cd apps/web && npm run build"
}
```

### Step 2: Update API to Work as Serverless Function

**Edit `apps/api/index.js` - Add at the bottom:**

```javascript
// Export for Vercel serverless
export default app
```

The complete end should look like:

```javascript
app.listen(process.env.PORT || 4000, () => {
  console.log(`API listening on :${process.env.PORT || 4000}`)
})

// Export for Vercel serverless
export default app
```

### Step 3: Update Frontend API URL

**Edit `apps/web/src/api.js`:**

```javascript
import axios from 'axios'

// In production on Vercel, API is at /api
// In development, use localhost
const baseURL = import.meta.env.PROD 
  ? '/api'  // Same domain in production
  : import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const api = axios.create({ 
  baseURL 
})
```

### Step 4: Deploy to Vercel

1. **Go to**: https://vercel.com/new
2. **Import**: `xolotlwastaken/CC0002_demo_app`
3. **Configure**:
   ```
   Project Name: ntu-starwars-planner
   Framework Preset: Other (or Vite)
   Root Directory: ./ (leave as root)
   Build Command: (auto-detected)
   Output Directory: (auto-detected)
   ```

4. **Add Environment Variables** (optional):
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_KEY=your-service-role-key
   ```

5. **Click Deploy** 🚀

6. **Test Your App**:
   - Frontend: `https://ntu-starwars-planner.vercel.app`
   - API: `https://ntu-starwars-planner.vercel.app/api/health`

---

## 🎯 Method 2: Simplified Configuration (Recommended)

For a cleaner approach, let's use Vercel's automatic detection with a simpler structure:

### Step 1: Create Root `vercel.json`

```json
{
  "buildCommand": "cd apps/web && npm install && npm run build",
  "outputDirectory": "apps/web/dist",
  "installCommand": "npm install --prefix apps/api && npm install --prefix apps/web",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api"
    }
  ]
}
```

### Step 2: Create API Serverless Function

**Create `api/index.js` in project root** (new location):

```javascript
// Re-export the Express app as a serverless function
import app from '../apps/api/index.js'

export default app
```

### Step 3: Update API Entry Point

**Edit `apps/api/index.js` - change the end:**

```javascript
// Only start server in development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
    console.log(`API listening on :${PORT}`)
  })
}

// Export for Vercel serverless
export default app
```

### Step 4: Update Frontend API Client

**Edit `apps/web/src/api.js`:**

```javascript
import axios from 'axios'

const baseURL = import.meta.env.PROD 
  ? '/api'  // Production: same domain
  : 'http://localhost:4000'  // Development: local API

export const api = axios.create({ baseURL })
```

### Step 5: Deploy

```powershell
# From project root
vercel --prod
```

Or use Vercel Dashboard as described in Method 1.

---

## 🎯 Method 3: Using Vercel CLI (Fastest)

### Prerequisites

```powershell
npm install -g vercel
```

### Deploy Command

```powershell
# From project root
vercel login

# Deploy (will prompt for configuration)
vercel

# Or deploy directly to production
vercel --prod
```

Vercel will automatically:
- Detect your monorepo structure
- Build the frontend
- Deploy API as serverless functions
- Set up routing

---

## 📁 Recommended Project Structure

After setup, your structure should be:

```
ntu-starwars-planner/
├── api/                      # Serverless function wrapper
│   └── index.js             # Re-exports apps/api
├── apps/
│   ├── api/                 # Express app
│   │   ├── index.js        # Main API (exported)
│   │   └── lib/
│   └── web/                 # React app
│       ├── src/
│       ├── dist/           # Build output
│       └── package.json
├── vercel.json             # Vercel configuration
└── package.json            # Root package.json (optional)
```

---

## ✅ Testing Your Deployment

After deployment, test these URLs:

```powershell
# Health check
curl https://your-app.vercel.app/api/health

# Get modules
curl https://your-app.vercel.app/api/modules

# Frontend
# Visit in browser: https://your-app.vercel.app
```

Expected responses:
- `/api/health` → `{"ok":true}`
- `/api/modules` → Array of modules
- `/` → React app loads

---

## 🔧 Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

```
# Optional (for database)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

# Frontend automatically uses same domain
# No VITE_API_URL needed!
```

---

## 🐛 Common Issues & Fixes

### Issue 1: API Routes Return 404

**Cause**: Routing not configured properly

**Fix**: Check `vercel.json` has correct rewrites:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api"
    }
  ]
}
```

### Issue 2: "Cannot find module"

**Cause**: Dependencies not installed

**Fix**: Ensure `installCommand` in `vercel.json`:
```json
{
  "installCommand": "npm install --prefix apps/api && npm install --prefix apps/web"
}
```

### Issue 3: Build Fails

**Cause**: Build command incorrect

**Fix**: Set correct build command:
```json
{
  "buildCommand": "cd apps/web && npm run build"
}
```

### Issue 4: CORS Errors

**Cause**: Not needed! Same domain = no CORS

**Solution**: Since API and frontend are on same domain, CORS is not an issue. The existing CORS setup in Express works fine.

### Issue 5: API Times Out

**Cause**: Free tier has 10s serverless function limit

**Fix**: 
- Optimize solver algorithm
- Reduce module combinations
- Upgrade to Vercel Pro (60s limit)

---

## 💡 Advantages of Monorepo Deployment

✅ **Single URL** - Easier to share and remember
✅ **No CORS issues** - Same origin
✅ **Simpler setup** - One project instead of two
✅ **Environment sync** - Same environment variables
✅ **Easier development** - One git repo, one deployment

---

## 📊 Performance Considerations

### Serverless Function Cold Starts

First request after inactivity may be slower (cold start). Vercel keeps functions warm with traffic.

**Mitigation**:
- Use Edge Functions for faster cold starts
- Upgrade to Pro for better performance
- Implement caching where possible

### Build Time

Building both apps takes longer than separate deploys.

**Optimization**:
- Use `vercel --prod` for production only
- Preview deployments for testing

---

## 🔄 Local Development

Run both apps locally:

**Terminal 1 (API)**:
```powershell
cd apps/api
npm run dev
```

**Terminal 2 (Frontend)**:
```powershell
cd apps/web
npm run dev
```

Frontend will use `http://localhost:4000` in development (as configured in `api.js`).

---

## 🚀 Deployment Workflow

### Initial Deployment

```powershell
# 1. Commit your changes
git add .
git commit -m "Configure for monorepo deployment"
git push

# 2. Deploy
vercel --prod
```

### Subsequent Deployments

Vercel auto-deploys on git push (if connected):

```powershell
git add .
git commit -m "Update feature"
git push
# Vercel automatically deploys!
```

---

## 📈 Scaling Tips

1. **Cache API responses**:
   ```javascript
   res.set('Cache-Control', 'public, max-age=3600')
   ```

2. **Use Edge Functions** for faster responses (Vercel Pro)

3. **Optimize frontend bundle**:
   ```javascript
   // vite.config.js
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom', 'axios']
           }
         }
       }
     }
   })
   ```

4. **Enable compression** (automatic on Vercel)

---

## 🎯 Comparison: Monorepo vs Separate Projects

| Feature | Monorepo | Separate Projects |
|---------|----------|-------------------|
| Setup Complexity | Medium | Simple |
| URL Structure | Single domain | Two domains |
| CORS | Not needed | Required |
| Environment Vars | Shared | Per-project |
| Deployment Time | Slower (builds both) | Faster (independent) |
| Maintenance | Easier | More complex |
| Cost | Same | Same |

---

## ✅ Final Checklist

Before going live:

- [ ] `vercel.json` configured correctly
- [ ] API exports default app
- [ ] Frontend uses relative API path in production
- [ ] Environment variables set in Vercel
- [ ] Test `/api/health` endpoint
- [ ] Test frontend loads
- [ ] Test module search works
- [ ] Test auto-schedule works
- [ ] No console errors
- [ ] Mobile responsive

---

## 🎉 Success!

Your app is now deployed as a unified monorepo on Vercel!

**Single URL for everything**:
- Frontend: `https://ntu-planner.vercel.app`
- API: `https://ntu-planner.vercel.app/api/*`

**Share it**: Send one link to rule them all! 🌟

---

## 📚 Additional Resources

- [Vercel Monorepos](https://vercel.com/docs/concepts/monorepos)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Build Configuration](https://vercel.com/docs/build-step)

---

**Last Updated**: October 2025  
**Difficulty**: ⭐⭐☆☆☆ (Medium)  
**Time to Deploy**: 10-15 minutes
