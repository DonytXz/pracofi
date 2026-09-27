import axios from "axios";

// Base API URL from environment variable, falling back to Vercel production API
const rawUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_PROD ||
  import.meta.env.VITE_API_LOCAL ||
  "https://pracofi-api.vercel.app";

// Clean trailing slash
export const BASE_API_URL = rawUrl.replace(/\/+$/, "");

const api = axios.create({
  baseURL: BASE_API_URL,
});

// Interceptor to attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      config.headers.token = JSON.parse(token);
    } catch {
      config.headers.token = token;
    }
  }
  return config;
});

export default api;
