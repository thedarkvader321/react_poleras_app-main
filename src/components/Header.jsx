import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const mostrarOcultarMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const select = () => {
    setMenuVisible(false);
  };

  return (
    <div className="contenedor-header">
      <header>
        <div className="logo">
          <Link to="/">Confecciones Moni</Link>
        </div>
        <div className="nav-responsive" onClick={mostrarOcultarMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <nav id="nav" className={menuVisible ? "responsive" : ""}>
          <ul>
            <li>
              <Link to="/" onClick={select}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="#sobremi" onClick={select}>
                Poleras
              </Link>
            </li>
            <li>
              <Link to="/agregar-poleras" onClick={select}>
                Agregar Poleras
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
