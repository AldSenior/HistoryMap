import { motion } from 'framer-motion'

const PersonCard = ({ person }) => {
	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
		hover: { scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" },
	}

	const imageVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1 },
	}

	const textVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	}

	return (
		<motion.div
			className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto my-4 transition-transform"
			variants={cardVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
			whileHover="hover"
		>
			<motion.img
				src={person.image}
				alt={person.name}
				className="rounded-lg mb-4 w-full h-64 object-cover"
				variants={imageVariants}
				initial="hidden"
				animate="visible"
			/>
			<motion.h3
				className="text-2xl font-bold mb-2"
				variants={textVariants}
				initial="hidden"
				animate="visible"
				transition={{ delay: 0.1 }}
			>
				{person.name}
			</motion.h3>
			<motion.p
				className="text-gray-700 mb-2"
				variants={textVariants}
				initial="hidden"
				animate="visible"
				transition={{ delay: 0.2 }}
			>
				{person.description}
			</motion.p>
			<motion.p
				className="text-gray-500 mb-1"
				variants={textVariants}
				initial="hidden"
				animate="visible"
				transition={{ delay: 0.3 }}
			>
				Дата рождения: {person.birthDate}
			</motion.p>
			<motion.p
				className="text-gray-500 mb-4"
				variants={textVariants}
				initial="hidden"
				animate="visible"
				transition={{ delay: 0.4 }}
			>
				Дата смерти: {person.deathDate}
			</motion.p>
			<motion.h4
				className="font-semibold mt-4 mb-2"
				variants={textVariants}
				initial="hidden"
				animate="visible"
				transition={{ delay: 0.5 }}
			>
				Достижения:
			</motion.h4>
			<motion.ul className="list-disc list-inside">
				{person.achievements.map((achievement, index) => (
					<motion.li
						key={index}
						className="text-gray-600"
						variants={textVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.6 + index * 0.1 }} // Анимация достижения с задержкой
					>
						{achievement}
					</motion.li>
				))}
			</motion.ul>
		</motion.div>
	)
}

export default PersonCard
