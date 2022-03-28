import axios from "axios";

export const getBookings = () => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.get(
    `${process.env.REACT_APP_API_LOCAL}/mostrar_citas`,
    headers
  );
  return response;
};

export const editUser = (nombre, email, role, password, id) => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.put(
    `${process.env.REACT_APP_API_LOCAL}/user/edit/${id}`,
    {
      nombre,
      password,
      email,
      role,
    },
    headers
  );
  return response;
};

export const getUsers = () => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.get(
    `${process.env.REACT_APP_API_LOCAL}/mostrar_usuarios`,
    headers
  );
  return response;
};

export const deleteUser = (id) => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.delete(
    `${process.env.REACT_APP_API_LOCAL}/user/${id}`,
    headers
  );
  return response;
};

export const getBookingsUser = (id) => {
  // console.log(id,"id on service");
  // var decoded = decodeURI(id);

  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.get(
    `${process.env.REACT_APP_API_LOCAL}/${id.replace(/['"]+/g, "")}/citas`,
    headers
  );
  return response;
};

export const citaPut = (idUser, idCita) => {
  console.log(idUser, idCita);
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  }; 
  const response = axios.put(
    `${process.env.REACT_APP_API_LOCAL}/citas/asignar_contador/${idUser}/${idCita}`,
    headers
  ); 
  return response; 
}

export const getBookingsById = (id) => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.get(
    `${process.env.REACT_APP_API_LOCAL}/citas/${id}`,
    headers
  );
  return response;
};
export const topics = () => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.get(
    `${process.env.REACT_APP_API_LOCAL}/motivos`,
    headers
  );
  return response;
};
export const areas = () => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.get(
    `${process.env.REACT_APP_API_LOCAL}/area`,
    headers
  );
  return response;
};
export const clear = (id) => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.delete(
    `${process.env.REACT_APP_API_LOCAL}/citas/${id}`,
    headers
  );
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
    .post(
      "http://localhost:4201/registro_cita",
      {
        usuario,
        motivo,
        fecha_cita,
        hora,
        area,
        rfc,
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
      return res;
    })
    .catch((error) => {
      // console.log(error);
    });
};

export const RegisterBookingUser = (
  id,
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
    .post(
      "http://localhost:4201/registro_cita/" + id,
      {
        motivo,
        fecha_cita,
        hora,
        area,
        rfc,
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
    .put(
      `http://localhost:4201/modificar_cita/${id}`,
      {
        usuario,
        motivo,
        fecha_cita,
        hora,
        area,
        rfc,
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
      return res;
    })
    .catch((error) => {
      // console.log(error);
    });
};

export const deleteBookingById = (id) => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  const response = axios.delete(
    `${process.env.REACT_APP_API_LOCAL}/citas/${id}`,
    headers
  );
  return response;
};
