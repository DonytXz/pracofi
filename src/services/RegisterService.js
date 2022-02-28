import axios from "axios";
// import { useHistory } from "react-router-dom";

export const RegisterService = (nombre, email, password, role) => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  // const history = useHistory();
  return axios
    .post(
      ` ${process.env.REACT_APP_API_LOCAL}/register`,
      {
        nombre,
        email,
        password,
        role,
      },
      headers
    )
    .then((res) => {
      // console.log(res);
      // const name = res.data.usuario.name;
      // const role = res.data.usuario.role;
      // const name = res.data.usuario.name;
      // const role = res.data.usuario.role;
      // console.log(res.data.token);
      //   if (res.status === 200) {
      //     history.push("/login");
      //   }
      return res.data;
    })
    .catch((error) => {
      // console.log(error);
    });
};
