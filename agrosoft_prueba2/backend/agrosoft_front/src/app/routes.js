import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import PageUser from "../features/dashboard/user/pages/PageUser";
import PageCategoria from "../features/dashboard/categorias/pages/PageCategoria";
import PageDescuentos from "../features/dashboard/descuentos/pages/PageDescuentos";

export default function AppRoutes() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar onToggle={setSidebarOpen} />

        {/* Ajusta el margen dinámicamente */}
        <main className={`main-content ${sidebarOpen ? "shifted" : ""}`}>
          <Routes>
            <Route path="/Dahsboard/user" element={<PageUser />} />
            <Route path="/Dahsboard/categorias" element={<PageCategoria />} />
            <Route path="/Dahsboard/descuentos" element={<PageDescuentos />} />
            <Route path="/Dahsboard/ordenes" element={<h1>Página de Órdenes</h1>} />
            <Route path="/Dahsboard/pqrs" element={<h1>Página de PQRS</h1>} />
            <Route path="/Dahsboard/products" element={<h1>Página de Productos</h1>} />
            <Route path="/Dahsboard/roles" element={<h1>Página de Roles</h1>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
