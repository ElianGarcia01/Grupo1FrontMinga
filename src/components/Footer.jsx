import NavBarFooter from "./NavBarFooter";
import dragonballZ from "/assets/dragonballZ.jpg";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0F0F0F] relative mt-10">
      {/* Imagen decorativa con curva */}
      <div className="w-full relative overflow-hidden">
        <div className="w-full h-[180px] sm:h-[220px] md:h-[260px] relative">
          {/* Imagen animada */}
          <motion.img
            src={dragonballZ}
            alt="footer background"
            className="w-full h-full object-cover object-center"
            initial={{ scale: 1 }}
            whileInView={{ scale: 1.05 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />

          {/* Curva SVG */}
          <div className="absolute bottom-0 left-0 right-0 h-full">
            <svg
              className="absolute bottom-0 w-full"
              height="50%"
              preserveAspectRatio="none"
              viewBox="0 0 1440 200"
              fill="white"
              style={{
                filter: "drop-shadow(0px -2px 5px rgba(0,0,0,0.05))",
                marginBottom: "-1px",
              }}
            >
              <path d="M0,200 L0,100 Q720,200 1440,100 L1440,200 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="bg-white pt-4 pb-8">
        <NavBarFooter />
      </div>
    </footer>
  );
};

export default Footer;
