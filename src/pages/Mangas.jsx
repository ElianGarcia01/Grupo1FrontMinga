import { useState } from "react";
import MangaCard from "../components/MangaCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { motion } from "framer-motion";

const mockMangas = [
  {
    title: "Naruto: And That's Why You're Disqualified!! #8",
    type: "Shōnen",
    image: "https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg",
  },
  {
    title: "Izuku Midoriya: Origin #1",
    type: "Shōnen",
    image: "./assets/MYHERO.png",
  },
  {
    title: "Shingeki no Kyojin",
    type: "Seinen",
    image: "/assets/ShingekiImage.webp",
  },
  {
    title: "Demon Slayer",
    type: "Seinen",
    image: "/assets/kimetsu.webp",
  },
];

const categories = ["All", "Shōnen", "Seinen", "Shōjo", "Kodomo"];

export default function Mangas() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMangas = mockMangas.filter((manga) => {
    const matchesSearch = manga.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || manga.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero header */}
      <div className="relative h-[55vh] bg-black bg-opacity-60 flex flex-col justify-center items-center text-white">
        <img
          src="./assets/Mangas.jpg"
          alt="header"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-70"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Mangas</h1>
          <div className="mt-6 flex justify-center">
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Manga Grid */}
      <motion.div
        className="className= grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-12 py-10 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredMangas.map((manga, index) => (
          <MangaCard
            key={index}
            title={manga.title}
            type={manga.type}
            image={manga.image}
          />
        ))}
      </motion.div>

      {/* No Results Message */}
      {filteredMangas.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-xl text-gray-600 mt-10 mb-20"
        >
          <p className="inline-block px-6 py-3 bg-purple-100 text-purple-800 rounded-full shadow-md">
            😕 Sorry, no manga found with that name.
          </p>
        </motion.div>
      )}
    </div>
  );
}
