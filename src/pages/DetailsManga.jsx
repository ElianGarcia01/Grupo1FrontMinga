import { useEffect, useState } from "react";
import { FaSurprise, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaFaceGrinHearts } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getChapters, getChaptersByManga } from "../../redux/chapterSlice";

const Details = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("manga");
  const dispatch = useDispatch();

  useEffect(() => {
    // Cargar todos los capítulos inicialmente
    dispatch(getChapters());
    
    // Si tenemos un manga ID, también cargar capítulos específicos de ese manga
    if (id) {
      dispatch(getChaptersByManga(id));
    }
  }, [dispatch, id]);

  const { all: mangas = [] } = useSelector((state) => state.mangas);
  const { all: categories = [] } = useSelector((state) => state.categories);
  const { 
    all: allChapters = [], 
    list: mangaChapters = [], 
    loading: chaptersLoading 
  } = useSelector((state) => state.chapters);

  const manga = state?.manga || mangas.find((m) => m._id === id);

  if (!manga) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Manga not found</p>
      </div>
    );
  }

  const { _id, title, cover_photo, description, category_id } = manga;
  
  // Usar mangaChapters si está disponible, sino filtrar de allChapters
  const filteredChapters = mangaChapters.length > 0 
    ? mangaChapters 
    : allChapters.filter((chapter) => chapter.manga_id?._id === _id);

  const type = category_id?.name || "Unknown";
  const categoryData = categories.find(
    (cat) => cat.name.toLowerCase() === type.toLowerCase()
  );
  const bgColor = categoryData?.hover || "#E5E7EB";
  const textColor = categoryData?.color || "#374151";

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-12 min-h-screen flex flex-col lg:flex-row lg:gap-16">
      {/* Cover Image */}
      <div className="w-full lg:w-2/5">
        <img
          src={cover_photo}
          alt={title}
          className="w-full h-[300px] lg:h-[600px] rounded-2xl object-cover"
        />
      </div>

      {/* Manga Info */}
      <div className="w-full lg:w-3/5 flex flex-col">
        <h1 className="text-3xl lg:text-4xl font-bold mt-6 lg:mt-0">{title}</h1>

        {/* Category & Company */}
        <div className="flex justify-between items-center mt-4">
          <span
            className="text-sm lg:text-base px-4 py-1 rounded-full shadow-sm"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {type}
          </span>
          <p className="text-lg lg:text-xl text-gray-600">Company Name</p>
        </div>

        {/* Reactions */}
        <div className="flex gap-4 mt-8 flex-wrap">
          {[FaThumbsUp, FaThumbsDown, FaSurprise, FaFaceGrinHearts].map(
            (Icon, idx) => (
              <button
                key={idx}
                className="p-4 lg:p-5 cursor-pointer rounded-full bg-white shadow-md hover:bg-yellow-100 transition"
              >
                <Icon className="text-yellow-500 text-2xl lg:text-3xl" />
              </button>
            )
          )}
        </div>

        {/* Tabs */}
        <div className="mt-10 sticky top-0 bg-white z-10 flex gap-4">
          {["manga", "chapters"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-8 py-2 text-lg cursor-pointer rounded-2xl font-medium transition ${
                selectedTab === tab
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {tab === "manga" ? "Manga" : "Chapters"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6 overflow-y-auto h-[400px] pr-2">
          {selectedTab === "manga" ? (
            <p className="text-lg lg:text-xl leading-relaxed text-gray-700">
              {description || "No description available"}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chaptersLoading ? (
                <div className="col-span-full flex justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredChapters.length > 0 ? (
                filteredChapters.map((ch) => (
                  <div
                    key={ch._id}
                    onClick={() => navigate(`/reader/${ch._id}`)}
                    className="border border-gray-200 rounded-xl p-4 bg-white shadow hover:shadow-md transition flex flex-col gap-3 cursor-pointer"
                  >
                    <h3 className="font-semibold text-lg lg:text-xl mb-1">
                      Chapter {ch.order}
                    </h3>
                    <p className="text-gray-600">{ch.title}</p>
                    {ch.pages?.length > 0 && (
                      <img
                        src={ch.pages[0]}
                        alt={`Cover of chapter ${ch.order}`}
                        className="w-full h-[200px] object-cover rounded-md"
                      />
                    )}
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No chapters available
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Details;