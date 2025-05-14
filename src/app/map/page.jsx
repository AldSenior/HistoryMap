"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MyMapComponent from "../components/MyMapContainer";
import { events } from "../events";

const MapPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState(events);

  useEffect(() => {
    let filtered = events || [];
    if (selectedCategory !== "all") {
      filtered = filtered.filter((e) => e.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter((e) =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredMarkers(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#300000] via-[#111111] to-[#1C2526] text-white p-6 sm:p-10">
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-[#D4A017] text-center font-['Playfair_Display'] mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Интерактивная карта событий
      </motion.h1>

      <div className="flex flex-col sm:flex-row justify-center mb-6 gap-4">
        <motion.input
          type="text"
          placeholder="Поиск событий..."
          className="bg-white/80 backdrop-blur-md text-gray-800 px-4 py-2 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          whileFocus={{ scale: 1.02 }}
        />
        <motion.select
          className="bg-white/80 backdrop-blur-md text-gray-800 px-4 py-2 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          whileFocus={{ scale: 1.02 }}
        >
          <option value="all">Все события</option>
          <option value="Историческое">Исторические</option>
          <option value="Политическое">Политические</option>
          <option value="Культурное">Культурные</option>
        </motion.select>
      </div>

      <div className="w-full h-[600px] max-w-7xl mx-auto rounded-xl overflow-hidden shadow-2xl relative">
        <MyMapComponent events={filteredMarkers} />
      </div>
    </div>
  );
};

export default MapPage;
