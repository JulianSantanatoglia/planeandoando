import React, { useState } from 'react';

const Transport = () => {
  const [transports, setTransports] = useState([]);
  const [newTransport, setNewTransport] = useState({
    type: '',
    from: '',
    to: '',
    date: '',
    time: '',
    details: ''
  });

  const handleAddTransport = (e) => {
    e.preventDefault();
    const transport = {
      ...newTransport,
      id: Date.now()
    };
    setTransports([...transports, transport]);
    setNewTransport({
      type: '',
      from: '',
      to: '',
      date: '',
      time: '',
      details: ''
    });
  };

  const handleDeleteTransport = (id) => {
    setTransports(transports.filter(transport => transport.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransport(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="section-title">Traslados</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Traslado</h3>
          <form onSubmit={handleAddTransport} className="space-y-4">
            <div>
              <label className="form-label">Tipo de Transporte</label>
              <select
                name="type"
                value={newTransport.type}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="">Seleccionar</option>
                <option value="Avión">Avión</option>
                <option value="Tren">Tren</option>
                <option value="Autobús">Autobús</option>
                <option value="Taxi">Taxi</option>
                <option value="Barco">Barco</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Desde</label>
                <input
                  type="text"
                  name="from"
                  value={newTransport.from}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                  placeholder="Origen"
                />
              </div>
              <div>
                <label className="form-label">Hasta</label>
                <input
                  type="text"
                  name="to"
                  value={newTransport.to}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                  placeholder="Destino"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  name="date"
                  value={newTransport.date}
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
                  value={newTransport.time}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Detalles Adicionales</label>
              <textarea
                name="details"
                value={newTransport.details}
                onChange={handleInputChange}
                className="input-field"
                rows="3"
                placeholder="Número de vuelo, terminal, etc."
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Agregar Traslado
            </button>
          </form>
        </div>

        <div>
          <div className="space-y-4">
            {transports.length === 0 ? (
              <div className="card text-center py-8">
                <p className="text-text-secondary">No hay traslados programados</p>
              </div>
            ) : (
              transports.map(transport => (
                <div key={transport.id} className="card hover-scale">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{transport.type}</h3>
                      <p className="text-sm text-text-secondary">
                        {transport.from} → {transport.to}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteTransport(transport.id)}
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
                      <p className="text-sm">{transport.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Hora</p>
                      <p className="text-sm">{transport.time}</p>
                    </div>
                  </div>
                  {transport.details && (
                    <div className="mt-4">
                      <p className="text-xs text-text-secondary">Detalles</p>
                      <p className="text-sm">{transport.details}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transport;