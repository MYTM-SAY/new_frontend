"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { MessageSquare, Share2, Bookmark, MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { CommentSection } from "@/components/comment-section"
import type { CommentData } from "@/components/comment"

export interface PostAuthor {
  name: string
  avatar?: string
  initials: string
}

export interface PostCommunity {
  name: string
  id: number
}

export interface Post {
  id: number
  author: PostAuthor
  community: PostCommunity
  content: string
  image?: string | null
  likes: number
  comments: number
  time: string
  userVote?: "up" | "down" | null
  commentData?: CommentData[]
}

interface PostCardProps {
  post: Post
  onVote?: (postId: number, direction: "up" | "down" | null) => void
  onAddComment?: (postId: number, content: string) => void
  onLikeComment?: (commentId: number) => void
  onReplyToComment?: (commentId: number, content: string) => void
  showComments?: boolean
}

export function PostCard({
  post,
  onVote,
  onAddComment,
  onLikeComment,
  onReplyToComment,
  showComments = false,
}: PostCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentPost, setCurrentPost] = useState<Post>(post)
  const [isVoting, setIsVoting] = useState(false)
  const [showCommentsSection, setShowCommentsSection] = useState(showComments)

  const handleVote = async (direction: "up" | "down") => {
    if (!user) {
      toast({
        title: "Login required",
        description: "You need to be logged in to vote on posts.",
        variant: "destructive",
      })
      return
    }

    setIsVoting(true)

    try {
      // Determine the new vote state
      let newVoteState: "up" | "down" | null = direction

      // If user clicks the same button they already voted for, remove their vote
      if (currentPost.userVote === direction) {
        newVoteState = null
      }

      // Calculate the new vote count
      let voteChange = 0

      if (currentPost.userVote === "up" && newVoteState === "down") {
        // Changing from upvote to downvote (-2)
        voteChange = -2
      } else if (currentPost.userVote === "down" && newVoteState === "up") {
        // Changing from downvote to upvote (+2)
        voteChange = 2
      } else if (currentPost.userVote === "up" && newVoteState === null) {
        // Removing upvote (-1)
        voteChange = -1
      } else if (currentPost.userVote === "down" && newVoteState === null) {
        // Removing downvote (+1)
        voteChange = 1
      } else if (currentPost.userVote === null && newVoteState === "up") {
        // Adding upvote (+1)
        voteChange = 1
      } else if (currentPost.userVote === null && newVoteState === "down") {
        // Adding downvote (-1)
        voteChange = -1
      }

      // Update local state immediately for responsive UI
      setCurrentPost((prev) => ({
        ...prev,
        likes: prev.likes + voteChange,
        userVote: newVoteState,
      }))

      // Call the parent component's onVote handler if provided
      if (onVote) {
        onVote(currentPost.id, newVoteState)
      }

      // In a real app, you would make an API call here to update the vote on the server
      // await updateVote(post.id, direction)
    } catch (error) {
      // Revert the state if there's an error
      setCurrentPost(post)
      toast({
        title: "Error",
        description: "Failed to register your vote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVoting(false)
    }
  }

  const handleAddComment = (postId: number, content: string) => {
    if (onAddComment) {
      onAddComment(postId, content)
    }

    // Update local comment count
    setCurrentPost((prev) => ({
      ...prev,
      comments: prev.comments + 1,
    }))
  }

  const handleToggleComments = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowCommentsSection(!showCommentsSection)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={currentPost.author.avatar || "/placeholder.svg"} alt={currentPost.author.name} />
          <AvatarFallback>{currentPost.author.initials}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{currentPost.author.name}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Link href={`/communities/${currentPost.community.id}`} className="hover:underline">
              {currentPost.community.name}
            </Link>
            <span className="mx-1">•</span>
            <span>{currentPost.time}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{currentPost.content}</p>
        {currentPost.image && (
          <div className="overflow-hidden rounded-lg">
            <Image
              src={currentPost.image || "/placeholder.svg"}
              alt="Post image"
              width={600}
              height={400}
              className="w-full object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col border-t pt-4">
        <div className="flex w-full justify-between">
          <div className="flex items-center">
            <div className="flex items-center border rounded-md mr-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8 rounded-r-none", currentPost.userVote === "up" && "bg-primary/10 text-primary")}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleVote("up")
                }}
                disabled={isVoting}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <span className="px-2 font-medium text-sm">{currentPost.likes}</span>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-l-none",
                  currentPost.userVote === "down" && "bg-primary/10 text-primary",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleVote("down")
                }}
                disabled={isVoting}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="gap-1" onClick={handleToggleComments}>
              <MessageSquare className="h-4 w-4" />
              <span>{currentPost.comments}</span>
            </Button>
          </div>
          <div className="flex">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        {showCommentsSection && currentPost.commentData && (
          <CommentSection
            postId={currentPost.id}
            comments={currentPost.commentData}
            onAddComment={handleAddComment}
            onLikeComment={onLikeComment || (() => {})}
            onReplyToComment={onReplyToComment || (() => {})}
            className="mt-4 pt-4 border-t w-full"
          />
        )}
      </CardFooter>
    </Card>
  )
}
