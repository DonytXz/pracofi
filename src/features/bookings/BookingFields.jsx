import { BUSINESS_TIME_ZONE } from "./bookingUtils";

function SelectField({ name, label, value, values, onChange, error, disabled }) {
  const options = value && !values.includes(value) ? [value, ...values] : values;
  return <div className="field">
    <label htmlFor={`booking-${name}`}>{label} <span aria-hidden="true">*</span></label>
    <select id={`booking-${name}`} name={name} className="input" value={value} onChange={onChange}
      disabled={disabled} required aria-invalid={Boolean(error)} aria-describedby={error ? `error-${name}` : undefined}>
      <option value="">Selecciona una opción</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
    {error && <p id={`error-${name}`} className="field-error">{error}</p>}
  </div>;
}

export default function BookingFields({ draft, setDraft, errors = {}, catalogs, step, disabled = false }) {
  const change = (event) => {
    const { name, value } = event.target;
    setDraft((previous) => ({ ...previous, [name]: value }));
  };
  return <div className="stack">
    {(!step || step === 1) && <>
      <SelectField name="motivo" label="Motivo de consulta" value={draft.motivo} values={catalogs.topics}
        onChange={change} error={errors.motivo} disabled={disabled} />
      <div className="grid-two">
        <div className="field">
          <label htmlFor="booking-fecha_cita">Fecha <span aria-hidden="true">*</span></label>
          <input id="booking-fecha_cita" name="fecha_cita" type="date" className="input" value={draft.fecha_cita}
            onChange={change} required disabled={disabled} aria-invalid={Boolean(errors.fecha_cita)}
            aria-describedby={errors.fecha_cita ? "error-fecha_cita" : undefined} />
          {errors.fecha_cita && <p id="error-fecha_cita" className="field-error">{errors.fecha_cita}</p>}
        </div>
        <div className="field">
          <label htmlFor="booking-hora">Hora solicitada <span aria-hidden="true">*</span></label>
          <input id="booking-hora" name="hora" type="time" className="input" value={draft.hora}
            onChange={change} required disabled={disabled} aria-invalid={Boolean(errors.hora)}
            aria-describedby={`booking-time-help${errors.hora ? " error-hora" : ""}`} />
          {errors.hora && <p id="error-hora" className="field-error">{errors.hora}</p>}
        </div>
      </div>
      <p id="booking-time-help" className="muted">Hora de Ciudad de México ({BUSINESS_TIME_ZONE}). La solicitud no garantiza disponibilidad.</p>
    </>}
    {(!step || step === 2) && <>
      <SelectField name="area" label="Área de servicio" value={draft.area} values={catalogs.areas}
        onChange={change} error={errors.area} disabled={disabled} />
      <div className="field">
        <label htmlFor="booking-rfc">RFC <span className="muted">(si cuentas con él)</span></label>
        <input id="booking-rfc" name="rfc" type="text" className="input" value={draft.rfc}
          onChange={change} disabled={disabled} autoCapitalize="characters" spellCheck="false" />
      </div>
    </>}
  </div>;
}
