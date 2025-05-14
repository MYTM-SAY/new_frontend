"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, MessageSquare, Users, ChevronLeft, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { JoinCommunityButton } from "@/components/join-community-button"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { PostCard, type Post } from "@/components/post-card"
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

// Dummy community data
const communities = [
  {
    id: 1,
    name: "Web Development",
    description:
      "A community dedicated to learning and discussing modern web development technologies and practices. Join us to improve your skills and connect with other developers.",
    members: 1250,
    image: "/placeholder.svg?height=200&width=200",
    banner: "/placeholder.svg?height=300&width=1200",
    classrooms: [
      {
        id: 101,
        title: "HTML & CSS Fundamentals",
        description: "Learn the basics of web structure and styling.",
        progress: 75,
        image: "/placeholder.svg?height=200&width=300",
        lessons: 12,
        students: 450,
      },
      {
        id: 102,
        title: "JavaScript Essentials",
        description: "Master the core concepts of JavaScript programming.",
        progress: 45,
        image: "/placeholder.svg?height=200&width=300",
        lessons: 15,
        students: 380,
      },
      {
        id: 103,
        title: "React Framework",
        description: "Build interactive user interfaces with React.",
        progress: 20,
        image: "/placeholder.svg?height=200&width=300",
        lessons: 18,
        students: 320,
      },
    ],
    forum: {
      threads: [
        {
          id: 201,
          title: "How to structure a React application?",
          author: {
            name: "Sarah Johnson",
            avatar: "/placeholder-user.svg",
            initials: "SJ",
          },
          content:
            "I'm starting a new React project and I'm wondering what's the best way to structure my application. I've seen different approaches like organizing by features, by type, or a mix of both. What do you think works best for medium to large applications?",
          date: "2 hours ago",
          replies: 12,
          views: 145,
          likes: 24,
          userVote: null,
        },
        {
          id: 202,
          title: "Best practices for CSS organization",
          author: {
            name: "Michael Chen",
            avatar: "/placeholder-user.svg",
            initials: "MC",
          },
          content:
            "What's your preferred approach for managing styles in a large application? Do you use CSS modules, styled components, or something else? I'm trying to establish a consistent pattern for my team.",
          date: "Yesterday",
          replies: 8,
          views: 97,
          likes: 18,
          userVote: null,
        },
        {
          id: 203,
          title: "JavaScript async/await explained",
          author: {
            name: "Alex Rodriguez",
            avatar: "/placeholder-user.svg",
            initials: "AR",
          },
          content:
            "I've created a comprehensive guide to understanding asynchronous JavaScript with practical examples. Check it out and let me know if you have any questions!",
          date: "3 days ago",
          replies: 21,
          views: 230,
          likes: 42,
          userVote: null,
          image: "/placeholder.svg?height=300&width=600",
        },
      ],
    },
    announcements: [
      {
        id: 301,
        title: "New React Course Added",
        content: "We've just added a new course on React 18 features. Check it out!",
        date: "2 days ago",
      },
      {
        id: 302,
        title: "Community Meetup",
        content: "Join our virtual meetup this Friday at 5 PM EST to discuss the latest web development trends.",
        date: "1 week ago",
      },
    ],
  },
  // Other communities would be defined here
]

export default function CommunityDetailPage({ params }: { params: { id: string } }) {
  const communityId = Number.parseInt(params.id)
  const community = communities.find((c) => c.id === communityId)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // State for forum threads with voting functionality
  const [forumThreads, setForumThreads] = useState<Post[]>(
    community?.forum.threads.map(
      (thread) =>
        ({
          id: thread.id,
          author: thread.author,
          community: {
            name: community?.name || "",
            id: communityId,
          },
          content: thread.content,
          image: thread.image || null,
          likes: thread.likes || 0,
          comments: thread.replies || 0,
          time: thread.date,
          userVote: thread.userVote,
          commentData: generateComments(thread.id),
        }) as Post,
    ) || [],
  )

  const handleVote = (postId: number, direction: "up" | "down" | null) => {
    setForumThreads((currentThreads) =>
      currentThreads.map((thread) => {
        if (thread.id === postId) {
          // Calculate the new vote count
          let newLikes = thread.likes

          // If user is changing from upvote to downvote
          if (thread.userVote === "up" && direction === "down") {
            newLikes -= 2
          }
          // If user is changing from downvote to upvote
          else if (thread.userVote === "down" && direction === "up") {
            newLikes += 2
          }
          // If user is removing their upvote
          else if (thread.userVote === "up" && direction === null) {
            newLikes -= 1
          }
          // If user is removing their downvote
          else if (thread.userVote === "down" && direction === null) {
            newLikes += 1
          }
          // If user is adding an upvote
          else if (thread.userVote === null && direction === "up") {
            newLikes += 1
          }
          // If user is adding a downvote
          else if (thread.userVote === null && direction === "down") {
            newLikes -= 1
          }

          return { ...thread, userVote: direction, likes: newLikes }
        }
        return thread
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

    setForumThreads((currentThreads) =>
      currentThreads.map((thread) => {
        if (thread.id === postId) {
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

          const updatedCommentData = thread.commentData ? [...thread.commentData, newComment] : [newComment]

          return {
            ...thread,
            comments: thread.comments + 1,
            commentData: updatedCommentData,
          }
        }
        return thread
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

    setForumThreads((currentThreads) =>
      currentThreads.map((thread) => {
        if (!thread.commentData) return thread

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
          ...thread,
          commentData: updateComments(thread.commentData),
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

    setForumThreads((currentThreads) =>
      currentThreads.map((thread) => {
        if (!thread.commentData) return thread

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
          ...thread,
          comments: thread.comments + 1,
          commentData: updateComments(thread.commentData),
        }
      }),
    )

    toast({
      title: "Reply added",
      description: "Your reply has been added successfully.",
    })
  }

  const navigateToThread = (threadId: number) => {
    router.push(`/communities/${communityId}/forum/${threadId}`)
  }

  if (!community) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold">Community not found</h1>
        <Link href="/communities">
          <Button className="mt-4">Back to Communities</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Community Banner */}
      <div className="relative h-48 w-full overflow-hidden md:h-64">
        <Image
          src={community.banner || "/placeholder.svg"}
          alt={community.name}
          width={1200}
          height={300}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 md:p-6">
          <Link href="/communities" className="mb-2 md:mb-4 flex items-center text-sm text-white hover:underline">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Communities
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{community.name}</h1>
          <div className="flex items-center text-sm text-white/80">
            <Users className="mr-1 h-4 w-4" />
            <span>{community.members} members</span>
          </div>
        </div>
      </div>

      <div className="container py-6 md:py-10">
        <div className="mb-6 md:mb-8 flex flex-col gap-6 lg:flex-row">
          <div className="w-full lg:w-2/3">
            <div className="mb-4">
              <h2 className="text-xl md:text-2xl font-bold">About this Community</h2>
              <p className="mt-2 text-muted-foreground">{community.description}</p>
            </div>

            <Tabs defaultValue="classrooms">
              <TabsList className="mb-4 md:mb-6 w-full overflow-x-auto">
                <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
                <TabsTrigger value="forum">Forum</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
              </TabsList>

              <TabsContent value="classrooms">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-semibold">Available Classrooms</h3>
                  {user && (
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Classroom
                    </Button>
                  )}
                </div>
                <div className="grid gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2">
                  {community.classrooms.map((classroom) => (
                    <Link key={classroom.id} href={`/communities/${community.id}/classrooms/${classroom.id}`}>
                      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                        <div className="aspect-video w-full overflow-hidden">
                          <Image
                            src={classroom.image || "/placeholder.svg"}
                            alt={classroom.title}
                            width={300}
                            height={200}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg md:text-xl">{classroom.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">{classroom.description}</p>
                          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                            <span>{classroom.lessons} lessons</span>
                            <span>{classroom.students} students</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          {user && (
                            <div className="w-full space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  {classroom.progress > 0 ? "In progress" : "Not started"}
                                </span>
                                <span className="text-sm font-medium">{classroom.progress}%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-primary/20">
                                <div
                                  className="h-full rounded-full bg-primary"
                                  style={{ width: `${classroom.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          {!user && (
                            <Button variant="outline" className="w-full">
                              View Classroom
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="forum">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-semibold">Community Forum</h3>
                  {user && (
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Thread
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  {forumThreads.map((thread) => (
                    <div key={thread.id} className="space-y-1">
                      <div onClick={() => navigateToThread(thread.id)}>
                        <PostCard
                          post={thread}
                          onVote={handleVote}
                          onAddComment={handleAddComment}
                          onLikeComment={handleLikeComment}
                          onReplyToComment={handleReplyToComment}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="announcements">
                <div className="space-y-4">
                  {community.announcements.map((announcement) => (
                    <Card key={announcement.id}>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <CardDescription>{announcement.date}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p>{announcement.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full lg:w-1/3 space-y-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Community Info</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-lg">
                    <Image
                      src={community.image || "/placeholder.svg"}
                      alt={community.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{community.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{community.members} members</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Community Stats</h4>
                  <div className="grid grid-cols-2 gap-2 rounded-lg border p-3">
                    <div className="flex flex-col items-center">
                      <BookOpen className="mb-1 h-5 w-5 text-muted-foreground" />
                      <span className="text-lg font-semibold">{community.classrooms.length}</span>
                      <span className="text-xs text-muted-foreground">Classrooms</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageSquare className="mb-1 h-5 w-5 text-muted-foreground" />
                      <span className="text-lg font-semibold">{community.forum.threads.length}</span>
                      <span className="text-xs text-muted-foreground">Forum Threads</span>
                    </div>
                  </div>
                </div>

                <JoinCommunityButton communityId={community.id} communityName={community.name} className="w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle>Active Members</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap -space-x-2">
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>JB</AvatarFallback>
                  </Avatar>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                    +{community.members - 5}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
