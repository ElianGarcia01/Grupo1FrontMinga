import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../../services/roles";
import { useAuth } from "../../../hook/useAuth";

export default function CompanyForm() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.photo) {
      setPhoto(user.photo);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCompany({ name, website, photo, description });
      navigate("/");
    } catch (error) {
      console.error("Error creating company:", error.response?.data || error);
      alert("There was an error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100">
      <div className="bg-white p-6 rounded-2xl w-full max-w-sm text-center shadow-md">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full" />
        </div>
        <h2 className="text-xl font-semibold mb-6">New Company</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <input
            type="text"
            placeholder="URL Profile Image"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-full font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
