import { useState } from "react";
import { FaSurprise, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaFaceGrinHearts } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const Details = () => {
  const { state } = useLocation();
  const [selectedTab, setSelectedTab] = useState("manga"); // <- Estado para la pestaña

  if (!state) return <p>No manga selected</p>;

  const { title, type, image } = state;

  const getCategoryStyle = (type) => {
    switch (type) {
      case "Shōnen":
        return "bg-orange-200 text-orange-800 border-orange-500";
      case "Seinen":
        return "bg-red-200 text-red-800 border-red-500";
      case "Shōjo":
        return "bg-green-200 text-green-800 border-green-500";
      case "Sci-fi":
        return "bg-blue-200 text-blue-800 border-blue-500";
      case "Kodomo":
        return "bg-purple-200 text-purple-800 border-purple-500";
      default:
        return "bg-gray-200 text-gray-800 border-gray-500";
    }
  };

  const borderColor = getCategoryStyle(type)
    .split(" ")
    .find((cls) => cls.startsWith("border-"));

  // 🔁 Simulación de capítulos
  const chapters = [
    { number: 1, title: "The Beginning" },
    { number: 2, title: "A New Power" },
    { number: 3, title: "The Hidden Village" },
    { number: 4, title: "Final Clash" },
  ];

  return (
    <section className="w-full p-8 min-h-screen flex flex-col justify-center items-center">
      {/* Card */}
      <div className="flex flex-col justify-center items-center">
        {/* Imagen */}
        <div className="w-full md:w-1/2 h-1/2">
          <img src={image} alt={title} className="w-full h-full rounded-2xl" />
        </div>

        {/* Título */}
        <div className="text-center flex flex-col justify-center mb-4">
          <h1 className="text-2xl font-normal mt-4">{title}</h1>
          <div className="flex justify-between items-center mt-4">
            <span className={`text-x px-4 py-1 rounded-full w-fit ${getCategoryStyle(type)}`}>
              {type}
            </span>
            <p className="text-lg">Company Name</p>
          </div>
        </div>

        {/* Reacciones */}
        <div className="flex gap-4 mt-4">
          <button className="p-4 rounded-full bg-white shadow-md hover:bg-yellow-100">
            <FaThumbsUp className="text-yellow-500 text-2xl" />
          </button>
          <button className="p-4 rounded-full bg-white shadow-md hover:bg-yellow-100">
            <FaThumbsDown className="text-yellow-500 text-2xl" />
          </button>
          <button className="p-4 rounded-full bg-white shadow-md hover:bg-yellow-100">
            <FaSurprise className="text-yellow-500 text-2xl" />
          </button>
          <button className="p-4 rounded-full bg-white shadow-md hover:bg-yellow-100">
            <FaFaceGrinHearts className="text-yellow-500 text-2xl" />
          </button>
        </div>

        {/* Botones de pestañas */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setSelectedTab("manga")}
            className={`px-8 py-2 text-lg rounded-2xl ${
              selectedTab === "manga"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            Manga
          </button>
          <button
            onClick={() => setSelectedTab("chapters")}
            className={`px-8 py-2 text-lg rounded-2xl ${
              selectedTab === "chapters"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            Chapters
          </button>
        </div>

        {/* Contenido condicional */}
        <div className="mt-8 w-full md:w-2/3">
          {selectedTab === "manga" ? (
            <p className="text-lg text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et metus at justo
              vestibulum gravida. Nullam tincidunt sem vel ligula gravida, at facilisis nulla
              efficitur.
            </p>
          ) : (
            <div className="grid gap-4">
              {chapters.map((chapter) => (
                <div
                  key={chapter.number}
                  className="border border-gray-300 rounded-xl p-4 bg-white shadow"
                >
                  <h3 className="font-semibold text-xl">Chapter {chapter.number}</h3>
                  <p className="text-gray-600">{chapter.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Details;
