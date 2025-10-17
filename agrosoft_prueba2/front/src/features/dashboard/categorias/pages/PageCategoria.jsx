import React, { useState } from "react";
import Table from "../components/Table";
import UserForm from "../components/Form";
import "../styles/PageCategoria.css";

export default function PageCategoria() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Gestión de Categorias</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Nueva Categoria
        </button>
      </header>

      <Table />
      

      {/* modal_user siempre montado, pero visible según showForm */}
      <UserForm show={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
}
