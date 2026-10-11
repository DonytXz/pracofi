import { beforeEach, describe, expect, it, vi } from "vitest";
import api from "../../services/api";
import { deleteUser, getUsers, updateUser } from "../../services/Users";

vi.mock("../../services/api", () => ({ default: { get: vi.fn(), put: vi.fn(), delete: vi.fn() } }));

beforeEach(() => vi.resetAllMocks());

describe("unchanged user endpoints", () => {
  it.each([null, {}, [], { result: "invalid" }, { result: [null] }, { result: [{ nombre: "missing ID" }] }, { result: [{ _id: "a", nombre: {} }] }])("rejects malformed user list data: %j", async (data) => {
    api.get.mockResolvedValue({ data });
    await expect(getUsers()).rejects.toThrow("interpretar la lista");
  });

  it("reads the existing result envelope without changing endpoint", async () => {
    const rows = [{ _id: "a", nombre: "Ana", email: "ana@example.test", role: "USER" }];
    api.get.mockResolvedValue({ data: { result: rows } });
    expect(await getUsers()).toEqual(rows);
    expect(api.get).toHaveBeenCalledExactlyOnceWith("/mostrar_usuarios");
  });

  it("keeps only editable identity fields from the user response", async () => {
    api.get.mockResolvedValue({ data: { result: [{ _id: "a", nombre: "Ana", email: "ana@example.test", role: "USER", password: "server-secret-field" }] } });
    expect(await getUsers()).toEqual([{ _id: "a", nombre: "Ana", email: "ana@example.test", role: "USER" }]);
  });

  it("never sends an empty password replacement", async () => {
    await expect(updateUser("a", { nombre: "Ana", email: "ana@example.test", role: "USER", password: "" })).rejects.toThrow("nueva contraseña");
    expect(api.put).not.toHaveBeenCalled();
  });

  it("preserves the full update endpoint and exact field set", async () => {
    api.put.mockResolvedValue({ data: { ok: true } });
    const payload = { nombre: "Ana", email: "ana@example.test", role: "USER", password: "replacement-password" };
    await updateUser("a", { ...payload, confirmation: "replacement-password" });
    expect(api.put).toHaveBeenCalledExactlyOnceWith("/user/edit/a", payload);
  });

  it("does not turn an explicit failed deletion response into success", async () => {
    api.delete.mockResolvedValue({ data: { ok: false } });
    await expect(deleteUser("a")).rejects.toThrow("eliminar");
    expect(api.delete).toHaveBeenCalledExactlyOnceWith("/user/a");
  });
});
