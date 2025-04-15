"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MyMapComponent from "../components/MyMapContainer";
import { events } from "../events";

const MapPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredMarkers, setFilteredMarkers] = useState(events);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredMarkers(events);
    } else {
      setFilteredMarkers(
        events.filter((marker) => marker.category === selectedCategory),
      );
    }
  }, [selectedCategory]);

  return (
    <div className="flex flex-col items-center">
      <motion.h1
        className="text-4xl font-bold my-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Интерактивная карта событий
      </motion.h1>
      <div className="mb-4">
        <select
          className="border  rounded-md p-2"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="all">Все события</option>
          <option value="Историческое">Исторические</option>
          <option value="Политическое">Политические</option>
          <option value="Культурное">Культурные</option>
        </select>
      </div>
      <div className="w-full h-96 rounded-lg shadow-lg relative">
        <MyMapComponent />
      </div>
    </div>
  );
};
export default MapPage;
