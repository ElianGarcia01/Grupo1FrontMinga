import { useState } from "react";
import MangaCard from "../components/MangaCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { motion } from "framer-motion";

const mockMangas = [
  {
    id: 1,
    title: "Naruto: And That's Why You're Disqualified!! #8",
    type: "Shōnen",
    image: "https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg",
  },
  {
    id: 2,
    title: "Izuku Midoriya: Origin #1",
    type: "Shōnen",
    image: "./assets/MYHERO.png",
  },
  {
    id: 3,
    title: "Shingeki no Kyojin",
    type: "Seinen",
    image: "/assets/ShingekiImage.webp",
  },
  {
    id: 4,
    title: "Demon Slayer",
    type: "Seinen",
    image: "/assets/kimetsu.webp",
  },
];

const categories = ["All", "Shōnen", "Seinen", "Shōjo", "Kodomo"];

export default function Panel() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMangas = mockMangas.filter((manga) => {
    const matchesSearch = manga.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || manga.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section
      className="relative min-h-screen text-white"
      style={{
        backgroundImage: "url('/assets/Mangas.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#1a1a1a",
      }}
    >
      {/* CONTENIDO CENTRADO */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] z-10 text-center w-full px-4">
        <h1 className="text-3xl md:text-5xl font-bold">Mangas</h1>
        <div className="mt-6 flex justify-center">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white text-black w-full max-w-xl"
          />
        </div>
      </div>

      {/* CUADRO BLANCO FLOTANTE */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 transform -translate-x-1/2 w-full sm:w-11/12 md:w-3/4 bg-white text-black shadow-2xl rounded-t-[80px] md:rounded-t-[100px] z-20 mt-20 px-4 sm:px-10 md:px-20 pb-10 pt-8"
        style={{ top: "65%" }}
      >
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-12 py-10 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredMangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </motion.div>

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
      </motion.div>
    </section>
  );
}
