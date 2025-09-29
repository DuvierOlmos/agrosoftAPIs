import React, { useState } from "react";
import { createCategory } from "../services/categoryService";
import "../styles/CategoryForm.css";

export default function CategoryForm({ show, onClose }) {
  const [form, setForm] = useState({
    nombre_categoria: "",
    estado: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(form);
      console.log("Categoría creada:", form);
      onClose();
    } catch (err) {
      console.error("Error al crear categoría:", err);
    }
  };

  return (
    <div className={`modal_user-overlay ${show ? "show" : ""}`}>
      <div className="modal_user">
        <h2>Nueva Categoría</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de Categoría</label>
          <input
            type="text"
            name="nombre_categoria"
            value={form.nombre_categoria}
            onChange={handleChange}
            required
          />

          <label>Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Guardar</button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
