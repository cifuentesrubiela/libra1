import { jsPDF } from 'jspdf';

export const generarFactura = (carrito, total, metodoPago) => {
  const doc = new jsPDF();

  doc.text('Factura de Compra', 20, 20);
  doc.text(`Método de Pago: ${metodoPago}`, 20, 30);

  carrito.forEach((item, index) => {
    doc.text(`${item.nombre_producto} - Cantidad: ${item.cantidad} - Precio: $${item.precio_producto * item.cantidad}`, 20, 40 + index * 10);
  });

  doc.text(`Total: $${total}`, 20, 40 + carrito.length * 10 + 10);
  doc.save('factura.pdf');
};