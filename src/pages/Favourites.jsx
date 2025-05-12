import FavouriteCard from "../components/FavouriteCard";
import { motion } from "framer-motion";

const mockMangas = [
  {
    title: "Naruto: And That's Why You're Disqualified!! #8",
    type: "Shōnen",
    image:
      "https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg",
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

export default function Favourites() {
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

      {/* cuadro blanco */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2
        bg-white w-full sm:w-11/12 md:w-3/4 z-20 rounded-t-4xl md:rounded-xl shadow-2xl px-4
        sm:px-10 md:px-20 pb-10 pt-4 md:pt-8 text-black"
        style={{ top: "75%" }}
      >
        {/* Manga Grid */}
        <motion.div
          className="className= grid grid-cols-1 md:grid-cols-2 gap-6 px-4
          md:px-12 py-10 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {mockMangas.map((manga, index) => (
            <FavouriteCard
              key={index}
              title={manga.title}
              type={manga.type}
              image={manga.image}
            />
          ))}
        </motion.div>

        {/* No Results Message */}
        {mockMangas.length === 0 && (
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
    </section>
  );
}
