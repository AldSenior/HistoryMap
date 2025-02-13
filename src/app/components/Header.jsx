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
    <header className="bg-gradient-to-r from-[#7e1b1b] to-red-900 text-white py-8 shadow-lg relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          className="text-5xl font-bold mb-3 transition-transform duration-300 hover:scale-105"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          Великая Русская Революция 1917 года
        </motion.h1>
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
                  className="relative inline-block text-lg transition duration-300 hover:text-yellow-300"
                >
                  <span className="relative z-10">{item.title}</span>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
                </Link>
              </li>
            ))}
          </motion.ul>
        </nav>
      </div>
      {/* Добавление стилизованных элементов, чтобы создать более интересный фон */}
      <div className="absolute inset-0 bg-red-900 opacity-30"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-32 w-32 bg-white opacity-25 rounded-full animate-pulse">
		<div id='serp' className='w-32 h-32 rounded-full animate-pulse'></div>
		</div>
      </div>
    </header>
  )
}

export default Header;
