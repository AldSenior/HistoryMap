"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { events } from "../events";
import EventPopup from "./EventPopup";

function MyMapComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [customEvents, setCustomEvents] = useState(() => {
    const savedEvents = localStorage.getItem("customEvents");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const mapRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    const rect = containerRef.current.getBoundingClientRect();
    const mapWidth = mapRef.current.offsetWidth * scale;
    const mapHeight = mapRef.current.offsetHeight * scale;

    const newTranslateX = Math.max(rect.width - mapWidth, Math.min(0, dx));
    const newTranslateY = Math.max(rect.height - mapHeight, Math.min(0, dy));
    setTranslate({ x: newTranslateX, y: newTranslateY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMarkerClick = (event) => {
    const eventsAtCoordinates = allEvents.filter(
      (e) =>
        e.coords.lat === event.coords.lat && e.coords.lng === event.coords.lng,
    );
    setSelectedEvent(eventsAtCoordinates);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const handleMapClick = (e) => {
    if (isDragging || showPopup) return;
    const bounds = mapRef.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    const lng =
      ((e.clientX - bounds.left - translate.x) /
        scale /
        mapRef.current.offsetWidth -
        0.5) *
      360;
    const lat =
      ((e.clientY - bounds.top - translate.y) /
        scale /
        mapRef.current.offsetHeight -
        0.5) *
      180;

    setClickedCoordinates({ x, y, lat, lng });
    setShowPopup(true);
  };

  const handlePopupSubmit = (formData) => {
    const newEvent = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      date: formData.date || new Date().toISOString().split("T")[0],
      coords: { lat: clickedCoordinates.lat, lng: clickedCoordinates.lng },
      description: formData.description || "Событие добавлено пользователем",
      category: formData.category || "Пользовательское",
      personalities: formData.personalities.map((id) => ({
        ...urezpers.find((p) => p.id === id),
      })),
    };

    const updatedEvents = [...customEvents, newEvent];
    setCustomEvents(updatedEvents);
    localStorage.setItem("customEvents", JSON.stringify(updatedEvents));

    setShowPopup(false);
    setClickedCoordinates(null);
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
    setClickedCoordinates(null);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newScale = Math.max(0.5, Math.min(3, scale * delta));
    const mapWidth = mapRef.current.offsetWidth * newScale;
    const mapHeight = mapRef.current.offsetHeight * newScale;

    const newTranslateX = Math.max(
      rect.width - mapWidth,
      Math.min(0, mouseX - (mouseX - translate.x) * (newScale / scale)),
    );
    const newTranslateY = Math.max(
      rect.height - mapHeight,
      Math.min(0, mouseY - (mouseY - translate.y) * (newScale / scale)),
    );

    setScale(newScale);
    setTranslate({ x: newTranslateX, y: newTranslateY });
  };

  useEffect(() => {
    const mapElement = mapRef.current;
    const containerElement = containerRef.current;
    if (mapElement && containerElement) {
      mapElement.addEventListener("wheel", handleWheel, { passive: false });
      mapElement.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (mapElement && containerElement) {
        mapElement.removeEventListener("wheel", handleWheel);
        mapElement.removeEventListener("mousedown", handleMouseDown);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scale, translate]);

  const allEvents = [...events, ...customEvents];
  const filteredEvents = allEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center bg-gray-100">
      <input
        type="text"
        placeholder="Поиск событий..."
        className="mb-4 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkerClick(event);
                }}
                className={`absolute cursor-pointer rounded-full w-7 h-7 ${
                  event.id.toString().startsWith("custom")
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
                style={{
                  left: `${(event.coords.lng / 360 + 0.5) * 100}%`,
                  top: `${(event.coords.lat / 180 + 0.5) * 100}%`,
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
        </div>
      </div>

      <EventPopup
        isVisible={showPopup}
        coordinates={clickedCoordinates}
        onSubmit={handlePopupSubmit}
        onCancel={handlePopupCancel}
      />

      <Modal
        isVisible={modalVisible}
        onClose={closeModal}
        event={selectedEvent}
      />
    </div>
  );
}

export default MyMapComponent;
