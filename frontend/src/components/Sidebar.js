import React from 'react';
import { Link } from 'react-router-dom';  // Asegúrate de importar Link

const Sidebar = ({ isAdmin }) => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/contacto">Contacto</Link></li>
        {isAdmin && (
          <>
            <li><Link to="/gestion-productos">Gestión de Productos</Link></li>
            <li><Link to="/gestion-ventas">Gestión de Ventas</Link></li>
            <li><Link to="/reporte-ventas">Reporte de Ventas</Link></li>
            <li><Link to="/reportes">Reportes</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;


