import React, { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { generarFactura } from '../utils/FacturaGenerator';
import {jwtDecode} from 'jwt-decode'; // Importación correcta de jwt-decode

const GestionVentas = () => {
  // Contexto del carrito, con un valor por defecto para evitar errores
  const { carrito = [], limpiarCarrito } = useContext(CarritoContext);
  const [metodoPago, setMetodoPago] = useState('Efectivo');

  // Calcular el total asegurándonos de que el carrito no sea undefined
  const total = carrito.reduce((acc, item) => acc + item.precio_producto * item.cantidad, 0);

  const finalizarVenta = () => {
    const token = localStorage.getItem('token');
    let idUsuario = null;

    // Decodificar el token si existe
    try {
      if (token) {
        const decoded = jwtDecode(token);
        idUsuario = decoded.id_usuario;
      }
    } catch (error) {
      alert('Token inválido. Inicia sesión nuevamente.');
      return;
    }

    // Verificar si se pudo obtener el ID de usuario
    // if (!idUsuario) {
    //   alert('Inicia sesión para finalizar la venta.');
    //   return;
    // }

    // Generar factura y limpiar carrito
    generarFactura(carrito, total, metodoPago);
    limpiarCarrito(idUsuario);
    alert('Venta finalizada y factura generada.');
  };

  return (
    <div className="gestion-ventas">
      <h1>Gestión de Ventas</h1>
      <p>Total a Pagar: ${total.toFixed(2)}</p>
      <label>
        Método de Pago:
        <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
        </select>
      </label>
      <button onClick={finalizarVenta}>Generar Factura</button>
    </div>
  );
};

export default GestionVentas;

