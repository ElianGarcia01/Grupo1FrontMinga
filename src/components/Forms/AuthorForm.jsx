import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAuthor } from "../../services/roles";
import { useAuth } from "../../../hook/useAuth";

export default function AuthorForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photo, setPhoto] = useState("");

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.photo) {
      setPhoto(user.photo);
    }
  }, [user]);

  // Regex to validate letters, spaces, tildes, apostrophes, hyphens
  const textRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!textRegex.test(name)) {
      alert("Name can only contain letters, spaces, apostrophes, and hyphens.");
      return;
    }
    if (!textRegex.test(lastName)) {
      alert("Last Name can only contain letters, spaces, apostrophes, and hyphens.");
      return;
    }
    if (!textRegex.test(city)) {
      alert("City can only contain letters, spaces, apostrophes, and hyphens.");
      return;
    }
    if (!textRegex.test(country)) {
      alert("Country can only contain letters, spaces, apostrophes, and hyphens.");
      return;
    }

    try {
      await createAuthor({
        name,
        lastName,
        city,
        country,
        date_birth: birthDate,
        photo,
      });

      // Update user role locally to "author" (1)
      setUser((prev) => ({ ...prev, role: 1 }));

      navigate("/");
    } catch (error) {
      console.error("Error creating author:", error.response?.data || error);
      if (error.response?.data?.message) {
        const msg = error.response.data.message;
        alert("Error: " + (Array.isArray(msg) ? msg.join(", ") : msg));
      } else {
        alert("There was an error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100">
      <div className="bg-white p-6 rounded-2xl w-full max-w-sm text-center shadow-md">
        <div className="flex justify-center mb-4">
          {photo ? (
            <img
              src={photo}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-full" />
          )}
        </div>
        <h2 className="text-xl font-semibold mb-6">New Author</h2>
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
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
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