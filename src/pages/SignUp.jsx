import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import signUpImage from "/assets/SignUp.jpg";
import MingaM from "/assets/inga.png";
import "../css/SignUpStyles.css";
import GoogleSignUpButton from "../components/GoogleSignUpButton";

const SignUpForm = () => {
  return (
    <div className="w-full h-full flex items-center bg-white">
      <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center items-center">
        {/* Logo Minga */}
        <div>
          <img
            src={MingaM}
            alt="Minga"
            className="bg-gradient-to-r from-violet-700 to-blue-400 w-40"
          />
        </div>

        {/* Formulario Sign Up */}
        <form
          // onSubmit={handleSubmit}
          className="bg-white px-8 py-2 w-full max-w-sm"
        >
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
            Welcome!
          </h2>

          <p className="text-md mb-4 text-center text-gray-800">
            Discover manga, manhua and manhwa, track your progress, have fun,
            read manga
          </p>

          {/* Input email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full pr-10 pl-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
          </div>

          {/* Input photo */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Photo</label>
            <div className="relative">
              <input
                type="url"
                className="w-full pr-10 pl-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://example.com/photo.jpg"
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <FontAwesomeIcon icon={faImage} />
              </span>
            </div>
          </div>

          {/* Input password */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full pr-10 pl-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="********"
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <FontAwesomeIcon icon={faLock} />
              </span>
            </div>
          </div>

          {/* Checkbox Send Notifications */}
          <div className="mb-4 flex items-center text-sm">
            <input type="checkbox" id="sendNotifications" className="mr-2" />
            <label htmlFor="sendNotifications" className="text-gray-800">
              Send notification to my email
            </label>
          </div>

          {/* Boton Sign Up */}
          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2
          px-4 rounded-xl transition duration-300 cursor-pointer mb-4"
          >
            Sign Up
          </button>

          {/* Boton Google */}
          <GoogleSignUpButton />

          {/* Enlace para redirigir al formulario de Sign in */}
          <p className="mt-6 text-center text-md text-gray-600">
            You don't have an account?
            <Link
              to="/signUp"
              className="text-blue-500 font-bold hover:underline ms-2"
            >
              Sign Up here
            </Link>
          </p>

          {/* Enlace para redirigir a la pagina Home */}
          <p className="mt-2 text-center text-md text-gray-600">
            Go back to
            <Link
              to="/signUp"
              className="text-blue-500 font-bold hover:underline ms-2"
            >
              Home Page
            </Link>
          </p>
        </form>
      </div>
  {/* Fondo Sign Up en pantallas grandes */}
  <div 
    className="hidden md:block md:w-1/2 min-h-screen fixed right-0 top-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${signUpImage})`, zIndex: 0 }}
  ></div>

  {/* Sombra violeta */}
  <div 
    className="hidden md:block violet-shadow fixed right-0 top-0 w-1/2 h-full"
    style={{ zIndex: 1 }}
  ></div>
    </div>
  );
};

export default SignUpForm;
