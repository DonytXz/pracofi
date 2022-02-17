import axios from "axios";

export const login = (email, password) => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  return axios
    .post(`${process.env.REACT_APP_API_LOCAL}/login`, {
      email,
      password,
    },headers)
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
