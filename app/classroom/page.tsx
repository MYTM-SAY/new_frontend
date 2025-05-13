import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import Image from "next/image"

// Dummy data for courses
const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    progress: 75,
    image: "/placeholder.svg?height=200&width=300",
    lessons: 12,
    duration: "6 hours",
  },
  {
    id: 2,
    title: "React Fundamentals",
    description: "Master the core concepts of React and build interactive user interfaces.",
    progress: 45,
    image: "/placeholder.svg?height=200&width=300",
    lessons: 10,
    duration: "8 hours",
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    description: "Dive deep into JavaScript with advanced concepts and patterns.",
    progress: 20,
    image: "/placeholder.svg?height=200&width=300",
    lessons: 15,
    duration: "10 hours",
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    description: "Learn the fundamentals of user interface and experience design.",
    progress: 0,
    image: "/placeholder.svg?height=200&width=300",
    lessons: 8,
    duration: "5 hours",
  },
  {
    id: 5,
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js and Express.",
    progress: 10,
    image: "/placeholder.svg?height=200&width=300",
    lessons: 14,
    duration: "9 hours",
  },
  {
    id: 6,
    title: "Full Stack Project",
    description: "Apply your skills to build a complete full stack application from scratch.",
    progress: 0,
    image: "/placeholder.svg?height=200&width=300",
    lessons: 20,
    duration: "15 hours",
  },
]

export default function ClassroomPage() {
  return (
    <div className="container py-10">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Classroom</h1>
        <p className="text-muted-foreground">Browse our collection of courses and continue your learning journey.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link key={course.id} href={`/classroom/${course.id}`}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{course.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{course.lessons} lessons</span>
                  <span>{course.duration}</span>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{course.progress > 0 ? "In progress" : "Not started"}</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
