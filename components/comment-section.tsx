"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Comment, type CommentData } from "@/components/comment"
import { useAuth } from "@/contexts/auth-context"
import { MessageSquare } from "lucide-react"

interface CommentSectionProps {
  postId: number
  comments: CommentData[]
  onAddComment: (postId: number, content: string) => void
  onLikeComment: (commentId: number) => void
  onReplyToComment: (commentId: number, content: string) => void
  className?: string
}

export function CommentSection({
  postId,
  comments,
  onAddComment,
  onLikeComment,
  onReplyToComment,
  className = "",
}: CommentSectionProps) {
  const { user } = useAuth()
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(postId, newComment)
      setNewComment("")
    }
  }

  const handleSubmitReply = (commentId: number) => {
    if (replyContent.trim()) {
      onReplyToComment(commentId, replyContent)
      setReplyContent("")
      setReplyingTo(null)
    }
  }

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId)
    setReplyContent("")
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {!isExpanded && comments.length > 0 && (
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={() => setIsExpanded(true)}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          View {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </Button>
      )}

      {isExpanded && (
        <>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id}>
                <Comment comment={comment} onLike={onLikeComment} onReply={handleReply} />

                {replyingTo === comment.id && (
                  <div className="mt-2 ml-10 space-y-2">
                    <Textarea
                      placeholder="Write a reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="min-h-[80px] text-sm"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {user && (
            <div className="space-y-2">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end">
                <Button onClick={handleSubmitComment}>Comment</Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
