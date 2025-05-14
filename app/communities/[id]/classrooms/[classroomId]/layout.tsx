"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronDown, CheckCircle, Play, FileText, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

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
  }
  image: string
  banner: string
  progress: number
  sections: Section[]
  students: number
  totalDuration: string
  totalLessons: number
}

// Dummy classroom data
const classroomData: Classroom = {
  id: 101,
  title: "HTML & CSS Fundamentals",
  description: "Learn the basics of web structure and styling to build modern, responsive websites.",
  instructor: {
    name: "Alex Johnson",
    initials: "AJ",
  },
  image: "/placeholder.svg?height=200&width=300",
  banner: "/placeholder.svg?height=300&width=1200",
  progress: 35,
  students: 450,
  totalDuration: "5h 30m",
  totalLessons: 24,
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

export default function ClassroomLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string; classroomId: string }
}) {
  const communityId = Number.parseInt(params.id)
  const classroomId = Number.parseInt(params.classroomId)
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedSections, setExpandedSections] = useState<number[]>([1]) // Default first section expanded
  const [isMobile, setIsMobile] = useState(false)

  // In a real app, you would fetch the classroom data based on the ID
  // For this example, we're using the dummy data
  const classroom = classroomData

  // Calculate total lessons and completed lessons
  const totalLessons = classroom.sections.reduce((total, section) => total + section.lessons.length, 0)
  const completedLessons = classroom.sections.reduce(
    (total, section) => total + section.lessons.filter((lesson) => lesson.completed).length,
    0,
  )

  // Check if we're on a lesson page
  const isLessonPage = pathname.includes("/lessons/")
  let currentLessonId = 0

  if (isLessonPage) {
    try {
      const lessonIdStr = pathname.split("/").pop() || "0"
      currentLessonId = Number.parseInt(lessonIdStr)
    } catch (error) {
      console.error("Error parsing lesson ID:", error)
      currentLessonId = 0
    }
  }

  // Handle responsive sidebar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link
            href={`/communities/${communityId}`}
            className="flex items-center text-sm font-medium hover:text-primary"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Community
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <Progress value={(completedLessons / totalLessons) * 100} className="h-2 w-40" />
              <span className="text-sm text-muted-foreground">
                {completedLessons}/{totalLessons} completed
              </span>
            </div>
          </div>
          <Button size="sm">Course Dashboard</Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 mt-16 w-72 transform border-r bg-background transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <h2 className="text-lg font-bold">{classroom.title}</h2>
              <div className="mt-2 flex items-center gap-2">
                <Progress value={(completedLessons / totalLessons) * 100} className="h-2 flex-1" />
                <span className="text-xs text-muted-foreground">
                  {Math.round((completedLessons / totalLessons) * 100)}%
                </span>
              </div>
            </div>
            <ScrollArea className="flex-1 px-2 py-4">
              {classroom.sections.map((section) => (
                <div key={section.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-center justify-between rounded-md p-2 hover:bg-muted"
                  >
                    <span className="font-medium">{section.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedSections.includes(section.id) ? "rotate-180" : "",
                      )}
                    />
                  </button>
                  {expandedSections.includes(section.id) && (
                    <div className="ml-2 mt-1 space-y-1">
                      {section.lessons.map((lesson) => {
                        const isActive = currentLessonId === lesson.id
                        return (
                          <Link
                            key={lesson.id}
                            href={`/communities/${communityId}/classrooms/${classroomId}/lessons/${lesson.id}`}
                            className={cn(
                              "flex items-center gap-2 rounded-md p-2 text-sm",
                              isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                            )}
                          >
                            {lesson.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : lesson.materials[0]?.type === "video" ? (
                              <Play className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                            <span className={cn(lesson.completed ? "text-muted-foreground" : "")}>{lesson.title}</span>
                            <span className="ml-auto text-xs text-muted-foreground">{lesson.duration}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {classroom.instructor.avatar ? (
                    <Image
                      src={classroom.instructor.avatar || "/placeholder.svg"}
                      alt={classroom.instructor.name}
                      width={40}
                      height={40}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold">{classroom.instructor.initials}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{classroom.instructor.name}</p>
                  <p className="text-xs text-muted-foreground">Instructor</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main content */}
        <main className={cn("flex-1 transition-all duration-200 ease-in-out", sidebarOpen ? "lg:ml-72" : "")}>
          {children}
        </main>
      </div>
    </div>
  )
}
