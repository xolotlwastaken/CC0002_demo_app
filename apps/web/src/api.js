import axios from 'axios'

// Use environment variable for API URL
// Set VITE_API_URL in Vercel environment variables
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const api = axios.create({ 
  baseURL 
})

console.log('API baseURL:', baseURL)
