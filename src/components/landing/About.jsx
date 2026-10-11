import { Link } from "react-router-dom";

const services = [
  { number: "01", title: "Contabilidad", description: "Conversa sobre la información contable de tu actividad y los temas que necesitas revisar.", icon: "M5 5h14v14H5zM9 9h6M9 13h6M9 17h3" },
  { number: "02", title: "Asesoría fiscal", description: "Plantea tus dudas fiscales para revisar tu situación y orientar los siguientes pasos.", icon: "M12 3l8 4v5c0 5-8 9-8 9s-8-4-8-9V7zM8 12l3 3 5-6" },
  { number: "03", title: "Administración", description: "Encuentra un espacio para revisar las necesidades administrativas de tu negocio.", icon: "M4 20V10h4v10M10 20V5h4v15M16 20V9h4v11M3 20h18" },
];

export default function About() {
  return (
    <section className="services-section" id="services" aria-labelledby="services-title">
      <span id="about" className="anchor-target" />
      <div className="section-intro">
        <div><p className="eyebrow">EN QUÉ PODEMOS AYUDARTE</p><h2 id="services-title">Un espacio para<br />{" "}darle claridad a tus dudas.</h2></div>
        <p>En Pracofi brindamos asesoría contable, fiscal y administrativa. Cuéntanos qué necesitas y comencemos por una conversación.</p>
      </div>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.number}>
            <div className="service-card-top"><svg width="28" height="28" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true"><path d={service.icon} /></svg><span>{service.number}</span></div>
            <h3>{service.title}</h3><p>{service.description}</p>
            <Link to="/scheduleBooking">Agendar una consulta <span aria-hidden="true">↗</span></Link>
          </article>
        ))}
      </div>
      <div className="how-it-works">
        <div><p className="eyebrow">TU CITA, PASO A PASO</p><h3>Menos vueltas.<br />{" "}Más organización.</h3></div>
        <ol>
          <li><span>1</span><div><strong>Entra a tu espacio</strong><p>Crea una cuenta o inicia sesión.</p></div></li>
          <li><span>2</span><div><strong>Cuéntanos qué necesitas</strong><p>Elige el tema, la fecha y la hora que solicitas.</p></div></li>
          <li><span>3</span><div><strong>Revisa y envía</strong><p>Consulta los datos de tu cita desde tu cuenta.</p></div></li>
        </ol>
      </div>
    </section>
  );
}
