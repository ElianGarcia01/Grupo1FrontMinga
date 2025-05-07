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
    <ul className="px-4 space-y-4 mt-6">
      <li className="hover:bg-white hover:text-indigo-600 p-2 rounded cursor-pointer"><NavLink to="" >Home</NavLink></li>
      <li className="hover:bg-white hover:text-indigo-600 p-2 rounded cursor-pointer"><NavLink to="signUp">Register</NavLink></li>
      <li className="hover:bg-white hover:text-indigo-600 p-2 rounded cursor-pointer"><NavLink to="signIn">Log In</NavLink></li>
    </ul>
  </div>
);

export default Drawer;
