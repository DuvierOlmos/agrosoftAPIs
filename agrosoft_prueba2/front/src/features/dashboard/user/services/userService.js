// features/users/services/userService.js

const API_URL = "http://localhost:3001/api/users/admin"; // ⚡ cambia la URL a la de tu backend

// Agrupa las funciones en un objeto
const userService = {
  getUsers,
  updateUser,
  deleteUser,
};

// === READ ===

export async function getUsers() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener usuarios");
  return await response.json();
}

// === CREATE ===
export async function createUser(userData) {
  const response = await fetch("http://localhost:3001/api/users/admin/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre_usuario: userData.nombre_usuario,
      password_hash: userData.password_hash,
      correo_electronico: userData.correo_electronico,
      id_rol: userData.id_rol,  // 👈 se envía ID
      documento_identidad: userData.documento_identidad,
      estado: userData.estado,
    }),
  });
  if (!response.ok) throw new Error("Error al crear usuario");
  return await response.json();
}


// === UPDATE ===
export async function updateUser(id, userData) {
    
    // 1. Limpieza de datos (para no enviar password vacía)
    const dataToSend = { ...userData };
    if (dataToSend.password_hash === "" || dataToSend.password_hash === undefined) {
        delete dataToSend.password_hash;
    }
    
    // 2. Construcción de la URL: /api/users/admin/update/ID
    const url = `${API_URL}/update/${id}`; 

    const response = await fetch(url, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            //'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify(dataToSend),
    });

    // 3. Manejo de Error de Respuesta (4xx, 5xx)
    if (!response.ok) {
        let errorMessage = `Error al actualizar usuario (Status: ${response.status}).`;
        try {
            const errorDetail = await response.json();
            errorMessage = errorDetail.message || errorMessage;
        } catch (e) { /* No hay JSON de error */ }
        
        // 🛑 Lanza el error que es capturado por el componente de React.
        throw new Error(errorMessage); 
    }
    
    return await response.json();
}

// === DELETE ===
export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar usuario");
  return await response.json();
}

export default userService;