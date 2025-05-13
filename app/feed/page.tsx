"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import Image from "next/image"
import { PostCard, type Post } from "@/components/post-card"

// Dummy posts data with userVote field
const initialPosts: Post[] = [
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
      "Just finished the React course in the Web Development community! The project-based approach really helped solidify the concepts. Has anyone else taken this course?",
    image: null,
    likes: 24,
    comments: 8,
    time: "2 hours ago",
    userVote: null,
  },
  {
    id: 2,
    author: {
      name: "Michael Chen",
      avatar: "/placeholder-user.svg",
      initials: "MC",
    },
    community: {
      name: "UI/UX Design",
      id: 4,
    },
    content: "Check out this design system I created for my latest project. Feedback welcome!",
    image: "/placeholder.svg?height=400&width=600",
    likes: 42,
    comments: 15,
    time: "5 hours ago",
    userVote: null,
  },
  {
    id: 3,
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder-user.svg",
      initials: "AR",
    },
    community: {
      name: "Data Science",
      id: 2,
    },
    content:
      "I'm struggling with implementing a neural network for image classification. Has anyone worked with TensorFlow for this kind of task? Any tips or resources would be greatly appreciated!",
    image: null,
    likes: 12,
    comments: 21,
    time: "Yesterday",
    userVote: null,
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
    content: "Just published my first npm package! It's a utility library for handling form validation in React.",
    image: "/placeholder.svg?height=300&width=600",
    likes: 56,
    comments: 13,
    time: "2 days ago",
    userVote: null,
  },
]

export default function FeedPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPostContent, setNewPostContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  const handleVote = (postId: number, direction: "up" | "down" | null) => {
    // In a real app, you would make an API call here
    // For now, we'll just update the local state
    setPosts((currentPosts) =>
      currentPosts.map((post) => (post.id === postId ? { ...post, userVote: direction } : post)),
    )
  }

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      toast({
        title: "Empty post",
        description: "Please write something before posting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call delay
    setTimeout(() => {
      const newPost: Post = {
        id: Date.now(),
        author: {
          name: user?.name || "Anonymous",
          avatar: undefined,
          initials: user?.name?.charAt(0) || "A",
        },
        community: {
          name: "Web Development",
          id: 1,
        },
        content: newPostContent,
        image: null,
        likes: 0,
        comments: 0,
        time: "Just now",
        userVote: null,
      }

      setPosts([newPost, ...posts])
      setNewPostContent("")
      setIsSubmitting(false)

      toast({
        title: "Post created",
        description: "Your post has been published successfully.",
      })
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we load your feed</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Feed</h1>
        <p className="text-muted-foreground">See the latest posts from your communities</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* Create Post */}
          <Card>
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <Textarea
                  placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`}
                  className="min-h-[80px]"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm">
                Add Image
              </Button>
              <Button size="sm" onClick={handleCreatePost} disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </CardFooter>
          </Card>

          {/* Posts */}
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onVote={handleVote} />
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Your Communities</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/communities/1" className="flex items-center gap-3 hover:underline">
                <div className="h-8 w-8 overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Web Development"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span>Web Development</span>
              </Link>
              <Link href="/communities/2" className="flex items-center gap-3 hover:underline">
                <div className="h-8 w-8 overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Data Science"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span>Data Science</span>
              </Link>
              <Link href="/communities/4" className="flex items-center gap-3 hover:underline">
                <div className="h-8 w-8 overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="UI/UX Design"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span>UI/UX Design</span>
              </Link>
              <Link href="/communities" className="text-sm text-primary hover:underline">
                View all communities
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Suggested Communities</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/communities/6" className="flex items-center gap-3 hover:underline">
                <div className="h-8 w-8 overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Game Development"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span>Game Development</span>
              </Link>
              <Link href="/communities/5" className="flex items-center gap-3 hover:underline">
                <div className="h-8 w-8 overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="DevOps & Cloud"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span>DevOps & Cloud</span>
              </Link>
              <Link href="/discover" className="text-sm text-primary hover:underline">
                Discover more communities
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
