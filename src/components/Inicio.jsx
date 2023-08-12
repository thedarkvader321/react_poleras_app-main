import React from "react";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Inicio = () => {
  return (
    <div>
      <Header />
      <div className="contenido">
        <section id="inicio" class="inicio">
          <div class="contenido-banner">
            <div class="contenido-img">
              <img src="https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg" alt="" />
              </div>          
            <h1>Monica Navarro</h1>
            <h2>Confecciones de Uniformers</h2>
            <div class="redes">
              <a href="#">
                <i>
                <FontAwesomeIcon icon={faInstagram} />
                </i>
              </a>
              <a href="#">
                <i>
                <FontAwesomeIcon icon={faFacebookF} />
                </i>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
