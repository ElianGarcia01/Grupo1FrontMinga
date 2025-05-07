import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/backgrounds.jpg";
    img.onload = () => setImageLoaded(true);
    img.onerror = (e) => {
      console.error("Error loading background image:", e);
      setImageLoaded(false);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768; // puedes ajustar el breakpoint

  return (
    <section
      className="min-h-screen flex items-center justify-center text-white"
      style={{ 
        backgroundImage: imageLoaded ? "url('/assets/backgrounds.jpg')" : "none",
        backgroundColor: !imageLoaded ? "#1a1a1a" : "transparent",
        backgroundSize: isMobile ? 'cover' : '101%',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-opacity-60"></div>
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Your favorite comic book store ✨
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl max-w-xl mx-auto">
          Explore our catalog to live the adventure of your life
        </p>
        <motion.button
          className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500
          rounded-lg font-semibold text-white transition duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's go!
        </motion.button>
      </motion.div>
    </section>
  );
}
