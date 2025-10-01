// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

// Hook personalizado para consumir el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Inicializamos el estado del usuario leyendo de localStorage al inicio
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Efecto para cargar el usuario al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (correo, password) => {
    const loggedUser = await authService.login(correo, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };
  
  // Función para verificar si el usuario tiene un rol específico (para rutas protegidas)
  const hasRole = (requiredRole) => {
      // Nota: id_rol=1 es típicamente 'Admin', ajusta según tu base de datos
      return user && user.id_rol === requiredRole; 
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};