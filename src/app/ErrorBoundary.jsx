import { Component } from "react";
export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <main className="app-page empty-state" role="alert">
      <h1 className="page-title">No pudimos mostrar esta página</h1>
      <p>Recarga la página para intentarlo de nuevo. Si estabas enviando información, revisa tus citas antes de repetir el envío.</p>
      <div className="actions">
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Recargar</button>
        <a className="btn btn-secondary" href={import.meta.env.BASE_URL}>Volver al inicio</a>
      </div>
    </main>;
    return this.props.children;
  }
}
