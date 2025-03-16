import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import './styles/Layout.css'; // Importamos el archivo CSS para el layout

// Componente wrapper para manejar redirecciones basadas en rol
const AppRoutes = ({ isAdmin, showLoginModal, setShowLoginModal, userName, setUserName, setIsAdmin, 
                     usuario, setUsuario, isAuthenticated, setIsAuthenticated, showLogout, setShowLogout }) => {
  const navigate = useNavigate();
  const initialRedirectDone = useRef(false);
  
  // Efecto para redirigir al administrador a la página de gestión de productos al iniciar sesión
  useEffect(() => {
    if (isAdmin && !initialRedirectDone.current) {
      initialRedirectDone.current = true;
      navigate('/gestion-productos');
    }
  }, [isAdmin, navigate]);

  return (
    <>
      {/* Mostrar Navbar solo si NO es administrador */}
      {!isAdmin && (
        <Navbar
          handleLoginClick={() => setShowLoginModal(true)}
          userName={userName}
          setUserName={setUserName}
          showLogout={userName !== null}
          setShowLogout={setShowLogout}
          isAuthenticated={isAuthenticated}
        />
      )}
      
      {/* Mostrar Sidebar solo si es administrador */}
      {isAdmin && (
        <Sidebar 
          isAdmin={isAdmin} 
          userName={userName} 
          setUserName={setUserName} 
          setShowLogout={setShowLogout} 
        />
      )}
      
      {/* Ajustar la clase del contenido principal según el tipo de usuario */}
      <div className={`main-content ${isAdmin ? 'admin-view' : 'user-view'}`}>
        <Routes>
          <Route path="/" element={isAdmin ? <Navigate to="/gestion-productos" replace /> : <Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              isAdmin ? <Navigate to="/gestion-productos" replace /> : 
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
              isAdmin ? <Navigate to="/gestion-productos" replace /> :
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
      </div>
    </>
  );
};

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userName, setUserName] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
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
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Actualizar showLoginModal basado en isAuthenticated
  useEffect(() => {
    if (isAuthenticated) {
      setShowLoginModal(false);
    }
  }, [isAuthenticated]);

  // No renderizar nada mientras se carga la autenticación inicial
  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <CarritoProvider>
      <Router>
        <AppRoutes 
          isAdmin={isAdmin}
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          userName={userName}
          setUserName={setUserName}
          setIsAdmin={setIsAdmin}
          usuario={usuario}
          setUsuario={setUsuario}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          showLogout={showLogout}
          setShowLogout={setShowLogout}
        />
      </Router>
    </CarritoProvider>
  );
};

export default App;