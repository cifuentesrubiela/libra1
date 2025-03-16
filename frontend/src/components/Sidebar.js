import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Sidebar = ({ isAdmin, userName, setUserName, setShowLogout }) => {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  // Si no se muestra en App.js cuando no es admin, esta verificación es redundante
  // pero se mantiene como medida de seguridad adicional
  if (!isAdmin) {
    return null;
  }

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:4000/api/auth/logout');
      localStorage.removeItem('token'); // Eliminar el token de localStorage
      setUserName(null); // Limpiar el nombre de usuario
      setShowLogout(false); // Ocultar el menú de logout
      window.location.href = '/'; // Redirigir al home o página principal
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="sidebar">
      {/* Información del usuario */}
      {userName && (
        <div className="user-info">
          <button
            className="user-button"
            onClick={() => setShowLogoutMenu(!showLogoutMenu)}
          >
            {userName}
          </button>
          {showLogoutMenu && (
            <button className="logout-button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          )}
        </div>
      )}

      {/* Menú de navegación */}
      <ul>
        <li><Link to="/gestion-productos">Gestión de Productos</Link></li>
        <li><Link to="/gestion-ventas">Gestión de Ventas</Link></li>
        <li><Link to="/tabla-ventas">Tabla de Ventas</Link></li>
        <li><Link to="/reporte-ventas">Reporte de Ventas</Link></li>
        <li><Link to="/reportes">Reportes</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;