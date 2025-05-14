import React from 'react';


const Card = ({ title, description, imageUrl, buttonText, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-48 object-cover"
        src={imageUrl}
        alt={title}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {description && <p className="text-gray-600 text-sm mt-2">{description}</p>}
        {buttonText && (
          <button
            onClick={onClick}
            className="mt-4 inline-block text-sm font-semibold text-red-600 hover:text-red-800"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
