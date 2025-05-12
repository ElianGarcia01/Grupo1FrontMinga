import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import Drawer from "./Drawer";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-4 z-40">
        <button
          onClick={() => setOpen(true)}
          className="text-indigo-600 bg-white p-2 rounded-md shadow hover:bg-indigo-100 transition"
        >
          <HiMenuAlt3 size={24} />
        </button>
        <Link to="/">
          <img
            src="/assets/logo1.png"
            alt="Logo"
            className="h-10 w-auto cursor-pointer"
          />
        </Link>
      </nav>
      <Drawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
