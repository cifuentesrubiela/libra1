import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GestionProductos.css';

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    descripcion_producto: '',
    precio_producto: 0,
    categoria_producto: '',
    imagen_producto: ''
  });

  // Función para obtener los productos desde la API
  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos', error);
    }
  };

  // Función para agregar un nuevo producto
  const agregarProducto = async () => {
    try {
      await axios.post('http://localhost:4000/api/productos', nuevoProducto);
      setNuevoProducto({
        nombre_producto: '',
        descripcion_producto: '',
        precio_producto: 0,
        categoria_producto: '',
        imagen_producto: ''
      });
      obtenerProductos(); // Refrescar la lista de productos
    } catch (error) {
      console.error('Error al agregar producto', error);
    }
  };

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/productos/${id}`);
      obtenerProductos(); // Refrescar la lista de productos
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  };

  // Función para manejar la edición de un producto
  const editarProducto = (producto) => {
    setNuevoProducto(producto); // Poner el producto seleccionado en el formulario
  };

  useEffect(() => {
    obtenerProductos(); // Obtener productos al cargar la página
  }, []);

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <div>
        <h2>{nuevoProducto._id ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nuevoProducto.nombre_producto}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre_producto: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoProducto.descripcion_producto}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion_producto: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoProducto.precio_producto}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio_producto: e.target.value })}
        />
        <input
          type="text"
          placeholder="Categoría"
          value={nuevoProducto.categoria_producto}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria_producto: e.target.value })}
        />
        <input
          type="text"
          placeholder="Imagen URL"
          value={nuevoProducto.imagen_producto}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen_producto: e.target.value })}
        />
        <button onClick={agregarProducto}>
          {nuevoProducto._id ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </div>

      <h2>Productos Disponibles</h2>
      <div className="productos-container">
        {productos.map((producto) => (
          <div className="producto-card" key={producto._id}>
            <img src={producto.imagen_producto} alt={producto.nombre_producto} />
            <h3>{producto.nombre_producto}</h3>
            <p>{producto.descripcion_producto}</p>
            <p>Precio: ${producto.precio_producto}</p>
            <p>Categoría: {producto.categoria_producto}</p>
            <button onClick={() => editarProducto(producto)}>Editar</button>
            <button onClick={() => eliminarProducto(producto._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionProductos;


