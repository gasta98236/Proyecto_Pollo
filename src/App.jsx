import React from "react";
import "./Styles.css";
import logo from "./images/Logo.jpg";

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li><a href="#">Menú</a></li>
          <li><a href="#">Promociones</a></li>
          <li><a href="#">Salida</a></li>
        </ul>
      </nav>
      <main>
        <h1>Bienvenido a nuestra aplicación</h1>
      </main>
    </div>
  );
}

export default App;

