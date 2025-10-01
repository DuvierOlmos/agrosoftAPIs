// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

function App2() {
  return (
    // El AuthProvider debe envolver todas las rutas que lo necesiten
    <AuthProvider> 
      <Router>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Rutas Protegidas (Para Clientes y Administradores) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Rutas Protegidas solo para Administradores */}
          <Route 
            path="./admin/pqrs" 
            element={
              <ProtectedRoute requiredRole={1}> {/* Asumiendo id_rol=1 es Admin */}
                {/* Componente que listará PQRS */}
                {/* <AdminPqrsListPage /> */}
                <div>Vista de Administración de PQRS</div>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="./admin/userManagementPage.jsx" 
            element={
              <ProtectedRoute requiredRole={1}> 
                <userManagementPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Otras rutas */}
          <Route path="/" element={<div>Bienvenido a Agrosoft</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App2;