"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function TimelineClient({ events }) {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-12 py-20">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-[6px] h-full bg-gradient-to-b from-yellow-300 via-orange-400 to-yellow-500 rounded-full shadow-[0_0_20px_rgba(255,185,0,0.6)] z-0" />
      <AnimatePresence>
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={event.id}
              className={`relative z-5 w-full sm:w-1/2 px-4 mb-16 ${isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:ml-auto"}`}
              initial={{ opacity: 0, rotateX: -90, scale: 0.95 }}
              whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              <div className="relative bg-white/80 backdrop-blur-md rounded-xl p-6 border border-orange-200 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-xl transition-shadow duration-300">
                <span className="text-xs uppercase tracking-wider text-orange-500 font-semibold">
                  {event.date}
                </span>
                <h3 className="mt-1 text-lg sm:text-xl font-bold text-gray-800">
                  {event.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {event.description}
                </p>
                {event.personalities?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Персоны:
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {event.personalities.map((person, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {person.image ? (
                            <Image
                              src={person.image}
                              alt={person.name}
                              width={36}
                              height={36}
                              className="rounded-full ring-2 ring-orange-300 object-cover"
                            />
                          ) : (
                            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
                              ?
                            </div>
                          )}
                          <span className="text-sm text-gray-700">
                            {person.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <motion.div
                className="absolute top-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 border-4 border-white shadow-lg"
                style={{
                  left: isLeft ? "100%" : undefined,
                  right: isLeft ? undefined : "100%",
                  transform: "translateY(-50%)",
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
