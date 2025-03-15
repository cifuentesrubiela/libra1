import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    num_documento_usuario: '',
    nombre_usuario: '',
    correo_usuario: '',
    celular_usuario: '',
    password: '',
    rol: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/auth/register', form);
      alert('Registro exitoso');
    } catch (error) {
      alert('Error en el registro');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Usuario</h2>
      <input type="text" name="num_documento_usuario" placeholder="Documento" onChange={handleChange} />
      <input type="text" name="nombre_usuario" placeholder="Nombre" onChange={handleChange} />
      <input type="email" name="correo_usuario" placeholder="Correo" onChange={handleChange} />
      <input type="text" name="celular_usuario" placeholder="Celular" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
      <input type="text" name="rol" placeholder="Rol (ID)" onChange={handleChange} />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
