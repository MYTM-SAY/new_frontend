"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { VideoPlayer } from "@/components/video-player"
import { DocumentViewer } from "@/components/document-viewer"

// Define types for our data structure
interface Material {
  id: number
  title: string
  type: "video" | "document"
  duration?: string
  url: string
}

// Dummy materials data
const materialsData: Record<number, Material> = {
  1001: {
    id: 1001,
    title: "Introduction to HTML Video",
    type: "video",
    duration: "8:24",
    url: "https://example.com/videos/intro-html",
  },
  1002: {
    id: 1002,
    title: "HTML Cheat Sheet",
    type: "document",
    url: "https://example.com/docs/html-cheatsheet",
  },
  1003: {
    id: 1003,
    title: "HTML Document Structure Video",
    type: "video",
    duration: "12:45",
    url: "https://example.com/videos/html-structure",
  },
  1004: {
    id: 1004,
    title: "HTML Structure Reference",
    type: "document",
    url: "https://example.com/docs/html-structure",
  },
  1005: {
    id: 1005,
    title: "HTML Elements Overview",
    type: "video",
    duration: "18:30",
    url: "https://example.com/videos/html-elements",
  },
  1006: {
    id: 1006,
    title: "HTML Elements Reference Guide",
    type: "document",
    url: "https://example.com/docs/html-elements",
  },
}

export default function MaterialViewerPage({
  params,
}: {
  params: { id: string; classroomId: string; lessonId: string; materialId: string }
}) {
  const communityId = Number.parseInt(params.id)
  const classroomId = Number.parseInt(params.classroomId)
  const lessonId = Number.parseInt(params.lessonId)
  const materialId = Number.parseInt(params.materialId)

  // In a real app, you would fetch the material data based on the ID
  // For this example, we're using the dummy data
  const material = materialsData[materialId]

  if (!material) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold">Material not found</h1>
        <Link href={`/communities/${communityId}/classrooms/${classroomId}/lessons/${lessonId}`}>
          <Button className="mt-4">Back to Lesson</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link
          href={`/communities/${communityId}/classrooms/${classroomId}/lessons/${lessonId}`}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Lesson
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">{material.title}</h1>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {material.type === "video" ? (
            <VideoPlayer src={material.url} title={material.title} poster="/placeholder.svg?height=400&width=800" />
          ) : (
            <DocumentViewer src={material.url} title={material.title} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
