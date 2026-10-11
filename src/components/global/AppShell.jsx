import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { useSession } from "../../app/SessionContext";
import { roleHome } from "../../shared/session";
import Logo from "../../assets/img/logo.png";

const navigation = {
  USER: [
    { to: "/bookings", label: "Mis citas", detail: "/bookingDetails/" },
    { to: "/scheduleBooking", label: "Agendar cita" },
    { to: "/profile", label: "Perfil" },
  ],
  CONTADOR: [
    { to: "/bookings-acountMan", label: "Citas", detail: "/bookingDetails_acountMan" },
    { to: "/my-bookings-acountMan", label: "Mis citas" },
    { to: "/scheduleBooking", label: "Agendar cita" },
  ],
  ADMIN: [
    { to: "/bookings-admin", label: "Citas", detail: "/bookingDetailsAdmin/" },
    { to: "/users", label: "Usuarios", detail: "/edit-user/" },
    { to: "/scheduleBooking", label: "Agendar cita" },
  ],
};

const publicNavigation = [
  { to: "/", label: "Inicio" },
  { to: "/#services", label: "Servicios" },
  { to: "/#contact", label: "Contacto" },
];

const roleLabels = { USER: "Mi espacio", CONTADOR: "Contador", ADMIN: "Administración" };

export default function AppShell({ children }) {
  const { user, signOut } = useSession();
  const history = useHistory();
  const location = useLocation();
  const menuButton = useRef(null);
  const [menuLocation, setMenuLocation] = useState(null);
  const currentLocation = location.pathname + location.hash;
  const menuOpen = menuLocation === currentLocation;
  const links = user ? navigation[user.role] || [] : publicNavigation;

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuLocation(null);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuLocation(null);
  const handleSignOut = () => {
    signOut();
    closeMenu();
    history.replace("/");
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <header className="site-header no-print">
        <div className="header-inner">
          <Link className="brand-link" to={user ? roleHome(user.role) : "/"} onClick={closeMenu} aria-label="Pracofi, inicio">
            <img src={Logo} alt="Pracofi. Asesoría contable fiscal" width="1017" height="353" />
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuLocation(menuOpen ? null : currentLocation)}
          >
            <span>{menuOpen ? "Cerrar menú" : "Abrir menú"}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d={menuOpen ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          <nav id="primary-navigation" className={"primary-navigation" + (menuOpen ? " is-open" : "")} aria-label="Navegación principal">
            <div className="nav-links">
              {links.map(({ to, label, detail }) => (
                <NavLink
                  key={to}
                  to={to}
                  className="nav-link"
                  activeClassName="is-active"
                  isActive={() => currentLocation === to || Boolean(detail && location.pathname.startsWith(detail))}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              ))}
            </div>
            {user ? (
              <div className="nav-account">
                <div className="account-label">
                  <span>{user.name}</span>
                  <small>{roleLabels[user.role]}</small>
                </div>
                <button type="button" className="btn btn-secondary btn-small" onClick={handleSignOut}>Cerrar sesión</button>
              </div>
            ) : (
              <div className="nav-account">
                <NavLink className="nav-link" activeClassName="is-active" to="/login" onClick={closeMenu}>Iniciar sesión</NavLink>
                <Link className="btn btn-primary btn-small" to="/register" onClick={closeMenu}>Registrarse <span aria-hidden="true">↗</span></Link>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main id="main-content" tabIndex="-1">{children}</main>
      <footer className="site-footer no-print">
        <div className="footer-inner">
          <span><strong>PRACOFI</strong> <span className="footer-description">Asesoría contable y fiscal</span></span>
          <div><Link to="/#services">Servicios</Link><Link to="/#contact">Contacto</Link></div>
        </div>
      </footer>
    </div>
  );
}
