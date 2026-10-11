import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { saveSession } from "../shared/session";

vi.mock("../pages/ScheduleBooking", () => ({ default: () => <h1>Booking form</h1> }));

describe("App", () => {
  it.each(["USER", "ADMIN"])("allows %s to navigate directly to booking creation", async (role) => {
    saveSession({ token: "fixture", id: "1", usuario: { nombre: "Test", role } });
    window.history.pushState({}, "", `${import.meta.env.BASE_URL}scheduleBooking`);

    render(<App />);

    expect(await screen.findByRole("heading", { name: "Booking form" })).toBeInTheDocument();
  });

  it("blocks accountants from navigating directly to booking creation", () => {
    saveSession({ token: "fixture", id: "1", usuario: { nombre: "Test", role: "CONTADOR" } });
    window.history.pushState({}, "", `${import.meta.env.BASE_URL}scheduleBooking`);

    render(<App />);

    expect(screen.getByRole("heading", { name: /no está disponible para tu cuenta/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Booking form" })).not.toBeInTheDocument();
  });

  it("renders the landing page at the root route", () => {
    window.history.pushState({}, "", import.meta.env.BASE_URL);

    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: /el siguiente paso.*para tus finanzas/i })
    ).toBeInTheDocument();
  });
});
