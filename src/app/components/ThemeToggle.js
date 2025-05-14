"use client";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 z-50 bg-yellow-500 text-black px-4 py-2 rounded shadow-lg hover:bg-yellow-400 transition"
    >
      {dark ? "Светлая тема" : "Тёмная тема"}
    </button>
  );
};

export default ThemeToggle;
