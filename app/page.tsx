import { Button } from "@/components/ui/button"
import { ChevronRight, BookOpen, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Learn Together, Grow Together
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our community of learners and experts. Access quality courses and engage in meaningful
                  discussions.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/classroom">
                  <Button className="gap-1">
                    <BookOpen className="h-4 w-4" />
                    Join Classroom
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/forum">
                  <Button variant="outline" className="gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Visit Forum
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="Learning Platform Hero"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Learn</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our platform combines structured learning with community support to help you master new skills.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Structured Courses</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Learn at your own pace with our carefully designed courses and track your progress.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Community Forum</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Ask questions, share insights, and connect with fellow learners in our active forum.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Stay Updated</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get notified about new courses, forum replies, and community events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start Learning?</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join thousands of learners who are already advancing their skills and knowledge.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-1">
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/classroom">
                <Button size="lg" variant="outline">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
