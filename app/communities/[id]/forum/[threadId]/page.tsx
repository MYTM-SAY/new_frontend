"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { PostCard, type Post } from "@/components/post-card"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import type { CommentData } from "@/components/comment"

// Dummy thread data
const getThreadData = (communityId: number, threadId: number): Post => {
  // In a real app, you would fetch this data from your API
  return {
    id: threadId,
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.svg",
      initials: "SJ",
    },
    community: {
      name: "Web Development",
      id: communityId,
    },
    content: `
      I'm starting a new React project and I'm wondering what's the best way to structure my application.

      I've seen different approaches like:
      - Organizing by features
      - Organizing by type (components, hooks, utils, etc.)
      - A mix of both

      What do you think works best for medium to large applications? Any tips or resources would be greatly appreciated!
    `,
    image: null,
    likes: 24,
    comments: 8,
    time: "2 hours ago",
    userVote: null,
    commentData: [
      {
        id: 101,
        author: {
          name: "Michael Chen",
          initials: "MC",
        },
        content:
          "Great question! I've worked on several large React applications, and I've found that organizing by features works best for scalability. This way, related code stays together, making it easier to understand and maintain.",
        likes: 5,
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        liked: false,
      },
      {
        id: 102,
        author: {
          name: "Emily Wilson",
          initials: "EW",
        },
        content:
          "I agree with Michael about feature-based organization. It's especially helpful when multiple people are working on the same codebase. One thing I'd add is to consider using absolute imports with a path alias (like @/features/auth) to avoid messy relative imports.",
        likes: 3,
        createdAt: new Date(Date.now() - 3600000 * 0.75), // 45 minutes ago
        liked: false,
        replies: [
          {
            id: 103,
            author: {
              name: "Sarah Johnson",
              initials: "SJ",
            },
            content:
              "That's a great point about absolute imports! I've been using them in my Next.js projects and they make the code so much cleaner.",
            likes: 2,
            createdAt: new Date(Date.now() - 3600000 * 0.5), // 30 minutes ago
            liked: false,
          },
        ],
      },
      {
        id: 104,
        author: {
          name: "Alex Rodriguez",
          initials: "AR",
        },
        content:
          "I've found that a hybrid approach works well too. For example: organize most code by feature, have a shared/common folder for truly reusable components, and use a services folder for API calls and external integrations. The most important thing is consistency. Whatever structure you choose, make sure the whole team understands and follows it.",
        likes: 2,
        createdAt: new Date(Date.now() - 3600000 * 0.33), // 20 minutes ago
        liked: false,
      },
    ],
  }
}

export default function CommunityThreadPage({ params }: { params: { id: string; threadId: string } }) {
  const communityId = Number.parseInt(params.id)
  const threadId = Number.parseInt(params.threadId)
  const { user } = useAuth()
  const { toast } = useToast()

  // Get thread data
  const [currentThread, setCurrentThread] = useState<Post>(getThreadData(communityId, threadId))
  const [replyContent, setReplyContent] = useState("")

  const handleVote = (postId: number, direction: "up" | "down" | null) => {
    if (postId === currentThread.id) {
      setCurrentThread((prev) => ({ ...prev, userVote: direction }))
    }
  }

  const handleAddComment = (postId: number, content: string) => {
    if (postId !== currentThread.id) return

    const newComment: CommentData = {
      id: Date.now(),
      author: {
        name: user?.name || "Anonymous",
        initials: user?.name?.charAt(0) || "A",
      },
      content,
      likes: 0,
      createdAt: new Date(),
      liked: false,
    }

    setCurrentThread((prev) => ({
      ...prev,
      comments: prev.comments + 1,
      commentData: prev.commentData ? [...prev.commentData, newComment] : [newComment],
    }))

    toast({
      title: "Reply added",
      description: "Your reply has been added successfully.",
    })
  }

  const handleLikeComment = (commentId: number) => {
    if (!currentThread.commentData) return

    // Function to recursively update comments and their replies
    const updateComments = (comments: CommentData[]): CommentData[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          // Toggle like status
          const newLiked = !comment.liked
          return {
            ...comment,
            liked: newLiked,
            likes: newLiked ? comment.likes + 1 : comment.likes - 1,
          }
        }

        // Check if this comment has replies that need updating
        if (comment.replies) {
          return {
            ...comment,
            replies: updateComments(comment.replies),
          }
        }

        return comment
      })
    }

    setCurrentThread((prev) => ({
      ...prev,
      commentData: updateComments(prev.commentData || []),
    }))
  }

  const handleReplyToComment = (commentId: number, content: string) => {
    if (!currentThread.commentData) return

    // Function to recursively find and update the comment to reply to
    const updateComments = (comments: CommentData[]): CommentData[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          // Add reply to this comment
          const newReply: CommentData = {
            id: Date.now(),
            author: {
              name: user?.name || "Anonymous",
              initials: user?.name?.charAt(0) || "A",
            },
            content,
            likes: 0,
            createdAt: new Date(),
            liked: false,
          }

          return {
            ...comment,
            replies: comment.replies ? [...comment.replies, newReply] : [newReply],
          }
        }

        // Check if this comment has replies that need updating
        if (comment.replies) {
          return {
            ...comment,
            replies: updateComments(comment.replies),
          }
        }

        return comment
      })
    }

    setCurrentThread((prev) => ({
      ...prev,
      comments: prev.comments + 1,
      commentData: updateComments(prev.commentData || []),
    }))

    toast({
      title: "Reply added",
      description: "Your reply has been added successfully.",
    })
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link
          href={`/communities/${communityId}`}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Community
        </Link>
      </div>

      <div className="space-y-6">
        {/* Original post */}
        <PostCard
          post={currentThread}
          onVote={handleVote}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
          onReplyToComment={handleReplyToComment}
          showComments={true}
        />

        {/* Reply form for non-logged in users or if comments are hidden */}
        {user && !currentThread.commentData?.length && (
          <Card className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Leave a Reply</h3>
            <div className="space-y-4">
              <Textarea
                placeholder="Write your reply here..."
                className="min-h-[150px]"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <Button
                onClick={() => {
                  if (replyContent.trim()) {
                    handleAddComment(currentThread.id, replyContent)
                    setReplyContent("")
                  }
                }}
              >
                Post Reply
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
