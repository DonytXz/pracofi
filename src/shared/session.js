export const SESSION_EVENT = "pracofi:session-changed";
export const SESSION_KEYS = ["token", "id", "name", "role"];
export const ROLES = ["USER", "CONTADOR", "ADMIN"];

function storedScalar(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    let value;
    try { value = JSON.parse(raw); } catch {
      if (/^[\s]*[[{"']/.test(raw)) return null;
      value = raw;
    }
    if (typeof value !== "string" && !(key === "id" && typeof value === "number")) return null;
    return String(value).trim() || null;
  } catch { return null; }
}

export function readSession() {
  const token = storedScalar("token");
  const id = storedScalar("id");
  const role = storedScalar("role");
  if (!token || !id || !ROLES.includes(role)) return null;
  return { token, id, role, name: storedScalar("name") || "Mi cuenta" };
}

export function roleHome(role) {
  if (role === "ADMIN") return "/bookings-admin";
  if (role === "CONTADOR") return "/bookings-acountMan";
  return "/bookings";
}

export function clearSession(reason = null) {
  try { SESSION_KEYS.forEach((key) => localStorage.removeItem(key)); }
  finally { window.dispatchEvent(new CustomEvent(SESSION_EVENT, { detail: { reason } })); }
}

export function saveSession(data) {
  const user = data?.usuario;
  if (typeof data?.token !== "string" || !data.token.trim() ||
      !["string", "number"].includes(typeof data.id) || !String(data.id).trim() ||
      !ROLES.includes(user?.role)) {
    throw new Error("La respuesta de inicio de sesión no contiene una cuenta válida.");
  }
  try {
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("id", JSON.stringify(String(data.id)));
    localStorage.setItem("name", JSON.stringify(typeof user.nombre === "string" ? user.nombre : "Mi cuenta"));
    localStorage.setItem("role", JSON.stringify(user.role));
  } catch {
    clearSession();
    throw new Error("Permite el almacenamiento del navegador para iniciar sesión.");
  }
  window.dispatchEvent(new Event(SESSION_EVENT));
  return readSession();
}
