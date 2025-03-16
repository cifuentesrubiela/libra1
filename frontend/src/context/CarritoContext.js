import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto
export const CarritoContext = createContext();

// Hook personalizado para usar el contexto
export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [carritosPorUsuario, setCarritosPorUsuario] = useState({});
  const [total, setTotal] = useState(0);
  const [cantidadItems, setCantidadItems] = useState(0);
  const [cargando, setCargando] = useState(true);

  // Cargar carritos desde localStorage
  useEffect(() => {
    setCargando(true);
    try {
      const carritosGuardados = JSON.parse(localStorage.getItem('carritos')) || {};
      setCarritosPorUsuario(carritosGuardados);
    } catch (error) {
      console.error("Error al cargar carritos:", error);
      localStorage.removeItem('carritos');
    } finally {
      setCargando(false);
    }
  }, []);

  // Actualizar el carrito cuando cambia el usuario o los carritos guardados
  useEffect(() => {
    const userId = usuario?.id || 'anonimo';
    setCarrito(carritosPorUsuario[userId] || []);
  }, [usuario, carritosPorUsuario]);

  // Guardar carritos en localStorage
  useEffect(() => {
    localStorage.setItem('carritos', JSON.stringify(carritosPorUsuario));
  }, [carritosPorUsuario]);

  // Calcular total y cantidad de ítems
  useEffect(() => {
    const nuevoTotal = carrito.reduce((acc, item) => acc + item.precio_producto * item.cantidad, 0);
    setTotal(nuevoTotal);

    const nuevaCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    setCantidadItems(nuevaCantidad);
  }, [carrito]);

  // Efecto para limpiar el carrito al cerrar sesión (cuando usuario es null)
  useEffect(() => {
    if (!usuario) {
      // Reiniciamos el carrito a vacío
      setCarrito([]);
      // Opcional: Limpiamos la entrada para el usuario 'anonimo'
      setCarritosPorUsuario(prev => ({ ...prev, 'anonimo': [] }));
    }
  }, [usuario]);

  // Función para agregar producto (usa producto.id o producto._id)
  const agregarProducto = (producto) => {
    const prodId = producto.id || producto._id;
    if (!producto || !prodId) return;
    const userId = usuario?.id || 'anonimo';

    setCarritosPorUsuario((prev) => {
      const carritoActual = prev[userId] || [];
      const existe = carritoActual.find((item) => (item.id || item._id) === prodId);

      const nuevoCarrito = existe
        ? carritoActual.map((item) =>
            (item.id || item._id) === prodId ? { ...item, cantidad: item.cantidad + 1 } : item
          )
        : [...carritoActual, { ...producto, cantidad: 1 }];

      return { ...prev, [userId]: nuevoCarrito };
    });
  };

  const quitarProducto = (idProducto) => {
    const userId = usuario?.id || 'anonimo';

    setCarritosPorUsuario((prev) => {
      const carritoActual = prev[userId] || [];

      const nuevoCarrito = carritoActual
        .map((item) =>
          (item.id || item._id) === idProducto ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0);

      return { ...prev, [userId]: nuevoCarrito };
    });
  };

  const eliminarProducto = (idProducto) => {
    const userId = usuario?.id || 'anonimo';

    setCarritosPorUsuario((prev) => ({
      ...prev,
      [userId]: prev[userId]?.filter((item) => (item.id || item._id) !== idProducto) || []
    }));
  };

  const limpiarCarrito = () => {
    const userId = usuario?.id || 'anonimo';
    setCarritosPorUsuario((prev) => ({
      ...prev,
      [userId]: []
    }));
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        total,
        cantidadItems,
        cargando,
        agregarProducto,
        quitarProducto,
        eliminarProducto,
        limpiarCarrito,
        usuario,
        setUsuario
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};






