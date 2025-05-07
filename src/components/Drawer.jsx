import { HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Drawer = ({ open, onClose }) => (
  <div
    className={`fixed top-0 right-0 h-full w-64 bg-indigo-600 text-white transform transition-transform duration-300 z-30 ${
      open ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="flex items-center justify-between px-4 py-4">
      <div className="text-sm">mail@gmail.com</div>
      <button onClick={onClose}>
        <HiX size={24} />
      </button>
    </div>
    <nav className="px-4 space-y-4 mt-6">
      <NavLink
        to=""
        className="hover:bg-white w-full hover:text-indigo-600 p-2 rounded block"
      >
        Home
      </NavLink>
      <NavLink
        to="signUp"
        className="hover:bg-white hover:text-indigo-600 p-2 rounded block"
      >
        Register
      </NavLink>
      <NavLink
        to="signIn"
        className="hover:bg-white hover:text-indigo-600 p-2 rounded block"
      >
        Log In
      </NavLink>
    </nav>
  </div>
);

export default Drawer;
