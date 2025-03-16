import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importación corregida // Importación correcta de jwt-decode
import Register from './Register';
import '../styles.css';

const Home = ({ showModal, setShowModal, setIsAdmin, rolUsuario, setUserName }) => {
  const [form, setForm] = useState({ correo_usuario: '', password: '', rememberMe: false });
  const [productos, setProductos] = useState([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Estado para modal Register

  // Función para obtener los productos desde la API
  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos', error);
    }
  };

  useEffect(() => {
    obtenerProductos(); // Obtener productos al cargar la página
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setForm({ ...form, rememberMe: e.target.checked }); // Actualiza el estado del checkbox
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', form);
      const token = response.data.token;
      localStorage.setItem('token', token);
  
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.rol === 'ADMIN'); // Actualiza el estado de admin
      setUserName(decoded.nombre_usuario); // Actualiza el nombre del usuario
      setShowModal(false);
    } catch (error) {
      alert('Login fallido');
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleOpenRegister = () => {
    setShowRegisterModal(true); // Abrir modal de registro
  };

  return (
    <div>
      {/* Modal Login */}
      {showModal && (
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
                  onChange={handleCheckboxChange} // Asegúrate de usar esta función
                />
                <label htmlFor="rememberMe">Recordarme</label>
              </div>
              <button type="submit">Iniciar Sesión</button>
            </form>
            <div className="links">
              {/* Abrir modal de registro al hacer clic */}
              <button onClick={handleOpenRegister} className="link-button">
                ¿No tienes cuenta? Regístrate
              </button>
              <a href="/olvide-mi-contrasena">¿Olvidaste tu contraseña?</a>
            </div>
            <button className="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal Register */}
      {showRegisterModal && (
        <Register showModal={showRegisterModal} setShowModal={setShowRegisterModal} />
      )}

      {/* Sección de Productos */}
      <div>
        <h2>Productos</h2>
      </div>
      <div className="productos-container">
        {productos.map((producto) => (
          <div className="producto-card" key={producto._id}>
            <img src={producto.imagen_producto} alt={producto.nombre_producto} />
            <h3>{producto.nombre_producto}</h3>
            <p>{producto.descripcion_producto}</p>
            <p>Precio: ${producto.precio_producto}</p>
            <button>
              <Link to={`/detalle/${producto._id}`}>Ver Detalle</Link>
            </button>
          </div>
        ))}
      </div>

      {/* Botones Condicionales */}
      <div className="botones">
        {rolUsuario === 'ADMIN' ? (
          <button className="agregar-producto">Agregar Producto</button>
        ) : (
          <button className="carrito">Carrito</button>
        )}
      </div>
    </div>
  );
};

export default Home;


