import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getChapterById } from "../../redux/chapterSlice";
import MangaViewer from "../components/reader/MangaViewer";

const ReaderPage = () => {
  const { chapterId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get chapter data from redux store
  const { current: chapter, loading, error } = useSelector((state) => state.chapters);
  
  // Get comments for this chapter
  const { comments, commentsLoading } = useSelector((state) => state.comments) || 
    { comments: [], commentsLoading: false };
  
  useEffect(() => {
    if (chapterId) {
      dispatch(getChapterById(chapterId));
      
      // Also fetch comments for this chapter
      // dispatch(getCommentsByChapter(chapterId));
    }
  }, [chapterId, dispatch]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4 text-red-600">Error: {error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Show not found state
  if (!chapter) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4">Chapter not found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Determine manga ID
  const mangaId = chapter.manga_id?._id || chapter.manga_id;

  return (
    <MangaViewer
      pages={chapter.pages || []}
      title={`${chapter.manga_id?.title || 'Unknown Manga'} - Chapter ${chapter.order || 'Unknown'}`}
      chapterId={chapterId}
      mangaId={mangaId}
    />
  );
};

export default ReaderPage;