// Vercel Serverless Function Wrapper
// This wraps the Express app from apps/api as a serverless function

import app from '../apps/api/index.js'

// Export the Express app for Vercel serverless
export default app

