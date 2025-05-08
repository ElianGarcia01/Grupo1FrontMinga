import React from "react";

const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4 px-4">
      {categories.map((category, idx) => {
        const baseStyle =
          "px-4 py-1 rounded-full text-sm font-medium cursor-pointer transform transition duration-200 ease-in-out hover:scale-105";
        
        let colorStyle = "bg-purple-200 text-purple-800 hover:bg-purple-300";
        
        if (category === "All") {
          colorStyle = "bg-gray-200 text-gray-800 hover:bg-gray-300";
        } else if (category === "Shōnen") {
          colorStyle = "bg-orange-200 text-orange-800 hover:bg-orange-300";
        } else if (category === "Seinen") {
          colorStyle = "bg-red-200 text-red-800 hover:bg-red-300";
        } else if (category === "Shōjo") {
          colorStyle = "bg-green-200 text-green-800 hover:bg-green-300";
        } else if (category === "Sci-fi") {
          colorStyle = "bg-blue-200 text-blue-800 hover:bg-blue-300";
        }

        const ringStyle = selected === category ? "ring-2 ring-offset-1 ring-black" : "";

        return (
          <span
            key={idx}
            className={`${baseStyle} ${colorStyle} ${ringStyle}`}
            onClick={() => onSelect(category)}
          >
            {category}
          </span>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
