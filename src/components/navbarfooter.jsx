import { NavLink } from 'react-router-dom';
import inga from "/assets/inga.png";
import { FaFacebookF, FaTwitter, FaVimeoV, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NavBarFooter = () => {
  // Variants para animaciones con Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };
  
  const socialIconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
    hover: { 
      scale: 1.2, 
      transition: { duration: 0.2 } 
    }
  };

  return (
    <motion.div 
      className="w-full max-w-screen-xl mx-auto px-4 sm:px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Navigation and content container */}
      <div className="flex flex-col items-center">
        {/* Navigation and logo row */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side navigation */}
          <motion.div 
            className="w-full md:w-1/3 flex justify-center md:justify-start space-x-8"
            variants={itemVariants}
          >
            <NavLink 
              to="/" 
              className="text-sm font-medium text-black hover:text-violet-600 transition-colors"
            >
              <motion.span whileHover={{ scale: 1.1 }}>Home</motion.span>
            </NavLink>
            <NavLink 
              to="/mangas" 
              className="text-sm font-medium text-black hover:text-violet-600 transition-colors"
            >
              <motion.span whileHover={{ scale: 1.1 }}>Mangas</motion.span>
            </NavLink>
          </motion.div>
          
          {/* Center logo */}
          <motion.div 
            className="w-full md:w-1/3 flex justify-center"
            variants={itemVariants}
          >
            <motion.div 
              className="w-32 h-12 relative flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={inga} 
                alt="Inga Logo" 
                className="h-full object-contain bg-gradient-to-r from-violet-700 to-blue-400"
              />
            </motion.div>
          </motion.div>
          
          {/* Right side - Social and donate */}
          <motion.div 
            className="w-full md:w-1/3 flex flex-col items-center md:items-end space-y-4"
            variants={itemVariants}
          >
            {/* Social icons */}
            <div className="flex justify-center md:justify-end space-x-6">
              <motion.a 
                href="https://www.facebook.com/" 
                className="text-black hover:text-blue-600 transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
                target="_blank"
              >
                <FaFacebookF size={18} />
              </motion.a>
              <motion.a 
                href="https://x.com/" 
                className="text-black hover:text-blue-400 transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
                target="_blank"
              >
                <FaTwitter size={18} />
              </motion.a>
              <motion.a 
                href="https://vimeo.com/" 
                className="text-black hover:text-blue-500 transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
                target="_blank"
              >
                <FaVimeoV size={18} />
              </motion.a>
              <motion.a 
                href="https://www.youtube.com/" 
                className="text-black hover:text-red-600 transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
                target="_blank"
              >
                <FaYoutube size={18} />
              </motion.a>
            </div>
            
            {/* Donate button */}
            <motion.button 
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-2 rounded-full text-sm flex items-center justify-center gap-2 transition-colors w-36"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Donate <span className="text-white">♡</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NavBarFooter;