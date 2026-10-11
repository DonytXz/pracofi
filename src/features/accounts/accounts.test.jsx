import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, useLocation } from "react-router-dom";
import { SessionProvider } from "../../app/SessionContext";
import { saveSession } from "../../shared/session";
import { login } from "../../services/AutService";
import { RegisterService } from "../../services/RegisterService";
import { RegisterProfileData } from "../../services/Profile";
import { deleteUser, getUsers, updateUser } from "../../services/Users";
import LoginScreen from "./LoginScreen";
import Register from "../../pages/Register";
import ProfileScreen from "./ProfileScreen";
import UsersScreen from "./UsersScreen";
import EditUserScreen from "./EditUserScreen";

vi.mock("../../services/AutService", () => ({ login: vi.fn() }));
vi.mock("../../services/RegisterService", () => ({ RegisterService: vi.fn() }));
vi.mock("../../services/Profile", () => ({ RegisterProfileData: vi.fn() }));
vi.mock("../../services/Users", () => ({ getUsers: vi.fn(), deleteUser: vi.fn(), updateUser: vi.fn() }));

const account = { token: "test-token", id: "admin-1", usuario: { nombre: "Administración", role: "ADMIN" } };
const records = [
  { _id: "a", nombre: "Ana López", email: "ana@example.test", role: "USER" },
  { _id: "b", nombre: "Bruno Ruiz", email: "bruno@example.test", role: "CONTADOR" },
];
const DUMMY_INPUT = "dummy-input-sample";
const DUMMY_ALT_INPUT = "dummy-alt-input-sample";
const DUMMY_REPLACEMENT_INPUT = "dummy-replacement-sample";

function Location() {
  const location = useLocation();
  return <output role="note" aria-label="Ruta actual">{location.pathname}{location.search}</output>;
}
function show(element, { entry = "/users", path = "*", session = account } = {}) {
  if (session) saveSession(session);
  return render(<MemoryRouter initialEntries={[entry]}><SessionProvider><Route path={path}>{element}</Route><Location /></SessionProvider></MemoryRouter>);
}
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  getUsers.mockResolvedValue(records);
  deleteUser.mockResolvedValue({ status: 200 });
  updateUser.mockResolvedValue({ status: 200 });
});

describe("account access", () => {
  it("shows expiry, retains failed login input, prevents duplicate requests and returns to the requested page", async () => {
    const user = userEvent.setup();
    const request = deferred();
    login.mockReturnValueOnce(request.promise);
    show(<LoginScreen />, { session: null, path: "/login", entry: { pathname: "/login", state: { expired: true, from: { pathname: "/scheduleBooking" } } } });
    expect(screen.getByRole("status")).toHaveTextContent("Tu sesión ha vencido");
    await user.type(screen.getByLabelText("Correo electrónico"), "ana@example.test");
    await user.type(screen.getByLabelText("Contraseña"), DUMMY_INPUT);
    const form = screen.getByRole("button", { name: "Iniciar sesión" }).closest("form");
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(login).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Iniciando sesión…" })).toBeDisabled();
    await act(async () => { request.reject({ isAxiosError: true }); });
    expect(screen.getByRole("alert")).toHaveTextContent("Revisa tu conexión");
    expect(screen.getByLabelText("Correo electrónico")).toHaveValue("ana@example.test");
    login.mockImplementationOnce(async () => { saveSession({ ...account, usuario: { nombre: "Ana", role: "USER" } }); return account; });
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
    expect(screen.getByLabelText("Ruta actual")).toHaveTextContent("/scheduleBooking");
  });

  it("rejects external return destinations", async () => {
    const user = userEvent.setup();
    login.mockImplementationOnce(async () => { saveSession(account); return account; });
    show(<LoginScreen />, { session: null, path: "/login", entry: { pathname: "/login", state: { from: { pathname: "//example.test" } } } });
    await user.type(screen.getByLabelText("Correo electrónico"), "admin@example.test");
    await user.type(screen.getByLabelText("Contraseña"), DUMMY_INPUT);
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
    expect(screen.getByLabelText("Ruta actual")).toHaveTextContent("/bookings-admin");
  });

  it("registers a full accountant name using the existing payload, with confirmation only in the browser", async () => {
    const user = userEvent.setup();
    RegisterService.mockResolvedValue({ ok: true });
    show(<Register />, { session: null, entry: "/register?role=CONTADOR", path: "/register" });
    expect(screen.getByLabelText("Tipo de cuenta")).toHaveValue("CONTADOR");
    await user.type(screen.getByLabelText("Nombre completo"), "Ana López García");
    await user.type(screen.getByLabelText("Correo electrónico"), "ana@example.test");
    await user.type(screen.getByLabelText("Contraseña", { exact: true }), DUMMY_INPUT);
    await user.type(screen.getByLabelText("Confirmar contraseña"), DUMMY_ALT_INPUT);
    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(RegisterService).not.toHaveBeenCalled();
    expect(screen.getByText("Las contraseñas deben coincidir.")).toBeInTheDocument();
    await user.clear(screen.getByLabelText("Confirmar contraseña"));
    await user.type(screen.getByLabelText("Confirmar contraseña"), DUMMY_INPUT);
    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(RegisterService.mock.calls[0]).toEqual(["Ana López García", "ana@example.test", DUMMY_INPUT, "CONTADOR"]); // ggignore
    expect(screen.getByLabelText("Ruta actual")).toHaveTextContent("/login");
  });

  it("does not treat an unrecognized registration response as success", async () => {
    const user = userEvent.setup();
    RegisterService.mockResolvedValue("unexpected response");
    show(<Register />, { session: null, entry: "/register", path: "/register" });
    await user.type(screen.getByLabelText("Nombre completo"), "Ana López");
    await user.type(screen.getByLabelText("Correo electrónico"), "ana@example.test");
    await user.type(screen.getByLabelText("Contraseña", { exact: true }), DUMMY_INPUT);
    await user.type(screen.getByLabelText("Confirmar contraseña"), DUMMY_INPUT);
    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(screen.getByRole("alert")).toHaveTextContent("No pudimos completar");
    expect(screen.getByLabelText("Nombre completo")).toHaveValue("Ana López");
    expect(screen.getByLabelText("Ruta actual")).toHaveTextContent("/register");
  });
});

describe("user administration", () => {
  it("removes two users in succession only after confirmation", async () => {
    const user = userEvent.setup();
    show(<UsersScreen />);
    await user.click(await screen.findByRole("button", { name: "Eliminar a Ana López" }));
    expect(deleteUser).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Confirmar eliminación" }));
    await waitFor(() => expect(screen.queryByRole("button", { name: "Eliminar a Ana López" })).not.toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: "Eliminar a Bruno Ruiz" }));
    await user.click(screen.getByRole("button", { name: "Confirmar eliminación" }));
    expect(await screen.findByRole("heading", { name: "No hay usuarios para mostrar" })).toBeInTheDocument();
    expect(deleteUser.mock.calls).toEqual([["a"], ["b"]]);
  });

  it("keeps a row on rejected deletion and allows a deliberate retry", async () => {
    const user = userEvent.setup();
    deleteUser.mockRejectedValueOnce({ response: { status: 403 } });
    show(<UsersScreen />);
    await user.click(await screen.findByRole("button", { name: "Eliminar a Ana López" }));
    await user.click(screen.getByRole("button", { name: "Confirmar eliminación" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("No tienes permiso");
    expect(screen.getByRole("button", { name: "Eliminar a Ana López" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Conservar usuario" }));
    expect(screen.queryByRole("heading", { name: "¿Eliminar a Ana López?" })).not.toBeInTheDocument();
  });

  it("distinguishes failed loads from empty lists and retries the read", async () => {
    const user = userEvent.setup();
    getUsers.mockRejectedValueOnce(new Error("network unavailable")).mockResolvedValueOnce([]);
    show(<UsersScreen />);
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText("No hay usuarios para mostrar")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(await screen.findByText("No hay usuarios para mostrar")).toBeInTheDocument();
  });

  it("preserves loaded fields and submits only an intentional nonempty password replacement", async () => {
    const user = userEvent.setup();
    show(<EditUserScreen />, { entry: "/edit-user/a", path: "/edit-user/:id" });
    expect(await screen.findByLabelText("Nombre completo")).toHaveValue("Ana López");
    expect(screen.getByLabelText("Correo electrónico")).toHaveValue("ana@example.test");
    expect(screen.getByLabelText("Tipo de cuenta")).toHaveValue("USER");
    expect(screen.getByRole("button", { name: "Guardar cambios" })).toBeDisabled();
    await user.clear(screen.getByLabelText("Nombre completo"));
    await user.type(screen.getByLabelText("Nombre completo"), "Ana López García");
    await user.click(screen.getByRole("checkbox", { name: "Establecer nueva contraseña al guardar" }));
    await user.type(screen.getByLabelText("Nueva contraseña", { exact: true }), DUMMY_REPLACEMENT_INPUT);
    await user.type(screen.getByLabelText("Confirmar nueva contraseña"), DUMMY_REPLACEMENT_INPUT);
    await user.click(screen.getByRole("button", { name: "Guardar cambios" }));
    expect(updateUser.mock.calls[0]).toEqual(["a", { nombre: "Ana López García", email: "ana@example.test", role: "USER", password: DUMMY_REPLACEMENT_INPUT }]); // ggignore
    expect(await screen.findByRole("status")).toHaveTextContent("El usuario se actualizó");
    expect(screen.queryByLabelText("Nueva contraseña", { exact: true })).not.toBeInTheDocument();
  });

  it("does not expose a blank edit form for a missing record", async () => {
    show(<EditUserScreen />, { entry: "/edit-user/missing", path: "/edit-user/:id" });
    expect(await screen.findByText("No encontramos este usuario")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Guardar cambios" })).not.toBeInTheDocument();
  });
});

describe("contact profile submission", () => {
  it("submits the supported profile fields once and clearly describes the submission-only form", async () => {
    const user = userEvent.setup();
    const request = deferred();
    RegisterProfileData.mockReturnValue(request.promise);
    show(<ProfileScreen />, { session: { ...account, id: "a", usuario: { nombre: "Ana López", role: "USER" } }, entry: "/profile" });
    expect(screen.getByText(/información enviada anteriormente no se recupera/i)).toBeInTheDocument();
    const values = { "Correo electrónico": "ana@example.test", "Dirección": "Calle 1", "Ciudad": "Guadalajara", "País": "México", "Código postal": "44100", "Teléfono": "3312345678", "Ocupación": "Diseño" };
    for (const [label, value] of Object.entries(values)) await user.type(screen.getByLabelText(label), value);
    const form = screen.getByRole("button", { name: "Enviar datos" }).closest("form");
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(RegisterProfileData).toHaveBeenCalledExactlyOnceWith("Ana López", "ana@example.test", "Calle 1", "Guadalajara", "México", "44100", "3312345678", "Diseño", "a");
    await act(async () => { request.resolve({ status: 201, data: { ok: true } }); });
    expect(screen.getByRole("status")).toHaveTextContent("Tus datos se enviaron correctamente");
    expect(within(form).getByRole("button", { name: "Datos enviados" })).toBeDisabled();
  });
});
