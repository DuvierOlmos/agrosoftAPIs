// features/users/services/userService.js

const API_URL = "http://localhost:3001/api/users/admin"; // ⚡ cambia la URL a la de tu backend

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
        try {
            // El servidor debería devolver un objeto JSON con { message: "..." }
            const errorDetail = await response.json(); 
            errorMessage = errorDetail.message || errorMessage;
        } catch (e) {
        }
        
      
        throw new Error(errorMessage); 
    }
    return await response.json();
}



export async function updateUser(id, userData) {   
    
    const dataToSend = { ...userData };
    if (dataToSend.password_hash === "" || dataToSend.password_hash === undefined) {
        delete dataToSend.password_hash;
    }    
    const url = `${API_URL}/update/${id}`; 

    const response = await fetch(url, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(dataToSend),
    });


    if (!response.ok) {
        let errorMessage = `Error al actualizar usuario (Status: ${response.status}).`;
        try {
            const errorDetail = await response.json();
            errorMessage = errorDetail.message || errorMessage;
        } catch (e) { }
        

        throw new Error(errorMessage); 
    }
    
    return await response.json();
}


export async function deleteUser(id) {
    
    const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
    });

   
    if (!response.ok) {
        let errorMessage = `Error al eliminar usuario (Status: ${response.status}).`;        
        try {
            const errorDetail = await response.json();             
            errorMessage = errorDetail.message || errorMessage; 
        } catch (e) {          
        }        
        alert(` Falló la eliminación: ${errorMessage}`);
        throw new Error(errorMessage);
    }
    
    alert(" Usuario eliminado con éxito.");
    
   
    if (response.status === 204) {
        return { message: "Usuario eliminado con éxito." };
    }
    return await response.json();
}

export default userService;