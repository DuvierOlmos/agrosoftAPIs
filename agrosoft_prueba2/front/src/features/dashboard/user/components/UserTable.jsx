import React, { useState, useEffect } from "react";

import userService from "../services/userService"; 
import UserEditForm from "./UserEditForm";
import ConfirmDelete from "./ConfirmDelete";
import "../styles/UserTable.css";

// Mapeo de Roles: IMPORTANTE: Ajusta estos IDs (1, 2, 3) para que coincidan con tu tabla 'roles'
const ROLE_MAP = {
  1: "Cliente",
  2: "Administrador",
  3: "Productor",
};

export default function UserManagementTable() {
  // 1. ESTADOS PARA LOS DATOS Y LA INTERFAZ
  const [users, setUsers] = useState([]); // ⬅️ Inicia vacío, se llenará con la API
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores de API
  
  // Estados para los modales
  const [editUser, setEditUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // ----------------------------------------------------------------------
  // LÓGICA DE CARGA DE DATOS DESDE LA API
  // ----------------------------------------------------------------------

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ➡️ LLAMADA AL BACKEND: Usa el servicio para obtener los datos
      const data = await userService.getUsers();
      
      setUsers(data); // Actualiza el estado con los datos de la base de datos
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      // Muestra un mensaje amigable al usuario
      setError(err.message || "Fallo la conexión con el servidor para obtener los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // El array vacío [] asegura que la función se ejecute SOLO una vez al montar el componente
  }, []); 

  // ----------------------------------------------------------------------
  // HANDLERS PARA MODIFICAR / ELIMINAR (Llaman a la API y recargan la lista)
  // ----------------------------------------------------------------------

  // Lógica para manejar la actualización (se pasa al UserEditForm)
  const handleUpdate = async (updatedData) => {
    // Ejemplo de llamada a la API (deberías refinar qué campos actualizas)
    try {
        await userService.updateUserRole(updatedData.id_usuario, updatedData.id_rol);
        
        setEditUser(null); // Cierra el modal
        alert('Usuario actualizado con éxito!');
        await fetchUsers(); // ⬅️ RECARGAR DATOS para ver el cambio
    } catch (err) {
        alert(`Error al actualizar: ${err}`);
    }
  };

  // Lógica para manejar la eliminación (se pasa al ConfirmDelete)
  const handleDeleteConfirm = async (id_usuario) => {
    try {
      await userService.deleteUser(id_usuario);
      
      setDeleteId(null); // Cierra el modal
      alert('Usuario eliminado con éxito!');
      await fetchUsers();
    } catch (err) {
      alert(`Error al eliminar: ${err}`);
    }
  };


  // ----------------------------------------------------------------------
  // RENDERIZADO CONDICIONAL
  // ----------------------------------------------------------------------
  
  if (loading) {
    return <div className="loading-message">Cargando usuarios desde la base de datos...</div>;
  }

  if (error) {
    return <div className="error-message">Error de la API: {error}</div>;
  }

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Usuario</th>
            <th>Correo Electrónico</th>
            <th>Documento Identidad</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* ➡️ Mapeamos el estado 'users' que ahora contiene los datos del backend */}
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id_usuario}>
                <td>{u.id_usuario}</td>
                <td>{u.nombre_usuario}</td>
                <td>{u.correo_electronico}</td>
                <td>{u.documento_identidad || "N/A"}</td>
                {/* Usamos el mapa para traducir el ID de rol a nombre */}
                <td>{ROLE_MAP[u.id_rol] || "Desconocido"}</td> 
                <td>{u.estado || "N/A"}</td>
                <td>
                  <button
                    className="btn-success"
                    onClick={() => setEditUser(u)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => setDeleteId(u.id_usuario)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay usuarios registrados en la base de datos.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modales - Ahora pasan la función de manejo de API */}
      {editUser && (
        <UserEditForm
          show={!!editUser}
          user={editUser}
          roles={ROLE_MAP} // Pasamos el mapa de roles para el selector
          onClose={() => setEditUser(null)}
          onSave={handleUpdate} // ⬅️ Nuevo prop para guardar y actualizar la tabla
        />
      )}
      {deleteId && (
        <ConfirmDelete
          show={!!deleteId}
          userId={deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDeleteConfirm} // ⬅️ Nuevo prop para confirmar eliminación
        />
      )}
    </div>
  );
}