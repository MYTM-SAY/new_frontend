"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, Mail, MapPin, Briefcase, LinkIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PostCard, type Post } from "@/components/post-card"

// Dummy user activity data
const userActivity = {
  communities: [
    { id: 1, name: "Web Development", role: "Member" },
    { id: 2, name: "Data Science", role: "Contributor" },
    { id: 4, name: "UI/UX Design", role: "Member" },
  ],
  posts: [
    {
      id: 1,
      author: {
        name: "You",
        avatar: "",
        initials: "Y",
      },
      content: "Just finished the React course in the Web Development community!",
      community: { id: 1, name: "Web Development" },
      likes: 24,
      comments: 8,
      time: "2 days ago",
      userVote: null,
    },
    {
      id: 2,
      author: {
        name: "You",
        avatar: "",
        initials: "Y",
      },
      content: "Anyone have recommendations for good data visualization libraries?",
      community: { id: 2, name: "Data Science" },
      likes: 15,
      comments: 12,
      time: "1 week ago",
      userVote: null,
    },
  ],
  courses: [
    {
      id: 1,
      title: "Introduction to Web Development",
      progress: 75,
      community: { id: 1, name: "Web Development" },
    },
    {
      id: 2,
      title: "React Fundamentals",
      progress: 45,
      community: { id: 1, name: "Web Development" },
    },
    {
      id: 3,
      title: "Data Analysis with Python",
      progress: 30,
      community: { id: 2, name: "Data Science" },
    },
  ],
  achievements: [
    { id: 1, title: "First Post", description: "Published your first post", date: "3 weeks ago" },
    { id: 2, title: "Course Completed", description: "Completed your first course", date: "2 weeks ago" },
    { id: 3, title: "Community Contributor", description: "Made 10+ valuable contributions", date: "1 week ago" },
  ],
}

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>(userActivity.posts)

  // Extended profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "Learning enthusiast passionate about web development and data science.",
    location: "San Francisco, CA",
    website: "https://example.com",
    occupation: "Software Developer",
    joinDate: "January 2023",
    avatarUrl: "",
  })

  // Form state for editing profile
  const [formData, setFormData] = useState({ ...profile })
  const [isEditing, setIsEditing] = useState(false)

  // Initialize profile with user data when available
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }))
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }))

      // Update post author name
      setPosts(
        posts.map((post) => ({
          ...post,
          author: {
            ...post.author,
            name: user.name,
            initials: user.name.charAt(0),
          },
        })),
      )
    }
  }, [user])

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = () => {
    setProfile(formData)
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleCancelEdit = () => {
    setFormData(profile)
    setIsEditing(false)
  }

  const handleVote = (postId: number, direction: "up" | "down" | null) => {
    // In a real app, you would make an API call here
    // For now, we'll just update the local state
    setPosts((currentPosts) =>
      currentPosts.map((post) => (post.id === postId ? { ...post, userVote: direction } : post)),
    )
  }

  if (isLoading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we load your profile</p>
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
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and view your activity</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{profile.name}</CardTitle>
              <CardDescription>{profile.occupation}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Joined {profile.joinDate}</span>
              </div>
              {profile.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center text-sm">
                  <LinkIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {profile.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              <div className="flex items-center text-sm">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{profile.email}</span>
              </div>
              {profile.occupation && (
                <div className="flex items-center text-sm">
                  <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{profile.occupation}</span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Communities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userActivity.communities.map((community) => (
                <Link
                  key={community.id}
                  href={`/communities/${community.id}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 overflow-hidden rounded-lg">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt={community.name}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span>{community.name}</span>
                  </div>
                  <Badge variant="outline">{community.role}</Badge>
                </Link>
              ))}
              <Link href="/communities" className="text-sm text-primary hover:underline">
                View all communities
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div>
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input id="occupation" name="occupation" value={formData.occupation} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" value={formData.website} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatarUrl">Profile Picture URL</Label>
                  <Input id="avatarUrl" name="avatarUrl" value={formData.avatarUrl} onChange={handleInputChange} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardFooter>
            </Card>
          ) : (
            <Tabs defaultValue="activity">
              <TabsList className="mb-6">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              <TabsContent value="activity">
                <div className="space-y-6">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} onVote={handleVote} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Courses</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userActivity.courses.map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{course.title}</h3>
                            <Link
                              href={`/communities/${course.community.id}`}
                              className="text-sm text-muted-foreground hover:underline"
                            >
                              {course.community.name}
                            </Link>
                          </div>
                          <span className="text-sm font-medium">{course.progress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-primary/20">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {userActivity.achievements.map((achievement) => (
                        <Card key={achievement.id} className="border-2 border-primary/20">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                                <Award className="h-4 w-4 text-primary" />
                              </div>
                              <CardTitle className="text-base">{achievement.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <p className="mt-2 text-xs text-muted-foreground">Earned {achievement.date}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{profile.bio}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}
