import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Carrito from './components/Carrito';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Contacto from './pages/Contacto';
import GestionProductos from './pages/GestionProductos';
import GestionVentas from './pages/GestionVentas';
import ReporteVentas from './pages/ReporteVentas';
import Reportes from './pages/Reportes';
import VerDetalle from './pages/VerDetalle';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userName, setUserName] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para manejar el login: decodifica el token y establece el usuario
  const handleLogin = (token) => {
    console.log("Token recibido en App.js:", token);
    try {
      const decoded = jwtDecode(token);
      console.log("Token decodificado en App.js:", decoded);
      setIsAdmin(decoded.rol === 'ADMIN');
      setUserName(decoded.nombre_usuario);
      setUsuario(decoded);
      setIsAuthenticated(true);
      setShowLoginModal(false); // Se cierra el modal al iniciar sesión correctamente
      console.log("Estado del usuario después del login:", decoded);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  // Efecto para verificar el token y cargar el usuario al iniciar
  useEffect(() => {
    // Verificar el token al montar el componente
    const token = localStorage.getItem('token');
    console.log("App.js - Verificando token:", token);
    if (token) {
      try {
        handleLogin(token);
      } catch (error) {
        console.error("Error al procesar el token guardado:", error);
        // Si hay un error con el token, lo eliminamos para evitar problemas futuros
        localStorage.removeItem('token');
      }
    } else {
      console.log("No se encontró token en localStorage (App.js)");
      setIsAuthenticated(false);
    }
  }, []);

  // Manejador para el evento de storage (por si cambia en otra pestaña)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'token' || event.type === 'storage') {
        const token = localStorage.getItem('token');
        console.log("Evento de storage detectado en App.js, token:", token);
        if (token) {
          handleLogin(token);
        } else {
          // Si el token se elimina
          setIsAdmin(false);
          setUserName(null);
          setUsuario(null);
          setIsAuthenticated(false);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // También escuchar el evento personalizado
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  // Actualizar showLoginModal basado en isAuthenticated
  useEffect(() => {
    if (isAuthenticated) {
      setShowLoginModal(false);
    }
  }, [isAuthenticated]);

  return (
    <CarritoProvider>
      <Router>
        <Navbar
          handleLoginClick={handleLoginClick}
          userName={userName}
          setUserName={setUserName}
          showLogout={userName !== null}
          setShowLogout={setShowLoginModal}
          isAuthenticated={isAuthenticated}
        />
        <Sidebar isAdmin={isAdmin} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={
              <Home 
                showModal={showLoginModal} 
                setShowModal={setShowLoginModal} 
                setIsAdmin={setIsAdmin} 
                rolUsuario={usuario?.rol} 
                setUserName={setUserName} 
                setUsuario={setUsuario}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Home 
                showModal={true} 
                setShowModal={setShowLoginModal} 
                setIsAdmin={setIsAdmin} 
                rolUsuario={usuario?.rol}
                setUserName={setUserName} 
                setUsuario={setUsuario}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route 
            path="/register" 
            element={<Register showModal={showLoginModal} setShowModal={setShowLoginModal} />} 
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/gestion-productos" element={<GestionProductos />} />
          <Route path="/detalle/:id" element={<VerDetalle />} />
          <Route path="/carrito" element={
            <Carrito 
              usuario={usuario} 
              showLoginModal={showLoginModal} 
              setShowLoginModal={setShowLoginModal}
              isAuthenticated={isAuthenticated}
            />
          } />
          <Route path="/gestion-ventas" element={<GestionVentas />} />
          <Route path="/reporte-ventas" element={<ReporteVentas />} />
          <Route path="/reportes" element={<Reportes />} />
        </Routes>
      </Router>
    </CarritoProvider>
  );
};

export default App;







