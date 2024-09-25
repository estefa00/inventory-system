import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import InventoryPage from "./pages/InventoryPage";
import UsersPage from "./pages/UsersPage";
import TechnologyPage from "./pages/TechnologyPage";
import ReportsPage from "./pages/ReportsPage";
import LoginPage from "./pages/LoginPage"; // Importamos la página de Login
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para saber si el usuario está autenticado

  return (
    <Router>
      {isAuthenticated && <Navbar />} {/* Mostrar Navbar solo si está autenticado */}
      <div className="content">
        <Routes>
          {/* Ruta para la página de login */}
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} 
          />

          {/* Protegemos las rutas que requieren autenticación */}
          {isAuthenticated ? (
            <>
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/technology" element={<TechnologyPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/reportes" element={<ReportsPage />} />
            </>
          ) : (
            // Redirigir a login si no está autenticado
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
