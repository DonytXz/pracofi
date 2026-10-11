export default function Field({ label, id, hint, error, children, ...inputProps }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children || <input className="input" id={id} aria-describedby={describedBy} aria-invalid={error ? true : undefined} {...inputProps} />}
      {hint && <p className="muted" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
