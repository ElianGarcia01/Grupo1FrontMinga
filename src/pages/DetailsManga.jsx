import { useState } from "react";
import { FaSurprise, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaFaceGrinHearts } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const Details = () => {
  // Se toma el state pasado por navigate y el parámetro :id de la URL
  const { state } = useLocation();
  const { id } = useParams();

  // Traemos todos los mangas y categorías del store (fallback si aún no cargaron)
  const allMangas = useSelector((s) => s.mangas.all) || [];
  const allCategories = useSelector((s) => s.categories.all) || [];

  // Control de la pestaña activa: 'manga' o 'chapters'
  const [selectedTab, setSelectedTab] = useState("manga");

  // Si viene state se usa, si no se busca en el store por el id
  const manga = state?.manga || allMangas.find((m) => m._id === id);
  const categories = state?.categories || allCategories;

  // Si no hay manga (ni por state ni por id), se muestra un mensaje
  if (!state?.manga && !manga) return <p>No manga selected</p>;

  // Destructuracion de los datos del manga ya encontrado
  const { title, cover_photo, description, category_id } = manga;
  const type = category_id?.name || "Unknown";

  // Preparar capítulos (o array vacío si no tiene)
  const chapters = manga.chapters || [];

  // Obtener los colores según la categoría
  const categoryData = categories.find(
    (cat) => cat.name.toLowerCase() === type.toLowerCase()
  );
  const bgColor = categoryData?.hover || "#E5E7EB";
  const textColor = categoryData?.color || "#374151";

  return (
    <section className="w-full px-4 py-8 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* Imagen principal del manga */}
        <div className="w-full lg:w-1/2">
          <img
            src={cover_photo}
            alt={title}
            className="w-full h-4/5 rounded-2xl object-cover"
          />
        </div>

        {/* Información y tabs */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          {/* Título */}
          <h1 className="text-3xl font-semibold mt-4 text-center lg:text-left">
            {title}
          </h1>

          {/* Etiqueta de categoría con su color */}
          <div className="flex justify-between items-center w-full mt-4">
            <span
              className="text-xs md:text-sm px-4 py-1 rounded-full w-fit shadow-sm"
              style={{ backgroundColor: bgColor, color: textColor }}
            >
              {type}
            </span>
            <p className="text-lg text-gray-600">Company Name</p>
          </div>

          {/* Botones de reacciones */}
          <div className="flex gap-4 mt-6 flex-wrap justify-center lg:justify-start">
            {[FaThumbsUp, FaThumbsDown, FaSurprise, FaFaceGrinHearts].map(
              (Icon, idx) => (
                <button
                  key={idx}
                  className="p-4 rounded-full cursor-pointer bg-white shadow-md hover:bg-yellow-100 transition"
                >
                  <Icon className="text-yellow-500 text-2xl" />
                </button>
              )
            )}
          </div>

          {/* Switch entre pestañas */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setSelectedTab("manga")}
              className={`px-8 py-2 text-lg rounded-2xl cursor-pointer ${
                selectedTab === "manga"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              Manga
            </button>
            <button
              onClick={() => setSelectedTab("chapters")}
              className={`px-8 py-2 text-lg rounded-2xl cursor-pointer ${
                selectedTab === "chapters"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              Chapters
            </button>
          </div>

          {/* Contenido de la pestaña activa */}
          <div className="mt-6 w-full">
            {selectedTab === "manga" ? (
              /* Descripción del manga */
              <p className="text-lg text-gray-700 leading-relaxed">
                {description}
              </p>
            ) : (
              /* Listado de capítulos */
              <div className="grid gap-4 mt-2">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.number}
                    className="border border-gray-300 rounded-xl p-4 bg-white shadow"
                  >
                    <h3 className="font-semibold text-xl">
                      Chapter {chapter.number}
                    </h3>
                    <p className="text-gray-600">{chapter.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
