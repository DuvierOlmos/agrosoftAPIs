import React, { useState } from "react";
import DiscountEditForm from "./DiscountEditForm";
import ConfirmDelete from "./ConfirmDelete";
import "../styles/UserTable.css"; // puedes crear DiscountTable.css si quieres

export default function DiscountTable() {
  // 🔥 Descuentos quemados de prueba
  const [discounts, setDiscounts] = useState([
    {
      id_descuento: 1,
      nombre_descuento: "Descuento Verano",
      tipo_descuento: "porcentaje",
      valor_descuento: 15.5,
      fecha_inicio: "2024-07-01",
      fecha_fin: "2024-07-31",
      codigo_descuento: "VERANO2024",
      activo: 1,
    },
    {
      id_descuento: 2,
      nombre_descuento: "2x1 Productos",
      tipo_descuento: "cantidad",
      valor_descuento: 1,
      fecha_inicio: "2024-08-01",
      fecha_fin: "2024-08-15",
      codigo_descuento: "2X1AGOSTO",
      activo: 0,
    },
  ]);

  const [editDiscount, setEditDiscount] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Código</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {discounts.length > 0 ? (
            discounts.map((d) => (
              <tr key={d.id_descuento}>
                <td>{d.id_descuento}</td>
                <td>{d.nombre_descuento}</td>
                <td>{d.tipo_descuento}</td>
                <td>{d.valor_descuento}</td>
                <td>{d.fecha_inicio}</td>
                <td>{d.fecha_fin}</td>
                <td>{d.codigo_descuento}</td>
                <td>{d.activo ? "Sí" : "No"}</td>
                <td>
                  <button
                    className="btn-success"
                    onClick={() => setEditDiscount(d)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => setDeleteId(d.id_descuento)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No hay descuentos registrados</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modales */}
      {editDiscount && (
        <DiscountEditForm
          show={!!editDiscount}
          discount={editDiscount}
          onClose={() => setEditDiscount(null)}
        />
      )}
      {deleteId && (
        <ConfirmDelete
          show={!!deleteId}
          discountId={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
