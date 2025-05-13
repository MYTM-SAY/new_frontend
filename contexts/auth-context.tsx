"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - in a real app, this would come from your backend
      const userData = {
        id: "user-1",
        name: email.split("@")[0],
        email,
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      // Redirect to feed page
      router.push("/feed")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - in a real app, this would come from your backend
      const userData = {
        id: "user-" + Date.now(),
        name,
        email,
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      // Redirect to feed page
      router.push("/feed")
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
