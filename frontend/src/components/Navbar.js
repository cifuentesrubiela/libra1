import React from 'react';

const Navbar = ({ handleLoginClick }) => {
  return (
    <nav className="navbar">
      <div className="logo">Libélula Dorada</div>
      <button onClick={handleLoginClick}>Login</button>
      <button>Carrito de Compras</button>
    </nav>
  );
};

export default Navbar;



