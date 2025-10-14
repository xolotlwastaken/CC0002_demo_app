# Deploying to Vercel 🚀

This guide walks you through deploying both the **frontend** (React/Vite) and **backend** (Express API) to Vercel.

## 📋 Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier works!)
2. [Vercel CLI](https://vercel.com/cli) installed (optional but recommended)
3. Your code pushed to GitHub
4. A Supabase project (or use mock data initially)

---

## 🎯 Deployment Strategy

We'll deploy **two separate Vercel projects**:
1. **Frontend** (`apps/web`) - The React app
2. **Backend** (`apps/api`) - The Express API

---

## Part 1: Deploy the Backend API

### Option A: Using Vercel Dashboard (Easiest)

1. **Go to [Vercel Dashboard](https://vercel.com/new)**

2. **Import your repository**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `xolotlwastaken/CC0002_demo_app`
   - Click "Import"

3. **Configure the project**:
   - **Framework Preset**: Select "Other"
   - **Root Directory**: Click "Edit" and enter `apps/api`
   - **Build Command**: Leave empty (Vercel auto-detects)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   PORT=4000
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_KEY=your-service-role-key
   ```
   
   > **Note**: For testing, you can skip Supabase vars - the API will use mock data

5. **Deploy**: Click "Deploy"

6. **Save your API URL**: After deployment, copy the URL (e.g., `https://your-api.vercel.app`)

### Option B: Using Vercel CLI

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Navigate to API directory
cd apps/api

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - What's your project's name? ntu-starwars-api
# - In which directory is your code located? ./
# - Want to override settings? No

# Add environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_KEY

# Deploy to production
vercel --prod
```

**Save your API URL** (shown after deployment)

---

## Part 2: Deploy the Frontend

### Step 1: Update API URL

First, update the frontend to use your deployed API URL:

**Edit `apps/web/src/api.js`:**

```javascript
import axios from 'axios'

// Use environment variable for production, fallback to localhost for development
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const api = axios.create({ 
  baseURL 
})
```

### Step 2: Deploy Frontend

#### Option A: Using Vercel Dashboard

1. **Go to [Vercel Dashboard](https://vercel.com/new)** again

2. **Import the same repository** (or add another project)

3. **Configure the project**:
   - **Framework Preset**: Select "Vite"
   - **Root Directory**: Click "Edit" and enter `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   ```
   VITE_API_URL=https://your-api.vercel.app
   ```
   (Replace with your actual API URL from Part 1)

5. **Deploy**: Click "Deploy"

6. **Visit your app**: Open the provided URL (e.g., `https://your-app.vercel.app`)

#### Option B: Using Vercel CLI

```powershell
# Navigate to web directory
cd apps/web

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - What's your project's name? ntu-starwars-web
# - In which directory is your code located? ./
# - Want to override settings? No

# Add environment variable
vercel env add VITE_API_URL
# Enter: https://your-api.vercel.app (from Part 1)

# Deploy to production
vercel --prod
```

---

## 🔧 Post-Deployment Configuration

### Enable CORS on Backend

Your API needs to allow requests from your frontend domain. The API already has CORS enabled for all origins, but you can restrict it:

**Edit `apps/api/index.js`** (optional):

```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}))
```

Redeploy the API after changes.

### Update Frontend for Production

**Create `apps/web/.env.production`:**

```env
VITE_API_URL=https://your-api.vercel.app
```

**Create `apps/web/.env.development`:**

```env
VITE_API_URL=http://localhost:4000
```

---

## 🌐 Custom Domains (Optional)

### For Frontend:
1. Go to your Vercel project → Settings → Domains
2. Add your custom domain (e.g., `ntu-planner.com`)
3. Follow DNS configuration instructions

### For Backend:
1. Go to your API project → Settings → Domains
2. Add subdomain (e.g., `api.ntu-planner.com`)
3. Update frontend `VITE_API_URL` environment variable

---

## ✅ Verification Checklist

After deployment, test:

- [ ] Frontend loads at your Vercel URL
- [ ] Modules list appears (API connection working)
- [ ] Module search works
- [ ] Can select modules
- [ ] Auto-schedule generates timetable
- [ ] Timetable displays correctly
- [ ] No console errors

---

## 🐛 Troubleshooting

### Frontend can't reach API

**Problem**: CORS errors or network failures

**Solution**:
1. Check `VITE_API_URL` environment variable is set correctly in Vercel
2. Verify API is deployed and accessible
3. Check browser console for specific error messages
4. Ensure API has CORS enabled for your frontend domain

### Build fails

**Problem**: Build errors during deployment

**Solution**:
1. Check Vercel build logs for specific errors
2. Ensure `package.json` has all dependencies
3. Test build locally: `npm run build`
4. Verify Node.js version compatibility (Vercel uses Node 18 by default)

### API returns 500 errors

**Problem**: Backend crashes or errors

**Solution**:
1. Check Vercel function logs
2. Verify Supabase environment variables are set
3. Test with mock data first (remove Supabase vars)
4. Check API routes are correct

### Environment variables not working

**Problem**: Config values not loading

**Solution**:
1. Ensure variables are added in Vercel dashboard
2. Redeploy after adding variables
3. For Vite, variables must start with `VITE_`
4. Check you're adding to correct environment (Production/Preview/Development)

---

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

1. **Production**: Push to `main` branch
2. **Preview**: Push to any other branch or create PR

To disable auto-deploy:
- Go to Project Settings → Git → Disable "Production Branch"

---

## 💰 Cost Considerations

**Vercel Free Tier includes**:
- Unlimited deployments
- 100GB bandwidth/month
- Serverless function execution
- Automatic HTTPS
- Custom domains

**Limitations**:
- Function timeout: 10 seconds (hobby tier)
- 100GB bandwidth limit
- Single team member

For production use with higher traffic, consider upgrading to Pro ($20/month).

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)
- [Environment Variables on Vercel](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 🎉 You're Live!

Your NTU STAR WARS Planner is now deployed and accessible worldwide! Share your URL with friends and classmates.

**Example URLs**:
- Frontend: `https://ntu-starwars-web.vercel.app`
- Backend: `https://ntu-starwars-api.vercel.app`

Happy planning! 🌟
