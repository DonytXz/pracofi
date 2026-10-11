import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSession } from "../../app/SessionContext";
import { RegisterBookingUser } from "../../services/Bookings";
import { getErrorMessage } from "../../shared/errors";
import BookingFields from "./BookingFields";
import BookingSummary from "./BookingSummary";
import useBookingCatalogs from "./useBookingCatalogs";
import { assertSuccessfulResponse, bookingDraft, bookingHome, validateBooking } from "./bookingUtils";

const steps = ["Datos de la cita", "Datos del servicio", "Revisar y enviar"];

export default function BookingWizard() {
  const { user } = useSession();
  const history = useHistory();
  const catalogs = useBookingCatalogs();
  const [draft, setDraft] = useState(() => bookingDraft());
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [acknowledged, setAcknowledged] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const heading = useRef(null);
  const home = bookingHome(user?.role);
  const move = (nextStep) => {
    setErrors({}); setError(""); setStep(nextStep);
    heading.current?.focus();
  };

  async function submit(event) {
    event.preventDefault();
    if (submitting.current || !user) return;
    const fieldErrors = validateBooking(draft, step === 3 ? undefined : step);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) {
      document.getElementById(`booking-${Object.keys(fieldErrors)[0]}`)?.focus();
      return;
    }
    if (step < 3) { move(step + 1); return; }
    if (!acknowledged) { setError("Confirma que revisaste los datos antes de enviar."); return; }
    submitting.current = true;
    setPending(true); setError("");
    try {
      const response = await RegisterBookingUser(user.id, draft.motivo, draft.fecha_cita, draft.hora, draft.area, draft.rfc);
      assertSuccessfulResponse(response);
      history.replace(home, { notice: "Tu solicitud de cita se envió correctamente." });
    } catch (failure) {
      setError(getErrorMessage(failure));
    } finally { submitting.current = false; setPending(false); }
  }

  return <section className="app-page stack">
    <header className="page-header"><div><p className="eyebrow">Una consulta, a tu medida</p><h1 className="page-title">Agendar una cita</h1>
      <p className="page-subtitle">Elige los datos de tu consulta y revisa tu solicitud antes de enviarla.</p></div></header>
    <ol className="booking-steps no-print" aria-label="Progreso de la solicitud">
      {steps.map((label, index) => <li key={label} aria-current={step === index + 1 ? "step" : undefined}>
        <span className="badge">{index + 1}</span> {label}
      </li>)}
    </ol>
    <form className="card stack" onSubmit={submit} noValidate aria-busy={pending}>
      <h2 ref={heading} tabIndex={-1}>Paso {step}: {steps[step - 1]}</h2>
      {catalogs.loading ? <p role="status">Cargando motivos y áreas…</p> : catalogs.error ?
        <div className="alert alert-error" role="alert"><p>{catalogs.error}</p><button type="button" className="btn btn-secondary" onClick={catalogs.retry}>Reintentar carga</button></div> :
        step < 3 ? <><p className="muted">Los campos con * son necesarios para preparar la solicitud.</p>
          <BookingFields draft={draft} setDraft={setDraft} errors={errors} catalogs={catalogs} step={step} disabled={pending} /></> :
          <><BookingSummary booking={draft} /><label className="checkbox-field"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} disabled={pending} /> Revisé los datos y deseo enviar esta solicitud.</label></>}
      {error && <div role="alert" className="alert alert-error">{error}</div>}
      <div className="actions no-print">
        <button type="button" className="btn btn-secondary" disabled={pending} onClick={() => history.push(home)}>Cancelar</button>
        {step > 1 && <button type="button" className="btn btn-secondary" disabled={pending} onClick={() => move(step - 1)}>Anterior</button>}
        <button type="submit" className="btn btn-primary" disabled={pending || catalogs.loading || Boolean(catalogs.error)}>
          {pending ? "Enviando…" : step === 3 ? "Enviar solicitud" : "Siguiente"}
        </button>
      </div>
    </form>
  </section>;
}
