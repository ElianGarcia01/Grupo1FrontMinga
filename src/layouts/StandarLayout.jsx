import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function StandarLayout() {
  const location = useLocation();
  const showFooter = location.pathname === "/" || location.pathname === "/mangas";

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        {showFooter && <Footer />}
      </div>
    </>
  );
}
