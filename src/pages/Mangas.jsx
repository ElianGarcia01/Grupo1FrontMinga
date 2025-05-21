import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMangas } from "../../redux/mangaSlice";
import { fetchCategories } from "../../redux/categorySlice";
import MangaCard from "../components/MangaCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function Mangas() {
  const dispatch = useDispatch();

  // Selectors para leer mangas, categorías y capítulos del store
  const mangas = useSelector((state) => state.mangas.all) || [];
  const categories = useSelector((state) => state.categories.all) || [];
  const loading = useSelector((state) => state.mangas.loading);

  // Estado local: búsqueda y filtro de categoría
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Al montar componente: disparar fetch de mangas, categorías y capítulos
  useEffect(() => {
    dispatch(fetchMangas());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Filtrado de mangas según texto y categoría
  const filteredMangas = mangas.filter((manga) => {
    const matchesSearch = manga.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      manga.category_id?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Lista de categorías para el filtro (incluye “All”)
  const categoryNames = ["All", ...categories.map((cat) => cat.name)];

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Hero: fondo y SearchBar */}
      <div
        className="min-h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/Mangas.jpg')" }}
      >
        <section className="flex flex-col items-center justify-end text-white pt-0 pb-48 px-4 min-h-screen">
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

      {/* Contenido: filtros y tarjetas */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto -mt-40 bg-white text-black shadow-2xl rounded-t-[80px] md:rounded-t-[100px] px-4 sm:px-10 md:px-20 pb-10 pt-8 z-10 relative"
      >
        {/* Filtro de Categorías */}
        <CategoryFilter
          categories={categoryNames}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Grid de MangaCards */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
          </div>
        ) : filteredMangas.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-12 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredMangas.map((manga) => (
              <MangaCard
                key={manga._id}
                manga={manga}
                categories={categories}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-xl text-gray-600 mt-10 mb-20"
          >
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FaSearch size={48} className="text-gray-500 mb-4" />
              <p className="text-xl md:text-2xl font-semibold text-gray-700">
                Oops! No results were found for your search.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try another term or select another category.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
