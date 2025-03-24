import React, { useState, useEffect } from 'react';

const BarsRestaurants = () => {
  const [places, setPlaces] = useState(() => {
    const storedPlaces = localStorage.getItem('places');
    return storedPlaces ? JSON.parse(storedPlaces) : [];
  });
  const [newPlace, setNewPlace] = useState({
    name: '',
    location: '',
  });

  useEffect(() => {
    localStorage.setItem('places', JSON.stringify(places));
  }, [places]);

  const handleChange = (e) => {
    setNewPlace({ ...newPlace, [e.target.name]: e.target.value });
  };

  const addPlace = () => {
    if (Object.values(newPlace).some((value) => !value)) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    setPlaces([...places, newPlace]);
    setNewPlace({ name: '', location: '' });
  };

  const removePlace = (index) => {
    setPlaces(places.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800 font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Bares y Restaurantes🍽🍺</h2>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          value={newPlace.name}
          onChange={handleChange}
          placeholder="Nombre del lugar"
          className="w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <input
          type="text"
          name="location"
          value={newPlace.location}
          onChange={handleChange}
          placeholder="Ubicación"
          className="w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <button
        onClick={addPlace}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-200 focus:outline-none"
      >
        Agregar Lugar
      </button>

      <ul className="mt-6 space-y-4">
        {places.map((place, index) => (
          <li
            key={index}
            className="p-4 rounded-lg border border-gray-200 flex items-center justify-between"
          >
            <div className="flex-grow">
              <div className="font-semibold text-gray-900">{place.name}</div>
              <div className="text-sm text-gray-600">{place.location}</div>
            </div>
            <button
              onClick={() => removePlace(index)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm focus:ring focus:ring-red-200 focus:outline-none"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BarsRestaurants;