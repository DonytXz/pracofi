import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import AppShell from "../../components/global/AppShell";
import { RegisterService } from "../../services/RegisterService";
import Field from "./Field";
import useSubmission from "./useSubmission";

export default function RegisterScreen({ initialRole = "USER" }) {
  const history = useHistory();
  const location = useLocation();
  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [confirmationError, setConfirmationError] = useState("");
  const { pending, error, setError, run } = useSubmission();

  const submit = (event) => {
    event.preventDefault();
    setConfirmationError("");
    if (!name.trim()) {
      setError("Escribe tu nombre completo.");
      return;
    }
    if (password !== confirmation) {
      setConfirmationError("Las contraseñas deben coincidir.");
      document.getElementById("register-confirmation")?.focus();
      return;
    }
    run(async () => {
      const response = await RegisterService(name.trim(), email.trim(), password, role);
      if (!response?.ok) throw new Error(response?.message || response?.msg || "No se pudo crear la cuenta. Revisa tus datos e inténtalo de nuevo.");
      history.replace("/login", { registered: true, from: location.state?.from });
    });
  };

  return (
    <AppShell>
      <section className="app-page">
        <div className="page-header"><div><p className="eyebrow">Comienza aquí</p><h1 className="page-title">Crear una cuenta</h1><p className="page-subtitle">Un solo espacio para organizar tu atención con Pracofi.</p></div></div>
        <form className="card stack" onSubmit={submit} aria-busy={pending} style={{ maxWidth: "38rem", marginInline: "auto" }}>
          {error && <p className="alert alert-error" role="alert">{error}</p>}
          <Field id="register-role" label="Tipo de cuenta">
            <select className="input" id="register-role" value={role} onChange={(event) => setRole(event.target.value)} disabled={pending}>
              <option value="USER">Cliente</option><option value="CONTADOR">Contador</option>
            </select>
          </Field>
          <Field id="register-name" label="Nombre completo" hint="Incluye tus nombres y apellidos." autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} disabled={pending} />
          <Field id="register-email" label="Correo electrónico" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} disabled={pending} />
          <div className="grid-two">
            <Field id="register-password" label="Contraseña" type="password" autoComplete="new-password" required value={password} onChange={(event) => setPassword(event.target.value)} disabled={pending} />
            <Field id="register-confirmation" label="Confirmar contraseña" type="password" autoComplete="new-password" required value={confirmation} error={confirmationError} onChange={(event) => { setConfirmation(event.target.value); setConfirmationError(""); }} disabled={pending} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? "Creando cuenta…" : "Crear cuenta"}</button>
          <p className="muted">¿Ya tienes cuenta? <Link to={{ pathname: "/login", state: { from: location.state?.from } }}>Iniciar sesión</Link></p>
        </form>
      </section>
    </AppShell>
  );
}
