import { motion } from 'framer-motion';
import Slider from 'react-slick';
import React from 'react';
import ReactDOM from 'react-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Modal({ isVisible, onClose, event }) {
  if (!isVisible || !event || event.length === 0) return null; // Прекращаем рендеринг, если данные пустые

  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return ReactDOM.createPortal(
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50" // Убедитесь, что здесь используется полупрозрачный черный фон
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-white max-w-[50vw] text-cyan-300 p-6 rounded-md shadow-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">✖️</button>
        <Slider {...settings}>
          {event.map(e => (
            <div key={e.id} className="p-4">
              <h2 className="text-xl font-semibold">{e.title}</h2>
              <p>{e.date}</p>
              <p>{e.description}</p>
              <div className="mt-2">
                {e.personalities.map(person => (
                  <div key={person.id} className="flex items-center mt-2">
                    <img src={person.image} alt={person.name} className="w-8 h-8 rounded-full mr-2" />
                    <span>{person.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </motion.div>,
    document.body
  );
}

export default Modal;
