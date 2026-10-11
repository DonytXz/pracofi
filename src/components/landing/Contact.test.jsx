import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Contact from "./Contact";

afterEach(() => vi.unstubAllGlobals());

function fillContact() {
  render(<MemoryRouter><Contact /></MemoryRouter>);
  fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Ana García" } });
  fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "ana@example.com" } });
  fireEvent.change(screen.getByLabelText("Teléfono"), { target: { value: "3312345678" } });
  return screen.getByRole("button", { name: "Enviar mis datos" });
}

describe("Contact form", () => {
  it("keeps the existing delivery contract and prevents duplicate pending submissions", async () => {
    let resolve;
    const request = new Promise((done) => { resolve = done; });
    const fetchMock = vi.fn(() => request);
    vi.stubGlobal("fetch", fetchMock);
    const button = fillContact();
    const form = button.closest("form");
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Enviando…");
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://formspree.io/f/xknywojb");
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ Accept: "application/json" });
    expect(Object.fromEntries(options.body.entries())).toEqual({ Nombre: "Ana García", email: "ana@example.com", telefono: "3312345678" });
    await act(async () => { resolve({ ok: true }); });
    expect(screen.getByRole("status")).toHaveTextContent("Recibimos tus datos de contacto correctamente.");
  });

  it.each(["http", "network"])("retains all input after a %s error and permits a deliberate retry", async (failure) => {
    const fetchMock = vi.fn();
    if (failure === "http") fetchMock.mockResolvedValueOnce({ ok: false });
    else fetchMock.mockRejectedValueOnce(new Error("Connection lost"));
    fetchMock.mockResolvedValueOnce({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const button = fillContact();
    fireEvent.click(button);
    expect(await screen.findByRole("alert")).toHaveTextContent("No pudimos enviar tus datos.");
    expect(screen.getByLabelText("Nombre")).toHaveValue("Ana García");
    expect(screen.getByLabelText("Correo electrónico")).toHaveValue("ana@example.com");
    expect(screen.getByLabelText("Teléfono")).toHaveValue("3312345678");
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Recibimos tus datos"));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
