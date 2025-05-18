import { useEffect, useState } from "react";
import { FaSurprise, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaFaceGrinHearts } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getChapters } from "../../redux/chapterSlice";

const Details = () => {
  // Entradas del router
  const { state } = useLocation();
  const { id } = useParams();

  // Estado local para pestañas
  const [selectedTab, setSelectedTab] = useState("manga");

  // Al montar, disparar la acción para traer los capítulos
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChapters());
  }, [dispatch]);

  // Traer mangas, categorías y capítulos del store
  const allMangas = useSelector((s) => s.mangas.all) || [];
  const allCategories = useSelector((s) => s.categories.all) || [];
  const allChapters = useSelector((s) => s.chapters.all) || [];

  // 4️⃣ Fallback de manga y categorías (como antes)
  const manga = state?.manga || allMangas.find((m) => m._id === id);
  const { _id } = manga;

  // Filtramos solo capítulos del manga actual
  const filteredChapters = allChapters.filter(
    (chapter) => chapter.manga_id?._id === _id || chapter.manga_id?._id === id
  );

  const categories = state?.categories || allCategories;

  if (!manga) return <p>No manga selected</p>;

  // 6️⃣ Extraemos datos del manga
  const { title, cover_photo, description, category_id } = manga;
  const type = category_id?.name || "Unknown";

  // 7️⃣ Colores según categoría
  const categoryData = categories.find(
    (cat) => cat.name.toLowerCase() === type.toLowerCase()
  );
  const bgColor = categoryData?.hover || "#E5E7EB";
  const textColor = categoryData?.color || "#374151";

  return (
<section className="w-full max-w-[1400px] mx-auto px-6 py-12 min-h-screen flex flex-col lg:flex-row lg:gap-16">
  {/* IMAGEN */}
  <div className="w-full lg:w-2/5">
    <img
      src={cover_photo}
      alt={title}
      className="w-full h-[300px] lg:h-[600px] rounded-2xl
      object-contain object-center"
    />
  </div>

  {/* INFO + TABS */}
  <div className="w-full lg:w-3/5 flex flex-col">
    <h1 className="text-3xl lg:text-4xl font-bold mt-6 lg:mt-0">{title}</h1>

    {/* Etiqueta + empresa */}
    <div className="flex justify-between items-center mt-4">
      <span
        className="text-sm lg:text-base px-4 py-1 rounded-full shadow-sm"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {type}
      </span>
      <p className="text-lg lg:text-xl text-gray-600">Company Name</p>
    </div>

    {/* Reacciones */}
    <div className="flex gap-4 mt-8 flex-wrap">
      {[FaThumbsUp, FaThumbsDown, FaSurprise, FaFaceGrinHearts].map(
        (Icon, idx) => (
          <button
            key={idx}
            className="p-4 lg:p-5 rounded-full bg-white shadow-md hover:bg-yellow-100 transition"
          >
            <Icon className="text-yellow-500 text-2xl lg:text-3xl" />
          </button>
        )
      )}
    </div>

    {/* Sticky Tabs */}
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

    {/* Contenido scrollable */}
    <div className="mt-6 overflow-y-auto h-[400px] pr-2">
      {selectedTab === "manga" ? (
        <p className="text-lg lg:text-xl leading-relaxed text-gray-700">
          {description}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChapters.map((ch) => (
            <div
              key={ch._id}
              className="border cursor-pointer border-gray-200 rounded-xl p-4 bg-white shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg lg:text-xl mb-1">
                Chapter {ch.order}
              </h3>
              <p className="text-gray-600">{ch.title}</p>
            </div>
          ))}
          {filteredChapters.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No chapters yet
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
