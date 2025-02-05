'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import MyMapComponent from '../components/MyMapContainer'
import markers from "../markers.json"


const MapPage = () => {
	const [selectedCategory, setSelectedCategory] = useState("all")
	const [filteredMarkers, setFilteredMarkers] = useState(markers) // доступные маркеры

	useEffect(() => {
		if (selectedCategory === "all") {
			setFilteredMarkers(markers)
		} else {
			setFilteredMarkers(markers.filter(marker => marker.category === selectedCategory))
		}
	}, [selectedCategory])

	return (
		<div className="flex flex-col items-center">
			<motion.h1
				className="text-4xl font-bold my-6"
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				Интерактивная карта событий
			</motion.h1>
			<div className="mb-4">
				<select
					className="border border-gray-300 rounded-md p-2"
					onChange={(e) => setSelectedCategory(e.target.value)}
					value={selectedCategory}
				>
					<option value="all">Все события</option>
					<option value="Историческое">Исторические</option>
					<option value="Политическое">Политические</option>
					<option value="Культурное">Культурные</option>
				</select>
			</div>
			<div className="w-full h-96 bg-gray-200 rounded-lg shadow-lg relative">
				<MyMapComponent events={filteredMarkers} />
			</div>
		</div>
	)
}
export default MapPage