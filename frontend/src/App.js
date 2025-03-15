import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Contacto from './pages/Contacto'; // Importa las páginas correspondientes
import GestionProductos from './pages/GestionProductos'; // Páginas de administración
import GestionVentas from './pages/GestionVentas';
import ReporteVentas from './pages/ReporteVentas';
import Reportes from './pages/Reportes';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Estado para controlar el modal

  const handleLoginClick = () => {
    setShowLoginModal(true); // Mostrar el modal cuando se hace clic en "Login"
  };

  return (
    <Router>
      <Navbar handleLoginClick={handleLoginClick} />
      <Sidebar isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route 
          path="/login" 
          element={<Login showModal={showLoginModal} setShowModal={setShowLoginModal} setIsAdmin={setIsAdmin} />} />
        <Route path="/register" element={<Register showModal={showLoginModal} setShowModal={setShowLoginModal} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/gestion-productos" element={<GestionProductos />} />
        <Route path="/gestion-ventas" element={<GestionVentas />} />
        <Route path="/reporte-ventas" element={<ReporteVentas />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </Router>
  );
};

export default App;




