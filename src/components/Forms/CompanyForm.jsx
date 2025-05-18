export default function CompanyForm() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-purple-100">
      {/* Tarjeta */}
      <div className="w-full max-w-md rounded-none sm:rounded-3xl bg-white
                      shadow-none sm:shadow-xl ring-0 sm:ring-1 sm:ring-black/5 overflow-hidden">

        {/* Cabecera con avatar: oculta en móviles */}
        <div className="hidden sm:block relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_60%)]" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 rounded-full bg-gray-200 ring-4 ring-white flex items-center justify-center text-3xl text-gray-400">
              🏢
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="pt-14 sm:pt-14 pb-10 px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">New Company</h2>

          <form className="space-y-6">
            {[
              "Name",
              "Website",
              "URL Profile Image",
              "Description",
            ].map((placeholder, i) => (
              <input
                key={i}
                type="text"
                placeholder={placeholder}
                className="w-full border-b-2 border-gray-300 bg-transparent py-2
                           px-1 focus:outline-none focus:border-indigo-500 transition"
              />
            ))}

            <button
              type="submit"
              className="mt-4 w-full py-3 rounded-full
                         bg-gradient-to-r from-indigo-500 to-purple-600 text-white
                         font-semibold tracking-wide shadow-md hover:brightness-110
                         active:brightness-95 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
