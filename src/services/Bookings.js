import axios from "axios";

export const getBookings = () => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.get("http://localhost:4201/mostrar_citas",headers);
  return response;
};

export const getBookingsById = (id) => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.get(`http://localhost:4201/citas/${id}`,headers);
  return response;
};
export const topics = () => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.get("http://localhost:4201/motivos",headers);
  return response;
};
export const areas = () => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.get("http://localhost:4201/area",headers);
  return response;
};
export const clear = (id) => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.delete(`http://localhost:4201/citas/${id}`,headers);
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
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  // const history = useHistory();
  return axios
    .post("http://localhost:4201/registro_cita", {
      usuario,
      motivo,
      fecha_cita,
      hora,
      area,
      rfc,
    },headers)
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
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  // const history = useHistory();
  return axios
    .put(`http://localhost:4201/modificar_cita/${id}`, {
      usuario,
      motivo,
      fecha_cita,
      hora,
      area,
      rfc,
    },headers)
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
