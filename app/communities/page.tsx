"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, MessageSquare, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { JoinCommunityButton } from "@/components/join-community-button"
import { useCommunity } from "@/contexts/community-context"

// Dummy communities data
const communities = [
  {
    id: 1,
    name: "Web Development",
    description: "Learn and discuss modern web development technologies and practices.",
    members: 1250,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 5,
    posts: 120,
  },
  {
    id: 2,
    name: "Data Science",
    description: "Explore data analysis, machine learning, and AI concepts.",
    members: 980,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 4,
    posts: 85,
  },
  {
    id: 3,
    name: "Mobile Development",
    description: "Build iOS, Android, and cross-platform mobile applications.",
    members: 750,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 3,
    posts: 62,
  },
  {
    id: 4,
    name: "UI/UX Design",
    description: "Learn design principles, tools, and techniques for creating great user experiences.",
    members: 620,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 3,
    posts: 45,
  },
  {
    id: 5,
    name: "DevOps & Cloud",
    description: "Master deployment, infrastructure, and cloud technologies.",
    members: 540,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 2,
    posts: 38,
  },
  {
    id: 6,
    name: "Game Development",
    description: "Create games for various platforms using modern engines and techniques.",
    members: 890,
    image: "/placeholder.svg?height=100&width=100",
    classrooms: 4,
    posts: 72,
  },
]

export default function CommunitiesPage() {
  const { user } = useAuth()
  const { isJoined } = useCommunity()

  // Filter communities based on joined status
  const joinedCommunitiesData = user ? communities.filter((community) => isJoined(community.id)) : []
  const recommendedCommunitiesData = user ? communities.filter((community) => !isJoined(community.id)) : communities

  // Default tab based on login status
  const defaultTab = user ? "joined" : "recommended"

  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communities</h1>
          <p className="text-muted-foreground">Join and participate in learning communities.</p>
        </div>
        {user && (
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Create Community
          </Button>
        )}
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-6">
            {user && <TabsTrigger value="joined">Joined Communities</TabsTrigger>}
            <TabsTrigger value="recommended">{user ? "Recommended" : "All Communities"}</TabsTrigger>
          </TabsList>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Input placeholder="Search communities..." className="w-full sm:w-[300px]" />
            <Link href="/discover">
              <Button variant="outline">Discover More</Button>
            </Link>
          </div>

          {user && (
            <TabsContent value="joined">
              {joinedCommunitiesData.length === 0 ? (
                <div className="rounded-lg border p-8 text-center">
                  <h3 className="text-lg font-medium">You haven't joined any communities yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Discover and join communities to connect with other learners.
                  </p>
                  <Link href="/discover">
                    <Button className="mt-4">Discover Communities</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {joinedCommunitiesData.map((community) => (
                    <Link key={community.id} href={`/communities/${community.id}`}>
                      <Card className="h-full transition-all hover:shadow-md">
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
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                            <span>{community.classrooms} classrooms</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            <span>{community.posts} posts</span>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>
          )}

          <TabsContent value="recommended">
            {recommendedCommunitiesData.length === 0 ? (
              <div className="rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium">You've joined all available communities!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Check back later for new communities or create your own.
                </p>
                <Button className="mt-4">Create Community</Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedCommunitiesData.map((community) => (
                  <Card key={community.id} className="h-full transition-all hover:shadow-md">
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
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{community.classrooms} classrooms</span>
                      </div>
                      <Link href={`/communities/${community.id}`}>
                        <JoinCommunityButton communityId={community.id} size="sm" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
