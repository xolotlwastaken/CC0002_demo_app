# 🔧 Fixing 500 Internal Server Error on Vercel

## The Problem

API returns **500 Internal Server Error** when accessing `/api/modules`

This means the serverless function is crashing.

---

## ✅ Fixes Applied

I've updated these files:

1. **`api/package.json`** - Added dependencies for the api folder
2. **`api/serverless.js`** - Simplified to directly export Express app
3. **`vercel.json`** - Added explicit Node.js runtime configuration

---

## 🚀 Deploy the Fix

```powershell
cd "C:\Users\65943\Desktop\CC0002 App\ntu-starwars-planner"

# Commit all changes
git add .
git commit -m "Fix 500 error - add api dependencies and runtime config"
git push

# Redeploy
vercel --prod
```

Wait 2-3 minutes for deployment to complete.

---

## 🧪 Test After Deployment

### 1. Test API Health
Open in browser:
```
https://cc-0002-demo-app.vercel.app/api/health
```
**Expected:** `{"ok":true}`

### 2. Test Modules Endpoint
```
https://cc-0002-demo-app.vercel.app/api/modules
```
**Expected:** Array of module objects (JSON)

### 3. Test Frontend
```
https://cc-0002-demo-app.vercel.app
```
**Expected:** Modules load without error!

---

## 🐛 If Still Getting 500 Error

### Check Vercel Function Logs:

1. Go to: https://vercel.com/dashboard
2. Click your project: **cc-0002-demo-app**
3. Click "Deployments"
4. Click the latest deployment
5. Click "Functions" tab
6. Look for `/api/serverless` logs
7. Check for error messages

Common errors and fixes:

#### Error: "Cannot find module"

**Fix:** Dependencies not installed properly.

Check `vercel.json` has:
```json
"installCommand": "cd api && npm install && cd ../apps/api && npm install..."
```

#### Error: "Cannot read property of undefined"

**Fix:** Environment variables might be needed.

Add in Vercel Dashboard → Settings → Environment Variables:
- Leave empty to use mock data (recommended for testing)
- Or add SUPABASE_URL and SUPABASE_SERVICE_KEY

#### Error: "Timeout"

**Fix:** Function taking too long (>10s).

Mock data should be instant. If using Supabase, check connection.

---

## 📁 Updated File Structure

```
ntu-starwars-planner/
├── api/
│   ├── serverless.js         ✅ Exports Express app
│   └── package.json          ✅ NEW - Has dependencies
├── apps/
│   ├── api/
│   │   ├── index.js          ✅ Exports default app
│   │   ├── package.json      ✅ Has dependencies
│   │   └── lib/              ✅ Solver and parser
│   └── web/
│       └── src/
│           └── api.js        ✅ Uses /api in production
└── vercel.json               ✅ Runtime config
```

---

## 🔍 Debug Checklist

- [ ] Committed and pushed all changes
- [ ] Redeployed with `vercel --prod`
- [ ] Waited 3+ minutes for deployment
- [ ] Cleared browser cache (Ctrl+F5)
- [ ] Checked `/api/health` returns `{"ok":true}`
- [ ] Checked Vercel function logs for errors
- [ ] Verified no red errors in browser console

---

## 💡 What Changed

### Before:
```javascript
// api/serverless.js - complex async handler
export default async function handler(req, res) {
  const { default: app } = await import('../apps/api/index.js')
  return app(req, res)
}
```

No `api/package.json` - dependencies not installed in api folder

### After:
```javascript
// api/serverless.js - simple export
import app from '../apps/api/index.js'
export default app
```

Added `api/package.json` with all dependencies

Added explicit Node.js runtime in `vercel.json`

---

## 🎯 Alternative: Test Locally with Vercel Dev

You can test the serverless function locally:

```powershell
# Install Vercel CLI if not already
npm install -g vercel

# Run in dev mode
vercel dev
```

This runs your app exactly as it would on Vercel.

Test at: `http://localhost:3000/api/health`

---

## 🚀 Quick Deploy Commands

```powershell
# From project root
cd "C:\Users\65943\Desktop\CC0002 App\ntu-starwars-planner"

# Stage all changes
git add .

# Commit
git commit -m "Fix 500 error with api dependencies"

# Push to GitHub
git push

# Deploy to Vercel
vercel --prod
```

---

## ✅ Success Indicators

After successful deployment:

✅ `/api/health` returns `{"ok":true}`
✅ `/api/modules` returns JSON array
✅ Frontend loads module list
✅ No 500 errors in browser console
✅ Can search and select modules
✅ Auto-schedule button works

---

## 📞 Still Having Issues?

### Try This:

1. **Test `vercel dev` locally** to see exact error
2. **Check Function Logs** in Vercel dashboard
3. **Clear all caches** (browser and Vercel)
4. **Try a clean deployment**:
   ```powershell
   vercel --prod --force
   ```

### Get Error Details:

```powershell
# View live function logs
vercel logs https://cc-0002-demo-app.vercel.app/api/modules --follow
```

---

**Deploy now and test!** The fix should resolve the 500 error. 🚀
