"use client";

import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { urezpers } from "../events";
import { useState } from "react";
function EventPopup({ isVisible, coordinates, onSubmit, onCancel }) {
  const [newEventData, setNewEventData] = useState({
    title: "",
    date: "",
    description: "",
    category: "",
    personalities: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEventData.title) return;
    onSubmit(newEventData);
    setNewEventData({
      title: "",
      date: "",
      description: "",
      category: "",
      personalities: [],
    });
  };

  const handlePersonalityChange = (id) => {
    setNewEventData((prev) => {
      const personalities = prev.personalities.includes(id)
        ? prev.personalities.filter((pId) => pId !== id)
        : [...prev.personalities, id];
      return { ...prev, personalities };
    });
  };

  if (!isVisible || !coordinates) return null;

  return createPortal(
    <motion.div
      className="fixed bg-white border border-gray-300 p-4 rounded-md shadow-md z-50"
      style={{
        left: "50%",
        top: "50%",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Название события"
          value={newEventData.title}
          onChange={(e) =>
            setNewEventData({ ...newEventData, title: e.target.value })
          }
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Дата (например, 23 февраля 1917)"
          value={newEventData.date}
          onChange={(e) =>
            setNewEventData({ ...newEventData, date: e.target.value })
          }
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Описание"
          value={newEventData.description}
          onChange={(e) =>
            setNewEventData({ ...newEventData, description: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Категория"
          value={newEventData.category}
          onChange={(e) =>
            setNewEventData({ ...newEventData, category: e.target.value })
          }
          className="p-2 border rounded"
        />
        <div className="flex flex-col gap-1 max-h-32 overflow-y-auto">
          <p className="text-sm font-semibold">Персоны:</p>
          {urezpers.map((person) => (
            <label key={person.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newEventData.personalities.includes(person.id)}
                onChange={() => handlePersonalityChange(person.id)}
              />
              {person.name}
            </label>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Сохранить
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 bg-gray-300 rounded"
          >
            Отмена
          </button>
        </div>
      </form>
    </motion.div>,
    document.body,
  );
}

export default EventPopup;
