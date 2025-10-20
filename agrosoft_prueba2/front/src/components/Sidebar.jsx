import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import "../styles/global.css";


export default function Sidebar({ onToggle }) {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    const newState = !open;
    setOpen(newState);
    if (onToggle) onToggle(newState); // avisamos al padre
  };

  return (
    <>
      <button className="hamburger-btn" onClick={toggleSidebar}>
        ☰
      </button>
      

      <aside className={`sidebar ${open ? "open" : "collapsed"}`}>
        <h2 className="sidebar-title">Admin</h2>

        <div className="logo">
          <img src="/resources/logo.jpg" alt="logo" />
        </div>

        
        <nav>
          <ul>
            <li><Link to="/Dahsboard/user">Usuarios</Link></li>
            <li><Link to="/Dahsboard/categorias">Categorías</Link></li>
            <li><Link to="/Dahsboard/pqrs">PQRS</Link></li>
            <li><Link to="/Dahsboard/tipoPqrs">Tipos de PQRS</Link></li>
            <li><Link to="/Dahsboard/roles">Roles</Link></li>
            <li><Link to="/Dahsboard/reportes">Reportes</Link></li>
          </ul>
        </nav>
        <br />
        <br /><br /><br /><br /><br />

        
      </aside>
      
    </>

    
  );
}
