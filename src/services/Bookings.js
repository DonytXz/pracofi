import axios from 'axios';

export const getBookings = () => {
    const response = axios.get("http://localhost:4201/mostrar_citas");
    return response;
}

export const RegisterBooking = (usuario, motivo, fecha_cita, hora, area, rfc) => {
  // const history = useHistory();
  return axios
    .post("http://localhost:4201/registro_cita", {
      usuario,
      motivo,
      fecha_cita,
      hora,
      area,
      rfc,
    })
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
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};