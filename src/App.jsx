import React from "react";
import Itinerary from "./components/Itinerary";
import Transport from "./components/Transport";
import BarsRestaurants from "./components/BarsRestaurants";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center p-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-light text-gray-800 mb-8 m-10">
          Planeando<span className="text-indigo-600 font-semibold">Ando</span>
          <span className="text-sm flex justify-center text-gray-500">
            Tu planificador de viajes
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        <div className="flex justify-center">
          <Transport />
        </div>
        <div className="flex justify-center">
          <Itinerary />
        </div>
        <div className="flex justify-center">
          <BarsRestaurants />
        </div>
      </div>
    </div>
  );
};

export default App;
