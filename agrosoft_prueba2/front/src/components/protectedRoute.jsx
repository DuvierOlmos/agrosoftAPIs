// src/components/ProtectedRoute.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

// Propiedad 'requiredRole' es opcional y solo se usa para proteger rutas de Admin
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, isLoading, hasRole } = useAuth();

  if (isLoading) {
    // Puedes mostrar un Spinner/Loader aquí
    return <div>Cargando sesión...</div>; 
  }

  if (!isAuthenticated) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    // Si se requiere un rol y el usuario no lo tiene, redirigir a una página de acceso denegado
    // Nota: El rol 1 es usado como ejemplo de Administrador
    console.warn(`Acceso denegado. Rol actual: ${user?.id_rol}. Rol requerido: ${requiredRole}`);
    return <Navigate to="/dashboard" replace />;
  }

  // Si pasa todas las comprobaciones, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;