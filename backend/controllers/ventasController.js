const Venta = require('../models/Venta');
const DetalleVenta = require('../models/DetalleVenta');

// Registrar una nueva venta
const registrarVenta = async (req, res) => {
  try {
    const { carrito, total, metodoPago, fk_id_usuario } = req.body;

    // Crear Detalles de Venta
    const detalles = await Promise.all(
      carrito.map(async (item) => {
        const detalle = new DetalleVenta({
          cantidad_detalle_venta: item.cantidad,
          precioUnitario_detalle_venta: item.precio_producto,
          total_detalle_venta: item.cantidad * item.precio_producto,
        });
        return await detalle.save();
      })
    );

    // Crear la Venta
    const nuevaVenta = new Venta({
      fecha_venta: new Date(),
      cantidad_venta: carrito.reduce((acc, item) => acc + item.cantidad, 0),
      total_venta: total,
      metodoPago_venta: metodoPago,
      fk_id_usuario,
      fk_id_detalle_venta: detalles.map((detalle) => detalle._id),
    });

    await nuevaVenta.save();

    res.status(201).json({ mensaje: 'Venta registrada con éxito', venta: nuevaVenta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar la venta' });
  }
};

// Obtener todas las ventas
const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().populate('fk_id_usuario').populate('fk_id_detalle_venta');
    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las ventas' });
  }
};

module.exports = { registrarVenta, obtenerVentas };
