export const BUSINESS_TIME_ZONE = "America/Mexico_City";

// Dates and times arrive as separate business-calendar fields. Do not convert
// a date-only (or date-at-midnight) value through the browser's timezone.
export function inputDate(value) {
  const match = String(value ?? "").match(/^(\d{4}-\d{2}-\d{2})(?:T|$)/);
  if (!match) return "";
  const date = new Date(`${match[1]}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === match[1]
    ? match[1] : "";
}

export function inputTime(value) {
  const match = String(value ?? "").match(/^(\d{2}):(\d{2})(?::\d{2})?$/);
  return match && Number(match[1]) < 24 && Number(match[2]) < 60
    ? `${match[1]}:${match[2]}` : "";
}

export function bookingKey(booking) {
  const date = inputDate(booking.fecha_cita);
  const time = inputTime(booking.hora);
  return date && time ? `${date}T${time}` : null;
}

export function currentBusinessKey(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}`;
}

export function bookingPeriod(booking, now = new Date()) {
  const key = bookingKey(booking);
  if (!key) return "unknown";
  return key < currentBusinessKey(now) ? "past" : "upcoming";
}

export function formatBookingDate(value) {
  const date = inputDate(value);
  return date ? new Intl.DateTimeFormat("es-MX", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`)) : "Fecha por revisar";
}

export function identityId(value) {
  if (Array.isArray(value)) return identityId(value[0]);
  if (value && typeof value === "object") return String(value._id ?? "");
  return value == null ? "" : String(value);
}

export function belongsToUser(booking, userId) {
  return identityId(booking.usuario) === String(userId);
}

export function bookingsFromResponse(response, scope) {
  const records = scope === "client" ? response.data?.citas : response.data;
  if (!Array.isArray(records)) throw new Error("No pudimos interpretar la lista de citas. Intenta cargarla nuevamente.");
  return records.filter((item) => item && typeof item === "object" && item._id);
}

export function bookingDraft(booking = {}) {
  return {
    motivo: booking.motivo ?? "", fecha_cita: inputDate(booking.fecha_cita),
    hora: inputTime(booking.hora), area: booking.area ?? "", rfc: booking.rfc ?? "",
  };
}

export function validateBooking(draft, step) {
  const errors = {};
  if (!step || step === 1) {
    if (!String(draft.motivo).trim()) errors.motivo = "Selecciona el motivo de tu consulta.";
    if (!inputDate(draft.fecha_cita)) errors.fecha_cita = "Elige una fecha válida.";
    if (!inputTime(draft.hora)) errors.hora = "Elige una hora válida.";
  }
  if ((!step || step === 2) && !String(draft.area).trim()) errors.area = "Selecciona un área de servicio.";
  return errors;
}

export function assertSuccessfulResponse(response) {
  if (!response || !Number.isInteger(response.status) || response.status < 200 || response.status >= 300 || response.data?.ok === false) {
    throw new Error("No se confirmó la operación. Revisa tus citas antes de volver a intentarlo.");
  }
}

export function bookingHome(role) {
  return role === "ADMIN" ? "/bookings-admin" : role === "CONTADOR" ? "/bookings-acountMan" : "/bookings";
}

export function bookingDetailUrl(booking, role) {
  const id = encodeURIComponent(booking._id);
  return role === "ADMIN" ? `/bookingDetailsAdmin/${id}`
    : role === "CONTADOR" ? `/bookingDetails_acountMan/${id}` : `/bookingDetails/${id}`;
}
