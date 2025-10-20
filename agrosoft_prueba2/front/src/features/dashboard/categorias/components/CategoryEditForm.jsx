import React, { useState, useEffect } from "react";
import { updateCategory } from "../services/categoryService";
import "../styles/UserEditForm.css"; 

export default function CategoryEditForm({ show, onClose, category, onSave }) {
  const [form, setForm] = useState({
    id_categoria: "",
    nombre_categoria: "",
  });
  useEffect(() => {
    if (category) {
      setForm({
        nombre_categoria: category.nombre_categoria || "",        
      });
    }
  }, [category]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateCategory(category.id_categoria, form);
      console.log("Categoría actualizada:", updated);
      onClose();      
    } catch (err) {
      console.error("Error al actualizar categoría:", err);
      alert("No se pudo actualizar la categoría");
    }
  };

  return (
    <div className={`modal_user-overlay ${show ? "show" : ""}`}>
      <div className="modal_user">
        <h2>Editar Categoría</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre Categoría</label>
          <input
            type="text"
            name="nombre_categoria"
            value={form.nombre_categoria}
            onChange={handleChange}
            required
          />
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Guardar Cambios
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
