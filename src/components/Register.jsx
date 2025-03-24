import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = ({ onBackToLogin }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onBackToLogin();
    } catch (err) {
      setError(traducirError(err.code));
    }
  };

  const traducirError = (codigoError) => {
    switch (codigoError) {
      case "auth/email-already-in-use":
        return "El correo electrónico ya está en uso.";
      case "auth/weak-password":
        return "La contraseña debe tener al menos 6 caracteres.";
      case "auth/invalid-email":
        return "Correo electrónico no válido.";
      default:
        return "Error al registrar. Inténtalo de nuevo.";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Registrarse
        </h2>
        <input
          type="text"
          placeholder="Nombre"
          className="border rounded-md p-3 mb-2 w-full text-gray-700 focus:outline-none focus:ring focus:border-indigo-300"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          className="border rounded-md p-3 mb-2 w-full text-gray-700 focus:outline-none focus:ring focus:border-indigo-300"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="border rounded-md p-3 mb-2 w-full text-gray-700 focus:outline-none focus:ring focus:border-indigo-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border rounded-md p-3 mb-4 w-full text-gray-700 focus:outline-none focus:ring focus:border-indigo-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}
        <button
          className="bg-indigo-600 text-white p-3 rounded-md w-full mb-2 hover:bg-indigo-700 transition duration-300"
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