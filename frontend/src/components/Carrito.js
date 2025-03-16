import React, { useContext, useEffect, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Carrito = ({ usuario, showLoginModal, setShowLoginModal, isAuthenticated }) => {
  const { carrito, eliminarProducto, limpiarCarrito } = useContext(CarritoContext);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Redirige al login si el usuario no está autenticado
  useEffect(() => {
    if (!usuario && !isAuthenticated) {
      console.log("Usuario no autenticado, redirigiendo a login");
      setShowLoginModal(true);
      navigate('/', { state: { openLogin: true } });
    }
  }, [usuario, isAuthenticated, navigate, setShowLoginModal]);

  // Calcular el total del carrito
  useEffect(() => {
    const suma = carrito.reduce((acc, producto) => {
      return acc + producto.precio_producto * (producto.cantidad || 1);
    }, 0);
    setTotal(suma);
  }, [carrito]);

  // Función para eliminar un producto
  const handleEliminarProducto = (id) => {
    eliminarProducto(id);
  };

  // Manejo de la compra
  const handleCompra = async () => {
    if (!usuario) {
      alert('Debes iniciar sesión para realizar una compra');
      navigate('/', { state: { openLogin: true } });
      return;
    }

    try {
      const venta = {
        id_usuario: usuario.id,
        productos: carrito.map(p => ({
          id_producto: p.id || p._id,
          cantidad: p.cantidad || 1,
          precio_unitario: p.precio_producto
        })),
        total: total
      };

      const response = await axios.post('http://localhost:4000/api/ventas', venta, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data) {
        alert('Compra realizada con éxito');
        limpiarCarrito();
        navigate('/');
      }
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Error al procesar la compra');
    }
  };

  return (
    <div className="carrito-container">
      <h2>Tu Carrito de Compras</h2>
      
      {/* Si el usuario no está autenticado */}
      {!usuario && (
        <div className="alerta">
          <p>¡Debes iniciar sesión para gestionar tu carrito!</p>
          <button onClick={() => {
            setShowLoginModal(true);
            navigate('/', { state: { openLogin: true } });
          }}>
            Iniciar Sesión
          </button>
        </div>
      )}

      {/* Mostrar contenido según si hay productos en el carrito */}
      {usuario && carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <table className="tabla-carrito">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map(producto => (
                <tr key={producto.id || producto._id}>
                  <td>{producto.nombre_producto}</td>
                  <td>${producto.precio_producto}</td>
                  <td>{producto.cantidad || 1}</td>
                  <td>${(producto.precio_producto * (producto.cantidad || 1)).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleEliminarProducto(producto.id || producto._id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-carrito">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={handleCompra}>Proceder a la Compra</button>
            <button onClick={limpiarCarrito}>Vaciar Carrito</button>
          </div>
        </>
      )}
      {/* Botón para volver a los productos */}
      <div className="volver-productos">
        <button onClick={() => navigate('/home')}>
          Volver a los productos
        </button>
      </div>
    </div>
  );
};

export default Carrito;












