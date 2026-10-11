import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSession } from "../../app/SessionContext";
import { deleteBookingById, getBookingsById, UpdateBooking } from "../../services/Bookings";
import { getErrorMessage } from "../../shared/errors";
import GeneratePDF from "../../components/global/GeneratePDF";
import BookingFields from "./BookingFields";
import BookingSummary from "./BookingSummary";
import DeleteBookingDialog from "./DeleteBookingDialog";
import useBookingCatalogs from "./useBookingCatalogs";
import { assertSuccessfulResponse, bookingDraft, bookingHome, belongsToUser, identityId, inputDate, inputTime, validateBooking } from "./bookingUtils";

function EditForm({ booking, home, onPendingChange }) {
  const history = useHistory();
  const catalogs = useBookingCatalogs();
  const [draft, setDraft] = useState(() => bookingDraft(booking));
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const submitting = useRef(false);

  async function save(event) {
    event.preventDefault();
    if (submitting.current) return;
    const fieldErrors = validateBooking(draft);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) {
      document.getElementById(`booking-${Object.keys(fieldErrors)[0]}`)?.focus();
      return;
    }
    if (!identityId(booking.usuario)) { setError("No se pudo identificar al titular de la cita. Vuelve a cargarla antes de guardar."); return; }
    submitting.current = true; setPending(true); onPendingChange(true); setError("");
    try {
      // The read model can populate/array-wrap the owner; writes require its ID.
      // Keep untouched date/time values exactly as returned by the service.
      const date = draft.fecha_cita === inputDate(booking.fecha_cita) ? booking.fecha_cita : draft.fecha_cita;
      const time = draft.hora === inputTime(booking.hora) ? booking.hora : draft.hora;
      assertSuccessfulResponse(await UpdateBooking(identityId(booking.usuario), draft.motivo, date, time, draft.area, draft.rfc, booking._id));
      history.replace(home, { notice: "Los cambios de la cita se guardaron correctamente." });
    } catch (failure) { setError(getErrorMessage(failure)); }
    finally { submitting.current = false; setPending(false); onPendingChange(false); }
  }

  return <form className="card stack no-print" onSubmit={save} noValidate aria-busy={pending}>
    <h2>Editar cita</h2><p className="muted">Actualiza los datos necesarios. Los demás valores se conservarán.</p>
    {catalogs.loading ? <p role="status">Cargando opciones…</p> : catalogs.error ?
      <div role="alert" className="alert alert-error"><p>{catalogs.error}</p><button type="button" className="btn btn-secondary" onClick={catalogs.retry}>Reintentar carga</button></div> :
      <BookingFields draft={draft} setDraft={setDraft} errors={errors} catalogs={catalogs} disabled={pending} />}
    {error && <p role="alert" className="alert alert-error">{error}</p>}
    <div className="actions"><button type="submit" className="btn btn-primary" disabled={pending || catalogs.loading || Boolean(catalogs.error)}>{pending ? "Guardando…" : "Guardar cambios"}</button>
      <button type="button" className="btn btn-secondary" disabled={pending} onClick={() => history.push(home)}>Volver a citas</button></div>
  </form>;
}

function BookingEditorScreen({ readOnly = false }) {
  const { id } = useParams();
  const { user } = useSession();
  const history = useHistory();
  const [state, setState] = useState({ booking: null, loading: true, error: "", notFound: false });
  const [revision, setRevision] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const deletePending = useRef(false);
  const home = bookingHome(user?.role);

  useEffect(() => {
    if (!id) return;
    let active = true;
    getBookingsById(id).then((response) => {
      const booking = response.data;
      if (!booking || typeof booking !== "object" || Array.isArray(booking) || !booking._id) {
        throw new Error("No pudimos interpretar los datos de esta cita.");
      }
      if (active) setState({ booking, loading: false, error: "", notFound: false });
    }).catch((failure) => {
      if (active) setState({ booking: null, loading: false, error: getErrorMessage(failure), notFound: failure.response?.status === 404 });
    });
    return () => { active = false; };
  }, [id, revision]);

  async function confirmDelete() {
    if (deletePending.current || !state.booking) return;
    deletePending.current = true; setDeleting(true); setDeleteError("");
    try {
      assertSuccessfulResponse(await deleteBookingById(state.booking._id));
      history.replace(home, { notice: "La cita se eliminó correctamente." });
    } catch (failure) { setDeleteError(getErrorMessage(failure)); }
    finally { deletePending.current = false; setDeleting(false); }
  }

  const canManage = !readOnly && state.booking && identityId(state.booking.usuario)
    && (user?.role === "ADMIN" || (user?.role === "USER" && belongsToUser(state.booking, user.id)));
  const wrongOwner = user?.role === "USER" && state.booking && !belongsToUser(state.booking, user.id);

  return <section className="app-page stack">
    <header className="page-header"><div><p className="eyebrow">Tu consulta</p><h1 className="page-title">Detalle de cita</h1>
      <p className="page-subtitle">Consulta los datos de tu solicitud.</p></div><Link to={home} className="btn btn-secondary no-print">Volver a citas</Link></header>
    {state.loading ? <p role="status" className="card">Cargando cita…</p> : state.error ?
      <div role="alert" className="alert alert-error"><h2>{state.notFound ? "No encontramos esta cita" : "No pudimos cargar la cita"}</h2><p>{state.error}</p>
        {!state.notFound && <button type="button" className="btn btn-secondary" onClick={() => {
          setState({ booking: null, loading: true, error: "", notFound: false }); setRevision((value) => value + 1);
        }}>Reintentar carga</button>}</div> : wrongOwner ?
        <div role="alert" className="alert alert-error"><h2>No tienes acceso a esta cita</h2><p>Vuelve a tu lista para consultar las citas de tu cuenta.</p></div> : <>
        <div className="card stack"><h2>Resumen de la cita</h2><BookingSummary booking={state.booking} />
          <div className="actions no-print"><GeneratePDF />{canManage && <button type="button" className="btn btn-danger" disabled={saving} onClick={() => setShowDelete(true)}>Eliminar cita</button>}</div></div>
        {canManage ? <EditForm key={state.booking._id} booking={state.booking} home={home} onPendingChange={setSaving} /> :
          <p className="muted no-print">Esta cita se muestra en modo de consulta.</p>}
      </>}
    {showDelete && <DeleteBookingDialog booking={state.booking} pending={deleting} error={deleteError} onCancel={() => setShowDelete(false)} onConfirm={confirmDelete} />}
  </section>;
}

export default function BookingEditor(props) {
  const { id } = useParams();
  return <BookingEditorScreen key={id} {...props} />;
}
