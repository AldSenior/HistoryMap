"use client";
import { motion } from "framer-motion";
import { useActionState } from "react";
import { urezpers } from "../events";

export default function EventPopup({ isVisible, onSubmit, onCancel }) {
  const [state, handleSubmit, isPending] = useActionState(
    async (_prevState, formData) => {
      const title = formData.get("title")?.toString() || "";
      if (!title.trim()) {
        return { error: "Название события не может быть пустым." };
      }
      const newEventData = {
        title,
        date: formData.get("date")?.toString() || "",
        description: formData.get("description")?.toString() || "",
        category: formData.get("category")?.toString() || "",
        personalities: formData.getAll("personalities"),
      };
      onSubmit(newEventData);
      return { error: null };
    },
    { error: null },
  );

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onCancel}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-md border border-orange-200 p-5 sm:p-6 rounded-xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center font-['Playfair_Display']">
          Новое событие
        </h2>
        {state.error && (
          <p className="text-red-500 text-sm mb-2">{state.error}</p>
        )}
        <form action={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            name="title"
            placeholder="Название события*"
            className="p-2 sm:p-3 border border-orange-200 rounded-lg bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
            required
          />
          <input
            type="text"
            name="date"
            placeholder="Дата (например, 23 февраля 1917)"
            className="p-2 sm:p-3 border border-orange-200 rounded-lg bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
          />
          <textarea
            name="description"
            placeholder="Описание"
            className="p-2 sm:p-3 border border-orange-200 rounded-lg bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 h-20 sm:h-24 placeholder-gray-500"
          />
          <input
            type="text"
            name="category"
            placeholder="Категория"
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
                  name="personalities"
                  value={person.id}
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
              disabled={isPending}
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
