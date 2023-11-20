"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isTeachers, setIsTeachers] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const user = JSON.parse(localStorage?.getItem("user"));
      if (user?.IdTipoUsuario == 1) setIsAdmin(true);
      if (user?.IdTipoUsuario == 2) setIsStudent(true);
      if (user?.IdTipoUsuario == 3) setIsTeachers(true);
    }
  }, [isAdmin, isStudent, isTeachers]);
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          {isAdmin && (
            <>
              <div className="sb-sidenav-menu-heading">Gestión de usuarios</div>
              <Link className="nav-link" href="/admin/user/listar">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Usuarios
              </Link>
              <Link className="nav-link" href="/admin/user/create">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Agregar Usuario
              </Link>
              <div className="sb-sidenav-menu-heading">Gestión de recursos</div>
              <Link className="nav-link" href="/admin/appeal/listar">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Recursos
              </Link>
              <Link className="nav-link" href="/admin/appeal/create">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Agregar Recurso
              </Link>
            </>
          )}
          {isStudent && (
            <>
              <div className="sb-sidenav-menu-heading">Solicitudes</div>
              <Link className="nav-link" href="/students/request/create">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Solicitar un préstamo
              </Link>
              <div className="sb-sidenav-menu-heading">Estado de solicitud</div>
              <Link className="nav-link" href="/student/estado">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Ver estado de solicitud
              </Link>
            </>
          )}
          {isTeachers && (
            <>
              <div className="sb-sidenav-menu-heading">Solicitudes</div>
              <Link className="nav-link" href="/teachers/request/create">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Solicitar un préstamo
              </Link>
              <div className="sb-sidenav-menu-heading">Estado de solicitud</div>
              <Link className="nav-link" href="/student/estado">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Ver estado de solicitud
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Menu;
