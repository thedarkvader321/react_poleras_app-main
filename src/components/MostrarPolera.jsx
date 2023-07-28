import React from 'react';
import { Header } from './Header'; 

export const MostrarPolera = () => {
  // El resto del código del componente MostrarPolera
  
  return (
    <div>
      <Header />
      <div className="contenido">
        {/* Contenido que no se verá opacado por el Header */}
        <h2>MostrarPolera</h2>
        {/* Resto del contenido del componente */}
      </div>
    </div>
  );
};
