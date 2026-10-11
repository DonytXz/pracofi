import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SessionProvider } from "../../app/SessionContext";
import { saveSession } from "../../shared/session";
import AppShell from "./AppShell";

function renderShell(path = "/") {
  return render(<MemoryRouter initialEntries={[path]}><SessionProvider><AppShell><h1>Contenido</h1></AppShell></SessionProvider></MemoryRouter>);
}

describe("AppShell navigation", () => {
  it("exposes sign-in and closes the menu with Escape while restoring focus", () => {
    renderShell();
    const navigation = screen.getByRole("navigation", { name: "Navegación principal" });
    expect(within(navigation).getByRole("link", { name: "Iniciar sesión" })).toHaveAttribute("href", "/login");
    const toggle = screen.getByRole("button", { name: "Abrir menú" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("closes the menu and marks the active link after navigation", () => {
    renderShell();
    const toggle = screen.getByRole("button", { name: "Abrir menú" });
    fireEvent.click(toggle);
    const navigation = screen.getByRole("navigation", { name: "Navegación principal" });
    const services = within(navigation).getByRole("link", { name: "Servicios" });
    fireEvent.click(services);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(services).toHaveAttribute("aria-current", "page");
    expect(within(navigation).getByRole("link", { name: "Inicio" })).not.toHaveAttribute("aria-current");
  });

  it.each([
    ["USER", "/bookings", ["Mis citas", "Agendar cita", "Perfil"], "Usuarios"],
    ["CONTADOR", "/bookings-acountMan", ["Citas", "Mis citas", "Agendar cita"], "Usuarios"],
    ["ADMIN", "/bookings-admin", ["Citas", "Usuarios", "Agendar cita"], "Perfil"],
  ])("provides the supported %s links and clears the session on logout", (role, path, labels, absentLabel) => {
    saveSession({ token: "test-token", id: "test-user", usuario: { nombre: "Ana", role } });
    renderShell(path);
    const navigation = screen.getByRole("navigation", { name: "Navegación principal" });
    labels.forEach((label) => expect(within(navigation).getByRole("link", { name: label })).toBeInTheDocument());
    expect(within(navigation).queryByRole("link", { name: absentLabel })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Cerrar sesión" }));
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("id")).toBeNull();
    expect(localStorage.getItem("role")).toBeNull();
    expect(localStorage.getItem("name")).toBeNull();
    expect(screen.getByRole("link", { name: "Iniciar sesión" })).toBeInTheDocument();
  });
});
