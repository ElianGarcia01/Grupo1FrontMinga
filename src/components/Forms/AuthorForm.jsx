export default function AuthorForm() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-purple-100">
      {/* Tarjeta */}
      <div className="w-full max-w-md rounded-none sm:rounded-3xl bg-white
                      shadow-none sm:shadow-xl ring-0 sm:ring-1 sm:ring-black/5 overflow-hidden">

        {/* Cabecera: se oculta en móviles */}
        <div className="hidden sm:block relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_60%)]" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 rounded-full bg-gray-200 ring-4 ring-white flex items-center justify-center text-3xl text-gray-400">
              📚
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="pt-14 sm:pt-14 pb-10 px-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            New Author
          </h2>

          <form className="space-y-6">
            {[
              { placeholder: "Lucas Ezequiel" },
              { placeholder: "Silva" },
              { placeholder: "Caseros, Buenos Aires" },
              { placeholder: "28/12/2022", type: "date" },
              { placeholder: "URL Profile Image" },
            ].map((field, i) => (
              <div key={i} className="relative">
                <input
                  {...field}
                  className="peer w-full bg-transparent border-b-2 border-gray-300 py-2
                             placeholder-transparent focus:outline-none focus:border-indigo-500 transition"
                />
                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all
                                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                  peer-placeholder-shown:top-2 peer-focus:-top-3.5
                                  peer-focus:text-sm peer-focus:text-indigo-600">
                  {field.placeholder}
                </label>
              </div>
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
