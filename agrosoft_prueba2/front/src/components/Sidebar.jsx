import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar({ onToggle }) {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    const newState = !open;
    setOpen(newState);
    if (onToggle) onToggle(newState); // avisamos al padre
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <aside className={`sidebar ${open ? "open" : "collapsed"}`}>
        <h2 className="sidebar-title">Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/Dahsboard/user">Usuarios</Link></li>
            <li><Link to="/Dahsboard/categorias">Categorías</Link></li>
            <li><Link to="/Dahsboard/descuentos">Descuentos</Link></li>
            <li><Link to="/Dahsboard/ordenes">Órdenes</Link></li>
            <li><Link to="/Dahsboard/pqrs">PQRS</Link></li>
            <li><Link to="/Dahsboard/products">Productos</Link></li>
            <li><Link to="/Dahsboard/roles">Roles</Link></li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
