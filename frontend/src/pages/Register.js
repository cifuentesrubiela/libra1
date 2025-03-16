import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css'; // Asegúrate de tener estilos CSS para el modal

const Register = ({ showModal, setShowModal }) => {
  const [form, setForm] = useState({
    num_documento_usuario: '',
    nombre_usuario: '',
    correo_usuario: '',
    celular_usuario: '',
    password: '',
    rol: 'usuario', // Valor por defecto
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/auth/register', form);
      alert('Registro exitoso');
      setShowModal(false); // Cerrar modal después del registro exitoso
    } catch (error) {
      alert('Error en el registro');
      console.error('Error en el registro', error);
    }
  };

  const handleCancel = () => {
    setShowModal(false); // Simplemente cierra el modal
  };

  // Si el modal no debe mostrarse, no renderiza nada
  if (!showModal) return null;

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
          <select name="rol" value={form.rol} onChange={handleChange}>
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
