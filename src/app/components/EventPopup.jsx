"use client";

import { motion } from "framer-motion";
import { urezpers } from "../events"; // Убедитесь, что путь корректен
import { useState } from "react";

function EventPopup({ isVisible, onSubmit, onCancel }) {
  // Убрал coordinates, т.к. не используется
  const [newEventData, setNewEventData] = useState({
    title: "",
    date: "",
    description: "",
    category: "",
    personalities: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEventData.title.trim()) {
      // Добавил trim() для проверки
      alert("Название события не может быть пустым."); // Простое уведомление
      return;
    }
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
    // ... (без изменений)
  };

  if (!isVisible) return null; // Убрал coordinates из условия

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]" // Добавлен фон и центрирование
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onCancel} // Закрытие по клику на фон
    >
      <motion.div
        className="bg-white/90 backdrop-blur-md border border-orange-200 p-5 sm:p-6 rounded-xl shadow-xl w-full max-w-md" // Изменена ширина
        style={
          {
            // left: "50%", // Удалено, так как центрируется через flex родителя
            // top: "50%",
            // transform: "translate(-50%, -50%)",
          }
        }
        initial={{ opacity: 0, scale: 0.9 }} // Немного изменил анимацию
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
        onClick={(e) => e.stopPropagation()} // Предотвращение закрытия при клике на само модальное окно
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center font-['Playfair_Display']">
          Новое событие
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Название события*"
            value={newEventData.title}
            onChange={(e) =>
              setNewEventData({ ...newEventData, title: e.target.value })
            }
            className="p-2 sm:p-3 border border-orange-200 rounded-lg bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
            required
          />
          <input
            type="text"
            placeholder="Дата (например, 23 февраля 1917)"
            // ... (остальные инпуты аналогично)
            className="p-2 sm:p-3 border border-orange-200 rounded-lg bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
          />
          <textarea
            placeholder="Описание"
            // ...
            className="p-2 sm:p-3 border border-orange-200 rounded-lg bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 h-20 sm:h-24 placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Категория"
            // ...
            className="p-2 sm:p-3 border border-orange-200 rounded-lg bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
          />
          <div className="flex flex-col gap-1 sm:gap-2 max-h-28 sm:max-h-32 overflow-y-auto border p-2 rounded-md bg-white/50">
            <p className="text-sm font-semibold text-gray-700 mb-1">Персоны:</p>
            {urezpers.map((person) => (
              <label
                key={person.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  // ...
                  className="w-4 h-4 text-orange-400 focus:ring-orange-400 border-gray-300 rounded"
                />
                <span className="text-xs sm:text-sm text-gray-700">
                  {person.name}
                </span>
              </label>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
            <motion.button
              type="submit"
              className="flex-1 p-2 sm:p-3 bg-[#D4A017] text-white rounded-lg font-semibold hover:bg-yellow-500 transition-shadow shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Сохранить
            </motion.button>
            <motion.button
              type="button"
              onClick={onCancel}
              className="flex-1 p-2 sm:p-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-shadow shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Отмена
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default EventPopup;
