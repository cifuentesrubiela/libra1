/* GestionProductos.js */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css'; 

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    descripcion_producto: '',
    precio_producto: 0,
    categoria_producto: '',
    imagen_producto: ''
  });

  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos', error);
    }
  };

  const guardarProducto = async () => {
    try {
      if (nuevoProducto._id) {
        await axios.put(`http://localhost:4000/api/productos/${nuevoProducto._id}`, nuevoProducto);
      } else {
        await axios.post('http://localhost:4000/api/productos', nuevoProducto);
      }
      cerrarModal();
      obtenerProductos();
    } catch (error) {
      console.error('Error al guardar el producto', error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  };

  const editarProducto = (producto) => {
    setNuevoProducto(producto);
    setModalVisible(true);
  };

  const abrirModal = () => setModalVisible(true);
  const cerrarModal = () => {
    setNuevoProducto({
      nombre_producto: '',
      descripcion_producto: '',
      precio_producto: 0,
      categoria_producto: '',
      imagen_producto: ''
    });
    setModalVisible(false);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div>
      <div className="header">
        <img src="header-logo.png" alt="Logo de Libelula Dorada" />
        <h1>Libelula Dorada</h1>
      </div>
      <h2>Productos Disponibles</h2>
      <div className="container">
        <button class="button-primary agregar-producto" onClick={abrirModal}>Agregar Producto</button>
        
        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
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
              <button onClick={guardarProducto}>Guardar</button>
              <button className="cancel-button" onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        )}

       
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
    </div>
  );
};

export default GestionProductos;