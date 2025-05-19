import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getChapterById } from "../../redux/chapterSlice";
import MangaViewer from "../components/reader/MangaViewer";

const ReaderPage = () => {
  const { chapterId } = useParams();
  const dispatch = useDispatch();

  const { current: chapter, loading, error } = useSelector((state) => state.chapters);

  useEffect(() => {
    if (chapterId) dispatch(getChapterById(chapterId));
  }, [chapterId, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4 text-red-600">
          {error ? `Error: ${error}` : "Chapter not found"}
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const mangaId = chapter.manga_id?._id || chapter.manga_id;

  return (
    <MangaViewer
      pages={chapter.pages || []}
      title={`${chapter.manga_id?.title || "Unknown Manga"} - Chapter ${chapter.order}`}
      chapterId={chapterId}
      mangaId={mangaId}
    />
  );
};

export default ReaderPage;
