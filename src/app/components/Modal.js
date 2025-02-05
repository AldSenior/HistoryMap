import { motion } from 'framer-motion'
import ReactDOM from 'react-dom'

function Modal({ isVisible, onClose, event }) {
	if (!isVisible || !event) return null

	const modalVariants = {
		hidden: { opacity: 0, y: -50 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -50 }
	}

	return ReactDOM.createPortal(
		<div className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] z-50'>
			<motion.div
				className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
				variants={modalVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<h2 className="text-2xl font-bold">{event.title}</h2>
				<p>Дата: {event.date}</p>
				<p className="mt-2">{event.description}</p>
				<p className="mt-1">Категория: {event.category}</p>

				<button onClick={onClose} className="mt-4 text-blue-500 hover:underline">Закрыть</button>
			</motion.div>
		</div>,
		document.body // Модальное окно монтируется в body
	)
}

export default Modal
