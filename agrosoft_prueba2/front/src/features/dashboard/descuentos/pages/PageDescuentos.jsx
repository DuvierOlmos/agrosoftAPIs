import React, { useState } from "react";
import UserTable from "../components/DiscountTable";
import UserForm from "../components/UserForm";
import "../styles/PageCategoria.css";

export default function PageDescuentos() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Gestión de Descuentos</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Nuevo Descuento
        </button>
      </header>

      <UserTable />
      

      {/* modal_user siempre montado, pero visible según showForm */}
      <UserForm show={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
}
