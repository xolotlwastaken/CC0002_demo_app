// Vercel Serverless Function Handler
// Wraps Express app for serverless execution

import app from '../apps/api/index.js'

// Vercel expects a function that handles (req, res)
// Express app already is that function!
export default app

