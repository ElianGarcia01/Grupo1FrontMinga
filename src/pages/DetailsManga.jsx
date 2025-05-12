import { useState } from "react";
import { FaSurprise, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaFaceGrinHearts } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const Details = () => {
  const { state } = useLocation();
  const [selectedTab, setSelectedTab] = useState("manga");

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

  const chapters = [
    { number: 1, title: "The Beginning" },
    { number: 2, title: "A New Power" },
    { number: 3, title: "The Hidden Village" },
    { number: 4, title: "Final Clash" },
  ];

  return (
    <section className="w-full px-4 py-8 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* Imagen */}
        <div className="w-full lg:w-1/2">
          <img src={image} alt={title} className="w-full h-4/5 rounded-2xl object-cover" />
        </div>

        {/* Info */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          <h1 className="text-3xl font-semibold mt-4 text-center lg:text-left">{title}</h1>

          {/* Tipo + Compañía */}
          <div className="flex justify-between items-center w-full mt-4">
            <span className={`text-sm px-4 py-1 rounded-full ${getCategoryStyle(type)}`}>
              {type}
            </span>
            <p className="text-lg text-gray-600">Company Name</p>
          </div>

          {/* Reacciones */}
          <div className="flex gap-4 mt-6 flex-wrap justify-center lg:justify-start">
            {[FaThumbsUp, FaThumbsDown, FaSurprise, FaFaceGrinHearts].map((Icon, idx) => (
              <button
                key={idx}
                className="p-4 rounded-full cursor-pointer bg-white shadow-md hover:bg-yellow-100 transition"
              >
                <Icon className="text-yellow-500 text-2xl" />
              </button>
            ))}
          </div>

          {/* Tabs */}
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

          {/* Contenido */}
          <div className="mt-6 w-full">
            {selectedTab === "manga" ? (
              <p className="text-lg text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et metus at justo
                vestibulum gravida. Nullam tincidunt sem vel ligula gravida, at facilisis nulla
                efficitur. Duis posuere efficitur neque vel varius.
              </p>
            ) : (
              <div className="grid gap-4 mt-2">
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
      </div>
    </section>
  );
};

export default Details;
