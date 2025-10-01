// src/services/authService.js

import api from './api';

const login = async (correo_electronico, password) => {
  try {
    const response = await api.post('/auth/login', { correo_electronico, password });
    
    // Si la autenticación es exitosa, el backend devuelve el token y los datos del usuario.
    const { token, user } = response.data; 

    // Guardar el token en localStorage para que el interceptor de api.js lo use
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }

    return user;
  } catch (error) {
    // Re-lanzar el error para que el componente de Login lo maneje
    throw error.response.data.message || 'Error de conexión'; 
  }
};

const register = async (userData) => {
  try {
    // El backend espera datos del usuario (nombre, correo, password, etc.) y un id_rol
    const response = await api.post('/auth/register', userData);
    
    // Asumimos que no necesitamos loguear automáticamente después del registro,
    // pero devolvemos la respuesta.
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Error de conexión';
  }
};

const logout = () => {
  // Limpiar el token y el usuario del almacenamiento local
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const authService = {
  login,
  register,
  logout,
};

export default authService;