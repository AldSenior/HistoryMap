import { motion } from "framer-motion";

const PersonCard = ({ person, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.4)",
      borderColor: "#D4A017",
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, filter: "sepia(1)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "sepia(0)",
      transition: { duration: 0.8 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative bg-[#F5F5DC] shadow-xl rounded-xl p-6 max-w-sm w-full h-full min-h-[28rem] flex flex-col mx-auto my-6 border-2 border-[#D4A017] overflow-hidden
        before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAB5JREFUCB1jYGBg+A8E4oECoP4fIGBgYGBgYGBgYAAAAA8L8f0AAAAASUVORK5CYII=')] before:opacity-10 before:pointer-events-none"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      whileHover="hover"
    >
      <motion.img
        src={person.image}
        alt={person.name}
        className="rounded-lg mb-4 w-full h-64 object-contain bg-white p-2"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      />

      <motion.h3
        className="text-2xl font-bold mb-2 text-[#1C2526] font-['Playfair_Display'] tracking-tight line-clamp-2"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        {person.name}
      </motion.h3>
      <motion.p
        className="text-[#1C2526] mb-3 font-['Roboto'] text-base leading-relaxed line-clamp-2 flex-1"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        {person.description}
      </motion.p>
      <motion.p
        className="text-[#B22222] mb-1 font-['Roboto'] text-sm"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        Дата рождения: {person.birthDate}
      </motion.p>
      <motion.p
        className="text-[#B22222] mb-4 font-['Roboto'] text-sm"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        Дата смерти: {person.deathDate}
      </motion.p>
      <motion.h4
        className="font-semibold mt-4 mb-2 text-[#1C2526] font-['Playfair_Display'] text-lg"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        Достижения:
      </motion.h4>
      <motion.ul className="list-disc list-inside space-y-1">
        {person.achievements.map((achievement, idx) => (
          <motion.li
            key={idx}
            className="text-[#1C2526] font-['Roboto'] text-sm line-clamp-1"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 + idx * 0.1 }}
          >
            {achievement}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default PersonCard;
