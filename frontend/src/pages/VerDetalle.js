import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './VerDetalle.css';

const VerDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Envolver la función con useCallback para que no cambie en cada render
  const obtenerProducto = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/productos/${id}`);
      setProducto(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al obtener el producto');
      setLoading(false);
    }
  }, [id]); // Solo cambia si 'id' cambia

  useEffect(() => {
    obtenerProducto();
  }, [obtenerProducto]); // Ahora la advertencia desaparece ✅

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="detalle-container">
      <h2>Detalle del Producto</h2>
      {producto && (
        <div className="detalle-card">
          <img src={producto.imagen_producto} alt={producto.nombre_producto} />
          <h3>{producto.nombre_producto}</h3>
          <p>{producto.descripcion_producto}</p>
          <p>Precio: ${producto.precio_producto}</p>
          <p>Cantidad: {producto.cantidad_producto}</p>
          <p>Categoría: {producto.categoria_producto}</p>
          <button onClick={() => window.history.back()}>Regresar</button>
        </div>
      )}
    </div>
  );
};

export default VerDetalle;








