import { useState } from "react";
import { useSession } from "../../app/SessionContext";
import { RegisterProfileData } from "../../services/Profile";
import Field from "./Field";
import useSubmission from "./useSubmission";

const fields = [
  { name: "nombre", label: "Nombre completo", autoComplete: "name" },
  { name: "email", label: "Correo electrónico", type: "email", autoComplete: "email" },
  { name: "direccion", label: "Dirección", autoComplete: "street-address" },
  { name: "ciudad", label: "Ciudad", autoComplete: "address-level2" },
  { name: "pais", label: "País", autoComplete: "country-name" },
  { name: "cp", label: "Código postal", autoComplete: "postal-code" },
  { name: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel" },
  { name: "ocupacion", label: "Ocupación", autoComplete: "organization-title" },
];

export default function ProfileScreen() {
  const { user } = useSession();
  const [draft, setDraft] = useState(() => Object.fromEntries(fields.map((field) => [field.name, field.name === "nombre" ? user?.name || "" : ""])));
  const [submitted, setSubmitted] = useState(false);
  const { pending, error, setError, run } = useSubmission();

  const submit = (event) => {
    event.preventDefault();
    const values = Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, value.trim()]));
    if (Object.values(values).some((value) => !value)) {
      setError("Completa todos los campos antes de enviar tus datos.");
      return;
    }
    run(async () => {
      const response = await RegisterProfileData(values.nombre, values.email, values.direccion, values.ciudad, values.pais, values.cp, values.telefono, values.ocupacion, user.id);
      if (response?.status !== 201 || response.data?.ok === false) throw new Error("No se pudieron enviar tus datos.");
      setSubmitted(true);
    });
  };

  return (
    <section className="app-page">
      <div className="page-header"><div><p className="eyebrow">Tu información</p><h1 className="page-title">Datos de contacto</h1><p className="page-subtitle">Comparte tus datos para facilitar tu atención.</p></div></div>
      <form className="card stack" onSubmit={submit} aria-busy={pending}>
        <p className="muted">Este formulario permite enviar tus datos de contacto. La información enviada anteriormente no se recupera aquí.</p>
        {error && <p className="alert alert-error" role="alert">{error}</p>}
        {submitted && <p className="alert alert-success" role="status">Tus datos se enviaron correctamente.</p>}
        <div className="grid-two">
          {fields.map((field) => <Field key={field.name} id={`profile-${field.name}`} {...field} required value={draft[field.name]} disabled={pending || submitted} onChange={(event) => setDraft((previous) => ({ ...previous, [field.name]: event.target.value }))} />)}
        </div>
        <div className="actions"><button className="btn btn-primary" type="submit" disabled={pending || submitted}>{pending ? "Enviando datos…" : submitted ? "Datos enviados" : "Enviar datos"}</button></div>
      </form>
    </section>
  );
}
