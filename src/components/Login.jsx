import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ onLogin, onForgotPassword, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err) {
      setError(traducirError(err.code));
    }
  };

  const traducirError = (codigoError) => {
    switch (codigoError) {
      case "auth/user-not-found":
        return "Usuario no encontrado.";
      case "auth/wrong-password":
        return "Contraseña incorrecta.";
      case "auth/invalid-email":
        return "Correo electrónico no válido.";
      default:
        return "Error al iniciar sesión. Inténtalo de nuevo.";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Iniciar Sesión
        </h2>
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="border rounded-md p-3 mb-3 w-full text-gray-700 focus:outline-none focus:ring focus:border-indigo-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border rounded-md p-3 mb-5 w-full text-gray-700 focus:outline-none focus:ring focus:border-indigo-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}
        <button
          className="bg-indigo-600 text-white p-3 rounded-md w-full mb-4 hover:bg-indigo-700 transition duration-300"
          onClick={handleLogin}
        >
          Iniciar Sesión
        </button>
        <div className="flex flex-col items-center">
          <p
            className="text-sm text-blue-400 hover:underline cursor-pointer mb-2"
            onClick={onForgotPassword}
          >
            ¿Olvidaste tu contraseña?
          </p>
          <button
            className="text-xs text-gray-500 hover:underline bg-transparent border-0 p-0"
            onClick={onRegister}
          >
            ¿No tienes una cuenta? Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;