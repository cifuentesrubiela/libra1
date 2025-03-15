import React from 'react';

const Sidebar = ({ isAdmin }) => {
  return (
    <div className="sidebar">
      <ul>
        <li>Contacto</li>
        {isAdmin && (
          <>
            <li>Gestión de Productos</li>
            <li>Gestión de Ventas</li>
            <li>Gestión de Reporte de Ventas</li>
            <li>Reportes</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
