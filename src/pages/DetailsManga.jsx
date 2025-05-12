import { FaSurprise } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaFaceGrinHearts } from "react-icons/fa6";

const Details = () => {
  const { state } = useLocation();

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

  return (
    <section className="w-full p-8 min-h-screen flex flex-col justify-center items-center">
      {/* Card */}
      <div className="flex flex-col justify-center items-center">
        {/* Imagen de la card*/}
        <div className="w-full md:w-1/2  h-1/2">
          <img src={image} alt={title} className="w-full h-full rounded-2xl" />
        </div>

        {/* Seccion de titulo */}
        <div className="text-center flex flex-col justify-center mb-4">
          <h1 className="text-2xl font-normal mt-4">{title}</h1>

          {/* Category & Company Name */}
          <div className="flex justify-between items-center mt-4">
            <span
              className={`text-x text-start md:text-sm px-4 py-1 rounded-full w-fit ${getCategoryStyle(
                type
              )}`}
            >
              {type}
            </span>
            <p className="text-lg text-end">Company Name</p>
          </div>
        </div>

        {/* Reacciones */}
        <div>
          {/* 👍 Like */}
          <button className="p-4 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-yellow-100 transition duration-300 cursor-pointer">
            <FaThumbsUp className="text-yellow-500 text-2xl hover:scale-110 transition-transform duration-300" />
          </button>

          {/* 👎 Dislike */}
          <button className="p-4 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-yellow-100 transition duration-300 cursor-pointer">
            <FaThumbsDown className="text-yellow-500 text-2xl hover:scale-110 transition-transform duration-300" />
          </button>

          {/* 😲 Sorprendido */}
          <button className="p-4 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-yellow-100 transition duration-300 cursor-pointer">
            <FaSurprise className="text-yellow-500 text-2xl hover:scale-110 transition-transform duration-300" />
          </button>

          {/* 😍 Ojos con corazones */}
          <button className="p-4 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-yellow-100 transition duration-300 cursor-pointer">
            <FaFaceGrinHearts className="text-yellow-500 text-2xl hover:scale-110 transition-transform duration-300" />
          </button>
        </div>

        {/* Botones manga y chapters */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-indigo-600 hover:bg-indigo-800 px-8 py-2 text-lg
      text-white cursor-pointer rounded-2xl"
          >
            Manga
          </button>
          <button
            className=" px-8 py-2 text-lg
      text-black cursor-pointer rounded-2xl bg-gray-200 hover:bg-gray-300"
          >
            Chopters
          </button>
        </div>
      </div>
    </section>
  );
};

export default Details;
