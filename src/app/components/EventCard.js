// components/EventCard.tsx
import { motion } from "framer-motion";

export default function EventCard({ event }) {
  return (
    <div className="relative bg-[#F5F5DC] shadow-xl rounded-xl p-4 sm:p-6 max-w-sm w-full h-full min-h-[18rem] sm:min-h-[20rem] flex flex-col border-2 border-[#D4A017] overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/png;base64,...')] before:opacity-10 before:pointer-events-none">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-[#1C2526] font-['Playfair_Display'] tracking-tight line-clamp-2">
        {event.title}
      </h2>
      <p className="text-[#B22222] mb-3 sm:mb-4 font-['Roboto'] text-xs sm:text-sm">
        {event.date}
      </p>
      <p className="text-[#1C2526] font-['Roboto'] text-base sm:text-lg leading-relaxed flex-1 line-clamp-5 sm:line-clamp-none">
        {event.description}
      </p>
    </div>
  );
}
