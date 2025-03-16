import React, { useContext } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';

const Producto = ({ producto, usuario }) => {
  const { agregarProducto } = useCarrito();
  const navigate = useNavigate();

  const handleAgregarAlCarrito = () => {
    if (!usuario || !usuario.id) {
      // Redirigir al Home y pasar state para activar el modal de login
      navigate('/home', { state: { openLogin: true } });
      return;
    }
    agregarProducto(producto);
  };

  return (
    <div className="producto">
      <h3>{producto.nombre_producto}</h3>
      <p>Precio: ${producto.precio_producto}</p>
      <button onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
    </div>
  );
};

export default Producto;
