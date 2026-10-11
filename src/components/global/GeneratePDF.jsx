export default function GeneratePDF() {
  return <button type="button" className="btn btn-secondary no-print" onClick={() => window.print()}>Imprimir / Guardar como PDF</button>;
}
