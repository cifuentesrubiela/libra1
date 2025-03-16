import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

const Producto = ({ producto, usuario }) => {
  const { agregarProducto } = useContext(CarritoContext);

  const handleAgregarAlCarrito = () => {
    if (!usuario || !usuario.id) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }
    agregarProducto(producto);
  };

  return (
    <div className="producto">
      <h3>{producto.nombre_producto}</h3>
      <p>Precio: ${producto.precio_producto}</p>
      <button onClick={handleAgregarAlCarrito}>Agregar al Carrito</button>
    </div>
  );
};

export default Producto;
