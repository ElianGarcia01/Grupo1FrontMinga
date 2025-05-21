import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  removeFavorite,
  clearError,
} from "../../redux/favoritesSlice";
import FavouriteCard from "../components/FavouriteCard";
import { motion } from "framer-motion";

export default function Favourites() {
  const dispatch = useDispatch();
  const {
    items: favorites,
    loading,
    error,
    lastRemoved,
  } = useSelector((state) => state.favorites);

  const [notification, setNotification] = useState(null);

  // Cargar favoritos al montar el componente
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  // Manejar notificaciones
  useEffect(() => {
    if (error) {
      setNotification({
        type: "error",
        message: error,
        visible: true,
      });
      dispatch(clearError());
    }

    if (lastRemoved) {
      setNotification({
        type: "success",
        message: "Removed from favorites",
        visible: true,
      });
      
      // Limpiar lastRemoved después de mostrar la notificación
      const timer = setTimeout(() => {
        dispatch(clearError()); // O una acción específica para resetear lastRemoved
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, lastRemoved, dispatch]);

  // Cerrar notificación manualmente
  const closeNotification = () => {
    setNotification(null);
  };

  const handleRemove = async (manga_id) => {
    try {
      await dispatch(removeFavorite(manga_id)).unwrap();
      // No necesitamos dispatch(fetchFavorites()) aquí porque el reducer ya actualiza el estado
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };
  return (
    <section
      className="relative h-[40vh] md:h-[80vh] flex items-center justify-center text-white overflow-visible"
      style={{
        backgroundImage: "url('/assets/Favourites.jpg')",
        backgroundColor: "#1a1a1a",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>
      <h1 className="text-3xl md:text-5xl font-bold">Favourites</h1>

      {/* Notificación personalizada */}
      {notification?.visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md shadow-lg z-50 flex items-center ${
            notification.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {notification.message}
          <button
            onClick={closeNotification}
            className="ml-4 text-lg font-bold hover:opacity-70"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* cuadro blanco */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2
        bg-white w-full sm:w-11/12 md:w-3/4 z-20 rounded-t-4xl md:rounded-xl shadow-2xl px-4
        sm:px-10 md:px-20 pb-10 pt-4 md:pt-8 text-black"
        style={{ top: "75%" }}
      >
        {loading && (
          <div className="text-center py-10">
            <p>Loading favorites...</p>
          </div>
        )}

        {/* Manga Grid */}
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4
            md:px-12 py-10 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {favorites
              .filter((fav) => fav.manga_id !== null)
              .map((favorite) => (
                <FavouriteCard
                  key={favorite._id}
                  title={favorite.manga_id.title}
                  type={favorite.manga_id.category_id}
                  image={favorite.manga_id.cover_photo}
                  manga_id={favorite.manga_id._id}
                  onRemove={handleRemove}
                />
              ))}
          </motion.div>
        )}

        {/* No Results Message */}
        {!loading && !error && favorites.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-xl text-gray-600 mt-10 mb-20"
          >
            <p className="inline-block px-6 py-3 bg-purple-100 text-purple-800 rounded-full shadow-md">
              😕 You don't have any favorites yet.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
