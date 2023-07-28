import React from 'react';
import { Link } from 'react-router-dom'; // Importamos el componente Link

export const Header = () => {
  return (
    <div className="contenedor-header">
      <header>
        <div className="logo">
          <Link to="/">Confecciones Moni</Link> {/* Utilizamos Link en lugar de <a> */}
        </div>
        <nav id="nav">
          <ul>
            <li>
              <Link to="/">Inicio</Link> {/* Utilizamos Link en lugar de <a> */}
            </li>
            <li>
              <Link to="#sobremi">Poleras</Link> {/* Utilizamos Link en lugar de <a> */}
            </li>
            <li>
              <Link to="/agregar-poleras">Agregar Poleras</Link> {/* Utilizamos Link en lugar de <a> */}
            </li>
          </ul>
        </nav>
        <div className="nav-responsive">
          <i className="fa-solid fa-bars"></i>
        </div>
      </header>
    </div>
  );
};

export default Header;
