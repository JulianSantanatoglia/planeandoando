import React, { useState } from 'react';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    type: '',
    name: '',
    date: '',
    time: '',
    confirmation: ''
  });

  const handleAddReservation = (e) => {
    e.preventDefault();
    const reservation = {
      ...newReservation,
      id: Date.now(),
      status: 'Pendiente'
    };
    setReservations([...reservations, reservation]);
    setNewReservation({
      type: '',
      name: '',
      date: '',
      time: '',
      confirmation: ''
    });
  };

  const handleDeleteReservation = (id) => {
    setReservations(reservations.filter(reservation => reservation.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="section-title">Mis Reservas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Agregar Nueva Reserva</h3>
          <form onSubmit={handleAddReservation} className="space-y-4">
            <div>
              <label className="form-label">Tipo</label>
              <select
                name="type"
                value={newReservation.type}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="">Seleccionar tipo</option>
                <option value="Hotel">Hotel</option>
                <option value="Restaurante">Restaurante</option>
                <option value="Tour">Tour</option>
                <option value="Transporte">Transporte</option>
                <option value="Evento">Evento</option>
              </select>
            </div>

            <div>
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="name"
                value={newReservation.name}
                onChange={handleInputChange}
                className="input-field"
                required
                placeholder="Ej: Hotel Plaza"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  name="date"
                  value={newReservation.date}
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
                  value={newReservation.time}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Número de Confirmación</label>
              <input
                type="text"
                name="confirmation"
                value={newReservation.confirmation}
                onChange={handleInputChange}
                className="input-field"
                required
                placeholder="Ej: ABC123"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Agregar Reserva
            </button>
          </form>
        </div>

        <div>
          <div className="space-y-4">
            {reservations.length === 0 ? (
              <div className="card text-center py-8">
                <p className="text-slate-400">No hay reservas aún</p>
              </div>
            ) : (
              reservations.map(reservation => (
                <div key={reservation.id} className="card hover-scale">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{reservation.name}</h3>
                      <p className="text-sm text-slate-400">{reservation.type}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteReservation(reservation.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400">Fecha</p>
                      <p className="text-sm">{reservation.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Hora</p>
                      <p className="text-sm">{reservation.time}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-slate-400">Confirmación</p>
                    <p className="text-sm font-mono">{reservation.confirmation}</p>
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

export default Reservations; 