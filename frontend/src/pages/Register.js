import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Asegúrate de tener el archivo CSS para el estilo del modal

const Register = ({ showModal, setShowModal }) => {
  const [form, setForm] = useState({
    num_documento_usuario: '',
    nombre_usuario: '',
    correo_usuario: '',
    celular_usuario: '',
    password: '',
    rol: 'usuario', // Establecer un valor por defecto, en este caso 'usuario'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/auth/register', form);
      alert('Registro exitoso');
      navigate('/login');
    } catch (error) {
      alert('Error en el registro');
      console.error('Error en el registro', error); // Para más detalles
    }
  };
  
  const handleCancel = () => {
    setShowModal(false); // Cerrar el modal
    navigate('/login'); // Redirigir al login
  };

  if (!showModal) return null; // Si no debe mostrar el modal, no renderizamos nada

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Registrar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="num_documento_usuario"
            placeholder="Documento"
            onChange={handleChange}
          />
          <input
            type="text"
            name="nombre_usuario"
            placeholder="Nombre"
            onChange={handleChange}
          />
          <input
            type="email"
            name="correo_usuario"
            placeholder="Correo"
            onChange={handleChange}
          />
          <input
            type="text"
            name="celular_usuario"
            placeholder="Celular"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
          >
            <option value="USER">Usuario</option>
            <option value="ADMIN">Administrador</option>
          </select>
          <button type="submit">Registrar</button>
        </form>
        <div className="modal-actions">
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Register;

