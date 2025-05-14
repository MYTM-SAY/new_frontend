"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Users, Play, FileText, Star, Award, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Define types for our data structure
interface Material {
  id: number
  title: string
  type: "video" | "document"
  duration?: string
  url: string
}

interface Lesson {
  id: number
  title: string
  description: string
  duration: string
  completed: boolean
  materials: Material[]
}

interface Section {
  id: number
  title: string
  description: string
  lessons: Lesson[]
}

interface Classroom {
  id: number
  title: string
  description: string
  instructor: {
    name: string
    avatar?: string
    initials: string
    bio: string
  }
  image: string
  banner: string
  progress: number
  sections: Section[]
  students: number
  rating: number
  reviews: number
  totalDuration: string
  totalLessons: number
  lastUpdated: string
  level: string
  prerequisites: string[]
  whatYouWillLearn: string[]
}

// Dummy classroom data
const classroomData: Classroom = {
  id: 101,
  title: "HTML & CSS Fundamentals",
  description:
    "Learn the basics of web structure and styling to build modern, responsive websites. This comprehensive course will take you from beginner to confident HTML and CSS developer through hands-on projects and exercises.",
  instructor: {
    name: "Alex Johnson",
    initials: "AJ",
    bio: "Full-stack developer with 10+ years of experience. Passionate about teaching web development and helping others start their coding journey.",
  },
  image: "/placeholder.svg?height=200&width=300",
  banner: "/placeholder.svg?height=300&width=1200",
  progress: 35,
  students: 450,
  rating: 4.8,
  reviews: 128,
  totalDuration: "5h 30m",
  totalLessons: 24,
  lastUpdated: "March 2023",
  level: "Beginner",
  prerequisites: ["No prior knowledge required", "Basic computer skills", "Text editor (VS Code recommended)"],
  whatYouWillLearn: [
    "Build websites using HTML5 and CSS3",
    "Create responsive layouts that work on all devices",
    "Understand CSS flexbox and grid systems",
    "Implement modern design principles",
    "Deploy your websites to the internet",
  ],
  sections: [
    {
      id: 1,
      title: "Introduction to HTML",
      description: "Learn the basics of HTML structure and elements",
      lessons: [
        {
          id: 101,
          title: "What is HTML?",
          description: "An introduction to HTML and its role in web development",
          duration: "10 min",
          completed: true,
          materials: [
            {
              id: 1001,
              title: "Introduction to HTML Video",
              type: "video",
              duration: "8:24",
              url: "https://example.com/videos/intro-html",
            },
            {
              id: 1002,
              title: "HTML Cheat Sheet",
              type: "document",
              url: "https://example.com/docs/html-cheatsheet",
            },
          ],
        },
        {
          id: 102,
          title: "HTML Document Structure",
          description: "Understanding the basic structure of an HTML document",
          duration: "15 min",
          completed: true,
          materials: [
            {
              id: 1003,
              title: "HTML Document Structure Video",
              type: "video",
              duration: "12:45",
              url: "https://example.com/videos/html-structure",
            },
            {
              id: 1004,
              title: "HTML Structure Reference",
              type: "document",
              url: "https://example.com/docs/html-structure",
            },
          ],
        },
        {
          id: 103,
          title: "HTML Elements and Tags",
          description: "Exploring common HTML elements and how to use them",
          duration: "20 min",
          completed: false,
          materials: [
            {
              id: 1005,
              title: "HTML Elements Overview",
              type: "video",
              duration: "18:30",
              url: "https://example.com/videos/html-elements",
            },
            {
              id: 1006,
              title: "HTML Elements Reference Guide",
              type: "document",
              url: "https://example.com/docs/html-elements",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "CSS Basics",
      description: "Learn how to style your HTML with CSS",
      lessons: [
        {
          id: 201,
          title: "Introduction to CSS",
          description: "Understanding what CSS is and how it works",
          duration: "12 min",
          completed: false,
          materials: [
            {
              id: 2001,
              title: "CSS Introduction Video",
              type: "video",
              duration: "10:15",
              url: "https://example.com/videos/intro-css",
            },
            {
              id: 2002,
              title: "CSS Basics PDF",
              type: "document",
              url: "https://example.com/docs/css-basics",
            },
          ],
        },
        {
          id: 202,
          title: "CSS Selectors",
          description: "Learn how to target HTML elements with CSS selectors",
          duration: "18 min",
          completed: false,
          materials: [
            {
              id: 2003,
              title: "CSS Selectors Explained",
              type: "video",
              duration: "15:40",
              url: "https://example.com/videos/css-selectors",
            },
            {
              id: 2004,
              title: "CSS Selectors Cheat Sheet",
              type: "document",
              url: "https://example.com/docs/css-selectors",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Responsive Design",
      description: "Make your websites work on any device size",
      lessons: [
        {
          id: 301,
          title: "Media Queries",
          description: "Learn how to create responsive designs with media queries",
          duration: "22 min",
          completed: false,
          materials: [
            {
              id: 3001,
              title: "Responsive Design with Media Queries",
              type: "video",
              duration: "20:10",
              url: "https://example.com/videos/media-queries",
            },
            {
              id: 3002,
              title: "Media Queries Reference",
              type: "document",
              url: "https://example.com/docs/media-queries",
            },
          ],
        },
        {
          id: 302,
          title: "Flexbox Layout",
          description: "Using flexbox for responsive layouts",
          duration: "25 min",
          completed: false,
          materials: [
            {
              id: 3003,
              title: "Flexbox Fundamentals",
              type: "video",
              duration: "22:35",
              url: "https://example.com/videos/flexbox",
            },
            {
              id: 3004,
              title: "Flexbox Cheat Sheet",
              type: "document",
              url: "https://example.com/docs/flexbox",
            },
          ],
        },
      ],
    },
  ],
}

export default function ClassroomDetailPage({
  params,
}: {
  params: { id: string; classroomId: string }
}) {
  const communityId = Number.parseInt(params.id)
  const classroomId = Number.parseInt(params.classroomId)

  // In a real app, you would fetch the classroom data based on the ID
  // For this example, we're using the dummy data
  const classroom = classroomData

  // Calculate total lessons and completed lessons
  const totalLessons = classroom.sections.reduce((total, section) => total + section.lessons.length, 0)
  const completedLessons = classroom.sections.reduce(
    (total, section) => total + section.lessons.filter((lesson) => lesson.completed).length,
    0,
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{classroom.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{classroom.description}</p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary" className="text-sm font-normal">
                {classroom.level}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{classroom.rating}</span>
                <span className="text-muted-foreground">({classroom.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{classroom.students} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Last updated {classroom.lastUpdated}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Avatar className="h-12 w-12">
                {classroom.instructor.avatar ? (
                  <AvatarImage
                    src={classroom.instructor.avatar || "/placeholder.svg"}
                    alt={classroom.instructor.name}
                  />
                ) : (
                  <AvatarFallback>{classroom.instructor.initials}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-medium">Instructor</p>
                <p className="text-muted-foreground">{classroom.instructor.name}</p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {classroom.whatYouWillLearn.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Tabs defaultValue="curriculum">
            <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0">
              <TabsTrigger
                value="curriculum"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="instructor"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
              >
                Instructor
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Course Content</h2>
                    <p className="text-muted-foreground">
                      {classroom.sections.length} sections • {totalLessons} lessons • {classroom.totalDuration} total
                      length
                    </p>
                  </div>
                  <Button variant="outline">Expand All Sections</Button>
                </div>

                <div className="space-y-4">
                  {classroom.sections.map((section, index) => (
                    <Card key={section.id}>
                      <CardHeader className="bg-muted/50 py-4">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            Section {index + 1}: {section.title}
                          </CardTitle>
                          <div className="text-sm text-muted-foreground">
                            {section.lessons.length} lessons •{" "}
                            {section.lessons.reduce((total, lesson) => {
                              const minutes = Number.parseInt(lesson.duration.split(" ")[0])
                              return total + minutes
                            }, 0)}{" "}
                            min
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="divide-y">
                        {section.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            href={`/communities/${communityId}/classrooms/${classroomId}/lessons/${lesson.id}`}
                            className="flex items-center justify-between py-4 hover:bg-muted/30 px-2 -mx-2 rounded-md transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : lesson.materials[0]?.type === "video" ? (
                                <Play className="h-5 w-5" />
                              ) : (
                                <FileText className="h-5 w-5" />
                              )}
                              <div>
                                <p className={lesson.completed ? "text-muted-foreground" : ""}>{lesson.title}</p>
                                <p className="text-xs text-muted-foreground">{lesson.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">{lesson.duration}</span>
                            </div>
                          </Link>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="overview" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">About This Course</h2>
                  <p className="mb-4">{classroom.description}</p>
                  <p>
                    By the end of this course, you'll be able to create responsive websites from scratch using HTML and
                    CSS.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">Prerequisites</h3>
                  <ul className="space-y-2">
                    {classroom.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="instructor" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    {classroom.instructor.avatar ? (
                      <AvatarImage
                        src={classroom.instructor.avatar || "/placeholder.svg"}
                        alt={classroom.instructor.name}
                      />
                    ) : (
                      <AvatarFallback className="text-lg">{classroom.instructor.initials}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{classroom.instructor.name}</h2>
                    <p className="text-muted-foreground mb-2">Web Development Instructor</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{classroom.rating} Instructor Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>12 Courses</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>2,500+ Students</span>
                      </div>
                    </div>
                    <p>{classroom.instructor.bio}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{classroom.rating}</div>
                    <div className="flex items-center justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(classroom.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Course Rating</div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        // Generate random percentages for the demo
                        const percent = rating === 5 ? 78 : rating === 4 ? 15 : rating === 3 ? 5 : rating === 2 ? 1 : 1
                        return (
                          <div key={rating} className="flex items-center gap-2">
                            <div className="flex items-center gap-1 w-16">
                              <span>{rating}</span>
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            </div>
                            <Progress value={percent} className="h-2 flex-1" />
                            <span className="text-sm text-muted-foreground w-12">{percent}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="text-center">
                  <h3 className="text-lg font-bold mb-2">Student Reviews</h3>
                  <p className="text-muted-foreground mb-4">See what students are saying about this course</p>
                  <Button>View All Reviews</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-24">
            <Card className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src={classroom.image || "/placeholder.svg"}
                  alt={classroom.title}
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-2xl">Free</span>
                    <Badge>Enrolled</Badge>
                  </div>
                  <Button className="w-full" size="lg">
                    Continue Learning
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">This course includes:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Play className="h-4 w-4 text-muted-foreground" />
                        <span>{classroom.totalDuration} on-demand video</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>12 downloadable resources</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Your progress</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round((completedLessons / totalLessons) * 100)}%</span>
                      </div>
                      <Progress value={(completedLessons / totalLessons) * 100} className="h-2" />
                      <div className="text-sm text-muted-foreground">
                        {completedLessons}/{totalLessons} lessons completed
                      </div>
                    </div>
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
