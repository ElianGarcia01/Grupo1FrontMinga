/* UserProfileEdit.jsx - Versión actualizada siguiendo el patrón de MangaEditForm */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

import AlertSave from "./AlertSave";
import AlertDelete from "./AlertDelete";

/* utilidades de estilo (Tailwind) */
const inputClasses = "w-full border-b border-gray-400 p-2 mb-4 text-sm text-black focus:outline-none placeholder-gray-500";
const btnSave = "w-[280px] h-[68px] bg-emerald-400 hover:bg-emerald-500 text-white font-semibold py-2 rounded-full mb-4";
const btnDelete = "w-[280px] h-[68px] bg-red-100 hover:bg-red-200 text-red-500 font-semibold py-2 rounded-full";

export default function UserProfileEdit() {
  const { user } = useAuth();
  const navigate = useNavigate();

  /* --- estados del formulario --- */
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    city: "",
    photo: "",
    date_birth: ""
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [initLoad, setInitLoad] = useState(true);
  const [errors, setErrors] = useState({});

  /* ---------- cargar datos iniciales ---------- */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Si existe user.author úsarlo, si no, usar los campos de user
    const data = user.author ?? user;

    setForm({
      name: data.name || "",
      lastName: data.lastName || "",
      city: data.city || "",
      photo: data.photo || "",
      date_birth: data.date_birth ? data.date_birth.slice(0, 10) : ""
    });
    setInitLoad(false);
  }, [user, navigate]);

  /* ---------- validar datos ---------- */
  const validateForm = () => {
    const newErrors = {};
    
    // Validar URL de imagen
    if (form.photo && !form.photo.match(/\.(jpeg|jpg|png|webp)$/i)) {
      newErrors.photo = "La imagen debe terminar con .jpg, .jpeg, .png o .webp";
    }
    
    try {
      if (form.photo) new URL(form.photo);
    } catch (e) {
      newErrors.photo = "URL no válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- guardar cambios ---------- */
  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setMsg("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const payload = { 
        ...form,
        _id: user._id // Asegurarnos de enviar el ID del usuario
      };

      const res = await fetch("http://localhost:8080/api/authors/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al actualizar perfil");
      }

      // Actualización exitosa
      setMsg("Perfil actualizado correctamente");
      setTimeout(() => window.location.reload(), 1500); // Recargar para ver cambios
    } catch (err) {
      setMsg(err.message);
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- eliminar cuenta ---------- */
  const confirmDelete = async () => {
    if (!window.confirm("¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer.")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`http://localhost:8080/api/authors/delete/${user._id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al eliminar cuenta");
      }

      // Eliminación exitosa
      localStorage.clear();
      navigate("/");
    } catch (err) {
      setMsg(err.message);
      console.error("Delete error:", err);
    }
  };

  /* ---------- manejar cambios en el formulario ---------- */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  if (initLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="flex flex-col md:flex-row gap-12 max-w-4xl w-full">
        {/* -------- vista previa -------- */}
        <div className="order-1 md:order-2 w-full md:w-[396px] flex flex-col items-center text-center">
          <img
            src={form.photo.trim() || "https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?semt=ais_hybrid&w=740"}
            alt="Profile"
            className="w-[180px] h-[180px] object-cover rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold text-black">
            {form.name || form.lastName ? `${form.name} ${form.lastName}` : "Nombre no especificado"}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            <i className="fa-solid fa-location-dot mr-1" />
            {form.city || "Ciudad no especificada"}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            <i className="fa-solid fa-lock mr-1" />
            {form.date_birth || "Fecha de nacimiento no especificada"}
          </p>
        </div>

        {/* -------- formulario de edición -------- */}
        <form onSubmit={handleSave} className="order-2 md:order-1 flex-1">
          {msg && (
            <p className={`text-center mb-4 text-sm ${
              msg.includes("Error") ? "text-red-500" : "text-green-500"
            }`}>
              {msg}
            </p>
          )}

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Nombre"
          />

          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Apellido"
          />

          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Ciudad"
          />

          <input
            type="date"
            name="date_birth"
            value={form.date_birth}
            onChange={handleChange}
            className={inputClasses}
          />

          <input
            type="text"
            name="photo"
            value={form.photo}
            onChange={handleChange}
            className={`${inputClasses} mb-2`}
            placeholder="URL de la imagen de perfil"
          />
          {errors.photo && (
            <p className="text-red-500 text-xs mb-4">{errors.photo}</p>
          )}

          <div className="flex flex-col items-center">
            <button
              type="submit"
              disabled={loading}
              className={`${btnSave} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm("¿Estás seguro de eliminar tu cuenta?")) {
                  confirmDelete();
                }
              }}
              className={btnDelete}
            >
              Eliminar cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}