"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";

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

export default function EventsClient({ events }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl w-full">
      <AnimatePresence>
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className="h-full"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            exit="exit"
            transition={{ delay: index * 0.05, duration: 0.6 }}
            style={{ display: "flex" }}
          >
            <EventCard event={event} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
