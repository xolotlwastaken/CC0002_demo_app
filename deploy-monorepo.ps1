# Monorepo Deployment Script
# Deploys both frontend and backend together to Vercel

Write-Host "🚀 NTU STAR WARS Planner - Monorepo Deployment" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Gray
Write-Host ""

# Check if Vercel CLI is installed
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found!" -ForegroundColor Red
    Write-Host "Installing Vercel CLI globally..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host ""
}

# Make sure we're in the project root
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

Write-Host "📦 Step 1: Verify Configuration" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Gray
Write-Host ""

# Check if vercel.json exists
if (Test-Path "vercel.json") {
    Write-Host "✅ vercel.json found" -ForegroundColor Green
} else {
    Write-Host "❌ vercel.json not found!" -ForegroundColor Red
    Write-Host "Please ensure vercel.json is in the project root" -ForegroundColor Yellow
    exit 1
}

# Check if api/serverless.js exists
if (Test-Path "api/serverless.js") {
    Write-Host "✅ api/serverless.js found" -ForegroundColor Green
} else {
    Write-Host "❌ api/serverless.js not found!" -ForegroundColor Red
    Write-Host "Please ensure api/serverless.js exists" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📦 Step 2: Install Dependencies" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Gray
Write-Host ""

Write-Host "Installing API dependencies..." -ForegroundColor Yellow
Set-Location "apps/api"
npm install
Set-Location "../.."

Write-Host "Installing Web dependencies..." -ForegroundColor Yellow
Set-Location "apps/web"
npm install
Set-Location "../.."

Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

Write-Host "📦 Step 3: Test Build Locally" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Gray
Write-Host ""

Write-Host "Building frontend..." -ForegroundColor Yellow
Set-Location "apps/web"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Set-Location "../.."

Write-Host "✅ Build successful" -ForegroundColor Green
Write-Host ""

Write-Host "📦 Step 4: Deploy to Vercel" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Gray
Write-Host ""

Write-Host "Deploying entire monorepo..." -ForegroundColor Yellow
Write-Host ""

# Ask user for deployment type
$deployType = Read-Host "Deploy to (1) Production or (2) Preview? [1/2]"

if ($deployType -eq "1") {
    Write-Host ""
    Write-Host "🚀 Deploying to PRODUCTION..." -ForegroundColor Cyan
    vercel --prod
} else {
    Write-Host ""
    Write-Host "🚀 Deploying to PREVIEW..." -ForegroundColor Cyan
    vercel
}

Write-Host ""
Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
Write-Host "=======================" -ForegroundColor Gray
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Visit your deployment URL" -ForegroundColor White
Write-Host "2. Test frontend: https://your-app.vercel.app" -ForegroundColor White
Write-Host "3. Test API: https://your-app.vercel.app/api/health" -ForegroundColor White
Write-Host "4. Test module search and auto-schedule" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tip: Set environment variables in Vercel Dashboard → Settings → Environment Variables" -ForegroundColor Cyan
Write-Host ""
Write-Host "For detailed instructions, see DEPLOY-MONOREPO.md" -ForegroundColor Gray
Write-Host ""
