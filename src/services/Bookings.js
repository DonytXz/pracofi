import axios from "axios";

export const getBookings = () => {
  const response = axios.get("http://localhost:4201/mostrar_citas");
  return response;
};

export const getBookingsById = (id) => {
  const response = axios.get(`http://localhost:4201/citas/${id}`);
  return response;
};
export const topics = () => {
  const response = axios.get("http://localhost:4201/motivos");
  return response;
};
export const clear = (id) => {
  const response = axios.delete(`http://localhost:4201/clear${id}`);
  return response;
};

export const RegisterBooking = (
  usuario,
  motivo,
  fecha_cita,
  hora,
  area,
  rfc
) => {
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
      // console.log(error);
    });
};

export const UpdateBooking = (
  usuario,
  motivo,
  fecha_cita,
  hora,
  area,
  rfc,
  id
) => {
  // const history = useHistory();
  return axios
    .put(`http://localhost:4201/modificar_cita/${id}`, {
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
      // console.log(error);
    });
};
