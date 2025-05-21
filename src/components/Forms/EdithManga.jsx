// ----------------------------------------------------------------------
//  MangaEditForm.jsx   –   formulario para EDITAR un manga existente
//  ▸ Recupera el id del manga desde la URL   (/mangas/:id/edit)
//  ▸ Precarga los datos actuales (GET /api/mangas/:id) para mostrarlos
//  ▸ Permite modificar title, description, cover_photo y category_id
//  ▸ Envía los cambios con un  PUT  a  /api/mangas/update
// ----------------------------------------------------------------------
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { fetchCategories } from "../../../redux/categorySlice";   // thunk
import { API_URL } from "../../../data/url";

/* ----------------------------- COMPONENTE --------------------------- */
export default function MangaEditForm() {
  const { id: mangaId } = useParams();       // id del manga a editar
  const navigate        = useNavigate();

  /* --- Redux: categorías --- */
  const dispatch = useDispatch();
  const { all: categories, loading: catLoad } = useSelector(
    (s) => s.categories
  );

  /* --- estados del formulario --------------------------------------- */
  const [form, setForm]   = useState({
    title: "",
    category_id: "",
    cover_photo: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);   // <— botón / spinner
  const [msg, setMsg]       = useState("");        // mensajes éxito / error
  const [initLoad, setInitLoad] = useState(true);  // primera carga GET

  /* --------- carga inicial: categorías + datos del manga ------------ */
  useEffect(() => {
    dispatch(fetchCategories());

    const getMangaData = async () => {
      try {
        const res = await fetch( API_URL + `/mangas/${mangaId}`);
        if (!res.ok) throw new Error("Cannot fetch manga data");
        const data = await res.json();          // { response: manga }
        const m = data.response;
        setForm({
          title:        m.title        ?? "",
          category_id:  m.category_id  ?? "",
          cover_photo:  m.cover_photo  ?? "",
          description:  m.description  ?? "",
        });
      } catch (e) {
        setMsg(e.message);
      } finally {
        setInitLoad(false);
      }
    };

    getMangaData();
  }, [dispatch, mangaId]);

  /* ------------------- manejadores ---------------------------------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const token = localStorage.getItem("token");

      /* payload = campos + id del manga para que el back lo ubique */
      const payload = { ...form, _id: mangaId };

      const res = await fetch(API_URL + "/mangas/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || "Error updating manga");
      }

      setMsg("Manga actualizado ✔️");
      // opcional: redirigir al listado o detalles
      setTimeout(() => navigate(`/details/${mangaId}`), 1200);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------- UI ----------------------------------- */
  if (initLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-purple-100">
      <div className="w-full max-w-md rounded-none sm:rounded-3xl bg-white shadow-none sm:shadow-xl ring-0 sm:ring-1 sm:ring-black/5 overflow-hidden">
        <HeaderIcon />

        <div className="pt-14 sm:pt-14 pb-10 px-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Edit Manga
          </h2>

          {msg && (
            <p className="text-center mb-4 text-sm text-indigo-600">{msg}</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />

            <Select
              name="category_id"
              label="Category"
              value={form.category_id}
              onChange={handleChange}
              options={categories}
              disabled={catLoad}
            />

            <Input
              name="cover_photo"
              placeholder="URL Cover Image (.jpg/.png/.webp)"
              value={form.cover_photo}
              onChange={handleChange}
            />

            <Input
              as="textarea"
              name="description"
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold tracking-wide shadow-md hover:brightness-110 active:brightness-95 transition disabled:opacity-50"
            >
              {loading ? "Saving…" : "Save changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTES AUXILIARES ----------------------------- */
function HeaderIcon() {
  return (
    <div className="hidden sm:block relative h-20 bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_60%)]" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-20 h-20 rounded-full bg-gray-200 ring-4 ring-white flex items-center justify-center text-3xl text-gray-400">
          📝
        </div>
      </div>
    </div>
  );
}

function Input({ as = "input", ...props }) {
  const Component = as;
  return (
    <div className="relative">
      <Component
        {...props}
        className="peer w-full bg-transparent border-b-2 border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-indigo-500 transition"
      />
      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600">
        {props.placeholder || props.label}
      </label>
    </div>
  );
}

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
