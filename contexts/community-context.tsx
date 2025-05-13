"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"

export interface Community {
  id: number
  name: string
  description: string
  members: number
  image?: string
  banner?: string
  category?: string
  classrooms?: number
  posts?: number
  joined?: boolean
}

interface CommunityContextType {
  joinedCommunities: number[]
  joinCommunity: (communityId: number) => Promise<void>
  leaveCommunity: (communityId: number) => Promise<void>
  isJoined: (communityId: number) => boolean
  isLoading: boolean
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined)

export function CommunityProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load joined communities from localStorage on initial load
  useEffect(() => {
    if (user) {
      const storedCommunities = localStorage.getItem(`joined_communities_${user.id}`)
      if (storedCommunities) {
        setJoinedCommunities(JSON.parse(storedCommunities))
      } else {
        // Default joined communities for demo purposes
        const defaultJoined = [1, 2, 4]
        setJoinedCommunities(defaultJoined)
        localStorage.setItem(`joined_communities_${user.id}`, JSON.stringify(defaultJoined))
      }
    } else {
      setJoinedCommunities([])
    }
    setIsLoading(false)
  }, [user])

  // Save joined communities to localStorage whenever they change
  useEffect(() => {
    if (user && !isLoading) {
      localStorage.setItem(`joined_communities_${user.id}`, JSON.stringify(joinedCommunities))
    }
  }, [joinedCommunities, user, isLoading])

  const joinCommunity = async (communityId: number) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "You need to be logged in to join communities.",
        variant: "destructive",
      })
      return Promise.reject("Not logged in")
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update state
      setJoinedCommunities((prev) => [...prev, communityId])

      toast({
        title: "Community joined",
        description: "You have successfully joined this community.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join community. Please try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const leaveCommunity = async (communityId: number) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "You need to be logged in to leave communities.",
        variant: "destructive",
      })
      return Promise.reject("Not logged in")
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update state
      setJoinedCommunities((prev) => prev.filter((id) => id !== communityId))

      toast({
        title: "Community left",
        description: "You have successfully left this community.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to leave community. Please try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const isJoined = (communityId: number) => {
    // If user is not logged in, they haven't joined any communities
    if (!user) return false
    return joinedCommunities.includes(communityId)
  }

  return (
    <CommunityContext.Provider value={{ joinedCommunities, joinCommunity, leaveCommunity, isJoined, isLoading }}>
      {children}
    </CommunityContext.Provider>
  )
}

export function useCommunity() {
  const context = useContext(CommunityContext)
  if (context === undefined) {
    throw new Error("useCommunity must be used within a CommunityProvider")
  }
  return context
}
