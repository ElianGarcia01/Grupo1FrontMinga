import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MangaCard from "../components/MangaCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { motion } from "framer-motion";

const AuthorCompany = () => {
  const location = useLocation();
  const { type, name } = location.state || {};

  const [mangas, setMangas] = useState([]);
  const [filteredMangas, setFilteredMangas] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const endpoint =
    type === "author"
      ? `/api/mangas?author=${encodeURIComponent(name)}`
      : `/api/mangas?company=${encodeURIComponent(name)}`;

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(endpoint);

        if (!response.ok) throw new Error("Failed to fetch mangas");

        const data = await response.json();
        setMangas(data);
        setFilteredMangas(data);
      } catch (err) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    if (name && type) fetchMangas();
  }, [name, type]);

  const categories = ["All", ...new Set(mangas.flatMap((m) => m.categories || []))];

  const handleFilter = (category) => {
    setSelectedCategory(category);
    filterMangas(search, category);
  };

  const handleSearch = (value) => {
    setSearch(value);
    filterMangas(value, selectedCategory);
  };

  const filterMangas = (searchText, category) => {
    setFilteredMangas(
      mangas.filter((manga) => {
        const matchesSearch = manga.title.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = category === "All" || (manga.categories || []).includes(category);
        return matchesSearch && matchesCategory;
      })
    );
  };

  return (
    <section
      className="relative min-h-screen text-white"
      style={{
        backgroundImage: "url('/assets/Mangas.jpg')",
        backgroundColor: "#1a1a1a",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 text-center px-4 pt-12">
        <h1 className="text-2xl md:text-4xl font-bold">
          {type === "author" ? "Author" : "Company"}: {name}
        </h1>
        <div className="mt-4 flex justify-center">
          <SearchBar
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-white text-black"
          />
        </div>
      </div>

      <div className="mt-16 bg-white text-black rounded-t-[60px] md:rounded-t-xl shadow-2xl w-full sm:w-11/12 md:w-3/4 mx-auto z-20 relative px-4 sm:px-10 md:px-20 pb-10 pt-8">
        {loading && (
          <p className="text-center text-gray-500 animate-pulse">Loading mangas...</p>
        )}

        {error && (
          <p className="text-center text-red-500">Error: {error}</p>
        )}

        {!loading && !error && mangas.length > 0 && (
          <>
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={handleFilter}
            />
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-12 py-10 max-w-5xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredMangas.map((manga) => (
                <MangaCard key={manga._id} manga={manga} />
              ))}
            </motion.div>
          </>
        )}

        {!loading && !error && mangas.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-xl text-gray-600 mt-10 mb-20"
          >
            <p className="inline-block px-6 py-3 bg-purple-100 text-purple-800 rounded-full shadow-md">
              😕 No mangas found for this {type}.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AuthorCompany;
