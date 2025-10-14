# 🔧 Fixing "Failed to load modules" on Vercel

## The Problem

After deploying to Vercel, you see: **"❌ Failed to load modules. Is the API running?"**

This means the frontend can't connect to the backend API.

---

## ✅ Quick Fix (Already Applied)

I've updated these files to fix the issue:

1. **`api/serverless.js`** - Fixed the Express app export
2. **`vercel.json`** - Simplified configuration

---

## 🚀 Deploy the Fix

### Step 1: Commit the Changes

```powershell
cd "C:\Users\65943\Desktop\CC0002 App\ntu-starwars-planner"

git add .
git commit -m "Fix API serverless function for Vercel deployment"
git push
```

### Step 2: Redeploy to Vercel

```powershell
vercel --prod
```

Or if you have auto-deploy enabled, just wait a minute for Vercel to redeploy automatically.

---

## 🧪 Test Your Deployment

After redeploying, test these URLs:

### 1. Check API Health
```
https://your-app.vercel.app/api/health
```
**Expected response:** `{"ok":true}`

### 2. Check Modules Endpoint
```
https://your-app.vercel.app/api/modules
```
**Expected response:** Array of module objects

### 3. Check Frontend
```
https://your-app.vercel.app/
```
**Expected:** Module list should load without errors

---

## 🔍 If Still Not Working

### Check 1: Verify Deployment Logs

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your project
3. Click "Deployments"
4. Click the latest deployment
5. Check "Build Logs" and "Function Logs"

Look for errors like:
- Module not found
- Build failures
- Timeout errors

### Check 2: Test the API Directly

Open your browser and visit:
```
https://your-app.vercel.app/api/health
```

**If you get 404:**
- API serverless function isn't deployed
- Check `api/serverless.js` exists
- Redeploy with `vercel --prod`

**If you get JSON response:**
- API is working! 
- Issue might be in frontend
- Check browser console for CORS or network errors

### Check 3: Browser Console

1. Open your deployed app
2. Press F12 (Developer Tools)
3. Go to "Console" tab
4. Look for error messages

Common errors:
```
Network Error - API might not be deployed
CORS Error - Check API has cors() enabled (it does)
404 Not Found - API route not configured
```

### Check 4: Check API Path

Open browser DevTools → Network tab:
- Frontend should call: `/api/modules`
- NOT: `http://localhost:4000/modules`

If you see localhost, frontend is in wrong mode.

---

## 🐛 Common Issues & Solutions

### Issue 1: API Returns 404

**Cause:** Serverless function not found

**Fix:**
```powershell
# Ensure api/serverless.js exists
ls api/serverless.js

# Redeploy
vercel --prod
```

### Issue 2: "Cannot find module"

**Cause:** Dependencies not installed

**Fix:** Vercel should auto-install. Check `vercel.json` has:
```json
"installCommand": "npm install --prefix apps/api && npm install --prefix apps/web"
```

### Issue 3: Timeout Errors

**Cause:** API takes too long (>10s on free tier)

**Fix:**
- Mock data should be instant
- Check if Supabase is slow
- Optimize queries

### Issue 4: CORS Errors

**Cause:** API blocking requests (shouldn't happen with same domain)

**Fix:** API already has `app.use(cors())` - should work fine

---

## 📁 Correct File Structure

After fixes, your structure should be:

```
ntu-starwars-planner/
├── api/
│   └── serverless.js          ✅ Exports Express app
├── apps/
│   ├── api/
│   │   └── index.js          ✅ Exports default app
│   └── web/
│       └── src/
│           └── api.js        ✅ Uses /api in production
└── vercel.json               ✅ Routes /api/* to serverless
```

---

## ✅ Verification Steps

After redeploying, verify:

1. **API Health Check**
   ```bash
   curl https://your-app.vercel.app/api/health
   # Should return: {"ok":true}
   ```

2. **Get Modules**
   ```bash
   curl https://your-app.vercel.app/api/modules
   # Should return: [...array of modules...]
   ```

3. **Frontend Loads**
   - Visit: `https://your-app.vercel.app`
   - Module list appears
   - No "Failed to load modules" error

4. **Browser Console Clean**
   - Press F12
   - No red errors
   - See: "API baseURL: /api"

---

## 🎯 What the Fix Does

### Before (Broken):
```javascript
// api/serverless.js - WRONG
import('../apps/api/index.js').then(module => {
  module.default || module.app  // This doesn't export anything!
})
```

### After (Fixed):
```javascript
// api/serverless.js - CORRECT
import app from '../apps/api/index.js'
export default app  // ✅ Properly exports the Express app
```

---

## 🚀 Quick Deploy Commands

```powershell
# From project root
cd "C:\Users\65943\Desktop\CC0002 App\ntu-starwars-planner"

# Commit fixes
git add .
git commit -m "Fix API serverless configuration"
git push

# Redeploy
vercel --prod
```

---

## 📞 Still Having Issues?

### Debug Checklist:

- [ ] Committed and pushed changes
- [ ] Redeployed with `vercel --prod`
- [ ] Waited 2-3 minutes for deployment
- [ ] Cleared browser cache (Ctrl+Shift+R)
- [ ] Checked `/api/health` endpoint directly
- [ ] Checked Vercel deployment logs
- [ ] Checked browser console for errors

### Get More Help:

1. **Check Vercel Function Logs**:
   - Dashboard → Your Project → Deployments → Latest → Functions tab

2. **Test API Locally**:
   ```powershell
   cd apps/api
   npm run dev
   # Should start on port 4000
   ```

3. **Test Build Locally**:
   ```powershell
   cd apps/web
   npm run build
   # Should complete without errors
   ```

---

## 🎉 Success!

Once fixed, you should see:
- ✅ Modules loading instantly
- ✅ Search working
- ✅ Auto-schedule functioning
- ✅ No error messages

**Your app is now fully deployed!** 🌟

---

**Need more help?** Check the Vercel deployment logs or re-read [DEPLOY-MONOREPO.md](./DEPLOY-MONOREPO.md)
