import React, { useState } from 'react';

const BarsRestaurants = () => {
  const [places, setPlaces] = useState([]);
  const [newPlace, setNewPlace] = useState({
    name: '',
    type: '',
    location: '',
    date: '',
    time: '',
    notes: '',
    rating: ''
  });

  const handleAddPlace = (e) => {
    e.preventDefault();
    const place = {
      ...newPlace,
      id: Date.now(),
      rating: parseFloat(newPlace.rating) || 0
    };
    setPlaces([...places, place]);
    setNewPlace({
      name: '',
      type: '',
      location: '',
      date: '',
      time: '',
      notes: '',
      rating: ''
    });
  };

  const handleDeletePlace = (id) => {
    setPlaces(places.filter(place => place.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlace(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="section-title">Restaurantes y Bares</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Lugar</h3>
          <form onSubmit={handleAddPlace} className="space-y-4">
            <div>
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="name"
                value={newPlace.name}
                onChange={handleInputChange}
                className="input-field"
                required
                placeholder="Nombre del lugar"
              />
            </div>

            <div>
              <label className="form-label">Tipo</label>
              <select
                name="type"
                value={newPlace.type}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="">Seleccionar</option>
                <option value="Restaurante">Restaurante</option>
                <option value="Bar">Bar</option>
                <option value="Cafetería">Cafetería</option>
                <option value="Pub">Pub</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="form-label">Ubicación</label>
              <input
                type="text"
                name="location"
                value={newPlace.location}
                onChange={handleInputChange}
                className="input-field"
                required
                placeholder="Dirección o ubicación"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  name="date"
                  value={newPlace.date}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="form-label">Hora</label>
                <input
                  type="time"
                  name="time"
                  value={newPlace.time}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Notas</label>
              <textarea
                name="notes"
                value={newPlace.notes}
                onChange={handleInputChange}
                className="input-field"
                rows="3"
                placeholder="Platos recomendados, ambiente, etc."
              />
            </div>

            <div>
              <label className="form-label">Calificación (1-5)</label>
              <input
                type="number"
                name="rating"
                value={newPlace.rating}
                onChange={handleInputChange}
                className="input-field"
                min="1"
                max="5"
                step="0.1"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Agregar Lugar
            </button>
          </form>
        </div>

        <div>
          <div className="space-y-4">
            {places.length === 0 ? (
              <div className="card text-center py-8">
                <p className="text-text-secondary">No hay lugares agregados</p>
              </div>
            ) : (
              places.map(place => (
                <div key={place.id} className="card hover-scale">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{place.name}</h3>
                      <p className="text-sm text-text-secondary">
                        {place.type} • {place.location}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeletePlace(place.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-text-secondary">Fecha</p>
                      <p className="text-sm">{place.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Hora</p>
                      <p className="text-sm">{place.time}</p>
                    </div>
                  </div>
                  {place.notes && (
                    <div className="mt-4">
                      <p className="text-xs text-text-secondary">Notas</p>
                      <p className="text-sm">{place.notes}</p>
                    </div>
                  )}
                  <div className="mt-4 flex items-center">
                    <span className="text-xs text-text-secondary mr-2">Calificación:</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-sm">{place.rating}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarsRestaurants;