
export default function Profile() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white overflow-visible"
      style={{
        backgroundImage: "url('/assets/profile.jpg')",
        backgroundColor: "#1a1a1a",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Titulo Principal */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight z-10">
        Profile
      </h1>

      {/* cuadro blanco */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2
        bg-white w-[95%] sm:w-11/12 md:w-3/4 z-20 rounded-xl shadow-2xl px-4 sm:px-10 md:px-20 pb-10"
        style={{ top: "75%" }}
      >
        {/* Informacion dentro del div blanco */}
        <div className="flex justify-center items-center w-full h-full">
            <p className="text-black text-2xl text-center">Cargando contenido...</p>
        </div>
      </div>
    </section>
  );
}
