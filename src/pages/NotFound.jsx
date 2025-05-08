import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="h-screen w-full relative overflow-hidden font-stretch-normal">
      {/* Fondo animado */}
      <img
        src="/assets/error404.gif"
        alt="Running anime character"
        className="w-full h-full object-cover"
      />

      {/* Capa de oscurecimiento */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
        <h1 className="text-3xl md:text-5xl text-white font-bold drop-shadow-lg mb-4">
          Oops! Page Not Found
        </h1>

        <p className="text-lg text-gray-200 mb-6 drop-shadow-sm">
          The character is still searching for the path...
        </p>

        {/* Botón al home */}
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          Go back home 🏠
        </Link>

        {/* Spinner */}
        <div className="mt-8 w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </section>
  );
}
