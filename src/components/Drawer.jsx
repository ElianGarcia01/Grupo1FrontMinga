import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const Drawer = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const [animateItems, setAnimateItems] = useState(false);

  // Controla la animación de los elementos del menú
  useEffect(() => {
    if (open) {
      // Retrasa la animación para que empiece cuando el drawer ya esté abierto
      const timer = setTimeout(() => {
        setAnimateItems(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAnimateItems(false);
    }
  }, [open]);

  return (
    <>
      {/* Superposición glassmorphism con efecto de desenfoque */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-800/20 to-blue-900/30 backdrop-blur-sm z-40 transition-all duration-500 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer con animaciones mejoradas */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white shadow-2xl transform transition-all duration-500 ease-in-out z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Elemento decorativo */}
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-indigo-300 to-purple-400 opacity-60"></div>
        
        {/* Cabecera con información del usuario */}
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/20">
          <div className="flex items-center gap-3">
            {user?.photo ? (
              <div className="relative">
                {/* Fondo animado para la foto del usuario */}
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
              {/* Correo o estado de sesión */}
              <span className="text-sm font-medium break-all line-clamp-1">
                {user?.email || "No has iniciado sesión"}
              </span>
              {/* Etiqueta para usuario autenticado */}
              {user && (
                <span className="text-xs text-indigo-200">Cuenta de usuario</span>
              )}
            </div>
          </div>
          {/* Botón para cerrar el drawer */}
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-300"
          >
            <HiX size={20} className="text-white/90" />
          </button>
        </div>

        {/* Navegación con animación escalonada */}
        <nav className="px-6 py-6 space-y-1">
          {[
            { to: "/", label: "Home", always: true },
            { to: "/mangas", label: "Mangas", requiresAuth: true },
            { to: "/signUp", label: "Register", requiresGuest: true },
            { to: "/signIn", label: "Log In", requiresGuest: true },
            { to: "/panel", label: "Admin Panel", requiresAuth: true },
            { to: "/favourites", label: "Favourites", requiresAuth: true },
            { to: "/newrol", label: "Become Author", requiresAuth: true },
          ].map((item, index) => {
            // Solo mostrar elementos según estado de usuario
            if ((item.requiresAuth && !user) || (item.requiresGuest && user)) {
              return null;
            }
            
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `
                  relative overflow-hidden group flex items-center px-4 py-3 rounded-lg
                  transition-all duration-300 ease-in-out
                  ${isActive ? 'bg-white/15 text-white' : 'hover:bg-white/10 text-white/80 hover:text-white'}
                  transform ${animateItems ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                  transition-all delay-${index * 100}
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Fondo animado al pasar el mouse */}
                <div className="absolute inset-0 w-0 bg-white/10 group-hover:w-full transition-all duration-300 ease-in-out"></div>
              </NavLink>
            );
          })}
          
          {/* Botón de cerrar sesión con animación */}
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
                transform ${animateItems ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
              `}
              style={{ transitionDelay: '350ms' }}
            >
              <span className="relative z-10">Log out</span>
              {/* Fondo animado al pasar el mouse */}
              <div className="absolute inset-0 w-0 bg-white/10 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </button>
          )}
        </nav>

        {/* Elemento decorativo en el pie del drawer */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-900 to-transparent opacity-60"></div>
      </div>
    </>
  );
};

export default Drawer;
