import { useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import { motion } from "framer-motion";
import { FaFolderPlus, FaSearch } from "react-icons/fa";
import MineMangasCard from "../components/mineMangasCard";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../data/url.jsx";

// Spinner y Skeletons básicos
function Spinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className="flex justify-center gap-2 flex-wrap mb-6">
      {Array(5)
        .fill(null)
        .map((_, idx) => (
          <div
            key={idx}
            className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
          />
        ))}
    </div>
  );
}

export default function AuthorCompany() {
  const [mangas, setMangas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [companyName, setCompanyName] = useState("");
  const [loadingMangas, setLoadingMangas] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.company?.name) {
      setCompanyName(user.company.name);
    } else if (user?.author?.name) {
      setCompanyName(user?.author?.name);
    }
  }, []);

  useEffect(() => {
    const fetchMangasByUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL + "/mangas/byUser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch mangas");
        const data = await response.json();
        setMangas(data.response);
      } catch (error) {
        console.error("Error fetching mangas:", error.message);
      } finally {
        setLoadingMangas(false);
      }
    };

    fetchMangasByUser();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URL + "/categories/allCategories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.response);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredMangas = mangas.filter((manga) => {
    return (
      selectedCategory === "All" || manga.category_id?.name === selectedCategory
    );
  });

  const handleDeleteManga = (deletedMangaId) => {
    setMangas((prevMangas) =>
      prevMangas.filter((m) => m._id !== deletedMangaId)
    );
  };

  const categoryNames = ["All", ...categories.map((cat) => cat.name)];

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Hero */}
      <div
        className="min-h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/manager.jpg')" }}
      >
        <section className="flex flex-col items-center justify-end text-white pt-0 pb-48 px-4 min-h-screen">
          <h1 className="text-3xl md:text-5xl font-bold">
            {companyName ? `${companyName}` : "My Mangas"}
          </h1>
        </section>
      </div>

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto -mt-40 bg-white text-black shadow-2xl rounded-t-[80px] md:rounded-t-[100px] px-4 sm:px-10 md:px-20 pb-10 pt-8 z-10 relative"
      >
        {/* Filtro de categorías */}
        {loadingCategories ? (
          <CategorySkeleton />
        ) : (
          <CategoryFilter
            categories={categoryNames}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        )}

        {/* Botón nuevo manga */}
        <div className="flex justify-end my-6">
          <button
            onClick={() => navigate("/newManga")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold cursor-pointer py-3 px-6 rounded-full shadow-lg transition duration-300"
          >
            <FaFolderPlus className="inline-block" /> New Manga
          </button>
        </div>

        {/* Tarjetas o loading */}
        {loadingMangas ? (
          <Spinner />
        ) : filteredMangas.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-12 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredMangas.map((manga) => (
              <MineMangasCard
                key={manga._id}
                manga={manga}
                categories={categories}
                onDelete={handleDeleteManga}
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
                No mangas found in this category.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try selecting a different one.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
