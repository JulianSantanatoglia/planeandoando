import React, { useState } from 'react';

const Itinerary = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    priority: 'media'
  });

  const handleAddActivity = (e) => {
    e.preventDefault();
    const activity = {
      ...newActivity,
      id: Date.now()
    };
    setActivities([...activities, activity]);
    setNewActivity({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      priority: 'media'
    });
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta':
        return 'text-red-400';
      case 'media':
        return 'text-yellow-400';
      case 'baja':
        return 'text-green-400';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="section-title">Itinerario</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Agregar Nueva Actividad</h3>
          <form onSubmit={handleAddActivity} className="space-y-4">
            <div>
              <label className="form-label">Título</label>
              <input
                type="text"
                name="title"
                value={newActivity.title}
                onChange={handleInputChange}
                className="input-field"
                required
                placeholder="Título de la actividad"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  name="date"
                  value={newActivity.date}
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
                  value={newActivity.time}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Ubicación</label>
              <input
                type="text"
                name="location"
                value={newActivity.location}
                onChange={handleInputChange}
                className="input-field"
                required
                placeholder="Lugar de la actividad"
              />
            </div>

            <div>
              <label className="form-label">Descripción</label>
              <textarea
                name="description"
                value={newActivity.description}
                onChange={handleInputChange}
                className="input-field"
                rows="3"
                placeholder="Detalles de la actividad"
              />
            </div>

            <div>
              <label className="form-label">Prioridad</label>
              <select
                name="priority"
                value={newActivity.priority}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Agregar Actividad
            </button>
          </form>
        </div>

        <div>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <div className="card text-center py-8">
                <p className="text-text-secondary">No hay actividades programadas</p>
              </div>
            ) : (
              activities.map(activity => (
                <div key={activity.id} className="card hover-scale">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{activity.title}</h3>
                      <p className="text-sm text-text-secondary">{activity.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${getPriorityColor(activity.priority)}`}>
                        {activity.priority.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-text-secondary">Fecha</p>
                      <p className="text-sm">{activity.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Hora</p>
                      <p className="text-sm">{activity.time}</p>
                    </div>
                  </div>
                  {activity.description && (
                    <div className="mt-4">
                      <p className="text-xs text-text-secondary">Descripción</p>
                      <p className="text-sm">{activity.description}</p>
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

export default Itinerary;