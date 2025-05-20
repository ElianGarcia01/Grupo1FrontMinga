import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const MineMangasCard = ({ manga, categories }) => {
  const { _id, title, cover_photo, category_id } = manga;
  const type = category_id?.name || "Unknown";

  const categoryData = categories.find(
    (cat) => cat.name.toLowerCase() === type.toLowerCase()
  );
  const bgColor = categoryData?.hover || "#E5E7EB";
  const textColor = categoryData?.color || "#374151";

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${_id}`, {
      state: { manga, categories },
    });
  };

  const handleAddChapter = (e) => {
    e.stopPropagation();
    navigate(`/newChapter/${_id}`);
  };

  const handleEditChapters = (e) => {
    e.stopPropagation();
    navigate(`/editChapter/${_id}`);
  };

  const handleEditManga = (e) => {
    e.stopPropagation();
    navigate(`/editManga/${_id}`);
  };

const handleDeleteManga = async (e) => {
  e.stopPropagation();

  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/mangas/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ _id: _id }),
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el manga");
    }
  } catch (error) {
    console.error("Error eliminando el manga:", error);
  }
};

  return (
    <div
      onClick={handleClick}
      className="relative flex bg-white cursor-pointer rounded-xl overflow-hidden shadow-lg border-l-8 transition-transform hover:scale-[1.03]"
      style={{ borderColor: textColor }}
    >
      {/* Botones superiores */}
      <div className="absolute top-2 left-2 flex gap-2 z-10">
        <button
          onClick={handleAddChapter}
          className="bg-white cursor-pointer text-black border border-gray-300 rounded-full p-1 hover:bg-gray-100"
        >
          <FaPlus size={12} />
        </button>
        <button
          onClick={handleEditChapters}
          className="bg-white cursor-pointer text-black border border-gray-300 rounded-full p-1 hover:bg-gray-100"
        >
          <FaEdit size={12} />
        </button>
      </div>

      <div className="flex items-center p-5 w-full min-h-[150px] md:min-h-[180px] lg:min-h-[200px]">
        <div className="flex flex-col justify-between flex-grow pr-4">
          <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-3 line-clamp-2">
            {title}
          </h3>

          {/* Botones inferiores */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleEditManga}
              className="bg-purple-100 cursor-pointer text-purple-700 px-4 py-1 text-sm rounded-full hover:bg-purple-200 transition"
            >
              Editar
            </button>
            <button
              onClick={handleDeleteManga}
              className="bg-red-100 cursor-pointer text-red-700 px-4 py-1 text-sm rounded-full hover:bg-red-200 transition"
            >
              Eliminar
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 h-full">
          <img
            src={cover_photo}
            alt={title}
            className="w-24 md:w-28 lg:w-30 h-full object-cover rounded-l-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MineMangasCard;