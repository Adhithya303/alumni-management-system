import { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const storedUser = localStorage.getItem('alumni_user')
  let parsedUser = null

  if (storedUser) {
    try {
      parsedUser = JSON.parse(storedUser)
    } catch (error) {
      parsedUser = null
    }
  }

  const [token, setToken] = useState(localStorage.getItem('alumni_token'))
  const [user, setUser] = useState(parsedUser)

  const login = (newToken, newUser) => {
    localStorage.setItem('alumni_token', newToken)
    localStorage.setItem('alumni_user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('alumni_token')
    localStorage.removeItem('alumni_user')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  const value = useMemo(() => ({ user, token, login, logout }), [user, token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
