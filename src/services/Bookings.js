import api from "./api";

export const getBookings = () => {
  return api.get("/mostrar_citas");
};

export const editUser = (nombre, email, role, password, id) => {
  return api.put(`/user/edit/${id}`, {
    nombre,
    password,
    email,
    role,
  });
};

export const getUsers = () => {
  return api.get("/mostrar_usuarios");
};

export const deleteUser = (id) => {
  return api.delete(`/user/${id}`);
};

export const getBookingsUser = (id) => {
  return api.get(`/${id.replace(/['"]+/g, "")}/citas`);
};

export const citaPut = (idUser, idCita) => {
  return api.put(`/citas/asignar_contador/${idUser}/${idCita}`);
};

export const getBookingsById = (id) => {
  return api.get(`/citas/${id}`);
};

export const topics = () => {
  return api.get("/motivos");
};

export const areas = () => {
  return api.get("/area");
};

export const clear = (id) => {
  return api.delete(`/citas/${id}`);
};

export const RegisterBooking = (
  usuario,
  motivo,
  fecha_cita,
  hora,
  area,
  rfc
) => {
  return api
    .post("/registro_cita", {
      usuario,
      motivo,
      fecha_cita,
      hora,
      area,
      rfc,
    })
    .catch((error) => {
      console.error(error);
      throw error;
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
  return api
    .post(`/registro_cita/${id}`, {
      motivo,
      fecha_cita,
      hora,
      area,
      rfc,
    })
    .catch((error) => {
      console.error(error);
      throw error;
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
  return api
    .put(`/modificar_cita/${id}`, {
      usuario,
      motivo,
      fecha_cita,
      hora,
      area,
      rfc,
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const deleteBookingById = (id) => {
  return api.delete(`/citas/${id}`);
};
