import React, { useState, useEffect } from 'react';

const Itinerary = () => {
  const [activities, setActivities] = useState(() => {
    const storedActivities = localStorage.getItem('activities');
    return storedActivities ? JSON.parse(storedActivities) : [];
  });
  const [newActivity, setNewActivity] = useState({
    activity: '',
    place: '',
    completed: false,
  });

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  const handleChange = (e) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

  const addActivity = () => {
    if (Object.values(newActivity).some((value) => !value && value !== false)) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    setActivities([...activities, newActivity]);
    setNewActivity({ activity: '', place: '', completed: false });
  };

  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedActivities = activities.map((activity, i) =>
      i === index ? { ...activity, completed: !activity.completed } : activity
    );
    setActivities(updatedActivities);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800 font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Cositas para hacer📝</h2>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          name="activity"
          value={newActivity.activity}
          onChange={handleChange}
          placeholder="Actividad"
          className="w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <input
          type="text"
          name="place"
          value={newActivity.place}
          onChange={handleChange}
          placeholder="Lugar"
          className="w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <button
        onClick={addActivity}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-200 focus:outline-none"
      >
        Agregar Actividad
      </button>

      <ul className="mt-6 space-y-4">
        {activities.map((activity, index) => (
          <li
            key={index}
            className={`p-4 rounded-lg border border-gray-200 flex items-center justify-between ${
              activity.completed ? 'bg-green-100 border-green-300' : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center flex-grow">
              <input
                type="checkbox"
                checked={activity.completed}
                onChange={() => toggleComplete(index)}
                className="mr-2 transform scale-125"
              />
              <div className="flex-grow">
                <div className="font-semibold text-gray-900">{activity.activity}</div>
                <div className="text-sm text-gray-600">{activity.place}</div>
              </div>
            </div>
            <button
              onClick={() => removeActivity(index)}
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

export default Itinerary;