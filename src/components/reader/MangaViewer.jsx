import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const MangaViewer = ({ pages, title, chapterId, chapter }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const touchStartX = useRef(null);

  // Prioriza el mangaId recibido por state, si no existe lo busca en el capítulo
  const mangaId = state?.mangaId || chapter?.manga_id?._id || chapter?.manga_id;

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${chapterId}`);
    if (savedProgress) {
      setCurrentPage(Number(savedProgress));
    }
  }, [chapterId]);

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
        <button
          onClick={handleExit}
          className="text-white hover:text-red-400 transition"
          aria-label="Exit"
        >
          <X size={24} />
        </button>
      </div>

      {/* Viewer */}
      <div
        className="flex-1 flex items-center justify-center w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={pages[currentPage]}
          alt={`Page ${currentPage + 1}`}
          className="max-h-[80vh] max-w-full object-contain transition duration-300 ease-in-out"
        />
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
            <span
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentPage ? "bg-white" : "bg-gray-500"
              }`}
            ></span>
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
    </div>
  );
};

export default MangaViewer;
