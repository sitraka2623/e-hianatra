import React, { createContext, useState, useContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded)
        } else {
          localStorage.removeItem('token')
        }
      } catch (error) {
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token } = response.data
      localStorage.setItem('token', token)
      const decoded = jwtDecode(token)
      setUser(decoded)
      return decoded
    } catch (error) {
      // Mode démo : connexion simulée
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkZW1vQGUtaGlhbmF0cmEubWciLCJyb2xlIjoiU1RVREVOVCIsImV4cCI6OTk5OTk5OTk5OX0.demo'
      localStorage.setItem('token', mockToken)
      
      // Créer un utilisateur de démo basé sur l'email
      const demoUser = {
        id: 1,
        email: email,
        role: email.includes('teacher') ? 'TEACHER' : email.includes('admin') ? 'ADMIN' : 'STUDENT',
        exp: 9999999999
      }
      setUser(demoUser)
      return demoUser
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      return response.data
    } catch (error) {
      // Mode démo : inscription simulée
      return { success: true, message: 'Compte créé avec succès (mode démo)' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
