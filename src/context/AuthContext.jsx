import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api' // Axios instance with baseURL and credentials setup

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // 🔍 Fetch user from backend using HttpOnly cookie on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me', {
          withCredentials: true // Important to send the HttpOnly cookie
        })
        
        if (response.data) {
          setUser(response.data.data)
          setIsAuthenticated(true)
        } else {
          // Clear authentication state if no user data
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        // Handle 401 errors gracefully without console errors
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchUser()
  }, [])

  // 🔐 Handle login
  const handleLogin = async (credentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiLogin(credentials)
      
      if (response.data) {
        setUser(response.data.data)
        setIsAuthenticated(true)
        toast.success('Login successful!')
        return true
      } else {
        throw new Error('No user data received')
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed. Please try again.'
      setError(message)
      toast.error(message)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // 📝 Handle registration
  const handleRegister = async (userData) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiRegister(userData)
      
      if (response.data && response.data.user) {
        setUser(response.data.user)
        setIsAuthenticated(true)
        toast.success('Registration successful!')
        return true
      } else {
        throw new Error('No user data received')
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed. Please try again.'
      setError(message)
      toast.error(message)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // 🚪 Handle logout
  const handleLogout = async () => {
    setIsLoading(true)
    try {
      // This API call should clear the HttpOnly cookie on the server
      await apiLogout() 
      
      // Reset client-side state
      setUser(null)
      setIsAuthenticated(false)
      toast.success('Logged out successfully')
    } catch (error) {
      // Even if logout API fails, clear the local state
      setUser(null)
      setIsAuthenticated(false)
      toast.error('Logout encountered an error, but you have been logged out locally')
    } finally {
      setIsLoading(false)
    }
  }

  // Add missing imports that were removed from the original code
  const apiLogin = async (credentials) => {
    return await api.post('/auth/login', credentials)
  }

  const apiRegister = async (userData) => {
    return await api.post('/auth/register', userData)
  }

  const apiLogout = async () => {
    return await api.get('/auth/logout')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}