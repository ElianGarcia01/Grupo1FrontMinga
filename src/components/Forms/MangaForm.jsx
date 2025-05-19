import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/categorySlice";

// formulario para crear un Manga
export default function MangaForm() {
  // estado local del formulario
  const [form, setForm] = useState({
    title: "",
    category_id: "",
    cover_photo: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // categorías vía Redux
  const dispatch = useDispatch();
  const {
    all: categories,
    loading: catLoad,
    error: catErr,
  } = useSelector((s) => s.categories);

  /* dispara la petición una sola vez */
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // copia el valor de value dentro de form.category_id
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // submit envia el form con el category_id incluido
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const token = localStorage.getItem("token");
      const payloadJwt = JSON.parse(atob(token.split(".")[1])); // payload del JWT

      /* agrega author_id o company_id según el rol */
      const payload =
        payloadJwt.role === 1
          ? { ...form, author_id: payloadJwt.id }
          : { ...form, company_id: payloadJwt.id };

      const res = await fetch("http://localhost:8080/api/mangas/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || "Error al crear manga");
      }

      setMsg("Manga creado con éxito 🎉");
      setForm({ title: "", category_id: "", cover_photo: "", description: "" });
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-purple-100">
      <div className="w-full max-w-md rounded-none sm:rounded-3xl bg-white shadow-none sm:shadow-xl ring-0 sm:ring-1 sm:ring-black/5 overflow-hidden">
        {/* cabecera decorativa (oculta en móvil) */}
        <div className="hidden sm:block relative h-20 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_60%)]" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 rounded-full bg-gray-200 ring-4 ring-white flex items-center justify-center text-3xl text-gray-400">
              📖
            </div>
          </div>
        </div>

        {/* cuerpo */}
        <div className="pt-14 sm:pt-14 pb-10 px-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            New Manga
          </h2>

          {msg && (
            <p className="text-center mb-4 text-sm text-indigo-600">{msg}</p>
          )}
          {catErr && (
            <p className="text-center mb-4 text-sm text-red-600">{catErr}</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* título */}
            <Input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />

            {/* categoría (select flotante) */}
            <Select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              options={categories}
              label="Category"
              disabled={catLoad}
            />

            {/* cover */}
            <Input
              name="cover_photo"
              placeholder="URL Cover Image (.jpg/.png/.webp)"
              value={form.cover_photo}
              onChange={handleChange}
            />

            {/* descripción */}
            <Input
              as="textarea"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold tracking-wide shadow-md hover:brightness-110 active:brightness-95 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------- input/textarea flotante reutilizable ---------- */
function Input({ as = "input", ...props }) {
  const Component = as;
  return (
    <div className="relative">
      <Component
        {...props}
        className="peer w-full bg-transparent border-b-2 border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-indigo-500 transition"
      />
      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600">
        {props.placeholder}
      </label>
    </div>
  );
}

/* ---------- select flotante reutilizable ---------- */
function Select({ options, label, ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className="peer w-full bg-transparent border-b-2 border-gray-300 py-2 focus:outline-none focus:border-indigo-500"
      >
        <option value="" hidden />
        {options.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {opt.name}
          </option>
        ))}
      </select>
      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2">
        {label}
      </label>
    </div>
  );
}
