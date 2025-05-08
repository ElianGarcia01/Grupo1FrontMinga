export default function NotFound() {
    return (
      // Sección principal a pantalla completa con posición relativa y tipografía personalizada
      <section className="h-screen w-full relative overflow-hidden font-stretch-normal">
        
        {/* Fondo animado con un personaje de anime corriendo */}
        <img
          src="/assets/error404.gif"
          alt="Running anime character"
          className="w-full h-full object-cover"
        />
  
        {/* Capa de oscurecimiento encima del GIF para mayor contraste */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
  
        {/* Contenido centrado encima del fondo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
          
          {/* Título del error */}
          <h1 className="text-3xl md:text-5xl text-white font-bold drop-shadow-lg mb-4">
            Oops! Page Not Found
          </h1>
  
          {/* Mensaje descriptivo */}
          <p className="text-lg text-gray-200 mb-6 drop-shadow-sm">
            The character is still searching for the path...
          </p>
  
          {/* Indicador de carga animado tipo spinner */}
          <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }
  