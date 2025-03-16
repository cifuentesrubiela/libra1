import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

const Sidebar = ({ isAdmin }) => {
  return (
    <div className="sidebar">
      <ul>
        {/* Enlaces visibles para todos */}
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/carrito">Carrito</Link></li>
         {/* Enlaces exclusivos para administradores */}
        {isAdmin && (
          <>
            <li><Link to="/gestion-productos">Gestión de Productos</Link></li>
            <li><Link to="/gestion-ventas">Gestión de Ventas</Link></li>
            <li><Link to="/tabla-ventas">Tabla de Ventas</Link></li>
            <li><Link to="/reporte-ventas">Reporte de Ventas</Link></li>
            <li><Link to="/reportes">Reportes</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;






