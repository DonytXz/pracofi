import { beforeEach, describe, expect, it } from "vitest";
import api from "./api";
import { readSession, saveSession } from "../shared/session";

const session = (token = "test-token") => saveSession({ token, id: "u-1", usuario: { nombre: "Fixture", role: "USER" } });
beforeEach(() => localStorage.clear());

describe("API session compatibility", () => {
  it("sends the existing token header without changing the request payload", async () => {
    session();
    let request;
    await api.post("/registro_cita/u-1", { motivo: "Contabilidad" }, { adapter: async (config) => {
      request = config;
      return { data: {}, status: 200, headers: {}, config };
    } });
    expect(request.headers.token).toBe("test-token");
    expect(JSON.parse(request.data)).toEqual({ motivo: "Contabilidad" });
  });
  it("clears the current session on an authenticated 401", async () => {
    session();
    await expect(api.get("/mostrar_citas", { adapter: async (config) => {
      throw { response: { status: 401 }, config };
    } })).rejects.toMatchObject({ response: { status: 401 } });
    expect(readSession()).toBeNull();
  });
  it("does not clear a newer session when an old request fails", async () => {
    session("old-token");
    await expect(api.get("/mostrar_citas", { adapter: async (config) => {
      session("new-token");
      throw { response: { status: 401 }, config };
    } })).rejects.toBeDefined();
    expect(readSession()?.token).toBe("new-token");
  });
  it("retains the session on permission and server errors", async () => {
    session();
    for (const status of [403, 500]) {
      await expect(api.get("/mostrar_citas", { adapter: async (config) => {
        throw { response: { status }, config };
      } })).rejects.toBeDefined();
      expect(readSession()).not.toBeNull();
    }
  });
});
