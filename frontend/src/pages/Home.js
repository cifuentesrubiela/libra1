import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link

const Home = ({ showModal, setShowModal, setIsAdmin }) => {
  const [form, setForm] = useState({ correo_usuario: '', password: '', rememberMe: false });
  const [productos, setProductos] = useState([]); // Estado para los productos

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

      // Comprobar el rol para establecer isAdmin
      setIsAdmin(response.data.user.rol === 'ADMIN'); // Asumimos que 'ADMIN' es el rol de administrador
      setShowModal(false); // Cerrar el modal después de login exitoso
    } catch (error) {
      alert('Login fallido');
    }
  };

  const handleCancel = () => {
    setShowModal(false); // Cerrar el modal si el usuario hace clic en cancelar
  };

  return (
    <div>
      {/* Modal de Login */}
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
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="rememberMe">Recordarme</label>
              </div>

              <button type="submit">Iniciar Sesión</button>
            </form>

            <div className="links">
              <Link to="/register">
                <a href="#">¿No tienes cuenta? Regístrate</a>
              </Link>
              <a href="/olvide-mi-contrasena">¿Olvidaste tu contraseña?</a>
            </div>

            <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Productos */}
      <div className="productos-container">
        <h2>Productos</h2>
        {productos.map((producto) => (
          <div className="producto-card" key={producto._id}>
            <img src={producto.imagen_producto} alt={producto.nombre_producto} />
            <h3>{producto.nombre_producto}</h3>
            <p>{producto.descripcion_producto}</p>
            <p>Precio: ${producto.precio_producto}</p>
            <button>
              <Link to={`/detalle/${producto._id}`}>Ver Detalle</Link>
            </button>
            {/* <button>Ver Detalle</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;



