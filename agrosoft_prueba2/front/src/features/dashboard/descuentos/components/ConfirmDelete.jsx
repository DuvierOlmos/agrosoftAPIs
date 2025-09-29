import React from "react";
import "../styles/ConfirmDelete.css";

export default function ConfirmDelete({ show, discountId, onClose }) {
  if (!show) return null;

  const handleDelete = () => {
    console.log("Eliminar descuento con ID:", discountId);
    onClose();
  };

  return (
    <div className="modal_user-overlay show">
      <div className="modal_user">
        <h2>Confirmar eliminación</h2>
        <p>¿Seguro que deseas eliminar el descuento con ID {discountId}?</p>
        <div className="form-actions">
          <button className="btn-danger" onClick={handleDelete}>
            Eliminar
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
