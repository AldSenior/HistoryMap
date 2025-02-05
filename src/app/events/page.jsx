'use client'
import { AnimatePresence, motion } from 'framer-motion'
import EventCard from '../components/EventCard'
import { events } from '../events'

const EventsPage = () => {
	return (
		<div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-6">
			<h1 className="text-4xl font-bold mb-8">События 1917 года</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl w-full">
				<AnimatePresence>
					{events.map((event, index) => (
						<motion.div
							key={event.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ delay: index * 0.1, duration: 0.5 }}
						>
							<EventCard event={event} />
						</motion.div>
					))}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default EventsPage
