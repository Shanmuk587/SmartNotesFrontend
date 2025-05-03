import api from './api'

// Login user
export const login = (credentials) => {
  return api.post('/auth/login', credentials)
}

// Register user
export const register = (userData) => {
  return api.post('/auth/register', userData)
}

// Logout user
export const logout = () => {
  return api.get('/auth/logout')
}

// Get current user
export const getCurrentUser = () => {
  return api.get('/auth/me')
}