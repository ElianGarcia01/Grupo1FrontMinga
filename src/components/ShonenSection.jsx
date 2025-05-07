import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ShonenSection() {
  const shonenData = [
    {
      id: 1,
      title: "Shingeki no Kyojin",
      coverImage: "/assets/erenyImage.png",
      logoImage: "/assets/ShingekiImage.webp",
      description:
        "Is the manga that is aimed at adolescent boys. They are stories with young amusing characters, in which humorous situations often occur. The main plot line revolves around members of a collective or a combat team such as...",
    },
    {
      id: 2,
      title: "My Hero Academia",
      coverImage: "/assets/dekuImage.webp",
      logoImage: "/assets/MYHERO.png",
      description:
        "Follow the story of Izuku Midoriya, a boy born without superpowers in a world where they have become commonplace. With the help of the world's greatest hero, All Might, he enrolls in a prestigious hero academy to achieve his dream.",
    },
    {
      id: 3,
      title: "Demon Slayer",
      coverImage: "/assets/tanjiroImage.png",
      logoImage: "/assets/kimetsu.webp",
      description:
        "Tanjiro Kamado's peaceful life is shattered when his family is slaughtered by demons. His sister Nezuko is the sole survivor, but she has been transformed into a demon herself. Together they embark on a quest to cure her and avenge their family.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shonenData.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? shonenData.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 800);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: (direction) => ({
      x: direction === "right" ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    }),
  };

  const backgroundVariants = {
    blue: { backgroundColor: "#2563eb" },
    indigo: { backgroundColor: "#4f46e5" },
    purple: { backgroundColor: "#7e22ce" },
  };

  const backgroundColors = ["blue", "indigo", "purple"];
  const currentItem = shonenData[currentIndex];

  const Indicators = () => (
    <div className="flex justify-center space-x-3 mt-6">
      {shonenData.map((_, index) => (
        <motion.div
          key={index}
          className={`h-3 w-3 rounded-full cursor-pointer ${
            index === currentIndex ? "bg-white" : "bg-white/40"
          }`}
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (isAnimating || index === currentIndex) return;
            setIsAnimating(true);
            setDirection(index > currentIndex ? "right" : "left");
            setCurrentIndex(index);
            setTimeout(() => setIsAnimating(false), 800);
          }}
        />
      ))}
    </div>
  );

  return (
    <section className="bg-white py-16 px-4 flex flex-col justify-center items-center overflow-hidden">
      <motion.div
        key={`container-${currentIndex}`}
        className="rounded-2xl p-4 md:p-8 max-w-6xl w-full text-white shadow-xl relative"
        animate={backgroundColors[currentIndex % backgroundColors.length]}
        variants={backgroundVariants}
        transition={{ duration: 0.8 }}
        style={{ minHeight: "340px" }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-5"
          animate={{ 
            scale: [1, 1.3, 1], 
            rotate: [0, 90, 0],
            x: [0, 20, 0],
            y: [0, -20, 0] 
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full opacity-5"
          animate={{ 
            scale: [1, 1.5, 1], 
            x: [0, 50, 0],
            y: [0, 30, 0]  
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute top-24 left-24 w-16 h-16 bg-white rounded-full opacity-5"
          animate={{ 
            scale: [1, 1.4, 1], 
            x: [0, -30, 0],
            rotate: [0, -60, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center gap-4 z-10 relative h-full"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Cover Image with enhanced animation */}
            <motion.div
              className="flex justify-center items-center md:justify-end"
              initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
              animate={{ 
                opacity: 1, 
                rotate: 0, 
                scale: 1,
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 1,
                y: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }
              }}
            >
              <img
                src={currentItem.coverImage}
                alt={currentItem.title}
                className="w-32 md:w-40 lg:w-48 drop-shadow-2xl"
              />
            </motion.div>

            {/* Content container with adjusted spacing */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 px-2 md:px-0 md:pr-6">
              {/* Logo with pulse animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 0.8,
                  scale: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }
                }}
                className="shrink-0"
              >
                <motion.img
                  src={currentItem.logoImage}
                  alt={`${currentItem.title} Logo`}
                  className="w-24 md:w-28 lg:w-32 drop-shadow-xl"
                  whileHover={{ rotate: [-2, 2, -2, 2, 0], transition: { duration: 0.5 } }}
                />
              </motion.div>

              {/* Text content with staggered animation */}
              <div className="flex flex-col justify-center text-center md:text-left gap-2">
                <motion.h2
                  className="text-xl md:text-2xl font-bold"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.3, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200 
                  }}
                >
                  {currentItem.title}
                </motion.h2>
                <motion.p
                  className="text-sm md:text-base leading-snug"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.5, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 120
                  }}
                >
                  {currentItem.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Improved Navigation Arrows */}
        <div className="absolute inset-x-0 top-1/2 flex justify-between items-center px-4 -mt-6 z-20">
          <motion.button
            onClick={prevSlide}
            className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.9 }}
            disabled={isAnimating}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            &lt;
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.9 }}
            disabled={isAnimating}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            &gt;
          </motion.button>
        </div>
      </motion.div>

      <Indicators />
    </section>
  );
}