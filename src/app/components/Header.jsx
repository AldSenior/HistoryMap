"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import linkstit from "../header.json"; // Убедитесь, что путь к файлу корректен
import { useEffect, useState } from "react";
import { animate } from "animejs";
import Sickle from "../assets/sickle.svg"; // Убедитесь, что путь к файлу корректен
import Hammer from "../assets/hammer.svg"; // Убедитесь, что путь к файлу корректен

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Эффект для анимаций серпа и молота (animejs)
  useEffect(() => {
    animate(".sickle-svg", {
      translateX: [-100, 0],
      rotate: [-45, 0],
      duration: 1000,
      easing: "easeOutQuad",
      delay: 500,
    });

    animate(".hammer-svg", {
      translateX: [100, 0],
      rotate: [45, 0],
      duration: 1000,
      easing: "easeOutQuad",
      delay: 500,
    });

    animate([".sickle-svg", ".hammer-svg"], {
      scale: [1, 1.1, 1],
      duration: 200,
      delay: 1500,
      easing: "easeInOutSine",
    });
  }, []);

  // Эффект для закрытия мобильного меню при изменении размера окна на десктопный
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700) {
        // Tailwind CSS точка останова 'sm' (640px)
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Варианты анимации для мобильного меню (Framer Motion)
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <header className="relative bg-gradient-to-r from-[#B22222] to-[#1C2526] text-white py-6 md:py-10 shadow-2xl">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0 overflow-hidden">
        <div style={{ width: "200px", height: "200px", position: "relative" }}>
          <Image
            src={Sickle}
            alt="Sickle"
            width="100"
            height="100"
            className="sickle-svg absolute left-[50px] top-[50px]"
          />
          <Image
            src={Hammer}
            alt="Hammer"
            width="100"
            height="100"
            className="hammer-svg absolute left-[50px] top-[50px]"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center relative z-20 h-16 md:h-auto">
        {" "}
        {/* z-20 для основного контента хедера */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#D4A017] text-center md:text-left"
        >
          Великая Русская Революция 1917
        </motion.h1>
        {/* Десктопная навигация */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hidden md:flex md:space-x-6 text-lg font-['Roboto']"
        >
          {linkstit.map((item, i) => (
            <li key={i}>
              <Link href={item.link} className="relative group">
                <span className="relative z-10 text-[#F5F5DC] group-hover:text-[#D4A017] transition duration-300">
                  {item.title}
                </span>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#D4A017] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </li>
          ))}
        </motion.ul>
        {/* Кнопка-гамбургер */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-[#F5F5DC] hover:text-[#D4A017] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#D4A017] relative z-30" // z-30 для кнопки, чтобы она была выше меню
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-container"
            aria-label="Открыть главное меню"
          >
            <span className="sr-only">Открыть главное меню</span>
            {isMenuOpen ? (
              <svg // ВОССТАНОВЛЕНА ИКОНКА КРЕСТИКА
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg // ВОССТАНОВЛЕНА ИКОНКА ГАМБУРГЕРА
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Мобильное выпадающее меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu-container"
            className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-[#B22222] to-[#1C2526] shadow-xl z-10" // ВОССТАНОВЛЕН z-10 для выпадающего меню
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <ul className="flex flex-col items-stretch text-center space-y-1 py-3 font-['Roboto'] text-lg">
              {linkstit.map((item, i) => (
                <li key={i} className="w-full">
                  <Link
                    href={item.link}
                    className="relative group block py-3 px-4 transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10 text-[#F5F5DC] group-hover:text-[#D4A017] transition-colors duration-300">
                      {item.title}
                    </span>
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#D4A017] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
