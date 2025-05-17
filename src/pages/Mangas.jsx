import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMangas } from "../../redux/mangaSlice";
import { fetchCategories } from "../../redux/categorySlice";
import MangaCard from "../components/MangaCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { motion } from "framer-motion";

export default function Panel() {
  const dispatch = useDispatch();
  const mangas = useSelector((state) => state.mangas.all);
  const categories = useSelector((state) => state.categories.all);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchMangas());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredMangas = (Array.isArray(mangas) ? mangas : []).filter((manga) => {
    const titleMatch = manga.title.toLowerCase().includes(search.toLowerCase());
    const categoryMatch =
      selectedCategory === "All" || manga.category_id?.name === selectedCategory;
    return titleMatch && categoryMatch;
  });

  const categoryNames = ["All", ...categories.map((cat) => cat.name)];


  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Hero */}
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/Mangas.jpg')" }}
      >
        <section className="flex flex-col items-center justify-end text-white
        pt-0 pb-110 px-4 min-h-screen">
          <h1 className="text-3xl md:text-5xl font-bold">Mangas</h1>
          <div className="mt-10 w-full max-w-xl">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-black w-full"
            />
          </div>
        </section>
      </div>

      {/* Cards y filtros */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto -mt-90 bg-white text-black shadow-2xl rounded-t-[80px]
        md:rounded-t-[100px] px-4 sm:px-10 md:px-20 pb-10 pt-8 z-10 relative"
      >
        <CategoryFilter
          categories={categoryNames}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-12 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredMangas.map((manga) => (
            <MangaCard key={manga._id} manga={manga} categories={categories} />
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
    </div>
  );
}
