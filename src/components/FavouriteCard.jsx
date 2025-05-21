import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const categoryStyles = {
  "682026e077220ba09b4eb784": {
    bg: "bg-orange-200",
    text: "text-orange-800",
    border: "border-orange-500",
    name: "Shōnen"
  },
  "682026e077220ba09b4eb781": {
    bg: "bg-purple-200",
    text: "text-purple-800",
    border: "border-purple-500",
    name: "Kodomo"
  },
  "682026e077220ba09b4eb783": {
    bg: "bg-green-200",
    text: "text-green-800",
    border: "border-green-500",
    name: "Shōjo"
  },
  default: {
    bg: "bg-gray-200",
    text: "text-gray-800",
    border: "border-gray-500",
    name: "Unknown"
  },
};

const FavouriteCard = ({ title, type, image, manga_id, onRemove }) => {
  const style = categoryStyles[type] || categoryStyles.default;

  return (
    <div
      className={`relative bg-white rounded-xl overflow-hidden shadow-lg border-l-8 ${style.border} transition-transform hover:scale-[1.03]`}
    >

      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onRemove(manga_id);
        }}
        aria-label="Remove"
        className="absolute top-2 left-2 w-6 h-6 rounded-full border-2 border-black text-black
        hover:bg-red-300 flex items-center justify-center transition-colors cursor-pointer z-10"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <Link
        to={`/details/${manga_id}`}
        className="block w-full h-full"
      >
        <div className="flex items-center p-5 w-full min-h-[150px] md:min-h-[180px] lg:min-h-[200px]">
          <div className="flex flex-col justify-between flex-grow pr-4">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-3 line-clamp-2">
              {title}
            </h3>
            <span
              className={`text-xs md:text-sm px-4 py-1 rounded-full w-fit ${style.bg} ${style.text} ${style.border}`}
            >
              {style.name}
            </span>
          </div>
          <div className="flex-shrink-0 h-full">
            <img
              src={image}
              alt={title}
              className="w-24 md:w-28 lg:w-30 h-full object-cover rounded-l-full"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FavouriteCard;