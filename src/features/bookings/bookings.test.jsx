import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Link, MemoryRouter, Route, Switch, useLocation } from "react-router-dom";
import { SessionProvider } from "../../app/SessionContext";
import * as services from "../../services/Bookings";
import BookingWizard from "./BookingWizard";
import BookingEditor from "./BookingEditor";
import BookingWorkspace from "./BookingWorkspace";

vi.mock("../../services/Bookings", () => ({
  topics: vi.fn(), areas: vi.fn(), RegisterBookingUser: vi.fn(), getBookingsById: vi.fn(),
  UpdateBooking: vi.fn(), getBookings: vi.fn(), getBookingsUser: vi.fn(), deleteBookingById: vi.fn(), citaPut: vi.fn(),
}));

const firstBooking = {
  _id: "booking-1", usuario: ["client-1"], motivo: "Asesoría fiscal", fecha_cita: "2030-11-18T00:00:00.000Z",
  hora: "10:30:00", area: "Fiscal", rfc: "RFC ORIGINAL",
};
const secondBooking = { ...firstBooking, _id: "booking-2", motivo: "Contabilidad", hora: "16:00" };

function LocationProbe() {
  const location = useLocation();
  return <output role="note" data-testid="location">{location.pathname}</output>;
}

function renderPage(page, { role = "USER", path = "/scheduleBooking", route = path } = {}) {
  for (const [key, value] of Object.entries({ token: "test-token", id: role === "USER" ? "client-1" : "staff-1", name: "Cuenta de prueba", role })) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  return render(<MemoryRouter initialEntries={[path]}><SessionProvider><Switch>
    <Route exact path={route}>{page}</Route>
    <Route><h1>Lista de citas</h1></Route>
  </Switch><LocationProbe /></SessionProvider></MemoryRouter>);
}

beforeEach(() => {
  vi.resetAllMocks();
  services.topics.mockResolvedValue({ data: [{ motivos: "Asesoría fiscal" }, { motivos: "Contabilidad" }] });
  services.areas.mockResolvedValue({ data: [{ area: "Fiscal" }, { area: "Contable" }] });
  services.getBookingsById.mockResolvedValue({ data: { ...firstBooking } });
  services.getBookings.mockResolvedValue({ data: [firstBooking, secondBooking] });
  services.getBookingsUser.mockResolvedValue({ data: { citas: [firstBooking, secondBooking] } });
});

async function fillFirstStep(user) {
  await user.selectOptions(await screen.findByLabelText(/Motivo de consulta/), "Asesoría fiscal");
  fireEvent.change(screen.getByLabelText(/^Fecha/), { target: { value: "2030-11-18" } });
  fireEvent.change(screen.getByLabelText(/^Hora solicitada/), { target: { value: "10:30" } });
  await user.click(screen.getByRole("button", { name: "Siguiente" }));
}

async function fillWizard(user) {
  await fillFirstStep(user);
  await user.selectOptions(screen.getByLabelText(/Área de servicio/), "Fiscal");
  await user.type(screen.getByLabelText(/^RFC/), "RFC DE PRUEBA");
  await user.click(screen.getByRole("button", { name: "Siguiente" }));
  await user.click(screen.getByRole("checkbox"));
}

describe("booking request", () => {
  it("validates inline, preserves all fields when going back, and cancels without logging out", async () => {
    const user = userEvent.setup();
    renderPage(<BookingWizard />);
    await screen.findByLabelText(/Motivo de consulta/);
    await user.click(screen.getByRole("button", { name: "Siguiente" }));
    expect(screen.getByText("Elige una fecha válida.")).toBeInTheDocument();
    expect(services.RegisterBookingUser).not.toHaveBeenCalled();
    await fillWizard(user);
    await user.click(screen.getByRole("button", { name: "Anterior" }));
    expect(screen.getByLabelText(/^RFC/)).toHaveValue("RFC DE PRUEBA");
    expect(screen.getByLabelText(/Área de servicio/)).toHaveValue("Fiscal");
    await user.click(screen.getByRole("button", { name: "Anterior" }));
    expect(screen.getByLabelText(/^Fecha/)).toHaveValue("2030-11-18");
    expect(screen.getByLabelText(/^Hora solicitada/)).toHaveValue("10:30");
    expect(screen.getByLabelText(/Motivo de consulta/)).toHaveValue("Asesoría fiscal");
    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(screen.getByTestId("location")).toHaveTextContent("/bookings");
    expect(localStorage.getItem("token")).toBe(JSON.stringify("test-token"));
  });

  it("gates acknowledgement, prevents duplicate writes, and retains input after a rejection", async () => {
    const user = userEvent.setup();
    let rejectRequest;
    services.RegisterBookingUser.mockImplementationOnce(() => new Promise((resolve, reject) => { rejectRequest = reject; }));
    renderPage(<BookingWizard />);
    await fillWizard(user);
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Enviar solicitud" }));
    expect(services.RegisterBookingUser).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("Confirma que revisaste");
    await user.click(screen.getByRole("checkbox"));
    const submit = screen.getByRole("button", { name: "Enviar solicitud" });
    fireEvent.click(submit); fireEvent.click(submit);
    expect(services.RegisterBookingUser).toHaveBeenCalledTimes(1);
    expect(services.RegisterBookingUser).toHaveBeenCalledWith("client-1", "Asesoría fiscal", "2030-11-18", "10:30", "Fiscal", "RFC DE PRUEBA");
    await act(async () => rejectRequest({ response: { status: 422 } }));
    expect(screen.getByRole("alert")).toHaveTextContent("Revisa los datos");
    expect(screen.getByText("RFC DE PRUEBA")).toBeInTheDocument();
    services.RegisterBookingUser.mockResolvedValueOnce({ status: 201 });
    await user.click(screen.getByRole("button", { name: "Enviar solicitud" }));
    expect(await screen.findByRole("heading", { name: "Lista de citas" })).toBeInTheDocument();
  });

  it("offers a catalog retry instead of an unusable form", async () => {
    services.topics.mockRejectedValueOnce(new Error("offline"));
    const user = userEvent.setup();
    renderPage(<BookingWizard />);
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Siguiente" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Reintentar carga" }));
    expect(await screen.findByLabelText(/Motivo de consulta/)).toBeInTheDocument();
  });
});

describe("booking editing", () => {
  it.each([["client-1"], [{ _id: "client-1", nombre: "Titular" }]])("preserves the original scalar owner ID and unchanged fields when editing a record with owner %j", async (owner) => {
    const user = userEvent.setup();
    services.UpdateBooking.mockResolvedValueOnce({ status: 204 });
    services.getBookingsById.mockResolvedValueOnce({ data: { ...firstBooking, usuario: owner } });
    renderPage(<BookingEditor />, { role: "ADMIN", path: "/bookingDetailsAdmin/booking-1", route: "/bookingDetailsAdmin/:id" });
    const rfc = await screen.findByLabelText(/^RFC/);
    await user.clear(rfc); await user.type(rfc, "RFC NUEVO");
    await user.click(screen.getByRole("button", { name: "Guardar cambios" }));
    await waitFor(() => expect(services.UpdateBooking).toHaveBeenCalledWith("client-1", "Asesoría fiscal", "2030-11-18T00:00:00.000Z", "10:30:00", "Fiscal", "RFC NUEVO", "booking-1"));
    expect(screen.getByTestId("location")).toHaveTextContent("/bookings-admin");
  });

  it("does not expose editing for a missing record", async () => {
    services.getBookingsById.mockRejectedValueOnce({ response: { status: 404 } });
    renderPage(<BookingEditor />, { path: "/bookingDetails/missing", route: "/bookingDetails/:id" });
    expect(await screen.findByRole("heading", { name: "No encontramos esta cita" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Guardar cambios" })).not.toBeInTheDocument();
    expect(services.UpdateBooking).not.toHaveBeenCalled();
  });

  it("hides another client's booking details and every mutation action", async () => {
    services.getBookingsById.mockResolvedValueOnce({ data: { ...firstBooking, usuario: ["another-client"] } });
    renderPage(<BookingEditor />, { path: "/bookingDetails/booking-1", route: "/bookingDetails/:id" });
    expect(await screen.findByRole("heading", { name: "No tienes acceso a esta cita" })).toBeInTheDocument();
    expect(screen.queryByText("RFC ORIGINAL")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Eliminar cita" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Guardar cambios" })).not.toBeInTheDocument();
  });

  it("hides the previous record while a different route ID loads", async () => {
    const user = userEvent.setup();
    let finishLoad;
    services.getBookingsById.mockResolvedValueOnce({ data: firstBooking })
      .mockImplementationOnce(() => new Promise((resolve) => { finishLoad = resolve; }));
    renderPage(<><Link to="/bookingDetails/booking-2">Siguiente cita</Link><BookingEditor /></>,
      { path: "/bookingDetails/booking-1", route: "/bookingDetails/:id" });
    await screen.findByLabelText(/^RFC/);
    await user.click(screen.getByRole("link", { name: "Siguiente cita" }));
    expect(screen.getByRole("status")).toHaveTextContent("Cargando cita");
    expect(screen.queryByText("RFC ORIGINAL")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Guardar cambios" })).not.toBeInTheDocument();
    await act(async () => finishLoad({ data: { ...secondBooking, rfc: "SEGUNDA CITA" } }));
    expect(await screen.findByLabelText(/^RFC/)).toHaveValue("SEGUNDA CITA");
  });

  it("preserves edits on a failed save", async () => {
    const user = userEvent.setup();
    services.UpdateBooking.mockRejectedValueOnce({ response: { status: 409 } });
    renderPage(<BookingEditor />, { path: "/bookingDetails/booking-1", route: "/bookingDetails/:id" });
    const rfc = await screen.findByLabelText(/^RFC/);
    await user.clear(rfc); await user.type(rfc, "MI CAMBIO");
    await user.click(screen.getByRole("button", { name: "Guardar cambios" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("datos cambiaron");
    expect(rfc).toHaveValue("MI CAMBIO");
    expect(screen.getByTestId("location")).toHaveTextContent("/bookingDetails/booking-1");
  });
});

describe("booking lists", () => {
  it("confirms deletion first and refreshes correctly after two successive deletions", async () => {
    const user = userEvent.setup();
    services.deleteBookingById.mockResolvedValue({ status: 200 });
    services.getBookings.mockResolvedValueOnce({ data: [firstBooking, secondBooking] })
      .mockResolvedValueOnce({ data: [secondBooking] }).mockResolvedValueOnce({ data: [] });
    renderPage(<BookingWorkspace scope="admin" />, { role: "ADMIN", path: "/bookings-admin" });
    await user.click(await screen.findByRole("button", { name: "Eliminar cita: Asesoría fiscal" }));
    expect(services.deleteBookingById).not.toHaveBeenCalled();
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Asesoría fiscal")).toBeInTheDocument();
    await user.click(within(dialog).getByRole("button", { name: "Confirmar eliminación" }));
    await user.click(await screen.findByRole("button", { name: "Eliminar cita: Contabilidad" }));
    await user.click(screen.getByRole("button", { name: "Confirmar eliminación" }));
    expect(await screen.findByRole("heading", { name: "Todavía no hay citas" })).toBeInTheDocument();
    expect(services.deleteBookingById.mock.calls).toEqual([["booking-1"], ["booking-2"]]);
    expect(services.getBookings).toHaveBeenCalledTimes(3);
  });

  it("shows rejected assignment as failure and refreshes the list after a successful retry", async () => {
    const user = userEvent.setup();
    services.citaPut.mockRejectedValueOnce({ response: { status: 409 } }).mockResolvedValueOnce({ status: 200 });
    services.getBookings.mockResolvedValueOnce({ data: [firstBooking] })
      .mockResolvedValueOnce({ data: [{ ...firstBooking, usuario: ["staff-1"] }] });
    renderPage(<BookingWorkspace scope="accountant" />, { role: "CONTADOR", path: "/bookings-acountMan" });
    await user.click(await screen.findByRole("button", { name: "Tomar cita: Asesoría fiscal" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("datos cambiaron");
    expect(screen.queryByText(/se asignó correctamente/)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Tomar cita: Asesoría fiscal" }));
    expect(await screen.findByText("En mis citas")).toBeInTheDocument();
    expect(services.getBookings).toHaveBeenCalledTimes(2);
    expect(services.citaPut).toHaveBeenLastCalledWith("staff-1", "booking-1");
  });

  it("distinguishes a failed read from an empty list and offers retry", async () => {
    const user = userEvent.setup();
    services.getBookingsUser.mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce({ data: { citas: [] } });
    renderPage(<BookingWorkspace />, { path: "/bookings" });
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText("Todavía no hay citas")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reintentar carga" }));
    expect(await screen.findByText("Todavía no hay citas")).toBeInTheDocument();
  });

  it("searches, sorts, and limits My appointments to the current accountant's records", async () => {
    const user = userEvent.setup();
    services.getBookings.mockResolvedValue({ data: [{ ...firstBooking, usuario: ["staff-1"] }, secondBooking] });
    renderPage(<BookingWorkspace scope="assigned" />, { role: "CONTADOR", path: "/my-bookings-acountMan" });
    expect(await screen.findByText("Asesoría fiscal")).toBeInTheDocument();
    expect(screen.queryByText("Contabilidad")).not.toBeInTheDocument();
    await user.type(screen.getByRole("searchbox", { name: "Buscar citas" }), "inexistente");
    expect(screen.getByText("No hay citas con estos filtros")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Ver todas las citas" }));
    expect(screen.getByText("Asesoría fiscal")).toBeInTheDocument();
  });
});
