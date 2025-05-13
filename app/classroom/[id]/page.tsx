import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, BookOpen, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Dummy course data
const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    progress: 75,
    image: "/placeholder.svg?height=400&width=800",
    lessons: [
      {
        id: 1,
        title: "Getting Started with HTML",
        duration: "30 min",
        completed: true,
      },
      {
        id: 2,
        title: "CSS Fundamentals",
        duration: "45 min",
        completed: true,
      },
      {
        id: 3,
        title: "Introduction to JavaScript",
        duration: "60 min",
        completed: true,
      },
      {
        id: 4,
        title: "Building Your First Web Page",
        duration: "90 min",
        completed: false,
      },
    ],
    content: `
      <h2>Welcome to Web Development</h2>
      <p>This course will teach you the fundamentals of web development, starting with HTML, CSS, and JavaScript.</p>
      <p>By the end of this course, you'll be able to build your own responsive websites from scratch.</p>
      <h3>What you'll learn:</h3>
      <ul>
        <li>HTML structure and semantics</li>
        <li>CSS styling and layouts</li>
        <li>JavaScript basics and DOM manipulation</li>
        <li>Responsive design principles</li>
      </ul>
      <p>Let's get started with your web development journey!</p>
    `,
  },
  // Other courses would be defined here
]

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const courseId = Number.parseInt(params.id)
  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link href="/classroom">
          <Button className="mt-4">Back to Classroom</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link href="/classroom" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Classroom
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="mt-2 text-muted-foreground">{course.description}</p>
          </div>

          <div className="mb-6 overflow-hidden rounded-lg">
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          <Tabs defaultValue="content">
            <TabsList className="mb-4">
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: course.content }} />
            </TabsContent>
            <TabsContent value="discussion">
              <div className="rounded-lg border p-6 text-center">
                <h3 className="text-lg font-medium">Join the discussion</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ask questions and share your insights with other learners.
                </p>
                <Button className="mt-4">Start a Thread</Button>
              </div>
            </TabsContent>
            <TabsContent value="resources">
              <div className="rounded-lg border p-6 text-center">
                <h3 className="text-lg font-medium">Course Resources</h3>
                <p className="mt-2 text-sm text-muted-foreground">Download additional materials for this course.</p>
                <Button variant="outline" className="mt-4">
                  Download Resources
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-xl font-semibold">Your Progress</h2>
            <div className="mb-2 flex justify-between text-sm">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
            <Button className="mt-6 w-full">Continue Learning</Button>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-xl font-semibold">Course Lessons</h2>
            <div className="space-y-3">
              {course.lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                  <div className="flex items-center gap-3">
                    {lesson.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className={lesson.completed ? "text-muted-foreground" : ""}>{lesson.title}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {lesson.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
