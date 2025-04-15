"use client";
import { motion } from "framer-motion";

const EventCard = ({ event }) => {
  return (
    <motion.div
      className="bg-white h-48 shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        scale: 1.05,
      }}
    >
      <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
      <p className="text-gray-600">{event.date}</p>
      <p className="mt-4 text-gray-800">{event.description}</p>
    </motion.div>
  );
};

export default EventCard;
