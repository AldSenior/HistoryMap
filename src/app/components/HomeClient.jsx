"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import linkstit from "../header.json";
import { motion, AnimatePresence } from "framer-motion";
import { personalities } from "../personalities/personalities";
import { events } from "../events";

// Варианты анимаций
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
};

const featuredEvent = events[0];

export default function HomeClient() {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);
    import("framer-motion")
      .then((mod) => {
        if (!mod.motion || typeof mod.motion !== "function") {
          setError("Не удалось загрузить библиотеку анимаций");
        }
      })
      .catch((err) => {
        console.error("Framer-motion import failed:", err);
        setError("Не удалось загрузить библиотеку анимаций");
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-red-900 text-red-500 text-center pt-20">
        Ошибка: {error}
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-red-900 text-white text-center pt-20">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-red-900 text-gray-800 font-['Roboto']">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 pt-24">
        <motion.div
          className="absolute inset-0 bg-[url('/revfon.jpg')] bg-cover bg-center opacity-20 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto z-10">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-[#D4A017] mb-6 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            Революция 1917 года
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-white max-w-3xl mx-auto mb-8 leading-7 drop-shadow-md"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            Погрузитесь в эпоху, изменившую ход мировой истории. Исследуйте
            события, личности и хронологию Российской революции.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/timeline"
              className="inline-flex items-center px-8 py-4 bg-[#D4A017] text-black font-semibold rounded-lg shadow-md hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
              aria-label="Начать путешествие по хронологии революции"
            >
              Начать путешествие
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Event Section */}
      <section id="events" className="max-w-7xl mx-auto my-16 px-4 sm:px-6">
        <motion.h2
          className="text-3xl sm:text-4xl font-['Playfair_Display'] font-bold text-[#D4A017] mb-8 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Ключевое событие
        </motion.h2>
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#F5F5DC]/90 backdrop-blur-md rounded-xl p-8 border-2 border-[#D4A017] shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            role="region"
            aria-label="Ключевое событие революции"
          >
            <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
              <Image
                src={featuredEvent.image || "/febrev.webp"}
                alt={featuredEvent.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-['Playfair_Display'] font-semibold text-[#1C2526] mb-2">
                {featuredEvent.title}
              </h3>
              <p className="text-sm text-[#B22222] font-semibold mb-2">
                {featuredEvent.date}
              </p>
              <p className="text-[#1C2526] mb-4 text-sm sm:text-base">
                {featuredEvent.description}
              </p>
              <Link
                href="/events"
                className="inline-flex items-center px-6 py-2 bg-[#B22222] text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300"
                aria-label="Посмотреть все события революции"
              >
                Все события
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Interactive Map Preview */}
      <section id="mapsec" className="max-w-7xl mx-auto my-16 px-4 sm:px-6">
        <motion.h2
          className="text-3xl sm:text-4xl font-['Playfair_Display'] font-bold text-[#D4A017] mb-8 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Интерактивная карта
        </motion.h2>
        <motion.div
          className="relative h-64 sm:h-80 bg-[url('/RussianMap1914.webp')] bg-cover bg-center rounded-xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          role="region"
          aria-label="Предпросмотр интерактивной карты"
        >
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Link
              href="/map"
              className="inline-flex items-center px-6 py-3 bg-[#D4A017] text-black font-semibold rounded-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
              aria-label="Исследовать интерактивную карту"
            >
              Исследовать карту
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Personalities Preview */}
      <section id="figures" className="max-w-7xl mx-auto my-16 px-4 sm:px-6">
        <motion.h2
          className="text-3xl sm:text-4xl font-['Playfair_Display'] font-bold text-[#D4A017] mb-8 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Личности
        </motion.h2>
        <motion.p
          className="text-lg text-white max-w-3xl mx-auto mb-10 text-center leading-7"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Познакомьтесь с ключевыми фигурами, чьи действия определили ход
          революции 1917 года.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {personalities.slice(0, 3).map((person, i) => (
            <motion.div
              key={person.id}
              className="bg-[#F5F5DC]/90 backdrop-blur-md rounded-xl p-6 border-2 border-[#D4A017] shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full max-w-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              role="region"
              aria-label={`Личность ${person.name}`}
            >
              <div className="w-20 sm:w-24 h-20 sm:h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[#D4A017]">
                <Image
                  src={person.image}
                  alt={person.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg font-['Playfair_Display'] font-semibold text-[#1C2526] text-center">
                {person.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#1C2526] text-center mb-2">
                {person.birthDate} - {person.deathDate}
              </p>
              <p className="text-xs sm:text-sm text-[#1C2526] text-center">
                {person.description}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            href="/personalities"
            className="inline-flex items-center px-6 py-2 bg-[#B22222] text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300"
            aria-label="Посмотреть всех личностей революции"
          >
            Все личности
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* Quiz Preview */}
      <section id="quiz" className="max-w-7xl mx-auto my-16 px-4 sm:px-6">
        <motion.h2
          className="text-3xl sm:text-4xl font-['Playfair_Display'] font-bold text-[#D4A017] mb-8 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Викторина
        </motion.h2>
        <motion.p
          className="text-lg text-white max-w-3xl mx-auto mb-10 text-center leading-7"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Проверьте свои знания о революции 1917 года! Узнайте, кто возглавил
          Временное правительство или организовал Красную армию.
        </motion.p>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/quiz"
            className="inline-flex items-center px-8 py-4 bg-[#D4A017] text-black font-semibold rounded-lg shadow-md hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
            aria-label="Пройти викторину о революции"
          >
            Пройти викторину
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="max-w-7xl mx-auto my-16 px-4 pb-10 sm:px-6"
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-['Playfair_Display'] font-bold text-[#D4A017] mb-8 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          О проекте
        </motion.h2>
        <motion.p
          className="text-lg text-white max-w-3xl mx-auto mb-10 text-center leading-7"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Проект посвящён сохранению и популяризации истории Российской
          революции 1917 года.
        </motion.p>
      </section>
    </div>
  );
}
