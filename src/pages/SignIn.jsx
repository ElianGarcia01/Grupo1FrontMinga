import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import signInImage from "/assets/SignIn.jpg";
import MingaM from "/assets/inga.png";
import GoogleSignInButton from "../components/GoogleSignInButton";
import "../css/SignInStyles.css"

const SignInForm = () => {
  return (
    <div className="w-full h-full flex items-center bg-white">
      {/* Fondo Sign In en pantallas grandes */}
      <div
        className="hidden md:block violet-border w-1/2 min-h-screen bg-cover bg-center "
        style={{ backgroundImage: `url(${signInImage})`, zIndex: 0 }}
      ></div>
      
      <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center items-center">
        {/* Logo Minga */}
        <div>
          <img
            src={MingaM}
            alt="Minga"
            className="bg-gradient-to-r from-violet-700 to-blue-400 w-40"
          />
        </div>

        {/* Formulario Sign In */}
        <form
          // onSubmit={handleSubmit}
          className="bg-white px-8 py-6 w-full max-w-sm"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Welcome <span className="text-violet-700">back!</span>
          </h2>

          <p className="text-md mb-6 text-center text-gray-800">
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

          {/* Boton Login */}
          <button
            type="submit"
            className="w-full bg-violet-700 hover:bg-violet-900 text-white font-semibold py-2
          px-4 rounded-xl transition duration-300 cursor-pointer mb-4"
          >
            Login
            <FontAwesomeIcon icon={faRightToBracket} className="ms-2" />
          </button>

          {/* Boton Google */}
          <GoogleSignInButton />

          {/* Enlace para redirigir al formulario de registro */}
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
    </div>
  );
};

export default SignInForm;
