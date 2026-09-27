import api from "./api";

export const RegisterProfileData = (
  nombre,
  email,
  direccion,
  ciudad,
  pais,
  cp,
  telefono,
  ocupacion,
  usuario
) => {
  return api
    .post("/perfil", {
      nombre,
      email,
      direccion,
      ciudad,
      pais,
      cp,
      telefono,
      ocupacion,
      usuario,
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
