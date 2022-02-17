import axios from "axios";

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
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  // const history = useHistory();
  return axios
    .post(
      `${process.env.REACT_APP_API_LOCAL}/perfil`,
      {
        nombre,
        email,
        direccion,
        ciudad,
        pais,
        cp,
        telefono,
        ocupacion,
        usuario,
      },
      headers
    )
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
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
