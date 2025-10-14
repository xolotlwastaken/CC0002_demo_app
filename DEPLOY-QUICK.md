# Vercel Deployment - Quick Reference 🚀

## 🎯 Fastest Way to Deploy (5 minutes)

### Step 1: Deploy Backend API

```powershell
# Navigate to API folder
cd apps/api

# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy API to production
vercel --prod
```

**Important**: Copy the URL you get (e.g., `https://ntu-starwars-api.vercel.app`)

---

### Step 2: Deploy Frontend

```powershell
# Navigate to web folder (from root)
cd ..\web

# Set your API URL (replace with your actual API URL from Step 1)
$env:VITE_API_URL="https://your-api.vercel.app"

# Deploy frontend to production
vercel --prod
```

**Done!** 🎉 Visit the URL Vercel gives you.

---

## 🌐 Using Vercel Dashboard (No CLI)

### For Backend (API):

1. Go to https://vercel.com/new
2. Import your GitHub repo: `xolotlwastaken/CC0002_demo_app`
3. Settings:
   - **Root Directory**: `apps/api`
   - **Framework**: Other
   - **Build Command**: (leave empty)
4. Add Environment Variables (optional):
   - `SUPABASE_URL` = your Supabase URL
   - `SUPABASE_SERVICE_KEY` = your service key
5. Click **Deploy**
6. **Copy your API URL**

### For Frontend (Web):

1. Go to https://vercel.com/new (again, new project)
2. Import same GitHub repo
3. Settings:
   - **Root Directory**: `apps/web`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-api-url-from-step-1.vercel.app`
5. Click **Deploy**
6. **Visit your app!** 🌟

---

## ✅ Quick Test Checklist

After deployment:

- [ ] Frontend loads without errors
- [ ] Module list appears (API is connected)
- [ ] Can search modules
- [ ] Can select modules
- [ ] Auto-schedule works
- [ ] Timetable displays correctly

---

## 🐛 Common Issues

### "Cannot connect to API"
- Check `VITE_API_URL` is set in Vercel environment variables
- Verify API is deployed and responding at the URL

### "Build failed"
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Try building locally first: `npm run build`

### "Environment variables not working"
- Redeploy after adding environment variables
- For Vite, variables MUST start with `VITE_`

---

## 💡 Pro Tips

1. **Use two separate projects** - One for API, one for frontend
2. **Set environment variables** before deploying
3. **Enable auto-deploy** from GitHub (in project settings)
4. **Use preview deployments** for testing (push to any branch)

---

## 📚 Full Documentation

For detailed instructions, troubleshooting, and advanced configuration, see:
- `DEPLOYMENT.md` (comprehensive guide)
- [Vercel Docs](https://vercel.com/docs)

---

**Questions?** Check the troubleshooting section in `DEPLOYMENT.md`

Happy deploying! 🚀
