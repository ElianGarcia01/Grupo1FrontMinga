import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, MessageCircle, MoreHorizontal } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hook/useAuth"; 
import AddCommentModal from "../comments/AddCommentModal";
import CommentOptionsModal from "../comments/CommentOptionsModal";
import Comment from "../comments/Comment";

const MangaViewer = ({ pages, title, chapterId, chapter }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isAddCommentModalOpen, setIsAddCommentModalOpen] = useState(false);
  const touchStartX = useRef(null);
  

  // Prioriza el mangaId recibido por state, si no existe lo busca en el capítulo
  const mangaId = state?.mangaId || chapter?.manga_id?._id || chapter?.manga_id;

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${chapterId}`);
    if (savedProgress) {
      setCurrentPage(Number(savedProgress));
    }
    
    
    fetchComments();
  }, [chapterId]);

  const fetchComments = () => {
    
    setComments([
      {
        id: '1',
        userId: 'user1',
        user: 'Manga Fan',
        content: '¡This chapter was amazing.!',
        timestamp: new Date().toISOString(),
        replies: [
          {
            id: '1-1',
            userId: 'user2',
            user: 'Comic Lover',
            content: '¡I agree! The art is stunning.',
            timestamp: new Date().toISOString(),
            replies: []
          }
        ]
      }
    ]);
  };

  useEffect(() => {
    localStorage.setItem(`progress-${chapterId}`, currentPage);
  }, [currentPage, chapterId]);

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") nextPage();
    if (e.key === "ArrowLeft") prevPage();
    if (e.key === "Escape") handleExit();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;
    if (deltaX > 50) nextPage();
    else if (deltaX < -50) prevPage();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const handleExit = () => {
    if (mangaId) {
      navigate(`/details/${mangaId}`);
    } else {
      navigate("/");
    }
  };

  const handleAddComment = (text) => {
    const newComment = {
      id: Date.now().toString(),
      userId: user?._id,
      user: user?.name,
      content: text,
      timestamp: new Date().toISOString(),
      replies: []
    };
    
    setComments([newComment, ...comments]);
  };

  const handleReplyComment = (commentId, text) => {
    const addReply = (commentsList) => {
      return commentsList.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: `${comment.id}-${Date.now()}`,
                userId: user?._id,
                user: user?.name,
                content: text,
                timestamp: new Date().toISOString(),
                replies: []
              }
            ]
          };
        } else if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReply(comment.replies)
          };
        }
        return comment;
      });
    };

    setComments(addReply(comments));
  };

  const handleEditComment = (commentId, newText) => {
    const editCommentInList = (commentsList) => {
      return commentsList.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, content: newText };
        } else if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: editCommentInList(comment.replies)
          };
        }
        return comment;
      });
    };

    setComments(editCommentInList(comments));
  };

  const handleDeleteComment = (commentId) => {
    const deleteFromList = (commentsList) => {
      return commentsList.filter(comment => {
        if (comment.id === commentId) {
          return false;
        } 
        if (comment.replies && comment.replies.length > 0) {
          comment.replies = deleteFromList(comment.replies);
        }
        return true;
      });
    };

    setComments(deleteFromList(comments));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-sm text-gray-400">
            Page {currentPage + 1} of {pages.length}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
              showComments ? "bg-indigo-600" : "bg-gray-800"
            } transition hover:bg-indigo-500`}
          >
            <MessageCircle size={18} />
            <span className="text-sm">{comments.length}</span>
          </button>
          <button
            onClick={handleExit}
            className="text-white hover:text-red-400 transition"
            aria-label="Exit"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div
          className={`flex-1 flex items-center justify-center overflow-hidden transition-all ${
            showComments ? "lg:w-2/3" : "w-full"
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={pages[currentPage]}
            alt={`Page ${currentPage + 1}`}
            className="max-h-[80vh] max-w-full object-contain transition duration-300 ease-in-out"
          />
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="w-full lg:w-1/3 bg-gray-900 flex flex-col h-full border-l border-gray-700">
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-lg font-semibold">Comments</h2>
              <button
                onClick={() => setIsAddCommentModalOpen(true)}
                className="px-4 py-1.5 bg-indigo-600 rounded-md text-sm hover:bg-indigo-500 transition"
                disabled={!user}
              >
                Add Comment
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    currentUserId={user?._id}
                    currentUserRole={user?.role || 0}
                    onReply={handleReplyComment}
                    onEdit={handleEditComment}
                    onDelete={handleDeleteComment}
                  />
                ))
              ) : (
                <div className="text-center text-gray-400 py-6">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-gray-800">
        <div
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
        ></div>
      </div>

      {/* Controls */}
      <div className="p-4 flex items-center justify-between gap-4 bg-black border-t border-gray-700">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="flex items-center gap-1 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition disabled:opacity-50"
        >
          <ChevronLeft size={20} />
          Prev
        </button>

        <div className="flex gap-1 items-center overflow-x-auto max-w-[50%] scrollbar-thin scrollbar-thumb-gray-600">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentPage ? "bg-white" : "bg-gray-500"
              } transition-all duration-200 hover:bg-gray-300`}
              aria-label={`Go to page ${index + 1}`}
            ></button>
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className="flex items-center gap-1 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition disabled:opacity-50"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Modals */}
      <AddCommentModal
        isOpen={isAddCommentModalOpen}
        onClose={() => setIsAddCommentModalOpen(false)}
        onSubmit={handleAddComment}
      />
    </div>
  );
};

export default MangaViewer;