import React from "react";

const TablaVentas = ({ ventas }) => (
    <table style={styles.table}>
        <thead>
            <tr>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
            {ventas.map((venta, index) => (
                <tr key={index}>
                    <td>{venta.cliente}</td>
                    <td>{venta.producto}</td>
                    <td>{venta.cantidad}</td>
                    <td>${venta.total}</td>
                    <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const styles = {
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
    },
    th: {
        backgroundColor: "#f4f4f4",
        padding: "10px",
        border: "1px solid #ddd",
    },
    td: {
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "center",
    },
};

export default TablaVentas;