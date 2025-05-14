// components/EventFilterClient.tsx
"use client";
import { useState } from "react";

export default function EventFilterClient({ onFilter }) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    onFilter({ date, category });
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex space-x-2">
        <input
          type="date"
          className="border rounded px-2 py-1"
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          className="border rounded px-2 py-1"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Все категории</option>
          <option value="Историческое">Исторические</option>
          <option value="Политическое">Политические</option>
          <option value="Культурное">Культурные</option>
        </select>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white rounded px-4 py-1"
        >
          Применить фильтры
        </button>
      </div>
    </div>
  );
}
