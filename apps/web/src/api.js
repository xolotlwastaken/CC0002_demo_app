import axios from 'axios'

// Use environment variable for production, fallback to localhost for development
// In production on Vercel, API is at /api (same domain)
// In development, use localhost
const baseURL = import.meta.env.PROD 
  ? '/api'  // Production: relative path (same domain)
  : import.meta.env.VITE_API_URL || 'http://localhost:4000'  // Development: local API

export const api = axios.create({ 
  baseURL 
})

console.log('API baseURL:', baseURL)
