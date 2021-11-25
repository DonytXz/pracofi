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
  // const history = useHistory();
  return axios
    .post("http://localhost:4201/perfil", {
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
