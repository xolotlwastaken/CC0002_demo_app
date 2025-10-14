# 🚀 Two Separate Deployments - Simple & Reliable

We're deploying **backend and frontend separately** - the traditional and reliable way!

---

## 📋 What You'll Get

- **Backend API**: `https://ntu-starwars-api.vercel.app`
- **Frontend**: `https://ntu-starwars-web.vercel.app` (or use your custom domain)

---

## 🎯 Step 1: Deploy Backend API

### Using Vercel Dashboard:

1. **Go to**: https://vercel.com/new

2. **Import**: `xolotlwastaken/CC0002_demo_app`

3. **Configure**:
   ```
   Project Name: ntu-starwars-api
   Framework: Other
   Root Directory: apps/api  ← IMPORTANT!
   Build Command: (leave empty)
   Output Directory: (leave empty)
   Install Command: npm install
   ```

4. **Environment Variables** (optional - leave empty to use mock data):
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_KEY=your-service-key
   ```

5. **Deploy** ✅

6. **Copy your API URL**: 
   ```
   https://ntu-starwars-api.vercel.app
   ```
   ⚠️ **SAVE THIS - YOU NEED IT FOR STEP 2!**

---

## 🎯 Step 2: Deploy Frontend

### Using Vercel Dashboard:

1. **Go to**: https://vercel.com/new (again)

2. **Import**: `xolotlwastaken/CC0002_demo_app` (same repo, new project)

3. **Configure**:
   ```
   Project Name: ntu-starwars-web
   Framework: Vite
   Root Directory: apps/web  ← IMPORTANT!
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables** ⚠️ **REQUIRED**:
   ```
   Key: VITE_API_URL
   Value: https://ntu-starwars-api.vercel.app
   ```
   (Use your actual API URL from Step 1)

5. **Deploy** ✅

6. **Visit your app**: 
   ```
   https://ntu-starwars-web.vercel.app
   ```

---

## 🧪 Test Your Deployment

### Test Backend:
```
https://ntu-starwars-api.vercel.app/health
```
Should return: `{"ok":true}`

```
https://ntu-starwars-api.vercel.app/modules
```
Should return: Array of modules

### Test Frontend:
```
https://ntu-starwars-web.vercel.app
```
Should load with module list! ✅

---

## 🔄 Using Vercel CLI (Faster)

### Deploy Backend:

```powershell
cd apps/api
vercel --prod
# Copy the URL you get
```

### Deploy Frontend:

```powershell
cd ../web

# Set API URL environment variable
vercel env add VITE_API_URL production
# When prompted, enter: https://your-api-url.vercel.app

# Deploy
vercel --prod
```

---

## ✅ Success Checklist

After both deployments:

- [ ] API `/health` endpoint returns `{"ok":true}`
- [ ] API `/modules` endpoint returns JSON array
- [ ] Frontend loads without errors
- [ ] Module list appears
- [ ] Can search modules
- [ ] Auto-schedule button works
- [ ] No CORS errors (API has `cors()` enabled)

---

## 🐛 Troubleshooting

### Frontend can't connect to API

**Check:**
1. Is `VITE_API_URL` set in Vercel? (Settings → Environment Variables)
2. Does API URL end without trailing slash?
3. Is API actually deployed and responding?

**Fix:**
```
Go to Frontend project → Settings → Environment Variables
Add: VITE_API_URL = https://your-api.vercel.app
Redeploy frontend
```

### CORS Errors

The API already has CORS enabled (`app.use(cors())`). Should work fine.

If needed, you can restrict it:
```javascript
// apps/api/index.js
app.use(cors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true
}))
```

### API Returns 500

Check Vercel function logs:
1. Go to API project → Deployments
2. Click latest deployment
3. Click "Functions" tab
4. Look for errors

---

## 💡 Advantages of Separate Deployments

✅ **Independent scaling** - API and frontend scale separately
✅ **Faster deploys** - Only rebuild what changed
✅ **Clearer separation** - Easier to debug
✅ **Production-ready** - Industry standard approach
✅ **No routing complexity** - Straightforward setup

---

## 🔄 Auto-Deploy (Optional)

### For Backend:
1. Go to API project → Settings → Git
2. Connect repository
3. Set root directory: `apps/api`
4. Enable production branch

### For Frontend:
1. Go to Frontend project → Settings → Git
2. Connect repository  
3. Set root directory: `apps/web`
4. Enable production branch

Now every `git push` auto-deploys both! 🎉

---

## 📊 Summary

| Component | URL | Root Dir | Env Vars |
|-----------|-----|----------|----------|
| **Backend** | ntu-starwars-api.vercel.app | `apps/api` | SUPABASE_* (optional) |
| **Frontend** | ntu-starwars-web.vercel.app | `apps/web` | VITE_API_URL (required) |

---

## 🎓 For Your Submission

**Project Demo**: https://ntu-starwars-web.vercel.app
**API**: https://ntu-starwars-api.vercel.app
**GitHub**: https://github.com/xolotlwastaken/CC0002_demo_app

Simple, clean, professional! ✨

---

**Ready to deploy? Follow Step 1, then Step 2 above!** 🚀
