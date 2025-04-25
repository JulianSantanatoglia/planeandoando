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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {user ? (
        <div className="flex flex-col min-h-screen">
          <div className="banner" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80")' }}>
            <div className="banner-content">
              <h1 className="text-5xl font-bold mb-4">
                Planeando<span className="text-white">Ando</span>
              </h1>
              <p className="text-xl">Tu planificador de viajes personal</p>
            </div>
          </div>
          
          <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center py-4">
                <div className="text-xl font-semibold text-primary-color">
                  ¡Bienvenido, {user.email}!
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </nav>

          <main className="container mx-auto px-4 py-8 flex-grow">
            <Main />
          </main>

          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 text-center">
              <p>© 2024 PlaneandoAndo - Todos los derechos reservados</p>
            </div>
          </footer>
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