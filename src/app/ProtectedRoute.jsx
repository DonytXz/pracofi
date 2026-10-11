import { Link, Redirect, Route } from "react-router-dom";
import { useSession } from "./SessionContext";
import { roleHome, ROLES } from "../shared/session";
import AppShell from "../components/global/AppShell";

export default function ProtectedRoute({ roles = ROLES, children, ...props }) {
  const { user, sessionNotice } = useSession();
  return <Route {...props} render={({ location }) => {
    if (!user) return <Redirect to={{ pathname: "/login", state: { from: location, expired: sessionNotice === "expired" } }} />;
    if (!roles.includes(user.role)) return <AppShell><section className="app-page empty-state">
      <p className="eyebrow">Acceso restringido</p>
      <h1 className="page-title">Esta página no está disponible para tu cuenta</h1>
      <p>Vuelve a tu espacio de trabajo para continuar.</p>
      <Link className="btn btn-primary" to={roleHome(user.role)}>Ir a mis citas</Link>
    </section></AppShell>;
    return <AppShell>{children}</AppShell>;
  }} />;
}
