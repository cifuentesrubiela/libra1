import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Contacto from './pages/Contacto';
import GestionProductos from './pages/GestionProductos';
import GestionVentas from './pages/GestionVentas';
import ReporteVentas from './pages/ReporteVentas';
import Reportes from './pages/Reportes';
import VerDetalle from './pages/VerDetalle';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <Router>
      <Navbar handleLoginClick={handleLoginClick} />
      <Sidebar isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route 
          path="/home" 
          element={<Home showModal={showLoginModal} setShowModal={setShowLoginModal} setIsAdmin={setIsAdmin} />} 
        />
        <Route path="/register" element={<Register showModal={showLoginModal} setShowModal={setShowLoginModal} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/gestion-productos" element={<GestionProductos />} />
        <Route path="/detalle/:id" element={<VerDetalle />} />
        <Route path="/gestion-ventas" element={<GestionVentas />} />
        <Route path="/reporte-ventas" element={<ReporteVentas />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </Router>
  );
};

export default App;





