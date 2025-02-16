'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Modal from './Modal'

function MyMapComponent({ events }) {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedEvent, setSelectedEvent] = useState(null)
	const [modalVisible, setModalVisible] = useState(false)
	const [clickedCoordinates, setClickedCoordinates] = useState(null)
	const [hoveredMarkerId, setHoveredMarkerId] = useState(null)
	const [scale, setScale] = useState(1)
	const [translate, setTranslate] = useState({ x: 0, y: 0 })
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

	const handleMouseDown = (e) => {
		setIsDragging(true);
		setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
	};

	const handleMouseMove = (e) => {
		if (!isDragging) return;
		const dx = e.clientX - dragStart.x;
		const dy = e.clientY - dragStart.y;
		const rect = containerRef.current.getBoundingClientRect();
		const newTranslateX = (rect.width, dx);
		const newTranslateY = (rect.height, dy)
		setTranslate({ x: newTranslateX, y: newTranslateY });
	};


	const handleMouseUp = () => {
		setIsDragging(false);
	};


	const mapRef = useRef(null)
	const containerRef = useRef(null)

	const handleMarkerClick = (event) => {
		const eventsAtCoordinates = filteredEvents.filter(
			(e) => e.coords.lat === event.coords.lat && e.coords.lng === event.coords.lng
		)
		setSelectedEvent(eventsAtCoordinates)
		setModalVisible(true)
	}

	const closeModal = () => {
		setModalVisible(false)
		setSelectedEvent(null)
	}

	const filteredEvents = events.filter((event) =>
		event.title.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleMapClick = (e) => {
		const bounds = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - bounds.left
		const y = e.clientY - bounds.top
		setClickedCoordinates({ x, y })
	}

	const handleWheel = (e) => {
		e.preventDefault()
		const delta = e.deltaY > 0 ? 0.9 : 1.1
		const rect = containerRef.current.getBoundingClientRect()
		const mouseX = e.clientX - rect.left
		const mouseY = e.clientY - rect.top

		const newScale = Math.max(0.5, Math.min(2, scale * delta))
		const newTranslateX = Math.max(0, Math.min(rect.width - rect.width * newScale, mouseX - (mouseX - translate.x) * (newScale / scale)))
		const newTranslateY = Math.max(0, Math.min(rect.height - rect.height * newScale, mouseY - (mouseY - translate.y) * (newScale / scale)))

		setScale(newScale)
		setTranslate({ x: newTranslateX, y: newTranslateY })
	}

	useEffect(() => {
		const mapElement = mapRef.current
		const containerElement = containerRef.current
		if (mapElement && containerElement) {
			mapElement.addEventListener('wheel', handleWheel, { passive: false })
			mapElement.addEventListener('mousedown', handleMouseDown)
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)
		}

		return () => {
			if (mapElement && containerElement) {
				mapElement.removeEventListener('wheel', handleWheel)
				mapElement.removeEventListener('mousedown', handleMouseDown)
			}
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [isDragging, scale, translate])

	return (
		<div className="flex w-screen h-screen flex-col items-center justify-center bg-gray-100">
			<input
				type="text"
				placeholder="Поиск событий..."
				className="mb-4 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
				value={searchTerm}
				onChange={
					(e) => setSearchTerm(e.target.value)}
			/>

			<div
				ref={containerRef}
				className="relative w-4/5 h-4/5 bg-gray-200 overflow-hidden rounded-lg shadow-lg"
			>
				<div
					id="map"
					ref={mapRef}
					className="absolute w-[1600px] h-[900px] bg-cover bg-center cursor-grab"
					onClick={handleMapClick}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					style={{
						transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
						transformOrigin: 'top left',
					}}
				>
					<AnimatePresence>
						{filteredEvents.map((event) => (
							<motion.div
								key={event.id}
								onClick={() => handleMarkerClick(event)}
								className={`absolute cursor-pointer rounded-full w-7 h-7 bg-blue-500 ${hoveredMarkerId === event.id ? 'scale-150' : ''
									}`}
								id="marker"
								style={{
									left: `${((event.coords.lng / 360) + 0.5) * 100}%`,
									top: `${((event.coords.lat / 180) + 0.5) * 100}%`,
								}}
								initial={{ scale: 0 }}
								animate={{ scale: hoveredMarkerId === event.id ? 1.5 : 1 }}
								transition={{ duration: 0.5 }}
								exit={{ opacity: 0, scale: 0 }}
								onMouseEnter={() => setHoveredMarkerId(event.id)}
								onMouseLeave={() => setHoveredMarkerId(null)}
							/>
						))}
					</AnimatePresence>

					{clickedCoordinates && (
						<motion.div
							className="absolute bg-white border border-gray-300 p-2 rounded-md shadow-md"
							style={{ left: clickedCoordinates.x, top: clickedCoordinates.y }}
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
						>
							<p>Координаты:</p>
							<p>X: {clickedCoordinates.x.toFixed(2)}</p>
							<p>Y: {clickedCoordinates.y.toFixed(2)}</p>
						</motion.div>
					)}
				</div>
			</div>

			<Modal isVisible={modalVisible} onClose={closeModal} event={selectedEvent} />
		</div>
	)
}

export default MyMapComponent