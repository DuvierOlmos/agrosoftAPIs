import React, { useState } from "react";
import CategoryEditForm from "./CategoryEditForm";
import ConfirmDelete from "./ConfirmDelete";
import "../styles/UserTable.css"; // Puedes renombrar luego a CategoryTable.css si quieres

export default function CategoryTable() {
  // 🔥 Categorías quemadas de prueba (simulando backend)
  const [categories, setCategories] = useState([
    {
      id_categoria: 1,
      nombre_categoria: "Frutas",
      estado: "activo",
    },
    {
      id_categoria: 2,
      nombre_categoria: "Verduras",
      estado: "inactivo",
    },
  ]);

  const [editCategory, setEditCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Categoría</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((c) => (
              <tr key={c.id_categoria}>
                <td>{c.id_categoria}</td>
                <td>{c.nombre_categoria}</td>
                <td>{c.estado}</td>
                <td>
                  <button
                    className="btn-success"
                    onClick={() => setEditCategory(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => setDeleteId(c.id_categoria)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay categorías registradas</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modales */}
      {editCategory && (
        <CategoryEditForm
          show={!!editCategory}
          category={editCategory}
          onClose={() => setEditCategory(null)}
        />
      )}
      {deleteId && (
        <ConfirmDelete
          show={!!deleteId}
          categoryId={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
