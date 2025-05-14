"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import Link from "next/link"
import { PostCard, type Post } from "@/components/post-card"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import type { CommentData } from "@/components/comment"

// Generate dummy comments for forum threads
const generateComments = (threadId: number): CommentData[] => {
  const baseComments: CommentData[] = [
    {
      id: threadId * 100 + 1,
      author: {
        name: "Alex Johnson",
        initials: "AJ",
      },
      content: "This is really insightful! I've been working with React for a while and still learned something new.",
      likes: 5,
      createdAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      liked: false,
    },
    {
      id: threadId * 100 + 2,
      author: {
        name: "Jamie Smith",
        initials: "JS",
      },
      content: "Have you tried using the new React hooks API? It's a game changer for state management.",
      likes: 3,
      createdAt: new Date(Date.now() - 3600000 * 5), // 5 hours ago
      liked: false,
      replies: [
        {
          id: threadId * 100 + 3,
          author: {
            name: "Taylor Wilson",
            initials: "TW",
          },
          content: "I agree! useContext + useReducer is a great combination for many use cases.",
          likes: 2,
          createdAt: new Date(Date.now() - 3600000 * 4), // 4 hours ago
          liked: false,
        },
      ],
    },
  ]

  // Return different comments for different threads to make it look more realistic
  if (threadId % 2 === 0) {
    return baseComments.slice(0, 1)
  } else if (threadId % 3 === 0) {
    return []
  } else {
    return baseComments
  }
}

// Dummy forum data converted to match PostCard format
const forumThreads: Post[] = [
  {
    id: 1,
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.svg",
      initials: "SJ",
    },
    community: {
      name: "Web Development",
      id: 1,
    },
    content:
      "How to structure a React application? I'm starting a new project and looking for best practices for organizing components, hooks, and utilities.",
    image: null,
    likes: 24,
    comments: 12,
    time: "2 hours ago",
    userVote: null,
    commentData: generateComments(1),
  },
  {
    id: 2,
    author: {
      name: "Michael Chen",
      avatar: "/placeholder-user.svg",
      initials: "MC",
    },
    community: {
      name: "Web Development",
      id: 1,
    },
    content:
      "Best practices for CSS organization. What's your preferred approach for managing styles in a large application? Do you use CSS modules, styled components, or something else?",
    image: null,
    likes: 18,
    comments: 8,
    time: "Yesterday",
    userVote: null,
    commentData: generateComments(2),
  },
  {
    id: 3,
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder-user.svg",
      initials: "AR",
    },
    community: {
      name: "Web Development",
      id: 1,
    },
    content:
      "JavaScript async/await explained. I've created a comprehensive guide to understanding asynchronous JavaScript with practical examples.",
    image: "/placeholder.svg?height=300&width=600",
    likes: 42,
    comments: 21,
    time: "3 days ago",
    userVote: null,
    commentData: generateComments(3),
  },
  {
    id: 4,
    author: {
      name: "Emily Wilson",
      avatar: "/placeholder-user.svg",
      initials: "EW",
    },
    community: {
      name: "Web Development",
      id: 1,
    },
    content:
      "How to debug performance issues in React? I'm experiencing some slowdowns in my application and would appreciate tips on profiling and optimization.",
    image: null,
    likes: 15,
    comments: 15,
    time: "1 week ago",
    userVote: null,
    commentData: generateComments(4),
  },
  {
    id: 5,
    author: {
      name: "David Kim",
      avatar: "/placeholder-user.svg",
      initials: "DK",
    },
    community: {
      name: "Web Development",
      id: 1,
    },
    content:
      "Setting up a Node.js server from scratch. Here's my step-by-step guide for creating a robust backend with Express, MongoDB, and authentication.",
    image: "/placeholder.svg?height=300&width=600",
    likes: 32,
    comments: 9,
    time: "1 week ago",
    userVote: null,
    commentData: generateComments(5),
  },
  {
    id: 6,
    author: {
      name: "Jessica Brown",
      avatar: "/placeholder-user.svg",
      initials: "JB",
    },
    community: {
      name: "Web Development",
      id: 1,
    },
    content:
      "Tips for writing clean and maintainable code. After years of experience, here are my top 10 principles for code that's easy to understand and extend.",
    image: null,
    likes: 56,
    comments: 17,
    time: "2 weeks ago",
    userVote: null,
    commentData: generateComments(6),
  },
]

const topics = ["All Topics", "React", "JavaScript", "CSS", "Node.js", "General"]

export default function ForumPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>(forumThreads)

  const handleVote = (postId: number, direction: "up" | "down" | null) => {
    // In a real app, you would make an API call here
    // For now, we'll just update the local state
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          // Calculate the new vote count
          let newLikes = post.likes

          // If user is changing from upvote to downvote
          if (post.userVote === "up" && direction === "down") {
            newLikes -= 2
          }
          // If user is changing from downvote to upvote
          else if (post.userVote === "down" && direction === "up") {
            newLikes += 2
          }
          // If user is removing their upvote
          else if (post.userVote === "up" && direction === null) {
            newLikes -= 1
          }
          // If user is removing their downvote
          else if (post.userVote === "down" && direction === null) {
            newLikes += 1
          }
          // If user is adding an upvote
          else if (post.userVote === null && direction === "up") {
            newLikes += 1
          }
          // If user is adding a downvote
          else if (post.userVote === null && direction === "down") {
            newLikes -= 1
          }

          return { ...post, userVote: direction, likes: newLikes }
        }
        return post
      }),
    )
  }

  const handleAddComment = (postId: number, content: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "You need to be logged in to comment.",
        variant: "destructive",
      })
      return
    }

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          const newComment: CommentData = {
            id: Date.now(),
            author: {
              name: user.name,
              initials: user.name.charAt(0),
            },
            content,
            likes: 0,
            createdAt: new Date(),
            liked: false,
          }

          const updatedCommentData = post.commentData ? [...post.commentData, newComment] : [newComment]

          return {
            ...post,
            comments: post.comments + 1,
            commentData: updatedCommentData,
          }
        }
        return post
      }),
    )

    toast({
      title: "Comment added",
      description: "Your comment has been added successfully.",
    })
  }

  const handleLikeComment = (commentId: number) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "You need to be logged in to like comments.",
        variant: "destructive",
      })
      return
    }

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (!post.commentData) return post

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

        return {
          ...post,
          commentData: updateComments(post.commentData),
        }
      }),
    )
  }

  const handleReplyToComment = (commentId: number, content: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "You need to be logged in to reply to comments.",
        variant: "destructive",
      })
      return
    }

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (!post.commentData) return post

        // Function to recursively find and update the comment to reply to
        const updateComments = (comments: CommentData[]): CommentData[] => {
          return comments.map((comment) => {
            if (comment.id === commentId) {
              // Add reply to this comment
              const newReply: CommentData = {
                id: Date.now(),
                author: {
                  name: user.name,
                  initials: user.name.charAt(0),
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

        return {
          ...post,
          comments: post.comments + 1,
          commentData: updateComments(post.commentData),
        }
      }),
    )

    toast({
      title: "Reply added",
      description: "Your reply has been added successfully.",
    })
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community Forum</h1>
          <p className="text-muted-foreground">Join discussions, ask questions, and share your knowledge.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Thread
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic.toLowerCase().replace(/\s+/g, "-")}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="latest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="replies">Most Replies</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-auto">
          <Input placeholder="Search threads..." className="w-full sm:w-[300px]" />
        </div>
      </div>

      {user && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <Link href="/forum/new">
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Start a New Discussion
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/forum/${post.id}`} className="block">
            <PostCard
              post={post}
              onVote={handleVote}
              onAddComment={handleAddComment}
              onLikeComment={handleLikeComment}
              onReplyToComment={handleReplyToComment}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
