import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import signUpImage from "/assets/SignUp.jpg";
import MingaM from "/assets/inga.png";
// import GoogleSignUpButton from "../components/GoogleSignUpButton";
import "../css/SignUpStyles.css";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "../../hook/useAuth";
import { AuthContext } from "../../hook/AuthContext";
import { API_URL } from "../../data/url";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    photo: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(API_URL + "/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign up failed");
      }

      
      login(data.response.token, data.response.user);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full h-full bg-white">
      {/* Ocultar Navbar en mobile */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Formulario y logo */}
      <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center items-center px-4">
        <form onSubmit={handleSubmit} className="bg-white px-8 py-8 w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mt-6 mb-6">
            <img
              src={MingaM}
              alt="Minga"
              className="bg-gradient-to-r from-violet-700 to-blue-400 w-40"
            />
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-center text-gray-800">
            Welcome!
          </h2>

          <p className="text-sm md:text-md mb-8 text-center text-gray-600">
            Discover manga, manhua and manhwa, track your progress, have fun,
            read manga
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

          {/* Photo */}
          <div className="mb-4 text-sm md:text-md">
            <label className="block text-gray-700 mb-1">Photo</label>
            <div className="relative">
              <input
                type="url"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="https://example.com/photo.jpg"
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <FontAwesomeIcon icon={faImage} />
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="mb-4 text-sm md:text-md">
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

          {/* Checkbox */}
          <div className="mb-6 flex items-center text-xs md:text-sm">
            <input
              type="checkbox"
              id="sendNotifications"
              className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="sendNotifications" className="text-gray-800">
              Send notification to my email
            </label>
          </div>

          {/* Botón Sign up */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold
            py-2 px-4 rounded-lg transition duration-300 mb-4 cursor-pointer"
          >
            Sign up
          </button>

          {/* Google Button - comentado hasta implementar */}
          {/* <GoogleSignUpButton /> */}

          {/* Links */}
          <p className="mt-6 text-center text-sm md:text-md text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-indigo-600 font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
          <p className="mt-2 text-center text-sm md:text-md text-gray-600">
            Go back to{" "}
            <Link to="/" className="text-indigo-600 font-bold hover:underline">
              home page
            </Link>
          </p>
        </form>
      </div>

      {/* Fondo ilustrado del lado derecho */}
      <div
        className="hidden md:block md:w-1/2 min-h-screen fixed right-0 top-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${signUpImage})`, zIndex: 0 }}
      ></div>

      <div
        className="hidden md:block fixed right-0 top-0 w-1/2 h-full violet-shadow"
        style={{ zIndex: 1 }}
      ></div>
    </div>
  );
};

export default SignUpForm;
