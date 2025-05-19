import { useState, useEffect } from "react";

const MangaViewer = ({ pages, title }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full p-4 bg-black text-white text-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm">Page {currentPage + 1} of {pages.length}</p>
      </div>

      {/* Image Viewer */}
      <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
        <img
          src={pages[currentPage]}
          alt={`Page ${currentPage + 1}`}
          className="max-h-[80vh] max-w-full object-contain"
        />
      </div>

      {/* Controls */}
      <div className="w-full p-4 bg-black flex justify-between">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MangaViewer;