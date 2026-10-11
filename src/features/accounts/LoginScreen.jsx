import { useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import AppShell from "../../components/global/AppShell";
import { useSession } from "../../app/SessionContext";
import { login } from "../../services/AutService";
import { readSession, roleHome } from "../../shared/session";
import Field from "./Field";
import useSubmission from "./useSubmission";

function returnPath(requested, role) {
  // Only local paths can be return destinations. The route guard checks role access.
  return typeof requested === "string" && /^\/(?!\/)/.test(requested) && !requested.includes("\\") && !["/login", "/register"].includes(requested)
    ? requested
    : roleHome(role);
}

export default function LoginScreen() {
  const history = useHistory();
  const location = useLocation();
  const { user, refreshSession } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { pending, error, run } = useSubmission();

  if (user) return <Redirect to={returnPath(location.state?.from?.pathname, user.role)} />;

  const submit = (event) => {
    event.preventDefault();
    run(async () => {
      await login(email.trim(), password);
      const session = refreshSession() || readSession();
      if (!session) throw new Error("No se pudo iniciar la sesión. Inténtalo de nuevo.");
      history.replace(returnPath(location.state?.from?.pathname, session.role));
    });
  };

  return (
    <AppShell>
      <section className="app-page">
        <div className="page-header">
          <div><p className="eyebrow">Tu espacio Pracofi</p><h1 className="page-title">Iniciar sesión</h1><p className="page-subtitle">Accede a tus citas y continúa donde lo dejaste.</p></div>
        </div>
        <form className="card stack" onSubmit={submit} aria-busy={pending} style={{ maxWidth: "32rem", marginInline: "auto" }}>
          {location.state?.expired && <p className="alert" role="status">Tu sesión ha vencido. Inicia sesión para continuar.</p>}
          {location.state?.registered && <p className="alert alert-success" role="status">Tu cuenta está lista. Inicia sesión para continuar.</p>}
          {error && <p className="alert alert-error" role="alert">{error}</p>}
          <Field id="login-email" label="Correo electrónico" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} disabled={pending} />
          <Field id="login-password" label="Contraseña" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} disabled={pending} />
          <button className="btn btn-primary" disabled={pending} type="submit">{pending ? "Iniciando sesión…" : "Iniciar sesión"}</button>
          <p className="muted">¿Es tu primera visita? <Link to={{ pathname: "/register", state: { from: location.state?.from } }}>Crear una cuenta</Link></p>
        </form>
      </section>
    </AppShell>
  );
}
