import axios from 'axios'

// Create an axios instance
const api = axios.create({
  baseURL: 'https://smartnotesbackend-production.up.railway.app/api',
  // baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401 if not trying to authenticate
    if (error.response && error.response.status === 401) {
      // Don't redirect if this is the auth check itself
      if (!error.config.url.includes('/auth/me')) {
        window.location.href = '/login'
      }
    }
    
    // Handle forbidden errors (403)
    if (error.response && error.response.status === 403) {
      console.error('Permission denied')
    }
    
    return Promise.reject(error)
  }
)

export default api