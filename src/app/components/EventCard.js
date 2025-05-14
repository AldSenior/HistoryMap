"use client";
import { motion } from "framer-motion";

const EventCard = ({ event }) => {
  const cardVariants = {
    // ... (без изменений)
    hover: {
      scale: 1.03, // Немного уменьшил scale для более сдержанного эффекта
      rotate: 1, // Немного уменьшил rotate
      boxShadow: "0px 10px 25px rgba(212, 160, 23, 0.3)", // Тень с цветом акцента
      borderColor: "#D4A017",
      transition: { duration: 0.25 }, // Чуть быстрее
    },
  };

  const textVariants = {
    // ... (без изменений)
  };

  return (
    <motion.div
      className="relative bg-[#F5F5DC] shadow-xl rounded-xl p-4 sm:p-6 max-w-sm w-full h-full min-h-[18rem] sm:min-h-[20rem] flex flex-col border-2 border-[#D4A017] overflow-hidden
        before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAB5JREFUCB1jYGBg+A8E4oECoP4fIGBgYGBgYGBgYAAAAA8L8f0AAAAASUVORK5CYII=')] before:opacity-10 before:pointer-events-none"
      variants={cardVariants}
      initial="hidden" // Можно убрать, если родительский div в EventsPage использует whileInView
      animate="visible" // Можно убрать, если родительский div в EventsPage использует whileInView
      // exit="hidden" // Можно убрать
      whileHover="hover"
    >
      <motion.h2
        className="text-xl sm:text-2xl font-bold mb-2 text-[#1C2526] font-['Playfair_Display'] tracking-tight line-clamp-2"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        {event.title}
      </motion.h2>
      <motion.p
        className="text-[#B22222] mb-3 sm:mb-4 font-['Roboto'] text-xs sm:text-sm"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        {event.date}
      </motion.p>
      <motion.p
        // Добавил line-clamp для ограничения текста, если он слишком длинный
        className="text-[#1C2526] font-['Roboto'] text-base sm:text-lg leading-relaxed flex-1 line-clamp-5 sm:line-clamp-none"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        {event.description}
      </motion.p>
    </motion.div>
  );
};

export default EventCard;
