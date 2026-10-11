import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../../services/Users";
import { getErrorMessage } from "../../shared/errors";
import Field from "./Field";
import useSubmission from "./useSubmission";

const roleLabels = { USER: "Cliente", CONTADOR: "Contador", ADMIN: "Administrador" };

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [confirming, setConfirming] = useState(null);
  const [notice, setNotice] = useState("");
  const confirmationRef = useRef(null);
  const { pending, error, setError, run } = useSubmission();

  useEffect(() => {
    let active = true;
    getUsers().then((records) => {
      if (active) { setUsers(records); setLoading(false); }
    }).catch((failure) => {
      if (active) { setLoadError(getErrorMessage(failure)); setLoading(false); }
    });
    return () => { active = false; };
  }, [attempt]);

  useEffect(() => {
    if (confirming) confirmationRef.current?.focus();
  }, [confirming]);

  const remove = () => run(async () => {
    await deleteUser(confirming._id);
    setUsers((previous) => previous.filter((record) => record._id !== confirming._id));
    setNotice(`Se eliminó a ${confirming.nombre || "este usuario"}.`);
    setConfirming(null);
  });

  const query = search.trim().toLocaleLowerCase("es");
  const visible = users.filter((record) => (!role || record.role === role) && `${record.nombre || ""} ${record.email || ""}`.toLocaleLowerCase("es").includes(query))
    .sort((a, b) => String(a.nombre || "").localeCompare(String(b.nombre || ""), "es"));

  return (
    <section className="app-page">
      <div className="page-header"><div><p className="eyebrow">Administración</p><h1 className="page-title">Usuarios</h1><p className="page-subtitle">Encuentra y gestiona las cuentas de Pracofi.</p></div></div>
      {notice && <p className="alert alert-success" role="status">{notice}</p>}
      {error && <p className="alert alert-error" role="alert">{error}</p>}
      {confirming && (
        <section className="card stack" aria-labelledby="delete-user-title" tabIndex={-1} ref={confirmationRef}>
          <h2 id="delete-user-title">¿Eliminar a {confirming.nombre || confirming.email}?</h2>
          <p>Eliminarás esta cuenta. Esta acción no se puede deshacer desde la aplicación.</p>
          <div className="actions">
            <button className="btn btn-secondary" type="button" disabled={pending} onClick={() => { setConfirming(null); setError(""); }}>Conservar usuario</button>
            <button className="btn btn-danger" type="button" disabled={pending} onClick={remove}>{pending ? "Eliminando…" : "Confirmar eliminación"}</button>
          </div>
        </section>
      )}
      <div className="card stack">
        <div className="filters">
          <Field id="users-search" label="Buscar usuarios" type="search" placeholder="Nombre o correo" value={search} onChange={(event) => setSearch(event.target.value)} />
          <Field id="users-role" label="Tipo de cuenta"><select className="input" id="users-role" value={role} onChange={(event) => setRole(event.target.value)}><option value="">Todos los tipos</option>{Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
        </div>
        {loading ? <p role="status">Cargando usuarios…</p> : loadError ? (
          <div className="alert alert-error" role="alert"><p>{loadError}</p><button className="btn btn-secondary" type="button" onClick={() => { setLoadError(""); setLoading(true); setAttempt((value) => value + 1); }}>Reintentar</button></div>
        ) : visible.length ? (
          <>
            <p className="muted">{visible.length} de {users.length} usuarios cargados. La búsqueda se aplica a esta lista.</p>
            <div className="table-wrap"><table className="data-table"><caption className="sr-only">Usuarios de Pracofi</caption><thead><tr><th scope="col">Nombre</th><th scope="col">Correo</th><th scope="col">Tipo de cuenta</th><th scope="col">Acciones</th></tr></thead><tbody>
              {visible.map((record) => <tr key={record._id}><td data-label="Nombre">{record.nombre || "Sin nombre"}</td><td data-label="Correo">{record.email || "Sin correo"}</td><td data-label="Tipo de cuenta"><span className="badge">{roleLabels[record.role] || record.role}</span></td><td data-label="Acciones"><div className="actions"><Link className="btn btn-secondary" to={`/edit-user/${record._id}`} aria-label={`Editar a ${record.nombre || record.email}`}>Editar</Link><button className="btn btn-danger" type="button" disabled={pending || !!confirming} aria-label={`Eliminar a ${record.nombre || record.email}`} onClick={() => { setNotice(""); setError(""); setConfirming(record); }}>Eliminar</button></div></td></tr>)}
            </tbody></table></div>
          </>
        ) : <div className="empty-state"><h2>{users.length ? "Sin coincidencias" : "No hay usuarios para mostrar"}</h2><p>{users.length ? "Prueba con otro nombre, correo o tipo de cuenta." : "Las cuentas aparecerán aquí cuando estén disponibles."}</p></div>}
      </div>
    </section>
  );
}
