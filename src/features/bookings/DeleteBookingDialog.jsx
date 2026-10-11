import { useEffect, useRef } from "react";
import BookingSummary from "./BookingSummary";

export default function DeleteBookingDialog({ booking, pending, error, onCancel, onConfirm }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    dialog.querySelector("button")?.focus();
    return () => { previousFocus?.focus(); };
  }, []);
  return <dialog ref={dialogRef} className="card booking-dialog no-print" aria-labelledby="delete-booking-title"
    onCancel={(event) => { event.preventDefault(); if (!pending) onCancel(); }}>
    <div className="stack">
      <h2 id="delete-booking-title">¿Eliminar esta cita?</h2>
      <p>Esta acción elimina la cita. Revisa los datos antes de continuar.</p>
      <BookingSummary booking={booking} />
      {error && <p role="alert" className="alert alert-error">{error}</p>}
      <div className="actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={pending}>Conservar cita</button>
        <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={pending}>{pending ? "Eliminando…" : "Confirmar eliminación"}</button>
      </div>
    </div>
  </dialog>;
}
