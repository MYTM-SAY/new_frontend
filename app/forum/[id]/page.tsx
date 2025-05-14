"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, MessageSquare, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { PostCard, type Post } from "@/components/post-card"
import { useAuth } from "@/contexts/auth-context"

// Dummy thread data
const thread: Post = {
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
}

// Dummy replies
const replies = [
  {
    id: 1,
    author: {
      name: "Michael Chen",
      avatar: "/placeholder-user.svg",
      initials: "MC",
      joinDate: "Member since Mar 2022",
    },
    date: "1 hour ago",
    content: `
      <p>Great question! I've worked on several large React applications, and I've found that organizing by features works best for scalability.</p>
      <p>Here's a structure I typically use:</p>
      <pre><code>
src/
  features/
    auth/
      components/
      hooks/
      utils/
      types.ts
      index.ts
    dashboard/
      components/
      hooks/
      utils/
      types.ts
      index.ts
  shared/
    components/
    hooks/
    utils/
  app.tsx
  main.tsx
      </code></pre>
      <p>This way, related code stays together, making it easier to understand and maintain.</p>
    `,
    likes: 5,
  },
  {
    id: 2,
    author: {
      name: "Emily Wilson",
      avatar: "/placeholder-user.svg",
      initials: "EW",
      joinDate: "Member since Nov 2023",
    },
    date: "45 minutes ago",
    content: `
      <p>I agree with Michael about feature-based organization. It's especially helpful when multiple people are working on the same codebase.</p>
      <p>One thing I'd add is to consider using absolute imports with a path alias (like @/features/auth) to avoid messy relative imports.</p>
      <p>Also, for state management, consider whether you need a global solution like Redux or if React Context with hooks might be sufficient for your needs.</p>
    `,
    likes: 3,
  },
  {
    id: 3,
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder-user.svg",
      initials: "AR",
      joinDate: "Member since Jun 2021",
    },
    date: "20 minutes ago",
    content: `
      <p>I've found that a hybrid approach works well too. For example:</p>
      <ul>
        <li>Organize most code by feature</li>
        <li>Have a shared/common folder for truly reusable components</li>
        <li>Use a services folder for API calls and external integrations</li>
      </ul>
      <p>The most important thing is consistency. Whatever structure you choose, make sure the whole team understands and follows it.</p>
    `,
    likes: 2,
  },
]

export default function ThreadPage({ params }: { params: { id: string } }) {
  const threadId = Number.parseInt(params.id)
  const { user } = useAuth()
  const [currentThread, setCurrentThread] = useState<Post>(thread)
  const [replyContent, setReplyContent] = useState("")

  // In a real app, you would fetch the thread data based on the ID
  // For this example, we're using the dummy data

  const handleVote = (postId: number, direction: "up" | "down" | null) => {
    if (postId === currentThread.id) {
      setCurrentThread((prev) => ({ ...prev, userVote: direction }))
    }
  }

  const handleSubmitReply = () => {
    // In a real app, you would submit the reply to your backend
    // For now, we'll just clear the textarea
    setReplyContent("")
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link href="/forum" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Forum
        </Link>
      </div>

      <div className="space-y-6">
        {/* Original post */}
        <PostCard post={currentThread} onVote={handleVote} />

        {/* Replies */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Replies ({replies.length})</h2>
          </div>

          {replies.map((reply) => (
            <Card key={reply.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                    <AvatarFallback>{reply.author.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="font-semibold">{reply.author.name}</div>
                        <div className="text-xs text-muted-foreground">{reply.author.joinDate}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{reply.date}</div>
                    </div>
                    <div
                      className="prose dark:prose-invert max-w-none mt-2"
                      dangerouslySetInnerHTML={{ __html: reply.content }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {reply.likes > 0 ? `${reply.likes}` : "Like"}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Reply
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Reply form */}
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">Leave a Reply</h3>
          <div className="space-y-4">
            <Textarea
              placeholder="Write your reply here..."
              className="min-h-[150px]"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <Button onClick={handleSubmitReply}>Post Reply</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
