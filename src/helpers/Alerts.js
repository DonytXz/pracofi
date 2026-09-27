import Swal from "sweetalert2";
import api from "../services/api";

//ALERTSSSSSSSSSS
export const notPresentToken = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Parece que no tienes una sesion activa",
    // footer: '<a href="">Why do I have this issue?</a>',
  });
};
export const alerForm = () => {
  Swal.fire("Favor de llenar todos los campos");
};

export const success = () => {
  Swal.fire("Hecho!", "Actualizado!", "success");
};

export const worngLogin = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Datos incorrectos",
    // footer: '<a href="">Why do I have this issue?</a>',
  });
};
export const deleteUsuario = () => {
  Swal.fire("Hecho!", "¡Usuario Eliminado!", "success");
};

export const fakeDeleteUser = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "No se pudo eliminar el usuario",
    // footer: '<a href="">Why do I have this issue?</a>',
  });
};

export const samePass = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Verifique las contraseñas",
    // footer: '<a href="">Why do I have this issue?</a>',
  });
};

export const getUsers = () => {
  return api.get("/mostrar_usuarios");
}; 