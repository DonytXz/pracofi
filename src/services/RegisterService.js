import api from "./api";

export const RegisterService = (nombre, email, password, role) => {
  return api
    .post("/register", {
      nombre,
      email,
      password,
      role,
    })
    .then((res) => {
      return res.data;
    });
};
