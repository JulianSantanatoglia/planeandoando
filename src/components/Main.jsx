import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Itinerary from './Itinerary';
import BarsRestaurants from './BarsRestaurants';
import Transport from './Transport';
import Landmarks from './Landmarks';
import Reservations from './Reservations';

const Main = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const tabs = [
    { path: '/transport', label: 'Transporte', component: Transport },
    { path: '/reservations', label: 'Reservas', component: Reservations },
    { path: '/landmarks', label: 'Lugares Importantes', component: Landmarks },
    { path: '/restaurants', label: 'Restaurantes', component: BarsRestaurants },
    { path: '/itinerary', label: 'Itinerario', component: Itinerary }
  ];

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm mb-6 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-2 space-x-2">
            {tabs.map(tab => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.path
                    ? 'bg-primary-color text-white shadow-md'
                    : 'text-gray-600 hover:text-primary-color hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab.path)}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pb-8">
        <Routes>
          {tabs.map(tab => (
            <Route
              key={tab.path}
              path={tab.path}
              element={<tab.component />}
            />
          ))}
          <Route path="/" element={<Transport />} />
        </Routes>
      </main>
    </div>
  );
};

export default Main;
