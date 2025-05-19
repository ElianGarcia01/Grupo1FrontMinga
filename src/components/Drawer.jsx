import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const Drawer = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setAnimateItems(true), 300);
      return () => clearTimeout(timer);
    } else {
      setAnimateItems(false);
    }
  }, [open]);

  const getVisibleItems = () => {
    const role = user?.role;

    return [
      { to: "/", label: "Home", always: true },
      { to: "/signUp", label: "Register", requiresGuest: true },
      { to: "/signIn", label: "Log In", requiresGuest: true },
      { to: "/mangas", label: "Mangas", requiresAuth: true, minRole: 0 }, // Usuarios con rol 0 o más
      { to: "/ranking", label: "Top Mangas", requiresAuth: true, minRole: 0 },
      {
        to: "/newRol",
        label: "Become Author or Company",
        requiresAuth: true,
        onlyForRole0: true,
      }, // Solo rol 0
      {
        to: "/profile",
        label: "Profile",
        requiresAuth: true,
        minRole: 1,
      }, // Solo rol 1,2,3
      {
        to: "/favourites",
        label: "Favourites",
        requiresAuth: true,
        minRole: 1,
      }, // Solo rol 1,2,3
      {
        to: "/newManga",
        label: "New Manga",
        requiresAuth: true,
        minRole: 1,
      }, // Solo rol 1,2,3
      {
        to: "/newChapter",
        label: "New Chapter",
        requiresAuth: true,
        minRole: 1,
      }, // Solo rol 1,2,3
      {
        to: "/panel",
        label: "Admin Panel",
        requiresAuth: true,
        adminOnly: true,
      }, // Solo admin rol 3
    ].filter((item) => {
      if (item.requiresAuth && !user) return false;
      if (item.requiresGuest && user) return false;
      if (item.adminOnly && role !== 3) return false;
      if (item.minRole !== undefined && (role == null || role < item.minRole))
        return false;
      if (item.onlyForRole0 && role !== 0) return false;
      return true;
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-800/20 to-blue-900/30 backdrop-blur-sm z-40 transition-all duration-500 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white shadow-2xl transform transition-all duration-500 ease-in-out z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-indigo-300 to-purple-400 opacity-60"></div>

        <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/20">
          <div className="flex items-center gap-3">
            {user?.photo ? (
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-50"></div>
                <img
                  src={user.photo}
                  alt="User"
                  className="relative w-10 h-10 rounded-full border-2 border-white/70 object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center">
                <span className="text-indigo-900 font-bold">
                  {user?.email?.charAt(0).toUpperCase() || "?"}
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium break-all line-clamp-1">
                {user?.email || "You are not logged in"}
              </span>
              {user && (
                <span className="text-xs text-indigo-200">User account</span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-300"
          >
            <HiX size={20} className="text-white/90" />
          </button>
        </div>

        <nav className="px-6 py-6 space-y-1">
          {getVisibleItems().map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `
                relative overflow-hidden group flex items-center px-4 py-3 rounded-lg
                transition-all duration-300 ease-in-out
                ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "hover:bg-white/10 text-white/80 hover:text-white"
                }
                transform ${
                  animateItems
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }
              `}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="relative z-10">{item.label}</span>
              <div className="absolute inset-0 w-0 bg-white/10 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </NavLink>
          ))}

          {user && (
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className={`
                w-full text-left cursor-pointer relative overflow-hidden group flex items-center px-4 py-3 rounded-lg
                transition-all duration-300 
                hover:bg-white/10 text-white/80 hover:text-white
                transform ${
                  animateItems
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }
              `}
              style={{ transitionDelay: "350ms" }}
            >
              <span className="relative z-10">Log out</span>
              <div className="absolute inset-0 w-0 bg-white/10 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </button>
          )}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-900 to-transparent opacity-60"></div>
      </div>
    </>
  );
};

export default Drawer;
