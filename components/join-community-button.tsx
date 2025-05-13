"use client"

import type React from "react"

import { useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { useCommunity } from "@/contexts/community-context"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { UserPlus, UserMinus, Loader2 } from "lucide-react"

interface JoinCommunityButtonProps extends ButtonProps {
  communityId: number
  communityName?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  showIcon?: boolean
  redirectToLogin?: boolean
  className?: string
}

export function JoinCommunityButton({
  communityId,
  communityName,
  variant = "default",
  size = "default",
  showIcon = true,
  redirectToLogin = true,
  className,
  ...props
}: JoinCommunityButtonProps) {
  const { isJoined, joinCommunity, leaveCommunity } = useCommunity()
  const { user } = useAuth()
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const joined = isJoined(communityId)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      if (redirectToLogin) {
        router.push("/login")
      }
      return
    }

    setIsPending(true)
    try {
      if (joined) {
        await leaveCommunity(communityId)
      } else {
        await joinCommunity(communityId)
      }
    } catch (error) {
      console.error("Failed to join/leave community:", error)
    } finally {
      setIsPending(false)
    }
  }

  // Determine button variant based on joined status
  const buttonVariant = joined ? (variant === "default" ? "outline" : variant) : variant

  return (
    <Button
      variant={buttonVariant}
      size={size}
      onClick={handleClick}
      disabled={isPending}
      className={cn(className)}
      {...props}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {joined ? "Leaving..." : "Joining..."}
        </>
      ) : (
        <>
          {showIcon && (joined ? <UserMinus className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />)}
          {joined
            ? `Leave${communityName ? " " + communityName : ""}`
            : `Join${communityName ? " " + communityName : ""}`}
        </>
      )}
    </Button>
  )
}
