import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUsers, updateUser } from "../../services/Users";
import { getErrorMessage } from "../../shared/errors";
import Field from "./Field";
import useSubmission from "./useSubmission";

const roleLabels = { USER: "Cliente", CONTADOR: "Contador", ADMIN: "Administrador" };

function UserForm({ record }) {
  const [draft, setDraft] = useState({ nombre: record.nombre || "", email: record.email || "", role: record.role || "" });
  const [replacePassword, setReplacePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [confirmationError, setConfirmationError] = useState("");
  const [saved, setSaved] = useState(false);
  const { pending, error, setError, run } = useSubmission();

  const change = (field, value) => { setSaved(false); setDraft((previous) => ({ ...previous, [field]: value })); };
  const submit = (event) => {
    event.preventDefault();
    setConfirmationError("");
    if (!replacePassword || !password) { setError("Para guardar, establece una nueva contraseña de forma explícita."); return; }
    if (password !== confirmation) { setConfirmationError("Las contraseñas deben coincidir."); document.getElementById("edit-user-confirmation")?.focus(); return; }
    if (!draft.nombre.trim() || !draft.email.trim()) { setError("Completa el nombre y el correo electrónico."); return; }
    run(async () => {
      await updateUser(record._id, { ...draft, nombre: draft.nombre.trim(), email: draft.email.trim(), password });
      setSaved(true);
      setPassword("");
      setConfirmation("");
      setReplacePassword(false);
    });
  };

  return (
    <form className="card stack" onSubmit={submit} aria-busy={pending}>
      {error && <p className="alert alert-error" role="alert">{error}</p>}
      {saved && <p className="alert alert-success" role="status">El usuario se actualizó correctamente.</p>}
      <div className="grid-two">
        <Field id="edit-user-name" label="Nombre completo" required autoComplete="off" value={draft.nombre} onChange={(event) => change("nombre", event.target.value)} disabled={pending} />
        <Field id="edit-user-email" label="Correo electrónico" type="email" required autoComplete="off" value={draft.email} onChange={(event) => change("email", event.target.value)} disabled={pending} />
      </div>
      <Field id="edit-user-role" label="Tipo de cuenta"><select className="input" id="edit-user-role" required value={draft.role} onChange={(event) => change("role", event.target.value)} disabled={pending}>
        {!roleLabels[draft.role] && <option value={draft.role}>{draft.role || "Selecciona un tipo"}</option>}
        {Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select></Field>
      <div className="stack">
        <p className="muted" id="password-update-note">Por ahora, guardar cambios requiere establecer una nueva contraseña. La edición sin reemplazarla todavía no está disponible.</p>
        <label><input type="checkbox" checked={replacePassword} disabled={pending} aria-describedby="password-update-note" onChange={(event) => { setReplacePassword(event.target.checked); setPassword(""); setConfirmation(""); setSaved(false); }} /> Establecer nueva contraseña al guardar</label>
        {replacePassword && <div className="grid-two">
          <Field id="edit-user-password" label="Nueva contraseña" type="password" autoComplete="new-password" required value={password} onChange={(event) => setPassword(event.target.value)} disabled={pending} />
          <Field id="edit-user-confirmation" label="Confirmar nueva contraseña" type="password" autoComplete="new-password" required value={confirmation} error={confirmationError} onChange={(event) => { setConfirmation(event.target.value); setConfirmationError(""); }} disabled={pending} />
        </div>}
      </div>
      <div className="actions"><button className="btn btn-primary" type="submit" disabled={pending || !replacePassword}>{pending ? "Guardando…" : "Guardar cambios"}</button><Link className="btn btn-secondary" to="/users">Volver a usuarios</Link></div>
    </form>
  );
}

export default function EditUserScreen() {
  const { id } = useParams();
  const [state, setState] = useState({ id, loading: true, record: null, error: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    getUsers().then((records) => {
      if (active) setState({ id, loading: false, record: records.find((record) => record._id === id) || null, error: "" });
    }).catch((failure) => {
      if (active) setState({ id, loading: false, record: null, error: getErrorMessage(failure) });
    });
    return () => { active = false; };
  }, [id, attempt]);

  return (
    <section className="app-page">
      <div className="page-header"><div><p className="eyebrow">Administración</p><h1 className="page-title">Editar usuario</h1><p className="page-subtitle">Revisa la información antes de guardar los cambios.</p></div></div>
      {state.id !== id || state.loading ? <p className="card" role="status">Cargando usuario…</p> : state.error ? <div className="card stack"><p className="alert alert-error" role="alert">{state.error}</p><button className="btn btn-secondary" onClick={() => { setState({ id, loading: true, record: null, error: "" }); setAttempt((value) => value + 1); }}>Reintentar</button></div> : state.record ? <UserForm key={id} record={state.record} /> : <div className="card empty-state"><h2>No encontramos este usuario</h2><p>Puede que la cuenta ya no esté disponible.</p><Link className="btn btn-secondary" to="/users">Volver a usuarios</Link></div>}
    </section>
  );
}
