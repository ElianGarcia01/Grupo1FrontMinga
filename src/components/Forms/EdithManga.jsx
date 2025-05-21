import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCategories } from "../../../redux/categorySlice"; // thunk
import { fetchMangas } from "../../../redux/mangaSlice";
import { toast } from "react-toastify";
import { API_URL } from "../../../data/url"; 

export default function MangaEditForm() {
  const { id: mangaId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [initLoad, setInitLoad] = useState(true);


    // Al montar componente: disparar fetch de mangas, categorías y capítulos
    useEffect(() => {
      dispatch(fetchMangas());
    }, [dispatch]);

  // Traer categorías desde Redux
  const { all: categories, loading: catLoad } = useSelector((s) => s.categories);

  // Traer mangas desde Redux (ajusta 'all' si usas otro nombre en el slice)
  const allMangas = useSelector((s) => s.mangas?.all || []);

  // Buscar el manga por su ID (puede venir como string o como _id)
  const manga = allMangas.find((m) => m._id === mangaId || m.id === mangaId);

  const [form, setForm] = useState({
    title: "",
    category_id: "",
    cover_photo: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Precargar categorías y el manga si está disponible
useEffect(() => {
  dispatch(fetchCategories());

  if (manga) {
    setForm({
      title:        manga.title        ?? "",
      category_id:  manga.category_id  ?? "",
      cover_photo:  manga.cover_photo  ?? "",
      description:  manga.description  ?? "",
    });
    setInitLoad(false);
  } else if (!initLoad && allMangas.length > 0) {
    setMsg("Manga not found.");
  }
}, [dispatch, manga, allMangas, initLoad]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const token = localStorage.getItem("token");
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

      toast.success("Manga edited successfully!");
      setTimeout(() => navigate("/manager/"))
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!manga) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Manga not found or not loaded yet.</p>
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
