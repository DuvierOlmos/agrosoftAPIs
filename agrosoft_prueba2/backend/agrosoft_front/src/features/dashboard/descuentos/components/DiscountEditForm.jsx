import React, { useState, useEffect } from "react";
import { updateDiscount } from "../services/discountService";
import "../styles/UserEditForm.css";

export default function DiscountEditForm({ show, onClose, discount }) {
  const [form, setForm] = useState({
    nombre_descuento: "",
    tipo_descuento: "",
    valor_descuento: "",
    fecha_inicio: "",
    fecha_fin: "",
    codigo_descuento: "",
    activo: 1,
  });

  useEffect(() => {
    if (discount) {
      setForm({
        nombre_descuento: discount.nombre_descuento || "",
        tipo_descuento: discount.tipo_descuento || "",
        valor_descuento: discount.valor_descuento || "",
        fecha_inicio: discount.fecha_inicio || "",
        fecha_fin: discount.fecha_fin || "",
        codigo_descuento: discount.codigo_descuento || "",
        activo: discount.activo || 0,
      });
    }
  }, [discount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateDiscount(discount.id_descuento, form);
      console.log("Descuento actualizado:", updated);
      onClose();
    } catch (err) {
      console.error("Error al actualizar descuento:", err);
      alert("No se pudo actualizar el descuento");
    }
  };

  return (
    <div className={`modal_user-overlay ${show ? "show" : ""}`}>
      <div className="modal_user">
        <h2>Editar Descuento</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre_descuento"
            value={form.nombre_descuento}
            onChange={handleChange}
            required
          />

          <label>Tipo</label>
          <select
            name="tipo_descuento"
            value={form.tipo_descuento}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione tipo</option>
            <option value="porcentaje">Porcentaje</option>
            <option value="cantidad">Cantidad</option>
          </select>

          <label>Valor</label>
          <input
            type="number"
            step="0.01"
            name="valor_descuento"
            value={form.valor_descuento}
            onChange={handleChange}
            required
          />

          <label>Fecha Inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            value={form.fecha_inicio}
            onChange={handleChange}
            required
          />

          <label>Fecha Fin</label>
          <input
            type="date"
            name="fecha_fin"
            value={form.fecha_fin}
            onChange={handleChange}
            required
          />

          <label>Código</label>
          <input
            type="text"
            name="codigo_descuento"
            value={form.codigo_descuento}
            onChange={handleChange}
            required
          />

          <label>Activo</label>
          <select
            name="activo"
            value={form.activo}
            onChange={handleChange}
            required
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Guardar Cambios
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
