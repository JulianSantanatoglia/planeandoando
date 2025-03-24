import React, { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [success, setSuccess] = useState(false); // Nuevo estado para el éxito

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleForgotPassword = () => {
    setError("");
    setEmailError("");
    setSuccess(false); // Resetear el estado de éxito

    if (!email) {
      setEmailError("Por favor, ingresa tu correo electrónico.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true); // Establecer el estado de éxito
        setError(
          "Se ha enviado un correo electrónico para restablecer la contraseña."
        );
      })
      .catch((error) => {
        setError(traducirError(error.code));
      });
  };

  const traducirError = (codigoError) => {
    switch (codigoError) {
      case "auth/user-not-found":
        return "Usuario no encontrado.";
      case "auth/invalid-email":
        return "Correo electrónico no válido.";
      default:
        return "Error al enviar el correo de recuperación. Inténtalo de nuevo.";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Recuperar Contraseña
        </h2>
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="border rounded-md p-3 mb-2 w-full text-gray-700 focus:outline-none focus:ring focus:border-indigo-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && (
          <p className="text-red-500 text-sm mb-2 text-center">{emailError}</p>
        )}
        {error && (
          <p
            className={`text-sm mb-2 text-center ${
              success ? "text-green-500" : "text-red-500"
            }`}
          >
            {error}
          </p>
        )}
        <button
          className="bg-indigo-600 text-white p-3 rounded-md w-full mb-2 hover:bg-indigo-700 transition duration-300"
          onClick={handleForgotPassword}
        >
          Enviar correo de recuperación
        </button>
        <button
          className="text-xs text-gray-500 hover:underline bg-transparent border-0 p-0"
          onClick={onBackToLogin}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;