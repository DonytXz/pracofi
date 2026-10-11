import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const pending = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    pending.current = true;
    setStatus("pending");

    try {
      const response = await fetch("https://formspree.io/f/xknywojb", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Contact request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      pending.current = false;
    }
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-copy">
        <p className="eyebrow">HABLEMOS</p>
        <h2 id="contact-title">El primer paso<br />{" "}es una <span>conversación.</span></h2>
        <p>¿Tienes alguna pregunta sobre nuestros servicios? Déjanos tus datos de contacto.</p>
        <div className="contact-note"><span aria-hidden="true">↗</span><p>Si ya sabes qué necesitas, puedes <Link to="/scheduleBooking">agendar una cita</Link> desde tu cuenta.</p></div>
      </div>
      <div className="contact-form-card">
        {status === "success" ? (
          <div className="contact-success">
            <span className="success-icon" aria-hidden="true">✓</span>
            <h3>Gracias por escribirnos.</h3>
            <p role="status">Recibimos tus datos de contacto correctamente.</p>
            <button type="button" className="btn btn-secondary" onClick={() => setStatus("idle")}>Enviar otra solicitud</button>
          </div>
        ) : (
          <form className="stack" onSubmit={handleSubmit} aria-busy={status === "pending"}>
            <div><h3>Deja tus datos</h3><p className="muted">Todos los campos son obligatorios.</p></div>
            {status === "error" ? <p role="alert" className="alert alert-error">No pudimos enviar tus datos. Revisa tu conexión e inténtalo de nuevo.</p> : null}
            <div className="field"><label htmlFor="contact-name">Nombre</label><input id="contact-name" name="Nombre" autoComplete="name" placeholder="Tu nombre completo" required disabled={status === "pending"} className="input" /></div>
            <div className="field"><label htmlFor="contact-email">Correo electrónico</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="nombre@correo.com" required disabled={status === "pending"} className="input" /></div>
            <div className="field"><label htmlFor="contact-phone">Teléfono</label><input id="contact-phone" name="telefono" type="tel" autoComplete="tel" placeholder="Tu número de contacto" required disabled={status === "pending"} className="input" /></div>
            <button className="btn btn-primary" type="submit" disabled={status === "pending"}>{status === "pending" ? "Enviando…" : "Enviar mis datos"}<span aria-hidden="true">↗</span></button>
            <p className="form-note">Este formulario envía una solicitud de contacto; no agenda una cita.</p>
            <span className="sr-only" role="status">{status === "pending" ? "Enviando tus datos de contacto." : ""}</span>
          </form>
        )}
      </div>
    </section>
  );
}
