import { useNavigate } from "react-router-dom";

const MangaCard = ({ manga, categories }) => {
  const { title, cover_photo, category_id } = manga;
  const type = category_id?.name || "Unknown";

  const categoryData = categories.find(
    (cat) => cat.name.toLowerCase() === type.toLowerCase()
  );

  const bgColor = categoryData?.hover || "#E5E7EB";
  const textColor = categoryData?.color || "#374151";

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/details", { state: manga });
  };

  return (
    <div
      onClick={handleClick}
      className="flex bg-white cursor-pointer rounded-xl overflow-hidden shadow-lg border-l-8 transition-transform hover:scale-[1.03]"
      style={{ borderColor: textColor }}
    >
      <div className="flex items-center p-5 w-full min-h-[150px] md:min-h-[180px] lg:min-h-[200px]">
        <div className="flex flex-col justify-between flex-grow pr-4">
          <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-3 line-clamp-2">
            {title}
          </h3>
          <span
            className="text-xs md:text-sm px-4 py-1 rounded-full w-fit shadow-sm"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {type}
          </span>
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

export default MangaCard;