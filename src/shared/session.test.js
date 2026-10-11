import { beforeEach, describe, expect, it, vi } from "vitest";
import { clearSession, readSession, roleHome, saveSession, SESSION_EVENT } from "./session";

const response = { token: "fixture-token", id: "client-1", usuario: { nombre: "María Pérez", role: "USER" } };
beforeEach(() => localStorage.clear());

describe("session storage", () => {
  it.each([null, "{broken", "null", "{}", '""'])("rejects incomplete or invalid session token %s", (token) => {
    saveSession(response);
    if (token === null) localStorage.removeItem("token");
    else localStorage.setItem("token", token);
    expect(readSession()).toBeNull();
  });
  it("round-trips the existing login response and clears only identity keys on logout", () => {
    localStorage.setItem("preference", "keep");
    const listener = vi.fn();
    window.addEventListener(SESSION_EVENT, listener);
    saveSession(response);
    expect(readSession()).toEqual({ token: "fixture-token", id: "client-1", name: "María Pérez", role: "USER" });
    clearSession();
    expect(readSession()).toBeNull();
    ["token", "id", "name", "role"].forEach((key) => expect(localStorage.getItem(key)).toBeNull());
    expect(localStorage.getItem("preference")).toBe("keep");
    expect(listener).toHaveBeenCalledTimes(2);
    window.removeEventListener(SESSION_EVENT, listener);
  });
  it("supports legacy raw strings and a missing display name", () => {
    localStorage.setItem("token", "legacy-token");
    localStorage.setItem("id", "account-1");
    localStorage.setItem("role", "CONTADOR");
    expect(readSession()).toMatchObject({ id: "account-1", role: "CONTADOR", name: "Mi cuenta" });
  });
  it("rejects unknown roles and an incomplete login response", () => {
    expect(() => saveSession({ ...response, usuario: { role: "UNKNOWN" } })).toThrow();
    expect(() => saveSession({ ...response, id: null })).toThrow();
    expect(localStorage.length).toBe(0);
  });
  it("chooses a supported home for every role", () => {
    expect(roleHome("USER")).toBe("/bookings");
    expect(roleHome("CONTADOR")).toBe("/bookings-acountMan");
    expect(roleHome("ADMIN")).toBe("/bookings-admin");
  });
});
