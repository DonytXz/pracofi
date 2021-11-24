import axios from "axios";
// import { useHistory } from "react-router-dom";

export const RegisterService = (nombre, email, password) => {
  // const history = useHistory();
  return axios
    .post("http://localhost:4201/register", {
      nombre,
      email,
      password,
    })
    .then((res) => {
        console.log(res);
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
      console.log(error);
    });
};
