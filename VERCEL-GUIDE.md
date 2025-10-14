# 🚀 Vercel Deployment Complete Guide

## Overview

This guide covers deploying your **NTU STAR WARS Planner** to Vercel. You'll deploy two separate apps:
1. **Backend API** (`apps/api`) - Express server
2. **Frontend** (`apps/web`) - React/Vite app

---

## Prerequisites

✅ GitHub repository pushed
✅ Vercel account (free tier works)
✅ (Optional) Supabase project for database

---

## 🎯 Method 1: Vercel Dashboard (Easiest - No CLI)

### Part A: Deploy Backend API

1. **Visit**: https://vercel.com/new

2. **Import Repository**:
   - Click "Add New..." → "Project"
   - Select: `xolotlwastaken/CC0002_demo_app`

3. **Configure Backend**:
   ```
   Project Name: ntu-starwars-api
   Framework Preset: Other
   Root Directory: apps/api ⚠️ IMPORTANT
   Build Command: (leave empty)
   Output Directory: (leave empty)
   Install Command: npm install
   ```

4. **Environment Variables** (click to expand):
   ```
   Key: SUPABASE_URL
   Value: https://your-project.supabase.co
   
   Key: SUPABASE_SERVICE_KEY  
   Value: your-service-role-key
   ```
   
   > Skip these to use mock data initially

5. **Click Deploy** 🚀

6. **Copy API URL**: 
   ```
   https://ntu-starwars-api.vercel.app
   ```
   ⚠️ **SAVE THIS - YOU'LL NEED IT IN PART B**

---

### Part B: Deploy Frontend

1. **Visit**: https://vercel.com/new (again)

2. **Import Same Repository**:
   - Select: `xolotlwastaken/CC0002_demo_app` (again)

3. **Configure Frontend**:
   ```
   Project Name: ntu-starwars-web
   Framework Preset: Vite ✅
   Root Directory: apps/web ⚠️ IMPORTANT
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables**:
   ```
   Key: VITE_API_URL
   Value: https://ntu-starwars-api.vercel.app
   ```
   ⚠️ **USE YOUR ACTUAL API URL FROM PART A**

5. **Click Deploy** 🚀

6. **Visit Your App**:
   ```
   https://ntu-starwars-web.vercel.app
   ```

---

## 🎯 Method 2: Vercel CLI (For Developers)

### Install Vercel CLI

```powershell
npm install -g vercel
```

### Deploy Backend

```powershell
# From project root
cd apps/api

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod

# Add environment variables (optional)
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_KEY
```

**Copy the production URL!**

### Deploy Frontend

```powershell
# From project root
cd apps/web

# Deploy
vercel

# Add API URL environment variable
vercel env add VITE_API_URL
# Paste your API URL when prompted

# Production deploy
vercel --prod
```

---

## ✅ Post-Deployment Checklist

Test your deployed app:

- [ ] **Frontend loads** - No blank page or errors
- [ ] **Module list appears** - API connection working
- [ ] **Search works** - Type "CZ2001"
- [ ] **Can select modules** - Click "+" button
- [ ] **Auto-schedule works** - Click "✨ Auto-Schedule"
- [ ] **Timetable displays** - Visual grid shows classes
- [ ] **No console errors** - Check browser DevTools

---

## 🔧 Configuration Files Reference

### Backend: `apps/api/vercel.json`

```json
{
  "functions": {
    "api/index.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

### Frontend: Environment Variables

**`.env.production`** (local file, not in git):
```env
VITE_API_URL=https://your-api.vercel.app
```

**`.env.development`**:
```env
VITE_API_URL=http://localhost:4000
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot read modules" / Blank page

**Cause**: Frontend can't connect to API

**Fix**:
1. Check browser console for errors
2. Verify `VITE_API_URL` is set in Vercel dashboard
3. Test API directly: visit `https://your-api.vercel.app/health`
4. Should return: `{"ok":true}`

### Issue 2: CORS Error

**Cause**: API blocking frontend requests

**Fix**: API already has CORS enabled for all origins. If you restricted it:

```javascript
// apps/api/index.js
app.use(cors({
  origin: '*', // or specific domains
}))
```

### Issue 3: Build Fails

**Cause**: Missing dependencies or build errors

**Fix**:
1. Check Vercel build logs
2. Build locally first: `cd apps/web && npm run build`
3. Ensure all imports are correct
4. Check `package.json` has all dependencies

### Issue 4: Environment Variables Not Working

**Cause**: Variables not properly set or not redeployed

**Fix**:
1. Go to Project Settings → Environment Variables
2. Ensure variables are added to "Production"
3. **Redeploy** after adding variables (click "Redeploy")
4. For Vite: Variables MUST start with `VITE_`

### Issue 5: Function Timeout

**Cause**: Solver takes too long (free tier: 10s limit)

**Fix**:
1. Reduce number of modules selected
2. Upgrade to Vercel Pro (60s timeout)
3. Optimize solver algorithm

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

- **Production**: Push to `main` branch
- **Preview**: Push to feature branches
- **PR Previews**: Automatic preview for pull requests

To configure:
1. Go to Project Settings → Git
2. Set production branch
3. Enable/disable auto-deploy

---

## 🌐 Custom Domains

### Add Custom Domain

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain (e.g., `ntu-planner.com`)
4. Follow DNS instructions

### Recommended Setup:
- Frontend: `ntu-planner.com`
- Backend: `api.ntu-planner.com`

Don't forget to update `VITE_API_URL` if you change the API domain!

---

## 💰 Pricing Reference

### Vercel Free (Hobby) Tier:
- ✅ Unlimited projects
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ⏱️ 10s function timeout
- 👤 Personal use only

### Vercel Pro ($20/month):
- ✅ Everything in Free
- ⏱️ 60s function timeout
- 📊 Advanced analytics
- 👥 Team collaboration
- 🔐 Password protection

---

## 📊 Monitoring Your App

### View Logs:
1. Go to your project dashboard
2. Click "Deployments"
3. Click any deployment
4. View "Functions" tab for API logs
5. View "Build Logs" for build issues

### Analytics:
- Free tier: Basic analytics
- Pro tier: Advanced analytics with Web Vitals

---

## 🚀 Performance Tips

1. **Enable Caching**:
   ```javascript
   // In API responses
   res.set('Cache-Control', 'public, max-age=3600')
   ```

2. **Optimize Images**: Use WebP format

3. **Code Splitting**: Vite does this automatically

4. **CDN**: Vercel's global CDN is automatic

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** (already in `.gitignore`)
2. **Use Vercel's environment variables** for secrets
3. **Enable CORS** only for your domains (production)
4. **Use HTTPS** (automatic with Vercel)
5. **Rotate API keys** regularly

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 🆘 Need Help?

1. Check [Vercel's Status Page](https://www.vercel-status.com/)
2. Review build/function logs in dashboard
3. Test locally first: `npm run dev`
4. Check browser console for errors
5. Verify environment variables are set

---

## ✨ Success Checklist

After following this guide:

- ✅ Backend API deployed and responding
- ✅ Frontend deployed and accessible
- ✅ Environment variables configured
- ✅ API-Frontend communication working
- ✅ Modules loading correctly
- ✅ Auto-scheduler functioning
- ✅ No console errors
- ✅ Tested on mobile and desktop

---

## 🎉 You're Live!

Congratulations! Your NTU STAR WARS Planner is now deployed and accessible worldwide.

**Share your app**:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.vercel.app`

Happy planning! 🌟

---

**Last Updated**: October 2025
**Vercel Version**: Latest (v5)
**Node Version**: 18.x
