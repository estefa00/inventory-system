import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from '../assets/sena-logo.png'; // Asegúrate de tener una imagen en esa ubicación

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="SENA Logo" className="logo" />
      </div>
      <h1 className="navbar-title">Equipos Media Lab</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/inventory">Gestión de Inventario</Link>
        </li>
        <li>
          <Link to="/users">Gestión de Usuarios</Link>
        </li>
        <li>
          <Link to="/technology">Gestión de Tecnología</Link>
        </li>
        <li>
          <Link to="/reports">Reportes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
