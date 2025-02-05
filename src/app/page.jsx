'use client'
import { motion } from 'framer-motion'
const Home = () => {
  return (
    <div>
      <main className="py-10">
        <section id="events" className="max-w-5xl mx-auto my-10 px-4">
          <motion.h2
            className="text-3xl font-semibold mb-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            События
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Здесь мы будем обсуждать ключевые события, которые произошли в 1917 году.
          </motion.p>
        </section>

        <section className="max-w-5xl mx-auto my-10 px-4">
          <motion.h2
            className="text-3xl font-semibold mb-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Интерактивная карта
          </motion.h2>
          <motion.div
            className="h-64 bg-gray-200 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >

          </motion.div>
        </section>

        <section id="figures" className="max-w-5xl mx-auto my-10 px-4">
          <motion.h2
            className="text-3xl font-semibold mb-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Личности
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Узнайте о выдающихся личностях революции.
          </motion.p>
        </section>

        <section id="documents" className="max-w-5xl mx-auto my-10 px-4">
          <motion.h2
            className="text-3xl font-semibold mb-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Документы
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Здесь представлены архивные документы и материалы.
          </motion.p>
        </section>

        <section id="articles" className="max-w-5xl mx-auto my-10 px-4">
          <motion.h2
            className="text-3xl font-semibold mb-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            Статьи
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >

            Интересные статьи о событиях революции.
          </motion.p>
        </section>

        <section id="about" className="max-w-5xl mx-auto my-10 px-4">
          <motion.h2
            className="text-3xl font-semibold mb-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            О проекте
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            Узнайте больше о целях и задачах нашего проекта.
          </motion.p>
        </section>
      </main>
      <footer className="py-4 bg-gray-800 text-white text-center">
        {/* Содержимое подвала */}
      </footer>
    </div>
  )
}

export default Home
