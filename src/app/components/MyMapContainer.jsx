'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Modal from './Modal'

function MyMapComponent({ events }) {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedEvent, setSelectedEvent] = useState(null)
	const [modalVisible, setModalVisible] = useState(false)

	const handleMarkerClick = (event) => {
		setSelectedEvent(event)
		setModalVisible(true)
	}

	const closeModal = () => {
		setModalVisible(false)
		setSelectedEvent(null)
	}

	return (
		<div className="flex w-[100vw] flex-col items-center justify-center bg-gray-100 min-h-screen">
			<input
				type="text"
				placeholder="Поиск событий..."
				className="mb-4 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<div id='map' className="relative w-full aspect-[16/9] bg-cover bg-center">
				<AnimatePresence>
					{events.map((event) => (
						<motion.div
							key={event.id}
							onClick={() => handleMarkerClick(event)}
							className="absolute cursor-pointer rounded-full bg-red-500 w-6 h-6 transform -translate-x-3 -translate-y-3 transition transform hover:scale-125"
							style={{
								left: `${(event.coords.lng) * (100 / 360)}%`,
								top: `${(event.coords.lat) * (100 / 180)}%`,
							}}
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							transition={{ duration: 0.3 }}
						/>
					))}
				</AnimatePresence>
			</div>

			<Modal isVisible={modalVisible} onClose={closeModal} event={selectedEvent} />
		</div>
	)
}

export default MyMapComponent
