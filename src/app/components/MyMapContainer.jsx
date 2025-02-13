'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Modal from './Modal'

function MyMapComponent({ events }) {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedEvent, setSelectedEvent] = useState(null)
	const [modalVisible, setModalVisible] = useState(false)
	const [clickedCoordinates, setClickedCoordinates] = useState(null)
	const [hoveredMarkerId, setHoveredMarkerId] = useState(null); // Для отслеживания наведенного маркера

	const handleMarkerClick = (event) => {
		const eventsAtCoordinates = filteredEvents.filter(e =>
			e.coords.lat === event.coords.lat && e.coords.lng === event.coords.lng
		);
		setSelectedEvent(eventsAtCoordinates);
		setModalVisible(true);
	}


	const closeModal = () => {
		setModalVisible(false)
		setSelectedEvent(null)
	}

	// Фильтрация событий по поисковому запросу
	const filteredEvents = events.filter(event =>
		event.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Обработчик клика по карте
	const handleMapClick = (e) => {
		const bounds = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - bounds.left;
		const y = e.clientY - bounds.top;
		setClickedCoordinates({ x, y });
	};

	return (
		<div className="flex w-[100vw] flex-col items-center justify-center bg-gray-100 min-h-screen">
			<input
				type="text"
				placeholder="Поиск событий..."
				className="mb-4 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<div
				id='map'
				className="relative w-full aspect-[16/9] bg-cover bg-center"
				onClick={handleMapClick}
			>
				<AnimatePresence>
					{filteredEvents.map((event) => (
						<motion.div
							key={event.id}
							onClick={() => handleMarkerClick(event)}
							className="absolute cursor-pointer rounded-full  w-7 h-7"
							id='marker'
							style={{
								left: `${(event.coords.lng / 2)}%`, // Смещение координат
								top: `${(event.coords.lat - 4)}%`,  // Смещение координат
							}}
							initial={{ scale: 0 }}
							animate={{ scale: hoveredMarkerId === event.id ? 1.5 : 1 }} // Увеличиваем при наведении
							transition={{ duration: 0.5 }}
							exit={{ opacity: 0, scale: 0 }}
							onMouseEnter={() => setHoveredMarkerId(event.id)} // Устанавливаем ID при наведении
							onMouseLeave={() => setHoveredMarkerId(null)} // Сбрасываем ID при покидании маркера
						>

						</motion.div>
					))}
				</AnimatePresence>

				{/* Вывод координат клика */}
				{clickedCoordinates && (
					<div className="absolute bg-white border border-gray-300 p-2 rounded-md shadow-md" style={{ left: clickedCoordinates.x, top: clickedCoordinates.y }}>
						<p>Координаты:</p>
						<p>X: {clickedCoordinates.x.toFixed(2)}</p>
						<p>Y: {clickedCoordinates.y.toFixed(2)}</p>
					</div>
				)}
			</div>

			<Modal isVisible={modalVisible} onClose={closeModal} event={selectedEvent} />
		</div>
	)
}

export default MyMapComponent;
