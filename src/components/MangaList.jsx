import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMangas, clearError } from '../../redux/mangaSlice';
import { getChapters, setCurrentChapter } from '../../redux/chapterSlice';

const MangaList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { all: mangas, loading: mangasLoading, error: mangasError } = useSelector(state => state.mangas);
  const { all: chapters, loading: chaptersLoading, error: chaptersError } = useSelector(state => state.chapters);

  useEffect(() => {
    dispatch(clearError());
    dispatch(fetchMangas());
    dispatch(getChapters());
  }, [dispatch]);

  const handleChapterClick = (chapter) => {
    dispatch(setCurrentChapter(chapter));
    navigate('/reader');
  };

  if (mangasLoading || chaptersLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3">
          {mangasLoading ? 'Loading mangas...' : 'Loading chapters...'}
        </span>
      </div>
    );
  }

  if (mangasError || chaptersError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {mangasError && ` Mangas: ${mangasError}`}
            {chaptersError && ` Chapters: ${chaptersError}`}
          </span>
          <button
            onClick={() => {
              dispatch(clearError());
              dispatch(fetchMangas());
              dispatch(getChapters());
            }}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manga Library</h1>
        <button
          onClick={() => navigate('/mangas')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Manga Grid
        </button>
      </div>
      
      {mangas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No mangas found</p>
        </div>
      ) : (
        mangas.map(manga => {
          const mangaChapters = chapters.filter(chapter => 
            chapter.manga_id === manga._id || 
            chapter.mangaId === manga._id ||
            (chapter.manga && chapter.manga._id === manga._id)
          );

          return (
            <div key={manga._id} className="mb-8 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex gap-6">
                  <div className="w-48 h-64 flex-shrink-0">
                    <img
                      src={manga.cover_photo || '/api/placeholder/192/256'}
                      alt={manga.title}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">{manga.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{manga.description}</p>
                    
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {manga.category_id?.name || manga.category?.name || 'Uncategorized'}
                      </span>
                      <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                        {mangaChapters.length} chapter{mangaChapters.length !== 1 ? 's' : ''}
                      </span>
                      {manga.author_id?.name && (
                        <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                          by {manga.author_id.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">Available Chapters</h3>
                      {mangaChapters.length === 0 ? (
                        <p className="text-gray-500 italic">No chapters available yet</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {mangaChapters
                            .sort((a, b) => (a.order || a.number || 0) - (b.order || b.number || 0))
                            .map(chapter => (
                            <button
                              key={chapter._id}
                              onClick={() => handleChapterClick(chapter)}
                              className="p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg transition-all duration-200 text-left hover:shadow-md hover:border-blue-300"
                            >
                              <div className="font-semibold text-blue-800 mb-1">
                                Chapter {chapter.order || chapter.number || '??'}
                              </div>
                              {chapter.title && (
                                <div className="text-sm text-gray-700 mb-2 line-clamp-2">
                                  {chapter.title}
                                </div>
                              )}
                              <div className="text-xs text-gray-500">
                                {chapter.pages?.length || 0} pages
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MangaList;