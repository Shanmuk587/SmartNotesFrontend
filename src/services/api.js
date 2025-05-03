import axios from 'axios'
import Cookies from 'js-cookie'

// Create an axios instance
const api = axios.create({
  baseURL: 'https://smartnotesbackend-production.up.railway.app/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

// Request interceptor to add authorization header
// api.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401) {
      Cookies.remove('token')
      window.location.href = '/login'
    }
    
    // Handle forbidden errors (403)
    if (error.response && error.response.status === 403) {
      console.error('Permission denied')
    }
    
    return Promise.reject(error)
  }
)

export default api