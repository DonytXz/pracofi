// Local-only UI fixtures. This is not a replacement for, or deployment of, the API.
// All mutations are in-memory; stopping this process discards them.
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";

const apiPort = 5175;
const webPort = 5174;
const users = [
  { _id: "client-1", nombre: "María Pérez", email: "cliente@example.test", role: "USER" },
  { _id: "accountant-1", nombre: "Alex Rivera", email: "contador@example.test", role: "CONTADOR" },
  { _id: "admin-1", nombre: "Administración Demo", email: "admin@example.test", role: "ADMIN" },
];
const passwords = new Map(users.map((user) => [user._id, "demo-pracofi"]));
let bookings = [
  { _id: "booking-1", usuario: ["client-1"], motivo: "Asesoría fiscal", fecha_cita: "2030-11-18", hora: "10:30", area: "Fiscal", rfc: "" },
  { _id: "booking-2", usuario: ["client-1"], motivo: "Contabilidad", fecha_cita: "2030-11-19", hora: "16:00", area: "Contable", rfc: "" },
  { _id: "booking-3", usuario: ["accountant-1"], motivo: "Administración", fecha_cita: "2025-09-12", hora: "09:00", area: "Administrativa", rfc: "" },
];

function send(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

const server = createServer(async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `http://127.0.0.1:${webPort}`);
  response.setHeader("Access-Control-Allow-Headers", "content-type,token");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (request.method === "OPTIONS") { response.writeHead(204); response.end(); return; }
  const url = new URL(request.url, `http://127.0.0.1:${apiPort}`);
  const parts = url.pathname.split("/").filter(Boolean).map(decodeURIComponent);
  let raw = "";
  for await (const chunk of request) raw += chunk;
  let body;
  try { body = raw ? JSON.parse(raw) : {}; }
  catch { send(response, 400, { ok: false }); return; }

  if (request.method === "POST" && url.pathname === "/login") {
    const user = users.find((item) => item.email === body.email);
    if (!user || typeof body.password !== "string" || !body.password || body.password !== passwords.get(user._id)) { send(response, 401, { ok: false }); return; }
    send(response, 200, { ok: true, token: `fixture-${user._id}`, id: user._id, usuario: user }); return;
  }
  if (request.method === "POST" && url.pathname === "/register") {
    if (typeof body?.password !== "string" || !body.password) { send(response, 400, { ok: false }); return; }
    if (users.some((item) => item.email === body.email)) { send(response, 409, { ok: false }); return; }
    const user = { _id: `user-${randomUUID()}`, nombre: body.nombre, email: body.email, role: body.role };
    users.push(user);
    passwords.set(user._id, body.password);
    send(response, 201, { ok: true }); return;
  }
  if (request.method === "GET" && url.pathname === "/motivos") { send(response, 200, ["Asesoría fiscal", "Contabilidad", "Administración"].map((motivos) => ({ motivos }))); return; }
  if (request.method === "GET" && url.pathname === "/area") { send(response, 200, ["Fiscal", "Contable", "Administrativa"].map((area) => ({ area }))); return; }
  if (!users.some((user) => request.headers.token === `fixture-${user._id}`)) { send(response, 401, { ok: false }); return; }
  if (request.method === "GET" && url.pathname === "/mostrar_citas") { send(response, 200, bookings); return; }
  if (request.method === "GET" && url.pathname === "/mostrar_usuarios") { send(response, 200, { result: users }); return; }
  if (request.method === "GET" && parts.length === 2 && parts[1] === "citas") {
    send(response, 200, { citas: bookings.filter((booking) => (Array.isArray(booking.usuario) ? booking.usuario : [booking.usuario]).includes(parts[0])) }); return;
  }
  if (parts[0] === "citas" && parts.length === 2) {
    const booking = bookings.find((item) => item._id === parts[1]);
    if (!booking) { send(response, 404, { ok: false }); return; }
    if (request.method === "DELETE") bookings = bookings.filter((item) => item._id !== parts[1]);
    send(response, 200, booking); return;
  }
  if (request.method === "POST" && parts[0] === "registro_cita" && parts[1]) {
    const booking = { ...body, _id: `booking-${Date.now()}`, usuario: [parts[1]] };
    bookings.push(booking); send(response, 201, booking); return;
  }
  if (request.method === "PUT" && parts[0] === "modificar_cita") {
    const booking = bookings.find((item) => item._id === parts[1]);
    if (!booking) { send(response, 404, { ok: false }); return; }
    Object.assign(booking, body); send(response, 200, booking); return;
  }
  if (request.method === "PUT" && parts[0] === "citas" && parts[1] === "asignar_contador") {
    const booking = bookings.find((item) => item._id === parts[3]);
    if (!booking) { send(response, 404, { ok: false }); return; }
    booking.usuario = [parts[2]]; send(response, 200, booking); return;
  }
  if (request.method === "DELETE" && parts[0] === "user") {
    const index = users.findIndex((item) => item._id === parts[1]);
    if (index < 0) { send(response, 404, { ok: false }); return; }
    passwords.delete(users[index]._id);
    users.splice(index, 1); send(response, 200, { ok: true }); return;
  }
  if (request.method === "PUT" && parts[0] === "user" && parts[1] === "edit") {
    const user = users.find((item) => item._id === parts[2]);
    if (!user) { send(response, 404, { ok: false }); return; }
    Object.assign(user, { nombre: body.nombre, email: body.email, role: body.role });
    if (typeof body.password === "string" && body.password) passwords.set(user._id, body.password);
    send(response, 200, { ok: true }); return;
  }
  if (request.method === "POST" && url.pathname === "/perfil") { send(response, 201, { ok: true }); return; }
  send(response, 404, { ok: false });
});

server.on("error", (error) => { console.error(error.message); process.exitCode = 1; });
server.listen(apiPort, "127.0.0.1", () => {
  console.log(`Local fixtures at http://127.0.0.1:${webPort}/pracofi/. No production API requests.`);
  console.log("Accounts: cliente@example.test, contador@example.test, admin@example.test. Password: demo-pracofi");
  const vite = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1", "--port", String(webPort), "--strictPort"], {
    stdio: "inherit", env: { ...process.env, VITE_API_URL: `http://127.0.0.1:${apiPort}` },
  });
  vite.on("exit", (code) => { server.close(); process.exitCode = code ?? 0; });
  const stop = () => { vite.kill(); server.close(); };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
});
