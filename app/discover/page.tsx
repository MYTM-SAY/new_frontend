"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, BookOpen } from "lucide-react"
import Image from "next/image"
import { JoinCommunityButton } from "@/components/join-community-button"
import { useCommunity, type Community } from "@/contexts/community-context"
import { useRouter } from "next/navigation"

// Dummy communities data (expanded)
const communities: Community[] = [
  {
    id: 1,
    name: "Web Development",
    description: "Learn and discuss modern web development technologies and practices.",
    members: 1250,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 5,
    posts: 120,
    category: "Programming",
  },
  {
    id: 2,
    name: "Data Science",
    description: "Explore data analysis, machine learning, and AI concepts.",
    members: 980,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 4,
    posts: 85,
    category: "Data",
  },
  {
    id: 3,
    name: "Mobile Development",
    description: "Build iOS, Android, and cross-platform mobile applications.",
    members: 750,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 3,
    posts: 62,
    category: "Programming",
  },
  {
    id: 4,
    name: "UI/UX Design",
    description: "Learn design principles, tools, and techniques for creating great user experiences.",
    members: 620,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 3,
    posts: 45,
    category: "Design",
  },
  {
    id: 5,
    name: "DevOps & Cloud",
    description: "Master deployment, infrastructure, and cloud technologies.",
    members: 540,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 2,
    posts: 38,
    category: "Infrastructure",
  },
  {
    id: 6,
    name: "Game Development",
    description: "Create games for various platforms using modern engines and techniques.",
    members: 890,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 4,
    posts: 72,
    category: "Programming",
  },
  {
    id: 7,
    name: "Cybersecurity",
    description: "Learn about network security, ethical hacking, and security best practices.",
    members: 720,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 3,
    posts: 58,
    category: "Security",
  },
  {
    id: 8,
    name: "Blockchain & Crypto",
    description: "Explore blockchain technology, cryptocurrencies, and decentralized applications.",
    members: 510,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 2,
    posts: 42,
    category: "Technology",
  },
  {
    id: 9,
    name: "Digital Marketing",
    description: "Master SEO, social media marketing, content creation, and analytics.",
    members: 680,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 4,
    posts: 65,
    category: "Marketing",
  },
]

const categories = [
  "All Categories",
  "Programming",
  "Data",
  "Design",
  "Infrastructure",
  "Security",
  "Technology",
  "Marketing",
]

export default function DiscoverPage() {
  const { isJoined } = useCommunity()
  const router = useRouter()

  const handleCommunityClick = (communityId: number) => {
    router.push(`/communities/${communityId}`)
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Discover Communities</h1>
        <p className="text-muted-foreground">Find and join communities that match your interests.</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="popular">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="active">Most Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-auto">
          <Input placeholder="Search communities..." className="w-full sm:w-[300px]" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {communities.map((community) => (
          <Card
            key={community.id}
            className="h-full transition-all hover:shadow-md cursor-pointer"
            onClick={() => handleCommunityClick(community.id)}
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="h-12 w-12 overflow-hidden rounded-lg">
                <Image
                  src={community.image || "/placeholder.svg"}
                  alt={community.name}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <CardTitle className="text-xl">{community.name}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{community.members} members</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{community.description}</p>
              <div className="mt-2">
                <span className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                  {community.category}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{community.classrooms} classrooms</span>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <JoinCommunityButton communityId={community.id} size="sm" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
