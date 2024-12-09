'use client'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const events = [
	{ id: 1, position: [55.751244, 37.618429], title: 'Событие 1', description: 'Описание события 1' },
	{ id: 2, position: [55.7558, 37.6173], title: 'Событие 2', description: 'Описание события 2' },
	// Добавьте больше событий...
]

function MyMapComponent() {
	return (
		<div className="flex flex-col items-center">
			<h1 className="text-2xl font-bold my-4">Интерактивная карта исторических событий</h1>
			<MapContainer className='w-[90vw] h-[70vh] rounded-lg border-2 border-gray-300 shadow-lg' center={[55.751244, 37.618429]} zoom={13}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{events.map(event => (
					<Marker key={event.id} position={event.position}>
						<Popup>
							<strong>{event.title}</strong><br />
							{event.description}
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	)
}

export default MyMapComponent
