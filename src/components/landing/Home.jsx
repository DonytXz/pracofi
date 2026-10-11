import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="landing-hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow"><span className="eyebrow-dot" /> ASESORÍA CONTABLE Y FISCAL</p>
        <h1 id="hero-title">El siguiente paso<br />{" "}para tus <span>finanzas.</span></h1>
        <p className="hero-description">Dale espacio a tus preguntas. Agenda una cita con Pracofi y encuentra orientación para tus necesidades contables, fiscales y administrativas.</p>
        <div className="actions hero-actions">
          <Link to="/scheduleBooking" className="btn btn-primary">Agendar una cita <span aria-hidden="true">↗</span></Link>
          <Link to="/#services" className="btn btn-secondary">Conocer los servicios</Link>
        </div>
        <div className="hero-signin"><span className="small-line" aria-hidden="true" /><span>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></span></div>
      </div>
      <div className="hero-aside">
        <div className="appointment-illustration" aria-hidden="true">
          <div className="illustration-top"><span className="illustration-symbol">P.</span><span>TU ESPACIO PRACOFI</span><span className="illustration-dots">•••</span></div>
          <div className="illustration-body">
            <span className="illustration-caption">EMPIEZA CON UNA CONVERSACIÓN</span>
            <p>Tu próxima cita,<br />{" "}<strong>en un solo lugar.</strong></p>
            <div className="illustration-calendar">
              <div className="calendar-icon"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="7" width="22" height="21" rx="3" /><path d="M10 4v7M22 4v7M5 14h22M11 20h4M18 20h3M11 24h4" /></svg></div>
              <div><strong>Organiza tu consulta</strong><span>Tema, fecha y hora</span></div>
              <span className="illustration-arrow">↗</span>
            </div>
            <div className="illustration-progress"><i /><i /><i /></div>
            <span className="illustration-note">Un paso a la vez. Con claridad.</span>
          </div>
        </div>
        <p className="hero-aside-note"><span aria-hidden="true">↳</span> Más orden para lo que sigue.</p>
      </div>
      <div className="hero-bottom"><span>CONTABILIDAD</span><span>ASESORÍA FISCAL</span><span>ADMINISTRACIÓN</span><span className="hero-bottom-end">Conversemos sobre lo que necesitas <span aria-hidden="true">↓</span></span></div>
    </section>
  );
}
