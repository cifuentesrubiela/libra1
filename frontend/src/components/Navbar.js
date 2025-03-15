// import React from 'react';
// import { Link } from 'react-router-dom'; // Importa Link para manejar la navegación

// const Navbar = ({ handleLoginClick }) => {
//   return (
//     <nav className="navbar">
//       <div className="logo">Libélula Dorada</div>
//       <button onClick={handleLoginClick}>Login</button>
//       <Link to="/register">
        
//       </Link>
//       <button>Carrito de Compras</button>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para manejar la navegación

const Navbar = ({ handleLoginClick }) => {
  return (
    <nav className="navbar">
      <div className="logo">Libélula Dorada</div>
      <button onClick={handleLoginClick}>Login</button>
      
      {/* Aquí utilizamos un Link para redirigir a la página de registro */}
      <Link to="/register">
        <button>Registrar</button> {/* Botón de registro */}
      </Link>

      <button>Carrito de Compras</button>
    </nav>
  );
};

export default Navbar;






