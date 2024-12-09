'use client'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { events } from "./events"


const createBlackMarkerIcon = () => {
  const blackMarkerSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="blue">
      <path d="M12 2C8.14 2 5 5.14 5 9c0 3.36 7 11 7 11s7-7.64 7-11c0-3.86-3.14-7-7-7zm0 5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  `

  return L.divIcon({
    className: 'leaflet-custom-icon',
    html: blackMarkerSVG,
    iconSize: [50, 50],   // Размер маркера
    iconAnchor: [15, 30],  // Якорь маркера
  })
}

function MyMapComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleMarkerClick = (event) => {
    setSelectedEvent(event)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedEvent(null)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Интерактивная карта с историческими событиями</h1>

      <input
        type="text"
        placeholder="Поиск событий..."
        className="mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="relative w-full h-[600px]">
        <MapContainer className="h-full w-full" center={[55.751244, 37.618429]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright"></a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredEvents.map(event => (
            <Marker className="marker-icon" key={event.id} position={event.position} icon={createBlackMarkerIcon()}  >
              <Popup>
                <strong>{event.title}</strong><br />
                <button onClick={() => handleMarkerClick(event)} className="text-blue-600">Подробнее</button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Модальное окно */}
        {modalVisible && selectedEvent && (
          <div className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.7) z-[1000]'>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
              <p className="mt-2">{selectedEvent.description}</p>
              <p className="mt-1">Категория: {selectedEvent.category}</p>

              <button onClick={closeModal} className="mt-4 text-blue-500 hover:underline">Закрыть</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyMapComponent
