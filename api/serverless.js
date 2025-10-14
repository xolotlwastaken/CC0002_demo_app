// Vercel Serverless Function Wrapper
// This file re-exports the Express app from apps/api as a serverless function

import('../apps/api/index.js').then(module => {
  // The Express app is the default export
  module.default || module.app
})

// Import and re-export the Express app
export { default } from '../apps/api/index.js'
