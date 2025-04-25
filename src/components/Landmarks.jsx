import React, { useState } from 'react';

const Landmarks = () => {
  const [landmarks, setLandmarks] = useState([]);
  const [newLandmark, setNewLandmark] = useState({
    name: '',
    location: '',
    description: '',
    image: '',
    category: '',
    rating: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Monumento', 'Sitio Arqueológico', 'Museo', 'Parque Nacional', 'Plaza', 'Mercado', 'Barrio'];

  const handleAddLandmark = (e) => {
    e.preventDefault();
    const landmark = {
      ...newLandmark,
      id: Date.now(),
      rating: parseFloat(newLandmark.rating) || 0
    };
    setLandmarks([...landmarks, landmark]);
    setNewLandmark({
      name: '',
      location: '',
      description: '',
      image: '',
      category: '',
      rating: ''
    });
  };

  const handleDeleteLandmark = (id) => {
    setLandmarks(landmarks.filter(landmark => landmark.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLandmark(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredLandmarks = landmarks.filter(landmark => {
    const matchesSearch = landmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         landmark.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || landmark.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="section-title">Lugares Importantes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Lugar</h3>
          <form onSubmit={handleAddLandmark} className="space-y-4">
            <div>
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="name"
                value={newLandmark.name}
                onChange={handleInputChange}
                className="input-field"
                required
                placeholder="Nombre del lugar"
              />
            </div>

            <div>
              <label className="form-label">Ubicación</label>
              <input
                type="text"
                name="location"
                value={newLandmark.location}
                onChange={handleInputChange}
                className="input-field"
                required
                placeholder="Dirección o ubicación"
              />
            </div>

            <div>
              <label className="form-label">Descripción</label>
              <textarea
                name="description"
                value={newLandmark.description}
                onChange={handleInputChange}
                className="input-field"
                rows="3"
                placeholder="Descripción del lugar"
              />
            </div>

            <div>
              <label className="form-label">URL de la Imagen</label>
              <input
                type="text"
                name="image"
                value={newLandmark.image}
                onChange={handleInputChange}
                className="input-field"
                required
                placeholder="URL de la imagen"
              />
            </div>

            <div>
              <label className="form-label">Categoría</label>
              <select
                name="category"
                value={newLandmark.category}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.filter(cat => cat !== 'Todos').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Calificación (1-5)</label>
              <input
                type="number"
                name="rating"
                value={newLandmark.rating}
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
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar lugares..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded-full text-xs ${
                    selectedCategory === category
                      ? 'bg-primary-color text-white'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredLandmarks.length === 0 ? (
              <div className="card text-center py-8">
                <p className="text-slate-400">No hay lugares agregados aún</p>
              </div>
            ) : (
              filteredLandmarks.map(landmark => (
                <div key={landmark.id} className="card hover-scale">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{landmark.name}</h3>
                      <p className="text-sm text-slate-400">{landmark.location}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteLandmark(landmark.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <img
                    src={landmark.image}
                    alt={landmark.name}
                    className="w-full h-32 object-cover rounded-lg mt-2"
                  />
                  <p className="text-sm text-slate-400 mt-2">{landmark.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Categoría: {landmark.category}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-sm">{landmark.rating}</span>
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

export default Landmarks; 