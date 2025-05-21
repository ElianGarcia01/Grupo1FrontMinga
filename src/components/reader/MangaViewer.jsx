import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hook/useAuth"; 
import AddCommentModal from "../comments/AddCommentModal";
import Comment from "../comments/Comment";
import { getCommentsByChapter, createComment } from "../../services/commentsService";

const MangaViewer = ({ pages, title, chapterId, chapter }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user, token } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isAddCommentModalOpen, setIsAddCommentModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const touchStartX = useRef(null);

  const mangaId = state?.mangaId || chapter?.manga_id?._id || chapter?.manga_id;

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${chapterId}`);
    if (savedProgress) {
      setCurrentPage(Number(savedProgress));
    }
    fetchComments();
  }, [chapterId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const data = await getCommentsByChapter(chapterId); // Usando query param
      setComments(data || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setIsLoading(false);
    }
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
    navigate(mangaId ? `/details/${mangaId}` : "/");
  };

  const handleAddComment = async (text) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!user.author && !user.company) {
      navigate('/newrol');
      return;
    }

    try {
      const commentData = {
        chapter_id: chapterId,
        message: text
      };

      if (user.author) {
        commentData.author_id = user.author._id;
      } else if (user.company) {
        commentData.company_id = user.company._id;
      }

      let comment = await createComment(commentData, token);
      console.log(comment);

      await fetchComments();
      setIsAddCommentModalOpen(false);
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };

  const getUserRole = () => {
    if (!user) return 0;
    if (user.role === 'admin') return 3;
    if (user.role === 'moderator') return 2;
    if (user.author || user.company) return 1;
    return 0;
  };

  const getUserId = () => {
    if (!user) return null;
    if (user.author) return user.author._id;
    if (user.company) return user.company._id;
    return null;
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
        {/* Image */}
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

        {/* Comments */}
        {showComments && (
          <div className="w-full lg:w-1/3 bg-gray-900 flex flex-col h-full border-l border-gray-700">
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-lg font-semibold">Comments</h2>
              <button
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  } else if (!user.author && !user.company) {
                    navigate("/newrol");
                  } else {
                    setIsAddCommentModalOpen(true);
                  }
                }}
                className="px-4 py-1.5 bg-indigo-600 rounded-md text-sm hover:bg-indigo-500 transition"
              >
                Add Comment
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {isLoading ? (
                <div className="text-center text-gray-400 py-6">
                  Loading comments...
                </div>
              ) : comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    currentUserId={getUserId()}
                    currentUserRole={getUserRole()}
                    chapterId={chapterId}
                    refreshComments={fetchComments}
                    token={token}
                  />
                ))
              ) : (
                <div className="text-center text-gray-400 py-6">
                  No comments yet. {user?.author || user?.company ? 'Be the first to comment!' : 'You need to register as an author or company to comment.'}
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

      {/* Footer controls */}
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

      <AddCommentModal
        isOpen={isAddCommentModalOpen}
        onClose={() => setIsAddCommentModalOpen(false)}
        onSubmit={handleAddComment}
      />
    </div>
  );
};

export default MangaViewer;
