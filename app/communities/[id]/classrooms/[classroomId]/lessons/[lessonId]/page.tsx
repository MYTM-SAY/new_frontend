"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  FileText,
  Video,
  Download,
  MessageSquare,
  ThumbsUp,
  Flag,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

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
  content: string
}

// Dummy lesson data
const lessonData: Record<number, Lesson> = {
  101: {
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
    content: `
      <h2>What is HTML?</h2>
      <p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and content of web pages.</p>
      
      <h3>Key Concepts:</h3>
      <ul>
        <li>HTML uses <strong>elements</strong> to define different parts of a web page</li>
        <li>Elements are represented by <strong>tags</strong> like &lt;p&gt; for paragraphs</li>
        <li>HTML documents have a hierarchical structure</li>
        <li>HTML5 is the latest version with many new features</li>
      </ul>
      
      <h3>Why HTML is Important:</h3>
      <p>HTML is the foundation of all web pages. Without HTML, you wouldn't be able to organize text or add images or videos to your web pages. HTML is the beginning of everything you need to know to create engaging web pages.</p>
    `,
  },
  102: {
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
    content: `
      <h2>HTML Document Structure</h2>
      <p>Every HTML document follows a basic structure that includes several key elements.</p>
      
      <h3>Basic Structure:</h3>
      <pre><code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;My First Heading&lt;/h1&gt;
    &lt;p&gt;My first paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
      </code></pre>
      
      <h3>Key Elements:</h3>
      <ul>
        <li><strong>&lt;!DOCTYPE html&gt;</strong>: Declares the document type</li>
        <li><strong>&lt;html&gt;</strong>: The root element of an HTML page</li>
        <li><strong>&lt;head&gt;</strong>: Contains meta information about the document</li>
        <li><strong>&lt;title&gt;</strong>: Specifies a title for the document</li>
        <li><strong>&lt;body&gt;</strong>: Contains the visible page content</li>
      </ul>
    `,
  },
  103: {
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
    content: `
      <h2>HTML Elements and Tags</h2>
      <p>HTML uses elements to define different parts of a web page. Elements are represented by tags.</p>
      
      <h3>Common HTML Elements:</h3>
      <ul>
        <li><strong>&lt;h1&gt; to &lt;h6&gt;</strong>: Headings</li>
        <li><strong>&lt;p&gt;</strong>: Paragraph</li>
        <li><strong>&lt;a&gt;</strong>: Link</li>
        <li><strong>&lt;img&gt;</strong>: Image</li>
        <li><strong>&lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</strong>: Lists</li>
        <li><strong>&lt;div&gt;</strong>: Division or section</li>
        <li><strong>&lt;span&gt;</strong>: Inline container</li>
      </ul>
      
      <h3>Element Structure:</h3>
      <p>Most HTML elements have an opening tag, content, and a closing tag:</p>
      <pre><code>&lt;tagname&gt;Content goes here...&lt;/tagname&gt;</code></pre>
      
      <p>Some elements are self-closing:</p>
      <pre><code>&lt;img src="image.jpg" alt="Description" /&gt;</code></pre>
    `,
  },
  201: {
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
    content: `
      <h2>Introduction to CSS</h2>
      <p>CSS (Cascading Style Sheets) is used to style and layout web pages — for example, to alter the font, color, size, and spacing of your content, split it into multiple columns, or add animations and other decorative features.</p>
      
      <h3>How CSS Works:</h3>
      <p>CSS works by selecting HTML elements and applying styles to them. The basic syntax looks like this:</p>
      <pre><code>
selector {
  property: value;
  property: value;
}
      </code></pre>
      
      <h3>Ways to Add CSS:</h3>
      <ul>
        <li><strong>External CSS</strong>: Using a separate .css file</li>
        <li><strong>Internal CSS</strong>: Using a &lt;style&gt; element in the &lt;head&gt; section</li>
        <li><strong>Inline CSS</strong>: Using the style attribute in HTML elements</li>
      </ul>
    `,
  },
  202: {
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
    content: `
      <h2>CSS Selectors</h2>
      <p>CSS selectors are used to "find" (or select) the HTML elements you want to style.</p>
      
      <h3>Types of CSS Selectors:</h3>
      <ul>
        <li><strong>Element Selector</strong>: Selects all elements with a specific HTML tag</li>
        <li><strong>ID Selector</strong>: Selects an element with a specific ID attribute</li>
        <li><strong>Class Selector</strong>: Selects all elements with a specific class attribute</li>
        <li><strong>Attribute Selector</strong>: Selects elements based on an attribute or attribute value</li>
        <li><strong>Pseudo-class Selector</strong>: Selects elements based on a certain state</li>
      </ul>
      
      <h3>Examples:</h3>
      <pre><code>
/* Element selector */
p {
  color: blue;
}

/* ID selector */
#header {
  background-color: black;
}

/* Class selector */
.button {
  border-radius: 5px;
}

/* Attribute selector */
input[type="text"] {
  border: 1px solid gray;
}

/* Pseudo-class selector */
a:hover {
  text-decoration: underline;
}
      </code></pre>
    `,
  },
  301: {
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
    content: `
      <h2>Media Queries</h2>
      <p>Media queries allow you to apply CSS styles depending on a device's general type or specific characteristics like screen resolution or browser viewport width.</p>
      
      <h3>Basic Syntax:</h3>
      <pre><code>
@media screen and (max-width: 768px) {
  /* CSS rules for screens up to 768px wide */
  body {
    font-size: 14px;
  }
}
      </code></pre>
      
      <h3>Common Breakpoints:</h3>
      <ul>
        <li><strong>Mobile</strong>: up to 480px</li>
        <li><strong>Tablet</strong>: 481px to 768px</li>
        <li><strong>Laptop</strong>: 769px to 1024px</li>
        <li><strong>Desktop</strong>: 1025px and above</li>
      </ul>
      
      <h3>Media Features:</h3>
      <ul>
        <li><strong>width, height</strong>: Viewport dimensions</li>
        <li><strong>orientation</strong>: Portrait or landscape</li>
        <li><strong>resolution</strong>: Pixel density</li>
        <li><strong>aspect-ratio</strong>: Width-to-height ratio</li>
      </ul>
    `,
  },
  302: {
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
    content: `
      <h2>Flexbox Layout</h2>
      <p>Flexbox is a one-dimensional layout method for laying out items in rows or columns. It makes it easier to design flexible responsive layout structures.</p>
      
      <h3>Basic Concepts:</h3>
      <ul>
        <li><strong>Flex Container</strong>: The parent element with display: flex</li>
        <li><strong>Flex Items</strong>: The children of the flex container</li>
        <li><strong>Main Axis</strong>: The primary axis along which flex items are laid out</li>
        <li><strong>Cross Axis</strong>: The axis perpendicular to the main axis</li>
      </ul>
      
      <h3>Key Properties:</h3>
      <pre><code>
/* Container properties */
.container {
  display: flex;
  flex-direction: row | column;
  justify-content: flex-start | center | flex-end | space-between | space-around;
  align-items: stretch | flex-start | center | flex-end | baseline;
  flex-wrap: nowrap | wrap | wrap-reverse;
}

/* Item properties */
.item {
  order: 0;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto | flex-start | center | flex-end | stretch;
}
      </code></pre>
    `,
  },
}

// Navigation data - in a real app, this would be generated from your curriculum
const navigationData = {
  101: { prev: null, next: 102 },
  102: { prev: 101, next: 103 },
  103: { prev: 102, next: 201 },
  201: { prev: 103, next: 202 },
  202: { prev: 201, next: 301 },
  301: { prev: 202, next: 302 },
  302: { prev: 301, next: null },
}

// Dummy Q&A data
const qaData = [
  {
    id: 1,
    question: "What's the difference between HTML and HTML5?",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg",
      initials: "MC",
    },
    date: "2 weeks ago",
    upvotes: 12,
    answers: 3,
  },
  {
    id: 2,
    question: "Are there any browser compatibility issues I should be aware of with HTML5?",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      initials: "SJ",
    },
    date: "1 month ago",
    upvotes: 8,
    answers: 2,
  },
]

export default function LessonPage({
  params,
}: {
  params: { id: string; classroomId: string; lessonId: string }
}) {
  const communityId = Number.parseInt(params.id)
  const classroomId = Number.parseInt(params.classroomId)
  const lessonId = Number.parseInt(params.lessonId)
  const { user } = useAuth()
  const { toast } = useToast()

  const navigation = navigationData[lessonId] || { prev: null, next: null }
  const [isCompleted, setIsCompleted] = useState(false)
  const [activeTab, setActiveTab] = useState("content")
  const [newQuestion, setNewQuestion] = useState("")

  // In a real app, you would fetch the lesson data based on the ID
  // For this example, we're using the dummy data
  const lesson = lessonData[lessonId]

  useEffect(() => {
    if (lesson) {
      setIsCompleted(lesson.completed)
    }
  }, [lesson])

  // Handle case when lesson is not found
  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The lesson you're looking for doesn't exist or may have been removed.
          </p>
          <Link href={`/communities/${communityId}/classrooms/${classroomId}`}>
            <Button>Back to Classroom</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleMarkComplete = () => {
    // In a real app, you would make an API call to update the lesson status
    setIsCompleted(true)
    toast({
      title: "Lesson completed",
      description: "Your progress has been updated.",
    })
  }

  const handleSubmitQuestion = () => {
    if (newQuestion.trim()) {
      toast({
        title: "Question submitted",
        description: "Your question has been submitted successfully.",
      })
      setNewQuestion("")
    }
  }

  // Get the primary material (usually a video)
  const primaryMaterial = lesson.materials.find((m) => m.type === "video") || lesson.materials[0]

  return (
    <div className="flex flex-col">
      {/* Video Player Section */}
      <div className="bg-black">
        <div className="container mx-auto px-4 py-6">
          <div className="aspect-video w-full bg-muted rounded-md overflow-hidden">
            {/* This would be your actual video player component */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium">{primaryMaterial.title}</h3>
                <p className="text-sm text-white/70 mt-2">
                  {primaryMaterial.duration} • {lesson.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-muted-foreground mt-1">{lesson.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {!isCompleted ? (
                  <Button onClick={handleMarkComplete}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => setIsCompleted(false)}>
                    Completed
                    <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                  </Button>
                )}
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0">
                <TabsTrigger
                  value="content"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="qa"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
                >
                  Q&A
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
                >
                  Notes
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
                >
                  Resources
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-0">
                <div className="prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                </div>
              </TabsContent>

              <TabsContent value="qa" className="mt-0">
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Ask a Question</h3>
                    <Textarea
                      placeholder="What questions do you have about this lesson?"
                      className="mb-4"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <Button onClick={handleSubmitQuestion}>Submit Question</Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Questions in this Lesson</h3>

                    {qaData.map((qa) => (
                      <Card key={qa.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              <span className="text-sm font-medium">{qa.upvotes}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={qa.author.avatar || "/placeholder.svg"} alt={qa.author.name} />
                                  <AvatarFallback>{qa.author.initials}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{qa.author.name}</span>
                                <span className="text-xs text-muted-foreground">{qa.date}</span>
                              </div>
                              <h4 className="font-medium mb-2">{qa.question}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{qa.answers} answers</span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                  <Flag className="mr-1 h-3.5 w-3.5" />
                                  Report
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notes" className="mt-0">
                <div className="bg-muted/30 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-medium mb-2">Your Notes</h3>
                  <p className="text-muted-foreground mb-4">
                    Take notes while watching the lesson to help you remember key points.
                  </p>
                  <Textarea placeholder="Start typing your notes here..." className="min-h-[200px]" />
                  <Button className="mt-4">Save Notes</Button>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Lesson Resources</h3>

                  {lesson.materials.map((material) => (
                    <Card key={material.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {material.type === "video" ? (
                            <Video className="h-5 w-5 text-primary" />
                          ) : (
                            <FileText className="h-5 w-5 text-primary" />
                          )}
                          <div>
                            <p className="font-medium">{material.title}</p>
                            {material.duration && (
                              <p className="text-sm text-muted-foreground">Duration: {material.duration}</p>
                            )}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={material.url} target="_blank" rel="noopener noreferrer">
                            {material.type === "video" ? "Watch" : "Download"}
                            {material.type === "document" && <Download className="ml-2 h-4 w-4" />}
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full lg:w-1/3 space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">About This Lesson</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Duration: {lesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{lesson.materials.length} resources available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">Completed</span>
                      </>
                    ) : (
                      <>
                        <Badge variant="outline">In Progress</Badge>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Navigation</h3>
                <div className="flex justify-between">
                  {navigation.prev ? (
                    <Link href={`/communities/${communityId}/classrooms/${classroomId}/lessons/${navigation.prev}`}>
                      <Button variant="outline" size="sm">
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Previous Lesson
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" size="sm" disabled>
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Previous Lesson
                    </Button>
                  )}

                  {navigation.next ? (
                    <Link href={`/communities/${communityId}/classrooms/${classroomId}/lessons/${navigation.next}`}>
                      <Button variant="outline" size="sm">
                        Next Lesson
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" size="sm" disabled>
                      Next Lesson
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
