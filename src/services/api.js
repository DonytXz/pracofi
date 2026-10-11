import axios from "axios";
import { clearSession, readSession } from "../shared/session";

// Base API URL from environment variable, falling back to Vercel production API
const rawUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_PROD ||
  import.meta.env.VITE_API_LOCAL ||
  "https://praacofi.vercel.app";

// Clean trailing slash
export const BASE_API_URL = rawUrl.replace(/\/+$/, "");

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 20000,
});

// Interceptor to attach auth token
api.interceptors.request.use((config) => {
  const token = readSession()?.token;
  if (token) {
    config.headers.token = token;
  }
  return config;
});

api.interceptors.response.use((response) => response, (error) => {
  // A delayed response from an old session must not sign out a new session.
  const token = readSession()?.token;
  if (error.response?.status === 401 && token &&
      error.config?.headers?.token === token && error.config?.url !== "/login") clearSession("expired");
  return Promise.reject(error);
});

export default api;
