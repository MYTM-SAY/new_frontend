"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, MessageSquare, Users, ChevronLeft, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { JoinCommunityButton } from "@/components/join-community-button"
import { useAuth } from "@/contexts/auth-context"

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
          date: "2 hours ago",
          replies: 12,
          views: 145,
        },
        {
          id: 202,
          title: "Best practices for CSS organization",
          author: {
            name: "Michael Chen",
            avatar: "/placeholder-user.svg",
            initials: "MC",
          },
          date: "Yesterday",
          replies: 8,
          views: 97,
        },
        {
          id: 203,
          title: "JavaScript async/await explained",
          author: {
            name: "Alex Rodriguez",
            avatar: "/placeholder-user.svg",
            initials: "AR",
          },
          date: "3 days ago",
          replies: 21,
          views: 230,
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
        <div className="absolute bottom-0 left-0 p-6">
          <Link href="/communities" className="mb-4 flex items-center text-sm text-white hover:underline">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Communities
          </Link>
          <h1 className="text-3xl font-bold text-white">{community.name}</h1>
          <div className="flex items-center text-sm text-white/80">
            <Users className="mr-1 h-4 w-4" />
            <span>{community.members} members</span>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="mb-8 flex flex-col gap-6 md:flex-row">
          <div className="md:w-2/3">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">About this Community</h2>
              <p className="mt-2 text-muted-foreground">{community.description}</p>
            </div>

            <Tabs defaultValue="classrooms">
              <TabsList className="mb-6">
                <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
                <TabsTrigger value="forum">Forum</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
              </TabsList>

              <TabsContent value="classrooms">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Available Classrooms</h3>
                  {user && (
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Classroom
                    </Button>
                  )}
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
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
                        <CardHeader>
                          <CardTitle>{classroom.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{classroom.description}</p>
                          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                            <span>{classroom.lessons} lessons</span>
                            <span>{classroom.students} students</span>
                          </div>
                        </CardContent>
                        <CardFooter>
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
                  <h3 className="text-xl font-semibold">Community Forum</h3>
                  {user && (
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Thread
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  {community.forum.threads.map((thread) => (
                    <Link key={thread.id} href={`/communities/${community.id}/forum/${thread.id}`}>
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
              </TabsContent>

              <TabsContent value="announcements">
                <div className="space-y-4">
                  {community.announcements.map((announcement) => (
                    <Card key={announcement.id}>
                      <CardHeader>
                        <CardTitle>{announcement.title}</CardTitle>
                        <CardDescription>{announcement.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{announcement.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Community Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Active Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
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
