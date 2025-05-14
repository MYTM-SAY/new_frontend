"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, Reply } from "lucide-react"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"

export interface CommentAuthor {
  name: string
  avatar?: string
  initials: string
}

export interface CommentData {
  id: number
  author: CommentAuthor
  content: string
  likes: number
  createdAt: Date
  liked?: boolean
  replies?: CommentData[]
}

interface CommentProps {
  comment: CommentData
  onLike?: (commentId: number) => void
  onReply?: (commentId: number) => void
  level?: number
  maxLevel?: number
}

export function Comment({ comment, onLike, onReply, level = 0, maxLevel = 3 }: CommentProps) {
  const [showReplies, setShowReplies] = useState(level === 0)
  const hasReplies = comment.replies && comment.replies.length > 0
  const canNest = level < maxLevel

  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })

  const handleLike = () => {
    if (onLike) {
      onLike(comment.id)
    }
  }

  const handleReply = () => {
    if (onReply) {
      onReply(comment.id)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
          <AvatarFallback>{comment.author.initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={handleLike}>
              <ThumbsUp className={`mr-1 h-3.5 w-3.5 ${comment.liked ? "fill-primary text-primary" : ""}`} />
              {comment.likes > 0 && <span>{comment.likes}</span>}
              <span className="sr-only">Like</span>
            </Button>
            {canNest && (
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={handleReply}>
                <Reply className="mr-1 h-3.5 w-3.5" />
                Reply
              </Button>
            )}
            {hasReplies && level > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies
                  ? "Hide replies"
                  : `Show ${comment.replies?.length} ${comment.replies?.length === 1 ? "reply" : "replies"}`}
              </Button>
            )}
          </div>
        </div>
      </div>

      {hasReplies && showReplies && (
        <div className={`border-l-2 pl-4 ml-4 mt-2 space-y-3`}>
          {comment.replies?.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onLike={onLike}
              onReply={onReply}
              level={level + 1}
              maxLevel={maxLevel}
            />
          ))}
        </div>
      )}
    </div>
  )
}
