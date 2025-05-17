import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import signInImage from "/assets/SignIn.jpg";
import MingaM from "/assets/inga.png";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "../../hook/useAuth";

const SignInForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      login(data.response.token, data.response.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-white relative">
      {/* Imagen lateral para md+ */}
      <div
        className="hidden md:block md:w-1/2 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${signInImage})` }}
      ></div>

      {/* Contenedor izquierdo (formulario + navbar) */}
      <div className="w-full md:w-1/2 flex flex-col relative z-10 bg-white">
        {/* Navbar */}
        <div className="w-full">
          <Navbar />
        </div>

        {/* Formulario */}
        <div className="flex flex-col justify-center items-center flex-1 px-4 py-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white px-8 py-8 w-full max-w-md"
          >
            {/* Logo */}
            <div className="flex justify-center mt-4 mb-6">
              <img
                src={MingaM}
                alt="Minga"
                className="bg-gradient-to-r from-violet-700 to-blue-400 w-40"
              />
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-center text-gray-800">
              Welcome back!
            </h2>

            <p className="text-sm md:text-md mb-8 text-center text-gray-600">
              Log in to discover manga, manhua and manhwa
            </p>

            {/* Error */}
            {error && (
              <div className="text-red-500 text-sm text-center mb-4">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="mb-4 text-sm md:text-md">
              <label className="block text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="you@example.com"
                  required
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="mb-6 text-sm md:text-md">
              <label className="block text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="********"
                  required
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-4 cursor-pointer"
            >
              Log In
            </button>

            {/* Links */}
            <p className="mt-6 text-center text-sm md:text-md text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 font-bold hover:underline"
              >
                Sign up
              </Link>
            </p>
            <p className="mt-2 text-center text-sm md:text-md text-gray-600">
              Go back to{" "}
              <Link
                to="/"
                className="text-indigo-600 font-bold hover:underline"
              >
                home page
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
