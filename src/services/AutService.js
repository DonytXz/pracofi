import axios from "axios";

export const login = (email, password) => {
  return axios
    .post("http://localhost:4201/login", {
      email,
      password,
    })
    .then((res) => {
      // console.log(res);
      const name = res.data.usuario.nombre;
      const role = res.data.usuario.role;
      const id = res.data.id;
      // console.log(res.data.token);
      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("name", JSON.stringify(name));
        localStorage.setItem("role", JSON.stringify(role));
        localStorage.setItem("id", JSON.stringify(id));
      }
      return res.data;
    })
    .catch((error) => {
      // console.log(error);
      return false;
    });
};

export const logout = () => {
  localStorage.removeItem("token");
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};
