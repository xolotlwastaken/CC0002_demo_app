# Quick Vercel Deployment Script
# Run this from the root directory

Write-Host "🚀 NTU STAR WARS Planner - Vercel Deployment Helper" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found!" -ForegroundColor Red
    Write-Host "Installing Vercel CLI globally..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "📦 Step 1: Deploy Backend API" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Gray
Write-Host ""
Write-Host "Deploying from: apps/api" -ForegroundColor Yellow
Set-Location "apps/api"

Write-Host ""
Write-Host "Running: vercel --prod" -ForegroundColor Cyan
vercel --prod

Write-Host ""
Write-Host "✅ Backend deployed!" -ForegroundColor Green
Write-Host "📝 Copy your API URL (e.g., https://your-api.vercel.app)" -ForegroundColor Yellow
Write-Host ""
$apiUrl = Read-Host "Paste your API URL here"

# Go back to root
Set-Location "..\..\"

Write-Host ""
Write-Host "📦 Step 2: Update Frontend Configuration" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Gray
Write-Host ""

# Update the production env file
$envContent = "VITE_API_URL=$apiUrl"
Set-Content -Path "apps\web\.env.production" -Value $envContent
Write-Host "✅ Updated apps/web/.env.production with API URL" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Step 3: Deploy Frontend" -ForegroundColor Green
Write-Host "===========================" -ForegroundColor Gray
Write-Host ""
Write-Host "Deploying from: apps/web" -ForegroundColor Yellow
Set-Location "apps/web"

Write-Host ""
Write-Host "Running: vercel --prod" -ForegroundColor Cyan
vercel --prod

Write-Host ""
Write-Host "✅ Frontend deployed!" -ForegroundColor Green
Write-Host ""

# Go back to root
Set-Location "..\..\"

Write-Host ""
Write-Host "🎉 Deployment Complete!" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Gray
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Open your frontend URL in a browser" -ForegroundColor White
Write-Host "2. Test module search and auto-schedule features" -ForegroundColor White
Write-Host "3. Set up custom domains (optional)" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
