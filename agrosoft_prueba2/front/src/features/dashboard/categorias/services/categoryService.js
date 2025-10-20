import axios from "axios";

const API_URL = "http://localhost:3001/api/categories/admin";

export const createCategory = async (categoria) => {
    try {        
        const response = await axios.post(`${API_URL}/create`, categoria);        
        alert(` Categoría "${categoria.nombre_categoria || 'creada'}" con éxito.`);             
        return response.data;        
    } catch (error) {        
        let errorMessage = "Ocurrió un error inesperado al intentar crear la categoría.";        
        if (error.response) {            
            errorMessage = error.response.data.message || 
             `Fallo del servidor (Status: ${error.response.status}).`;
        } else if (error.request) {            
            errorMessage = "No se pudo conectar al servidor. Verifique la conexión.";
        }        
        alert(` Error al crear la categoría: ${errorMessage}`);        
        throw new Error(errorMessage);
    }
};

export const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateCategory = async (id, categoria) => {
    try {        
        const response = await axios.put(`${API_URL}/update/${id}`, categoria);       
        alert(` Categoría "${categoria.nombre_categoria || id}" actualizada con éxito.`);         
        return response.data;
      } catch (error) { 
        let errorMessage = "Ocurrió un error inesperado al intentar actualizar la categoría.";        
        if (error.response) {
          errorMessage = error.response.data.message || 
             `Fallo del servidor (Status: ${error.response.status}).`;
        } else if (error.request) {            
            errorMessage = "No se pudo conectar al servidor. Verifique que la API esté activa.";
        }      
        alert(` Error al actualizar la categoría: ${errorMessage}`);     
        throw new Error(errorMessage);
    }
};

export const deleteCategory = async (id) => {
    try {        
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        alert(` Categoría con ID ${id} eliminada con éxito.`);
        return response.data;        
    } catch (error) {       
        let errorMessage = "Ocurrió un error inesperado al intentar eliminar la categoría.";        
        if (error.response) {
            errorMessage = error.response.data.message || 
             `Fallo del servidor (Status: ${error.response.status}).`;
        } else if (error.request) {
            errorMessage = "No se pudo conectar al servidor. Verifique que la API esté activa.";
        }        
        alert(` Error al eliminar la categoría: ${errorMessage}`);        
        throw new Error(errorMessage);
    }
};


