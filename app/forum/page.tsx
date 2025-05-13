import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Plus } from "lucide-react"
import Link from "next/link"

// Dummy forum data
const forumThreads = [
  {
    id: 1,
    title: "How to structure a React application?",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.svg",
      initials: "SJ",
    },
    date: "2 hours ago",
    replies: 12,
    views: 145,
    topic: "React",
  },
  {
    id: 2,
    title: "Best practices for CSS organization",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder-user.svg",
      initials: "MC",
    },
    date: "Yesterday",
    replies: 8,
    views: 97,
    topic: "CSS",
  },
  {
    id: 3,
    title: "JavaScript async/await explained",
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder-user.svg",
      initials: "AR",
    },
    date: "3 days ago",
    replies: 21,
    views: 230,
    topic: "JavaScript",
  },
  {
    id: 4,
    title: "How to debug performance issues in React?",
    author: {
      name: "Emily Wilson",
      avatar: "/placeholder-user.svg",
      initials: "EW",
    },
    date: "1 week ago",
    replies: 15,
    views: 178,
    topic: "React",
  },
  {
    id: 5,
    title: "Setting up a Node.js server from scratch",
    author: {
      name: "David Kim",
      avatar: "/placeholder-user.svg",
      initials: "DK",
    },
    date: "1 week ago",
    replies: 9,
    views: 112,
    topic: "Node.js",
  },
  {
    id: 6,
    title: "Tips for writing clean and maintainable code",
    author: {
      name: "Jessica Brown",
      avatar: "/placeholder-user.svg",
      initials: "JB",
    },
    date: "2 weeks ago",
    replies: 17,
    views: 203,
    topic: "General",
  },
]

const topics = ["All Topics", "React", "JavaScript", "CSS", "Node.js", "General"]

export default function ForumPage() {
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

      <div className="space-y-4">
        {forumThreads.map((thread) => (
          <Link key={thread.id} href={`/forum/${thread.id}`}>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={thread.author.avatar || "/placeholder.svg"} alt={thread.author.name} />
                  <AvatarFallback>{thread.author.initials}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <CardTitle className="text-lg">{thread.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{thread.author.name}</span>
                    <span>•</span>
                    <span>{thread.date}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="inline-block rounded-full bg-muted px-3 py-1 text-xs">{thread.topic}</div>
              </CardContent>
              <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{thread.replies} replies</span>
                  </div>
                  <div>
                    <span>{thread.views} views</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
