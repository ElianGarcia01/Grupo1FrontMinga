import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // useEffect que se encarga de detectar cambios en el tamaño de la ventana (resize)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth); // Actualiza el ancho en cada cambio de tamaño
    window.addEventListener("resize", handleResize); // Agrega el listener

    // Limpia el listener cuando el componente se desmonta
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Variable que define si esta en mobile (menor a 768px de ancho)
  const isMobile = windowWidth < 768;

  return (
    <section
      className="min-h-screen flex items-center justify-center text-white"
      style={{ 
        backgroundImage: "url('/assets/backgrounds.jpg')",
        backgroundColor: "#1a1a1a",

        // Cambia el tamaño del fondo dependiendo del dispositivo
        backgroundSize: isMobile ? 'cover' : '101%',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Capa oscura sobre la imagen */}
      <div className="absolute inset-0 bg-opacity-60"></div>

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }}   
        transition={{ duration: 1 }} 
      >
        {/* Título principal con tamaño responsivo */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Your favorite comic book store ✨
        </h1>

        {/* Texto descriptivo con tamaño adaptativo */}
        <p className="mt-4 text-base sm:text-lg md:text-xl max-w-xl mx-auto">
          Explore our catalog to live the adventure of your life
        </p>

        {/* Botón con animación al pasar el mouse y al hacer clic */}
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
