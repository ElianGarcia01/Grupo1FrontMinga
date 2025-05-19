import { useState } from "react";

// Formulario para registrar Autores

// Guarda el estado de los campos
// Envía la data al endpoint /api/authors/register con JWT en header
// Muestra feedback de carga y mensaje de éxito / error

export default function AuthorForm() {
  // Campos del formulario
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    city: "",
    country: "",
    date_birth: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);

  // mensaje de éxito o error
  const [msg, setMsg] = useState("");

  //  Actualiza un campo (name, lastName, etc.)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  //  Envía el formulario al backend protegido con JWT

  const handleSubmit = async (e) => {
    e.preventDefault(); // evita recarga de la página
    setLoading(true); // activa spinner / deshabilita botón
    setMsg(""); // limpia mensajes previos

    try {
      const token = localStorage.getItem("token"); // JWT guardado del login
      const res = await fetch("http://localhost:8080/api/authors/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // header que es requerido por passport-jwt
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // errores 4xx/5xx
        const err = await res.json();
        throw new Error(err?.message || "Error al registrar autor");
      }

      setMsg("Author successfully created 🎉");
      // resetea campos
      setForm({
        name: "",
        lastName: "",
        city: "",
        country: "",
        date_birth: "",
        photo: "",
      });
    } catch (err) {
      setMsg(err.message); // muestra error del backend
    } finally {
      setLoading(false); // reactiva botón
    }
  };

  return (
    /* fondo blanco en móvil y degradado en escritorio  */
    <div
      className="min-h-screen flex items-center justify-center px-4
                    bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-purple-100"
    >
      {/* Tarjeta contenedora */}
      <div
        className="w-full max-w-md rounded-none sm:rounded-3xl bg-white
                      shadow-none sm:shadow-xl ring-0 sm:ring-1 sm:ring-black/5 overflow-hidden"
      >
        {/* Cabecera decorativa */}
        <div className="hidden sm:block relative h-20 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_60%)]" />
          {/* Avatar circular centrado */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 rounded-full bg-gray-200 ring-4 ring-white flex items-center justify-center text-3xl text-gray-400">
              📚
            </div>
          </div>
        </div>

        {/* cuerpo del formulario */}
        <div className="pt-14 sm:pt-14 pb-10 px-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            New Author
          </h2>

          {/* mensaje de feedback */}
          {msg && (
            <p className="text-center mb-4 text-sm text-indigo-600">{msg}</p>
          )}

          {/* ----------- formulario ----------- */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Cada <Input /> es un campo con label flotante */}
            <Input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
            />

            <Input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />

            <Input
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
            />

            {/* Fecha de nacimiento */}
            <Input
              name="date_birth"
              type="date"
              value={form.date_birth}
              onChange={handleChange}
            />

            {/* URL de foto */}
            <Input
              name="photo"
              placeholder="URL Profile Image (.jpg / .png / .webp)"
              value={form.photo}
              onChange={handleChange}
            />

            {/* botón de envío */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full py-3 rounded-full
                         bg-gradient-to-r from-indigo-500 to-purple-600 text-white
                         font-semibold tracking-wide shadow-md hover:brightness-110
                         active:brightness-95 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

//  Input con label flotante reutilizable
//  - Usa la API de “peer” de Tailwind para animar el label
//  - Acepta todos los props de un <input/textarea> estándar

function Input(props) {
  return (
    <div className="relative">
      <input
        {...props}
        className="peer w-full bg-transparent border-b-2 border-gray-300 py-2
                   placeholder-transparent focus:outline-none focus:border-indigo-500 transition"
      />
      <label
        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all
                        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-placeholder-shown:top-2 peer-focus:-top-3.5
                        peer-focus:text-sm peer-focus:text-indigo-600"
      >
        {props.placeholder}
      </label>
    </div>
  );
}
