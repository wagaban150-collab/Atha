import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  refreshToken: string | null
  user: any | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => void
  setToken: (token: string, refreshToken: string) => void
  setUser: (user: any) => void
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      user: null,
      login: async (email: string, password: string) => {
        try {
          const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          })
          const data = await response.json()
          set({
            isAuthenticated: true,
            token: data.token,
            refreshToken: data.refreshToken,
            user: data.user
          })
        } catch (error) {
          throw new Error('Login failed')
        }
      },
      register: async (email: string, password: string, fullName: string) => {
        try {
          const response = await fetch('/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, fullName })
          })
          const data = await response.json()
          set({
            isAuthenticated: true,
            token: data.token,
            refreshToken: data.refreshToken,
            user: data.user
          })
        } catch (error) {
          throw new Error('Registration failed')
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          refreshToken: null,
          user: null
        })
      },
      setToken: (token: string, refreshToken: string) => {
        set({ token, refreshToken })
      },
      setUser: (user: any) => {
        set({ user })
      }
    }),
    { name: 'auth-store' }
  )
)
