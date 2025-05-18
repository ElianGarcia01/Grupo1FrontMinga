import newrol from "/assets/newrol.jpg";
import RoleSelector from "../components/roles.jsx";
import Navbar from "../components/Navbar.jsx";

const pageRol = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <div className="flex min-h-screen">
        {/* Formulario */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 z-10 relative">
          <RoleSelector />
        </div>

        {/* Imagen y superposición */}
        <div
          className="hidden md:flex md:w-1/2 bg-center relative"
          style={{ backgroundImage: `url(${newrol})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/40 to-transparent mix-blend-multiply"></div>

          <div className="absolute inset-0 bg-[rgba(67,56,202,0.15)]"></div>

          <div className="w-[555px] relative z-10 p-8 text-white max-w-xl px-16 pt-[150px]">
            <p className="text-white w-full text-[24px] mb-8 font-medium">
              Minga.com is the best place to find manga reviews. We've been super impressed by the quality of applicants.
            </p>

            <div className="text-start">
              <span className="inline-block text-white text-sm italic border-white pt-5">
                ----Ignacio Boraz
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pageRol;
