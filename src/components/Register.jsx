// src/components/Register.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = ({ onBackToLogin }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    setError('');
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Aquí podrías añadir lógica para guardar el nombre y apellido del usuario
        onBackToLogin();
      })
      .catch((error) => {
        setError(traducirError(error.code));
      });
  };

  const traducirError = (codigoError) => {
    // ... (misma función de traducción de errores que en Login.jsx)
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Registrarse</h2>
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 mb-2 w-full"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          className="border p-2 mb-2 w-full"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="border p-2 mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          className="bg-indigo-600 text-white p-2 rounded w-full mb-2"
          onClick={handleRegister}
        >
          Registrarse
        </button>
        <button
          className="text-xs text-gray-500 hover:underline bg-transparent border-0 p-0"
          onClick={onBackToLogin}
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </button>
      </div>
    </div>
  );
};

export default Register;