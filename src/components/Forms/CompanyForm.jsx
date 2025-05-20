// ----------------------------- IMPORTS ---------------------------------
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------------- COMPONENTE PRINCIPAL --------------------------- */
export default function CompanyForm() {
  /* ------------------- ESTADOS LOCALES ------------------------------- */
  const [form, setForm] = useState({
    name: "",
    website: "",
    photo: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg,     setMsg]     = useState("");

  /* ------------------- Manejadores ----------------------------------- */
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      /* 1. Token actual (rol 0) para /companies/register */
      const oldToken = localStorage.getItem("token");

      /* 2. Petición */
      const res = await fetch("http://localhost:8080/api/companies/register", {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${oldToken}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || "Error al registrar compañía");
      }

      setMsg("Successfully created company 🎉");
      /* 3. Nuevo token + objeto Company que devuelve el back */
      const { token: newToken, response: company } = await res.json();

      /* acceder a usuario para cambiar el rol a 1 */
      let user = JSON.parse(localStorage.getItem("user"));
      user.role = 2;
      user.company = company

      /* Sustituir datos de sesión */
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(user));

      /* Redirigir al home */
      window.location.href = "/"

      /* 5. Feedback + reset */
      setMsg("Compañía creada con éxito 🎉");
      setForm({ name: "", website: "", photo: "", description: "" });
    navigate("/")
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    bg-white sm:bg-gradient-to-br sm:from-indigo-50 sm:to-purple-100">
      <div className="w-full max-w-md rounded-none sm:rounded-3xl bg-white
                      shadow-none sm:shadow-xl ring-0 sm:ring-1 sm:ring-black/5 overflow-hidden">

        {/* Cabecera decorativa */}
        <div className="hidden sm:block relative h-20 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_60%)]" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 rounded-full bg-gray-200 ring-4 ring-white flex items-center justify-center text-3xl text-gray-400">
              🏢
            </div>
          </div>
        </div>

        {/* Cuerpo del formulario */}
        <div className="pt-14 sm:pt-14 pb-10 px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">New Company</h2>

          {msg && <p className="mb-4 text-sm text-indigo-600">{msg}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input name="name"     placeholder="Name"
                   value={form.name}     onChange={handleChange} />

            <Input name="website"  placeholder="Website (https://...)"
                   value={form.website}  onChange={handleChange} />

            <Input name="photo"    placeholder="URL Profile Image (.jpg /.png /.webp)"
                   value={form.photo}    onChange={handleChange} />

            <Input as="textarea" rows={3}
                   name="description" placeholder="Description (10-500 chars)"
                   value={form.description} onChange={handleChange} />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full py-3 rounded-full
                         bg-gradient-to-r from-indigo-500 to-purple-600 text-white
                         font-semibold tracking-wide shadow-md hover:brightness-110
                         active:brightness-95 transition disabled:opacity-50">
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTE Input reutilizable ---------------------- */
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
