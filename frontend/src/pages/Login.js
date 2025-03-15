import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ showModal, setShowModal, setIsAdmin }) => {
  const [form, setForm] = useState({ correo_usuario: '', password: '', rememberMe: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setForm({ ...form, rememberMe: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', form);
      localStorage.setItem('token', response.data.token);
      if (form.rememberMe) {
        localStorage.setItem('rememberMe', true);
      }
      setIsAdmin(response.data.user.rol.rol === 'Administrador');
      setShowModal(false); // Cerrar el modal después de login exitoso
    } catch (error) {
      alert('Login fallido');
    }
  };

  const handleCancel = () => {
    setShowModal(false); // Cerrar el modal si el usuario hace clic en cancelar
  };

  if (!showModal) return null; // Si el modal no se debe mostrar, no renderizamos nada

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="correo_usuario"
            placeholder="Correo"
            onChange={handleChange}
            value={form.correo_usuario}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            value={form.password}
            required
          />
          
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="rememberMe">Recordarme</label>
          </div>

          <button type="submit">Iniciar Sesión</button>
        </form>

        <div className="links">
          <a href="/registro">¿No tienes cuenta? Regístrate</a>
          <a href="/olvide-mi-contrasena">¿Olvidaste tu contraseña?</a>
        </div>

        <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default Login;
