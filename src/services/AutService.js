import api from "./api";
import { clearSession, readSession, saveSession } from "../shared/session";

export async function login(email, password) {
  try {
    const response = await api.post("/login", { email, password });
    if (response.data?.ok === false) {
      const error = new Error("Login rejected");
      error.userMessage = "El correo o la contraseña no son correctos.";
      throw error;
    }
    saveSession(response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) error.userMessage = "El correo o la contraseña no son correctos.";
    throw error;
  }
}
export const logout = clearSession;
export const getToken = () => readSession()?.token ?? null;
