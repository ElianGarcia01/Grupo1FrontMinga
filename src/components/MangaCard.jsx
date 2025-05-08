const MangaCard = ({ title, type, image }) => {
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
  
    const borderColor = getCategoryStyle(type).split(' ').find(cls => cls.startsWith('border-'));
  
    return (
      <div className={`flex bg-white rounded-xl overflow-hidden shadow-lg border-l-8 ${borderColor} transition-transform hover:scale-[1.03]`}>
        <div className="flex items-center p-5 w-full min-h-[150px] md:min-h-[180px] lg:min-h-[200px]">
          <div className="flex flex-col justify-between flex-grow pr-4">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-3 line-clamp-2">
              {title}
            </h3>
            <span className={`text-xs md:text-sm px-4 py-1 rounded-full w-fit ${getCategoryStyle(type)}`}>
              {type}
            </span>
          </div>
          <div className="flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default MangaCard;
  