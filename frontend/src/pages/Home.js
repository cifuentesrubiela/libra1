import React, { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { CarritoContext } from '../context/CarritoContext';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Register from './Register';
import '../styles.css';

const Home = ({ showModal, setShowModal, setIsAdmin, rolUsuario, setUserName, setUsuario }) => {
  const [form, setForm] = useState({ correo_usuario: '', password: '', rememberMe: false });
  const [productos, setProductos] = useState([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [idUsuario, setIdUsuario] = useState(null);
  const { agregarProducto } = useContext(CarritoContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Si se llega con el state openLogin y no hay usuario logueado, activar el modal de inicio de sesión
  useEffect(() => {
    if (location.state && location.state.openLogin && !idUsuario) {
      setShowModal(true);
    }
  }, [location, setShowModal, idUsuario]);

  // Cierra el modal automáticamente cuando se establece el idUsuario (login exitoso)
  // Este efecto debe ejecutarse DESPUÉS de que idUsuario haya cambiado
  useEffect(() => {
    if (idUsuario) {
      console.log("Usuario autenticado con ID:", idUsuario, "cerrando modal...");
      // Usar setTimeout para asegurar que el cierre ocurra después de que el DOM se actualice
      setTimeout(() => {
        setShowModal(false);
      }, 0);
    }
  }, [idUsuario, setShowModal]);

  const handleAgregarProducto = (producto) => {
    if (!idUsuario) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }
    agregarProducto(producto);
  };

  // Función para manejar el clic en "Ver Detalle"
  const handleVerDetalle = (productoId) => {
    navigate(`/detalle/${productoId}`);
  };

  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos', error);
    }
  };

  const iniciarSesion = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', form);
      console.log("Respuesta del backend:", response);
      const token = response.data.token;

      if (token) {
        // Guardar el token
        localStorage.setItem('token', token);
        
        // Verificar que se guardó correctamente
        const storedToken = localStorage.getItem('token');
        console.log("Token almacenado en localStorage:", storedToken);
        
        if (storedToken === token) {
          try {
            const decoded = jwtDecode(token);
            console.log("Token decodificado correctamente:", decoded);
            
            // Actualizar todos los estados ANTES de cerrar el modal
            setIdUsuario(decoded.id);
            setIsAdmin(decoded.rol === 'ADMIN');
            setUserName(decoded.nombre_usuario);
            setUsuario(decoded);
            
            // Forzar el cierre del modal directamente aquí
            console.log("Cerrando modal de login...");
            setShowModal(false);
            
            // Disparar evento de storage
            window.dispatchEvent(new Event('storage'));
          } catch (decodeError) {
            console.error("Error al decodificar token:", decodeError);
            alert("Error al procesar la sesión");
          }
        } else {
          console.error('Error al almacenar el token: el valor recuperado no coincide');
          alert('Error al guardar la sesión');
        }
      } else {
        alert('Token no recibido');
      }
    } catch (error) {
      alert('Usuario o Contraseña invalida');
      console.error('Error en el login:', error);
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      console.log("Home.js - Token en localStorage:", token);
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setIdUsuario(decoded.id);
          console.log("ID de usuario desde el token:", decoded.id);
          setIsAdmin(decoded.rol === 'ADMIN');
          setUserName(decoded.nombre_usuario);
          setUsuario(decoded);
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          localStorage.removeItem('token');
          setIdUsuario(null);
        }
      } else {
        console.log('No se encontró token en localStorage (Home.js)');
        // Reiniciar el estado si no hay token
        setIdUsuario(null);
        setIsAdmin(false);
        setUserName(null);
        setUsuario(null);
      }
    };

    // Verificar al montar
    checkToken();
    
    // También verificar cuando cambia el almacenamiento (por ejemplo, en otra pestaña)
    window.addEventListener('storage', checkToken);
    
    // Obtener productos al montar el componente
    obtenerProductos();
    
    // Limpiar
    return () => window.removeEventListener('storage', checkToken);
  }, [setIsAdmin, setUserName, setUsuario]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setForm({ ...form, rememberMe: e.target.checked });
  };

  return (
    <div>
      {/* Modal de inicio de sesión - Añadimos un check para idUsuario */}
      {showModal && !idUsuario && (
        <div className="modal">
          <div className="modal-content">
            <h2>Iniciar Sesión</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                iniciarSesion();
              }}
            >
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
            <button onClick={() => setShowRegisterModal(true)}>
              ¿No tienes cuenta? Regístrate
            </button>
            <button className="cancel-button" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Registro */}
      {showRegisterModal && (
        <Register showModal={showRegisterModal} setShowModal={setShowRegisterModal} />
      )}

      {/* Productos */}
      <div>
        <h2>Productos</h2>
        <div className="productos-container">
          {productos.map((producto) => (
            <div className="producto-card" key={producto._id}>
              <img src={producto.imagen_producto} alt={producto.nombre_producto} />
              <h3>{producto.nombre_producto}</h3>
              <p>{producto.descripcion_producto}</p>
              <p>Precio: ${producto.precio_producto}</p>
              <p>Cantidad: {producto.cantidad_producto}</p>
              <button onClick={() => handleAgregarProducto(producto)}>
                Añadir al Carrito
              </button>
              {/* Reemplazar Link por button */}
              <button 
                className="btn-ver-detalle" 
                onClick={() => handleVerDetalle(producto._id)}
              >
                Ver Detalle
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Botones adicionales */}
      <div>
        {rolUsuario === 'ADMIN' ? (
          <button>Agregar Producto</button>
        ) : (
          <Link to="/carrito">Ir al Carrito</Link>
        )}
      </div>
    </div>
  );
};

export default Home;