import React, { useState, useEffect } from 'react';

const Transport = () => {
  const [transports, setTransports] = useState(() => {
    const storedTransports = localStorage.getItem('transports');
    return storedTransports ? JSON.parse(storedTransports) : [];
  });
  const [newTransport, setNewTransport] = useState({
    type: 'Avion',
    origin: '',
    destination: '',
    date: '',
    price: '',
    people: 1,
  });

  useEffect(() => {
    localStorage.setItem('transports', JSON.stringify(transports));
  }, [transports]);

  const handleChange = (e) => {
    setNewTransport({ ...newTransport, [e.target.name]: e.target.value });
  };

  const addTransport = () => {
    if (Object.values(newTransport).some((value) => !value)) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    setTransports([...transports, newTransport]);
    setNewTransport({ type: 'Avion', origin: '', destination: '', date: '', price: '', people: 1 });
  };

  const removeTransport = (index) => {
    setTransports(transports.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return transports.reduce((total, transport) => {
      return total + (parseFloat(transport.price) * transport.people);
    }, 0);
  };

  const total = calculateTotal().toFixed(2);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800 font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Traslados🚊</h2>

      <div className="space-y-4 mb-6">
        <select
          name="type"
          value={newTransport.type}
          onChange={handleChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
        >
          <option value="Avion🛩">Avión🛩</option>
          <option value="Autobus🚌">Autobús🚌</option>
          <option value="Tren🚊">Tren🚊</option>
        </select>
        <input
          type="text"
          name="origin"
          value={newTransport.origin}
          onChange={handleChange}
          placeholder="Origen"
          className="w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <input
          type="text"
          name="destination"
          value={newTransport.destination}
          onChange={handleChange}
          placeholder="Destino"
          className="w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <input
          type="date"
          name="date"
          value={newTransport.date}
          onChange={handleChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <input
          type="number"
          name="price"
          value={newTransport.price}
          onChange={handleChange}
          placeholder="Precio por persona"
          className="w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <input
          type="number"
          name="people"
          value={newTransport.people}
          onChange={handleChange}
          placeholder="Personas"
          className="w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <button
        onClick={addTransport}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-200 focus:outline-none"
      >
        Agregar
      </button>

      <ul className="mt-6 space-y-4">
        {transports.map((transport, index) => (
          <li
            key={index}
            className="p-4 rounded-lg border border-gray-200 flex items-center justify-between"
          >
            <div className="flex-grow">
              <div className="font-semibold text-gray-900">{transport.type}</div>
              <div className="text-sm text-gray-600">
                {transport.origin} - {transport.destination}
              </div>
              <div className="text-sm text-gray-600">
                {transport.date} | €{transport.price} x {transport.people} personas = €{transport.price * transport.people}
              </div>
            </div>
            <button
              onClick={() => removeTransport(index)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm focus:ring focus:ring-red-200 focus:outline-none"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <p className="font-semibold text-gray-900">Total: €{total}</p>
      </div>
    </div>
  );
};

export default Transport;