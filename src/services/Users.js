import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/mostrar_usuarios");
  if (!Array.isArray(response.data?.result) || response.data.result.some((record) => !record || typeof record._id !== "string" || !record._id || ["nombre", "email", "role"].some((key) => record[key] != null && typeof record[key] !== "string"))) {
    throw new Error("No se pudo interpretar la lista de usuarios. Inténtalo de nuevo.");
  }
  return response.data.result.map(({ _id, nombre = "", email = "", role = "" }) => ({ _id, nombre, email, role }));
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/user/${encodeURIComponent(id)}`);
  if (response.data?.ok === false) {
    throw new Error("No se pudo eliminar el usuario.");
  }
  return response;
};

// Keep the existing full-update contract. Never send an empty replacement password.
export const updateUser = async (id, { nombre, email, role, password }) => {
  if (!password || !nombre?.trim() || !email?.trim() || !role) {
    throw new Error("Completa los datos y una nueva contraseña antes de guardar.");
  }
  const response = await api.put(`/user/edit/${encodeURIComponent(id)}`, { nombre, email, role, password });
  if (response.data?.ok === false) {
    throw new Error("No se pudo actualizar el usuario.");
  }
  return response;
};
