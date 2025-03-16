import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const Register = ({ showModal, setShowModal }) => {
  const [form, setForm] = useState({
    num_documento_usuario: '',
    nombre_usuario: '',
    correo_usuario: '',
    celular_usuario: '',
    password: '',
    rol: 'USER', // Valor por defecto que coincide con el enum del modelo
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', form);
      console.log("Respuesta del registro:", response.data);
      alert('Registro exitoso');
      setShowModal(false); // Cerrar modal después del registro exitoso
    } catch (error) {
      console.error('Error en el registro:', error);
      if (error.response && error.response.data) {
        alert(`Error en el registro: ${error.response.data.error}`);
      } else {
        alert('Error en el registro');
      }
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
            type="number"
            name="num_documento_usuario"
            placeholder="Número de Documento"
            onChange={handleChange}
            value={form.num_documento_usuario}
            required
          />
          <input
            type="text"
            name="nombre_usuario"
            placeholder="Nombre"
            onChange={handleChange}
            value={form.nombre_usuario}
            required
          />
          <input
            type="email"
            name="correo_usuario"
            placeholder="Correo"
            onChange={handleChange}
            value={form.correo_usuario}
            required
          />
          <input
            type="text"
            name="celular_usuario"
            placeholder="Celular"
            onChange={handleChange}
            value={form.celular_usuario}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            value={form.password}
            required
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
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
