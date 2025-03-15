import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

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
        {/* Redirigir a dashboard si ya está logueado */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route 
          path="/login" 
          element={<Login showModal={showLoginModal} setShowModal={setShowLoginModal} setIsAdmin={setIsAdmin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

