import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importación corregida
import '../styles.css';

const Navbar = ({ handleLoginClick, userName, setUserName, showLogout, setShowLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es ADMIN
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  // Obtener nombre de usuario y rol del token al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.nombre_usuario); // Establecer nombre del usuario
        setIsAdmin(decoded.rol === 'ADMIN'); // Verificar si el rol es ADMIN
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, [setUserName]);

  // Monitorear cambios en localStorage (para detectar inicio o cierre de sesión)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUserName(decoded.nombre_usuario);
          setIsAdmin(decoded.rol === 'ADMIN');
        } catch (error) {
          console.error('Error al decodificar el token:', error);
        }
      } else {
        setUserName(null); // Limpiar el nombre de usuario si no hay token
        setIsAdmin(false);
      }
    };

    window.addEventListener('storage', handleStorageChange); // Escuchar cambios en localStorage
    return () => window.removeEventListener('storage', handleStorageChange); // Limpiar el listener
  }, [setUserName]);

  // Manejar la búsqueda de productos
  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.trim() !== '') {
      try {
        const response = await axios.get('http://localhost:4000/api/productos');
        const productosFiltrados = response.data.filter((producto) =>
          producto.nombre_producto.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(productosFiltrados);
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

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
    <nav className="navbar">
      <div className="logo">Libélula Dorada</div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((producto) => (
              <div key={producto._id} className="search-item">
                <Link to={`/detalle/${producto._id}`} onClick={() => setSearchResults([])}>
                  {producto.nombre_producto}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Menú de usuario */}
      {userName ? (
        <div className="user-menu">
          <button
            className="button-primary"
            onClick={() => setShowLogoutMenu(!showLogoutMenu)} // Alternar menú de logout
          >
            {userName}
          </button>
          {showLogoutMenu && (
            <button className="button-primary cerrar-sesion" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          )}

          {/* Mostrar enlace de administrador solo si el usuario es ADMIN */}
          {isAdmin && (
            <Link to="/admin" className="button-primary admin-panel">
              Panel de Administrador
            </Link>
          )}
        </div>
      ) : (
        <button className="button-primary login" onClick={handleLoginClick}>
          Login
        </button>
      )}

      {/* Botón del carrito de compras */}
      {/* <button className="button-primary carrito">Carrito de Compras</button> */}
      <button className="button-primary carrito">
        <Link to="/carrito">Carrito de Compras</Link>
      </button>
    </nav>
  );
};

export default Navbar;









