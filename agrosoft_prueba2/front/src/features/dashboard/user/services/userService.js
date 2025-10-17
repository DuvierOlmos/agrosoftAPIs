// features/users/services/userService.js

const API_URL = "http://localhost:3001/api/users/admin"; // ⚡ cambia la URL a la de tu backend

// Agrupa las funciones en un objeto
const userService = {
  getUsers,
  updateUser,
  deleteUser,
  createUser
};

// === READ ===

export async function getUsers() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener usuarios");
  return await response.json();
}


export async function createUser(userData) {
    const API_URL = "http://localhost:3001/api/users/admin"; 
    
    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        let errorMessage = `Error al crear usuario (Status: ${response.status}).`;
        
        // 🟢 INTENTA LEER EL MENSAJE DE ERROR DEL SERVIDOR
        try {
            // El servidor debería devolver un objeto JSON con { message: "..." }
            const errorDetail = await response.json(); 
            errorMessage = errorDetail.message || errorMessage;
        } catch (e) {
            // Si el servidor devuelve un 500 sin JSON válido, usamos el mensaje por defecto.
        }
        
        // 🛑 Lanza un nuevo Error con el mensaje específico (lo que ves en tu consola)
        throw new Error(errorMessage); 
    }
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
// src/services/userService.js (o similar)

// Asumimos que API_URL está definido en este archivo.
// const API_URL = "http://localhost:3001/api/users/admin"; 

// src/services/userService.js (o similar)

// Asegúrate de que API_URL esté definida
// const API_URL = "http://localhost:3001/api/users/admin"; 

export async function deleteUser(id) {
    
    const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
        // Aquí irían tus headers de autenticación si usas JWT
        // headers: { 'Authorization': `Bearer ${getToken()}` },
    });

    // 1. Manejo de Fallo (Status 4xx o 5xx)
    if (!response.ok) {
        let errorMessage = `Error al eliminar usuario (Status: ${response.status}).`;
        
        try {
            const errorDetail = await response.json(); 
            // Usamos el mensaje del servidor si está disponible
            errorMessage = errorDetail.message || errorMessage; 
        } catch (e) {
            // Si no se puede leer el JSON de error, se usa el mensaje por defecto
        }
        
        //  ALERTA DE ERROR
        alert(` Falló la eliminación: ${errorMessage}`);
        
        // Lanzamos un Error para que el componente que llama también lo capture
        throw new Error(errorMessage);
    }
    
    // 2. Manejo de Éxito (Status 200 o 204)
    
    // 🚨 ALERTA DE ÉXITO
    alert(" Usuario eliminado con éxito.");
    
    // Los endpoints DELETE a menudo devuelven 204 No Content
    if (response.status === 204) {
        return { message: "Usuario eliminado con éxito." };
    }
    
    // Si hay un cuerpo de respuesta válido (ej., 200 OK con mensaje)
    return await response.json();
}

export default userService;