// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = () => {
    setError("");
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError(
          "Se ha enviado un correo electrónico para restablecer la contraseña."
        );
      })
      .catch((error) => {
        setError(traducirError(error.code));
      });
  };

  const traducirError = (codigoError) => {};

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Recuperar Contraseña</h2>
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="border p-2 mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          className="bg-indigo-600 text-white p-2 rounded w-full mb-2"
          onClick={handleForgotPassword}
        >
          Enviar correo de recuperación
        </button>
        <button
          className="text-xs text-gray-500 hover:underline bg-transparent border-0 p-0"
          onClick={onBackToLogin}
        >
          Volver a iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
