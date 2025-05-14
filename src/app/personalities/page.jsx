"use client";

import { personalities } from "./personalities"; // Убедитесь, что путь корректен
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Предполагается, что PersonCard также адаптивен
const PersonCard = dynamic(() => import("../components/PersonCard"), {
  ssr: false,
});

const PersonalityPage = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#300000] via-[#111111] to-[#1C2526]">
        <div className="text-center text-[#D4A017] text-xl sm:text-2xl font-bold font-['Playfair_Display'] p-6">
          Загрузка личностей...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#300000] via-[#111111] to-[#1C2526] text-white p-4 py-8 sm:p-8 md:p-12 relative overflow-hidden">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D4A017] text-center font-['Playfair_Display'] mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Личности Революции 1917
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        <AnimatePresence>
          {personalities.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }} // exit можно оставить или убрать, если не используется при удалении
              viewport={{ once: false }} // false - анимация при каждом появлении, true - один раз
              transition={{ delay: index * 0.08, duration: 0.6 }}
              // className для обертки карточки, если PersonCard не имеет своих внешних стилей
            >
              <PersonCard person={person} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PersonalityPage;
