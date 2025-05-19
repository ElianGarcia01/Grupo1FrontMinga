import { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquare, Edit, Trash2, MoreHorizontal } from "lucide-react";
import CommentForm from "./CommentForm";
import CommentOptionsModal from "./CommentOptionsModal";

const Comment = ({
  comment,
  currentUserId,
  currentUserRole,
  onReply,
  onEdit,
  onDelete,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const isMyComment = comment.userId === currentUserId;
  const canEditOrDelete = isMyComment || currentUserRole >= 2; // Assuming 2+ is moderator/admin
  const canReply = !!currentUserId; // Can reply if logged in
  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleReply = (text) => {
    onReply(comment.id, text);
    setShowReplyForm(false);
  };

  const handleEdit = (newText) => {
    onEdit(comment.id, newText);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  const formattedDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return "Unknown date";
    }
  };

  // Get first letter for avatar placeholder
  const userInitial = comment.user && typeof comment.user === 'string' 
    ? comment.user.charAt(0).toUpperCase()
    : '?';

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-3 shadow-md border border-gray-700">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
            {userInitial}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-white">{comment.user}</p>
              <p className="text-xs text-gray-400">{formattedDate(comment.timestamp)}</p>
            </div>
            <p className="text-gray-300 mt-1">{comment.content}</p>
          </div>
        </div>

        {/* Actions menu */}
        {canEditOrDelete && (
          <div className="flex">
            <button
              onClick={() => setIsOptionsOpen(true)}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
              aria-label="Comment options"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 ml-10 flex items-center gap-4 text-xs">
        {canReply && (
          <button
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            <MessageSquare size={14} />
            {showReplyForm ? "Cancel" : "Reply"}
          </button>
        )}

        {hasReplies && (
          <button
            className="text-gray-400 hover:text-white flex items-center gap-1"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? (
              <>
                <ChevronUp size={14} />
                Hide Replies
              </>
            ) : (
              <>
                <ChevronDown size={14} />
                Show {comment.replies.length} {comment.replies.length === 1 ? "Reply" : "Replies"}
              </>
            )}
          </button>
        )}
      </div>

      {showReplyForm && (
        <div className="mt-3 ml-10">
          <CommentForm
            placeholder="Write a reply..."
            onSubmit={handleReply}
            submitLabel="Reply"
          />
        </div>
      )}

      {hasReplies && showReplies && (
        <div className="ml-10 mt-4 space-y-3 border-l-2 border-gray-700 pl-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              currentUserRole={currentUserRole}
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
  );
};

export default Comment;