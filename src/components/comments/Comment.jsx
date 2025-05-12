import { useState } from "react"
import CommentForm from "./CommentForm"
import CommentOptionsModal from "./CommentOptionsModal"

const Comment = ({ comment, currentUserId, onReply, onEdit, onDelete }) => {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  const isMyComment = comment.userId === currentUserId

  const handleReply = (text) => {
    onReply(comment.id, text)
    setShowReplyForm(false)
  }

  const handleEdit = (newText) => {
    onEdit(comment.id, newText)
  }

  const handleDelete = () => {
    onDelete(comment.id)
  }

  return (
    <div className="border p-3 rounded shadow-sm bg-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">{comment.user}</p>
          <p className="text-gray-800">{comment.content}</p>
        </div>

        {isMyComment && (
          <button
            onClick={() => setIsOptionsOpen(true)}
            className="text-gray-400 hover:text-black"
          >
            ⋯
          </button>
        )}
      </div>

      <button
        className="text-blue-500 text-sm mt-2"
        onClick={() => setShowReplyForm(!showReplyForm)}
      >
        Reply
      </button>

      {showReplyForm && (
        <div className="mt-2">
          <CommentForm
            placeholder="Write a reply..."
            onSubmit={handleReply}
            submitLabel="Reply"
          />
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="ml-4 mt-4 space-y-2 border-l-2 pl-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      <CommentOptionsModal
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        initialText={comment.content}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Comment
