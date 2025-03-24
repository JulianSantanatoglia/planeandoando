// src/App.jsx
import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const App = () => {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthChecked(true);
    });
  }, []);

  const handleBackToLogin = () => {
    setShowRegister(false);
    setShowForgotPassword(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

  if (!authChecked) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen relative">
      {user ? (
        <div className="bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center p-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-light text-gray-800 mb-8 m-10">
              Planeando<span className="text-indigo-600 font-semibold">Ando</span>
              <span className="text-sm flex justify-center text-gray-500">
                Tu planificador de viajes
              </span>
            </h1>
          </div>
          <div className="absolute top-4 right-4"> 
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
          <Main />
        </div>
      ) : showRegister ? (
        <Register onBackToLogin={handleBackToLogin} />
      ) : showForgotPassword ? (
        <ForgotPassword onBackToLogin={handleBackToLogin} />
      ) : (
        <Login
          onLogin={() => setUser(auth.currentUser)}
          onRegister={() => setShowRegister(true)}
          onForgotPassword={() => setShowForgotPassword(true)}
        />
      )}
    </div>
  );
};

export default App;