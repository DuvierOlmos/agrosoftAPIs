import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import PageUser from "../features/dashboard/user/pages/PageUser";
import PageCategoria from "../features/dashboard/categorias/pages/PageCategoria";
import PagePqrs from "../features/dashboard/pqrs/pages/pagePqrs";
import PageTipoPqrs from "../features/dashboard/tipoPqrs/pages/pageTipoPqrs";
import PageRoles from "../features/dashboard/roles/pages/PageRoles"; 

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
            <Route path="/Dahsboard/pqrs" element={<PagePqrs />} />
            <Route path="/Dahsboard/tipoPqrs" element={<PageTipoPqrs />} />
            <Route path="/Dahsboard/inventarios" element={<h1>Página de Productos</h1>} />
            <Route path="/Dahsboard/roles" element={<PageRoles/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
