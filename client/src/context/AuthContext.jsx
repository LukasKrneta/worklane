import { createContext, useEffect, useState } from 'react'
import {
  getCurrentUserRequest,
  loginRequest,
  registerRequest,
} from '../api/authApi.js'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)

  const loadCurrentUser = async () => {
    try {
      const response = await getCurrentUserRequest()
      setUser(response.user)
    } catch {
      setUser(null)
    } finally {
      setIsInitializing(false)
    }
  }

  useEffect(() => {
    loadCurrentUser()
  }, [])

  const login = async (credentials) => {
    const response = await loginRequest(credentials)
    setUser(response.user)
    return response.user
  }

  const register = async (payload) => {
    const response = await registerRequest(payload)
    return response.user
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isInitializing,
        login,
        register,
        refreshCurrentUser: loadCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
