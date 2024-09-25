import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './LoginPage.css'; // Asegúrate de que esta ruta sea correcta

function LoginPage({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      navigate("/inventory");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <img src="/assets/sena-logo.png" alt="" className="logo" />
      <h2>Inicio de Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default LoginPage;
