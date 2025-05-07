import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import Drawer from "./Drawer";

const Navbar = ({ reverse = false }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-4 z-40">
        {reverse ? (
          <>
            {/* Logo a la izquierda */}
            <Link to="/">
              <img
                src="/assets/logo1.png"
                alt="Logo"
                className="h-10 w-auto cursor-pointer"
              />
            </Link>

            {/* Menú a la derecha */}
            <button
              onClick={() => setOpen(true)}
              className="text-indigo-600 bg-white p-2 rounded-md shadow hover:bg-indigo-100 transition"
            >
              <HiMenuAlt3 size={24} />
            </button>
          </>
        ) : (
          <>
            {/* Menú a la izquierda */}
            <button
              onClick={() => setOpen(true)}
              className="text-indigo-600 bg-white p-2 rounded-md shadow hover:bg-indigo-100 transition"
            >
              <HiMenuAlt3 size={24} />
            </button>

            {/* Logo a la derecha */}
            <Link to="/">
              <img
                src="/assets/logo1.png"
                alt="Logo"
                className="h-10 w-auto cursor-pointer"
              />
            </Link>
          </>
        )}
      </nav>

      <Drawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
