import { HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const Drawer = ({ open, onClose }) => {
  const { user, logout } = useAuth();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-indigo-600 text-white transform transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
        <div className="flex items-center gap-3">
          {user?.photo && (
            <img
              src={user.photo}
              alt="User"
              className="w-8 h-8 rounded-full border border-white"
            />
          )}
          <span className="text-sm break-all">
            {user?.email || "Not logged in"}
          </span>
        </div>
        <button onClick={onClose}>
          <HiX size={24} />
        </button>
      </div>

      <nav className="px-4 space-y-4 mt-6">
        <NavLink
          to="/"
          onClick={onClose}
          className="hover:bg-white hover:text-indigo-600 p-2 rounded block"
        >
          Home
        </NavLink>
        {user && (
          <NavLink
            to="/mangas"
            onClick={onClose}
            className="hover:bg-white hover:text-indigo-600 p-2 rounded block"
          >
            Mangas
          </NavLink>
        )}

        {!user && (
          <>
            <NavLink
              to="/signUp"
              onClick={onClose}
              className="hover:bg-white hover:text-indigo-600 p-2 rounded block"
            >
              Register
            </NavLink>
            <NavLink
              to="/signIn"
              onClick={onClose}
              className="hover:bg-white hover:text-indigo-600 p-2 rounded block"
            >
              Log In
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink
              to="/panel"
              onClick={onClose}
              className="hover:bg-white hover:text-indigo-600 p-2 rounded block"
            >
              Admin Panel
            </NavLink>
            <NavLink
              to="/favourites"
              onClick={onClose}
              className="hover:bg-white hover:text-indigo-600 p-2 rounded block"
            >
              Favourites
            </NavLink>
            <NavLink
              to="/newrol"
              onClick={onClose}
              className="hover:bg-white hover:text-indigo-600 p-2 rounded block"
            >
              Rol
            </NavLink>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full text-left hover:bg-white hover:text-indigo-600 p-2 rounded block"
            >
              Log Out
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Drawer;
