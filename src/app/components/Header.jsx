'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import linkstit from "../header.json"

const Header = () => {
	const titleVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: { opacity: 1, y: 0 },
	}

	const textVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	}

	const navVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	}

	return (
		<header className="bg-gray-800 text-white py-8 shadow-md">
			<div className="max-w-5xl mx-auto text-center">
				<motion.h1
					className="text-5xl font-bold mb-3 transition-transform duration-300 hover:scale-105"
					variants={titleVariants}
					initial="hidden"
					animate="visible"
					transition={{ duration: 0.5 }}
				>
					Великая русская революция 1917 года
				</motion.h1>
				<motion.p
					className="text-xl mb-5 opacity-90"
					variants={textVariants}
					initial="hidden"
					animate="visible"
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					Исследуйте ключевые события, личности и идеи, которые сформировали историю России.
				</motion.p>
				<nav>
					<motion.ul
						className="flex justify-center space-x-8"
						variants={navVariants}
						initial="hidden"
						animate="visible"
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						{linkstit.map((item, index) => (
							<li key={index}>
								<Link
									href={item.link}
									className="relative inline-block text-lg transition duration-300 hover:text-blue-400"
								>
									<span className="relative z-10">{item.title}</span>
									<span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 transform scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
								</Link>
							</li>
						))}
					</motion.ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
