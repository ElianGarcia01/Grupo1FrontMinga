import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
<<<<<<< HEAD
import axios from "axios";
import Swal from "sweetalert2";
=======

import AlertSave from "./AlertSave";
import AlertDelete from "./AlertDelete";
import { API_URL } from "../../data/url";
>>>>>>> 68369e5e6720e5b661be60ce1f358201d941ca35


const inputClasses =
  "w-full border-b border-gray-400 p-2 mb-4 text-sm text-black focus:outline-none placeholder-gray-500";
const btnSave =
  "w-[280px] h-[68px] bg-emerald-400 hover:bg-emerald-500 text-white font-semibold py-2 rounded-full mb-4";
const btnDelete =
  "w-[280px] h-[68px] bg-red-100 hover:bg-red-200 text-red-500 font-semibold py-2 rounded-full";

export default function UserProfileEdit() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    city: "",
    photo: "",
    date_birth: "",
  });

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const data = user.author ?? user;

    setForm({
      name: data.name || "",
      lastName: data.lastName || "",
      city: data.city || "",
      photo: data.photo || "",
      date_birth: data.date_birth ? data.date_birth.slice(0, 10) : "",
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



<<<<<<< HEAD
// Reemplaza alert del handleSave
const handleSave = async () => {
  try {
    await axios.put(
      "http://localhost:8080/api/authors/update",
      form,
      {
=======
      const payload = { ...form, _id: user.author._id };

      const res = await fetch(API_URL + "/authors/update", {
        method: "PUT",
>>>>>>> 68369e5e6720e5b661be60ce1f358201d941ca35
        headers: {
          Authorization: `Bearer ${token}`,
        },
<<<<<<< HEAD
=======
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Error al actualizar");

      const updatedUser = { ...user };
      updatedUser.author = {
        ...updatedUser.author,
        ...form
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMsg("Perfil actualizado correctamente");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setMsg(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!window.confirm("¿Estás seguro de eliminar tu cuenta?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(API_URL + `/authors/delete/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const newToken = res.data?.token;

      let updatedUser = JSON.parse(localStorage.getItem("user"));
      updatedUser.role = 0;
      delete updatedUser.author;

      localStorage.setItem("user", JSON.stringify(updatedUser));
      if (newToken) {
        localStorage.setItem("token", newToken);
>>>>>>> 68369e5e6720e5b661be60ce1f358201d941ca35
      }
    );

    const updatedUser = { ...user };
    updatedUser.author = {
      ...updatedUser.author,
      ...form,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    await Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Author profile updated successfully.",
      confirmButtonColor: "#10b981", // Emerald
    });

    window.location.href = "/";
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al actualizar el perfil del autor",
    });
  }
};

// Reemplaza confirm y alert del handleDelete
const handleDelete = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444", // Red
    cancelButtonColor: "#9ca3af", // Gray
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

  try {
    const authorId = user.author._id;
    const res = await axios.delete(
      `http://localhost:8080/api/authors/delete/${authorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const newToken = res.data?.token;

    let updatedUser = JSON.parse(localStorage.getItem("user"));
    updatedUser.role = 0;
    delete updatedUser.author;

    if (newToken) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    }

    localStorage.setItem("user", JSON.stringify(updatedUser));

    await Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Author profile deleted successfully.",
      confirmButtonColor: "#10b981",
    });

    window.location.href = "/";
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al eliminar el perfil del autor",
    });
  }
};


  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="flex flex-col md:flex-row gap-12 max-w-4xl w-full">
        <div className="order-1 md:order-2 w-full md:w-[396px] h-auto md:h-[276px] flex flex-col items-center text-center">
          <img
            src={
              form.photo.trim()
                ? form.photo
                : "https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?semt=ais_hybrid&w=740"
            }
            alt="Author"
            className="w-[180px] h-[180px] object-cover rounded-full mb-4"
          />
          <h3 className="font-[Roboto] font-normal text-xl leading-none tracking-normal text-center text-black">
            {form.name || "Author Name"} {form.lastName}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            <i className="fa-solid fa-location-dot mr-1" /> {form.city || "City"}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            <i className="fa-solid fa-calendar mr-1" /> {form.date_birth || "Birth Date"}
          </p>
        </div>

        <div className="w-[337px] h[453px] order-2 md:order-1 flex-1">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Name"
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Last Name"
          />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className={inputClasses}
            placeholder="City"
          />
          <input
            type="text"
            name="photo"
            value={form.photo}
            onChange={handleChange}
            className={inputClasses}
            placeholder="URL Author Photo"
          />
          <input
            type="date"
            name="date_birth"
            value={form.date_birth}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Date of Birth"
          />

          <div className="flex flex-col items-center w-full">
            <button onClick={handleSave} className={btnSave}>
              Save
            </button>
            <button onClick={handleDelete} className={btnDelete}>
              Delete Author Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
