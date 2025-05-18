import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [authors, setAuthors] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar autores y compañías solo si el usuario es admin (role 3)
  const fetchUsers = async () => {
    if (!user || user.role !== 3) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const [resAuthors, resCompanies] = await Promise.all([
        axios.get("http://localhost:8080/users/allUsers?role=1", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/users/allUsers?role=2", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setAuthors(resAuthors.data.response || []);
      setCompanies(resCompanies.data.response || []);
    } catch (error) {
      toast.error("Error loading users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  // Actualizar estado local después de un toggle activo/inactivo
  const updateUserActiveStatus = (updatedUser) => {
    if (updatedUser.role === 1) {
      setAuthors((prev) =>
        prev.map((a) => (a._id === updatedUser._id ? updatedUser : a))
      );
    } else if (updatedUser.role === 2) {
      setCompanies((prev) =>
        prev.map((c) => (c._id === updatedUser._id ? updatedUser : c))
      );
    }
  };

  return (
    <UsersContext.Provider
      value={{ authors, companies, loading, fetchUsers, updateUserActiveStatus }}
    >
      {children}
    </UsersContext.Provider>
  );
};
