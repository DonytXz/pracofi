import { formatBookingDate, inputTime } from "./bookingUtils";

export default function BookingSummary({ booking }) {
  return <dl className="booking-summary grid-two">
    <div><dt className="muted">Motivo de consulta</dt><dd>{booking.motivo || "Sin especificar"}</dd></div>
    <div><dt className="muted">Área de servicio</dt><dd>{booking.area || "Sin especificar"}</dd></div>
    <div><dt className="muted">Fecha</dt><dd>{formatBookingDate(booking.fecha_cita)}</dd></div>
    <div><dt className="muted">Hora de Ciudad de México</dt><dd>{inputTime(booking.hora) || "Hora por revisar"}</dd></div>
    <div><dt className="muted">RFC</dt><dd>{booking.rfc || "No proporcionado"}</dd></div>
  </dl>;
}
