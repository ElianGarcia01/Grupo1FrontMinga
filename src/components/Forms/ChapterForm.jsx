import { useState } from "react";
import { useParams } from "react-router-dom";

/* ------------------------------------------------------------------
   Formulario para crear un Chapter
-------------------------------------------------------------------*/
export default function ChapterForm() {
  /* --- obtén el id del manga desde el path /mangas/:id/chapters/new --- */
  const { id: mangaId } = useParams();       // TODO: ajusta si lo recibes de otra vía

  /* --- estado de campos --- */
  const [form, setForm] = useState({
    title: "",
    order: "",
    cover_photo: "",
    pages: "",          // texto separado por comas
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  /* --- change genérico --- */
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* --- submit --- */
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const token = localStorage.getItem("token");

      /* transforma pages => array de strings sin espacios extra */
      const payload = {
        ...form,
        order: Number(form.order),
        pages: form.pages.split(",").map(p => p.trim()),
        manga_id: mangaId,
      };

      const res = await fetch(
        "http://localhost:8080/api/chapters/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || "Error al crear capítulo");
      }

      setMsg("Capítulo creado con éxito 🎉");
      setForm({ title: "", order: "", cover_photo: "", pages: "" });
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-purple-100">
      <div className="w-full max-w-md rounded-none sm:rounded-3xl bg-white
                      shadow-none sm:shadow-xl ring-0 sm:ring-1 sm:ring-black/5 overflow-hidden">

        {/* cabecera decorativa */}
        <div className="hidden sm:block relative h-20 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_60%)]" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 rounded-full bg-gray-200 ring-4 ring-white flex items-center justify-center text-3xl text-gray-400">
              📄
            </div>
          </div>
        </div>

        {/* cuerpo */}
        <div className="pt-14 sm:pt-14 pb-10 px-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            New Chapter
          </h2>

          {msg && (
            <p className="text-center mb-4 text-sm text-indigo-600">{msg}</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* título */}
            <Input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />

            {/* orden */}
            <Input
              name="order"
              type="number"
              placeholder="Order (1,2,3…)"
              value={form.order}
              onChange={handleChange}
            />

            {/* cover */}
            <Input
              name="cover_photo"
              placeholder="URL Cover Image (.jpg/.png/.webp)"
              value={form.cover_photo}
              onChange={handleChange}
            />

            {/* páginas */}
            <Input
              as="textarea"
              name="pages"
              placeholder="Pages URLs separated by commas"
              value={form.pages}
              onChange={handleChange}
              rows={3}
            />

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

/* ---------- input flotante reutilizable ---------- */
function Input({ as = "input", ...props }) {
  const Component = as;
  return (
    <div className="relative">
      <Component
        {...props}
        className="peer w-full bg-transparent border-b-2 border-gray-300 py-2
                   placeholder-transparent focus:outline-none focus:border-indigo-500 transition"
      />
      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all
                        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-placeholder-shown:top-2 peer-focus:-top-3.5
                        peer-focus:text-sm peer-focus:text-indigo-600">
        {props.placeholder}
      </label>
    </div>
  );
}
