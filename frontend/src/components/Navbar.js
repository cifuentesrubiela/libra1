import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para manejar la navegación
import axios from 'axios'; // Importa Axios para las peticiones HTTP

const Navbar = ({ handleLoginClick }) => {
  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:4000/api/auth/logout'); // Llama al endpoint de logout
      localStorage.removeItem('token'); // Elimina el token almacenado en el navegador
      window.location.href = '/'; // Redirige al usuario a la página de inicio (Home.js)
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">Libélula Dorada</div>
      <button onClick={handleLoginClick}>Login</button>

      {/* Link para redirigir a la página de registro */}
      {/* <Link to="/register">
        <button>Registrar</button>
      </Link> */}

      <button>Carrito de Compras</button>
      
      {/* Botón para cerrar sesión */}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </nav>
  );
};

export default Navbar;








