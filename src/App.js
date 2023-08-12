import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AgregarPolera } from "./components/AgregarPolera";
import { MostrarPolera } from "./components/MostrarPolera";
import { Header } from "./components/Header"; // Importa el componente Header
import { Inicio } from "./components/Inicio";

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Agrega el componente Header con los enlaces Link */}
        <Routes>
          <Route path="/" element={<Inicio/>} />
          <Route path="/mostrar-poleras" element={<MostrarPolera/>} />
          <Route path="/agregar-poleras" element={<AgregarPolera />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
