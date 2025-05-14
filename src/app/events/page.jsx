"use client";
import { AnimatePresence, motion } from "framer-motion";
import EventCard from "../components/EventCard"; // Убедитесь, что путь корректен
import { events } from "../events"; // Убедитесь, что путь корректен

const EventsPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.4 } },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#B22222] to-[#1C2526] bg-fixed bg-cover flex flex-col items-center justify-start p-4 py-8 sm:p-6 md:p-8 relative
        before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAB5JREFUCB1jYGBg+A8E4oECoP4fIGBgYGBgYGBgYAAAAA8L8f0AAAAASUVORK5CYII=')] before:opacity-10 before:pointer-events-none before:bg-fixed"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#D4A017] mb-8 sm:mb-10 mt-6 sm:mt-8 text-center tracking-tight">
        События Революции 1917
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl w-full">
        <AnimatePresence>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="h-full"
              variants={cardVariants}
              initial="hidden"
              // animate="visible" // Можно использовать whileInView для анимации при скролле
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Анимация сработает один раз, когда 30% карточки видно
              exit="exit"
              transition={{ delay: index * 0.1, duration: 0.6 }} // delay можно убрать если используется whileInView для каждой карточки индивидуально
              style={{ display: "flex" }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventsPage;
