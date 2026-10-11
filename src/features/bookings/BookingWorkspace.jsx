import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSession } from "../../app/SessionContext";
import { citaPut, deleteBookingById, getBookings, getBookingsUser } from "../../services/Bookings";
import { getErrorMessage } from "../../shared/errors";
import GeneratePDF from "../../components/global/GeneratePDF";
import DeleteBookingDialog from "./DeleteBookingDialog";
import { assertSuccessfulResponse, bookingDetailUrl, bookingKey, bookingPeriod, bookingsFromResponse,
  belongsToUser, formatBookingDate, inputTime } from "./bookingUtils";

const titles = { client: "Mis citas", admin: "Citas", accountant: "Citas", assigned: "Mis citas" };
const subtitles = {
  client: "Consulta tus próximas citas y el historial de tus consultas.",
  admin: "Consulta y administra las solicitudes de tus clientes.",
  accountant: "Revisa las solicitudes y toma una cita para atenderla.",
  assigned: "Consulta las citas asociadas a tu cuenta.",
};

export default function BookingWorkspace({ scope = "client" }) {
  const { user } = useSession();
  const location = useLocation();
  const [state, setState] = useState({ loading: true, error: "", records: [] });
  const [revision, setRevision] = useState(0);
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState(scope === "client" ? "upcoming" : "all");
  const [area, setArea] = useState("");
  const [sort, setSort] = useState("asc");
  const [now, setNow] = useState(() => new Date());
  const [notice, setNotice] = useState(location.state?.notice || "");
  const [actionError, setActionError] = useState("");
  const [assigning, setAssigning] = useState({});
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const pendingIds = useRef(new Set());
  const deletePending = useRef(false);
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;
    let active = true;
    const request = scope === "client" ? getBookingsUser(userId) : getBookings();
    request.then((response) => {
      const records = bookingsFromResponse(response, scope);
      if (active) setState({ records, loading: false, error: "" });
    }).catch((failure) => {
      if (active) setState({ records: [], loading: false, error: getErrorMessage(failure) });
    });
    return () => { active = false; };
  }, [scope, userId, revision]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  function reload() {
    setState((previous) => ({ ...previous, loading: true, error: "" }));
    setRevision((value) => value + 1);
  }

  async function assign(booking) {
    if (pendingIds.current.has(booking._id) || !userId) return;
    pendingIds.current.add(booking._id);
    setAssigning((previous) => ({ ...previous, [booking._id]: true }));
    setNotice(""); setActionError("");
    try {
      assertSuccessfulResponse(await citaPut(userId, booking._id));
      setNotice("La cita se asignó correctamente. Puedes consultarla en Mis citas.");
      reload();
    } catch (failure) { setActionError(getErrorMessage(failure)); }
    finally {
      pendingIds.current.delete(booking._id);
      setAssigning((previous) => ({ ...previous, [booking._id]: false }));
    }
  }

  async function confirmDelete() {
    if (!selected || deletePending.current) return;
    deletePending.current = true; setDeleting(true); setDeleteError("");
    try {
      assertSuccessfulResponse(await deleteBookingById(selected._id));
      setState((previous) => ({ ...previous, records: previous.records.filter((item) => item._id !== selected._id) }));
      setNotice("La cita se eliminó correctamente."); setSelected(null);
      reload();
    } catch (failure) { setDeleteError(getErrorMessage(failure)); }
    finally { deletePending.current = false; setDeleting(false); }
  }

  const records = scope === "assigned" ? state.records.filter((booking) => belongsToUser(booking, userId)) : state.records;
  const areaOptions = [...new Set(records.map((booking) => booking.area).filter(Boolean))].sort();
  const normalizedQuery = query.trim().toLocaleLowerCase("es");
  const filtered = records.filter((booking) => {
    const searchable = [booking.motivo, booking.area, booking.rfc, booking.fecha_cita, booking.hora].filter(Boolean).join(" ").toLocaleLowerCase("es");
    return (!normalizedQuery || searchable.includes(normalizedQuery)) && (!area || booking.area === area)
      && (period === "all" || bookingPeriod(booking, now) === period);
  }).sort((left, right) => {
    const leftKey = bookingKey(left); const rightKey = bookingKey(right);
    if (!leftKey) return rightKey ? 1 : 0;
    if (!rightKey) return -1;
    return leftKey.localeCompare(rightKey) * (sort === "asc" ? 1 : -1);
  });
  const canCreate = user?.role === "USER" || user?.role === "ADMIN";

  return <section className="app-page stack">
    <header className="page-header"><div><p className="eyebrow">Tu espacio Pracofi</p><h1 className="page-title">{titles[scope]}</h1>
      <p className="page-subtitle">{subtitles[scope]}</p></div>
      <div className="actions no-print">{canCreate && <Link className="btn btn-primary" to="/scheduleBooking">Agendar cita</Link>}
        {!state.loading && records.length > 0 && <GeneratePDF />}</div>
    </header>
    {notice && <p role="status" className="alert alert-success no-print">{notice}</p>}
    {actionError && <p role="alert" className="alert alert-error no-print">{actionError}</p>}
    <div className="card filters no-print" aria-label="Filtros de citas">
      <div className="field"><label htmlFor="booking-search">Buscar citas</label><input id="booking-search" className="input" type="search"
        placeholder="Motivo, área o RFC" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      <div className="field"><label htmlFor="booking-period">Periodo</label><select id="booking-period" className="input" value={period} onChange={(event) => setPeriod(event.target.value)}>
        <option value="all">Todas las citas</option><option value="upcoming">Próximas citas</option><option value="past">Citas pasadas</option><option value="unknown">Fecha por revisar</option>
      </select></div>
      <div className="field"><label htmlFor="booking-area-filter">Área</label><select id="booking-area-filter" className="input" value={area} onChange={(event) => setArea(event.target.value)}>
        <option value="">Todas las áreas</option>{areaOptions.map((value) => <option key={value} value={value}>{value}</option>)}
      </select></div>
      <div className="field"><label htmlFor="booking-sort">Orden</label><select id="booking-sort" className="input" value={sort} onChange={(event) => setSort(event.target.value)}>
        <option value="asc">Fecha: de menor a mayor</option><option value="desc">Fecha: de mayor a menor</option>
      </select></div>
    </div>
    <p className="muted">Horarios de Ciudad de México. La búsqueda y los filtros se aplican a las citas cargadas.</p>
    {state.loading ? <div className="card" role="status">Cargando citas…</div> : state.error ?
      <div className="alert alert-error" role="alert"><p>{state.error}</p><button type="button" className="btn btn-secondary" onClick={reload}>Reintentar carga</button></div> :
      filtered.length === 0 ? <div className="card empty-state"><h2>{records.length ? "No hay citas con estos filtros" : "Todavía no hay citas"}</h2>
        <p>{records.length ? "Prueba otro periodo o limpia la búsqueda para ver más resultados." : "Las citas aparecerán aquí cuando estén registradas."}</p>
        {records.length > 0 ? <button type="button" className="btn btn-secondary" onClick={() => { setPeriod("all"); setQuery(""); setArea(""); }}>Ver todas las citas</button>
          : canCreate && <Link className="btn btn-primary no-print" to="/scheduleBooking">Agendar tu primera cita</Link>}</div> :
        <div className="card table-wrap">
          <table className="data-table booking-table"><caption className="sr-only">{titles[scope]}: {filtered.length} resultados</caption>
            <thead><tr><th scope="col">Consulta</th><th scope="col">Fecha y hora</th><th scope="col">Área</th><th scope="col" className="no-print">Acciones</th></tr></thead>
            <tbody>{filtered.map((booking) => <tr key={booking._id}>
              <td data-label="Consulta"><strong>{booking.motivo || "Consulta"}</strong>{booking.rfc && <div className="muted">RFC: {booking.rfc}</div>}</td>
              <td data-label="Fecha y hora"><div>{formatBookingDate(booking.fecha_cita)}</div><div className="muted">{inputTime(booking.hora) || "Hora por revisar"}</div></td>
              <td data-label="Área">{booking.area || "Sin especificar"}</td>
              <td data-label="Acciones" className="no-print"><div className="actions">
                <Link className="btn btn-secondary" to={bookingDetailUrl(booking, user?.role)} aria-label={`Ver cita: ${booking.motivo || booking._id}`}>Ver detalle</Link>
                {scope === "admin" && <button type="button" className="btn btn-danger" onClick={() => { setSelected(booking); setDeleteError(""); }} aria-label={`Eliminar cita: ${booking.motivo || booking._id}`}>Eliminar</button>}
                {scope === "accountant" && (belongsToUser(booking, userId) ? <span className="badge">En mis citas</span> :
                  <button type="button" className="btn btn-primary" disabled={Boolean(assigning[booking._id])} onClick={() => assign(booking)}
                    aria-label={`Tomar cita: ${booking.motivo || booking._id}`}>{assigning[booking._id] ? "Asignando…" : "Tomar cita"}</button>)}
              </div></td>
            </tr>)}</tbody>
          </table>
          <p className="muted">{filtered.length} {filtered.length === 1 ? "cita" : "citas"}</p>
        </div>}
    {selected && <DeleteBookingDialog booking={selected} pending={deleting} error={deleteError} onCancel={() => setSelected(null)} onConfirm={confirmDelete} />}
  </section>;
}
