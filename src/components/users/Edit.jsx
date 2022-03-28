import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { success } from "../../helpers";
import { editUser } from "../../services/Bookings";
// EDITAR USUARIO

const Edit = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const { id } = useParams();

  const editarUsuario = (e) => {
    // getUserById()
    e.preventDefault();
    // console.log("asdasd");
    editUser(nombre, email, role, password, id)
      .then((res) => {
        console.log(res, "res editar usuario");
        success();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   getUse
  // })

  return (
    <>
      <form>
        {/* <div className="bg-indigo-50 min-h-screen md:px-20 pt-6"> */}
        <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto flex flex-col">
          <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">
            Editar usuario
          </h1>
          <div className="space-y-4 mx-auto">
            <div className="flex flex-row justify-between">
              <label for="title" className="font-bold text-lx">
                Nombre:
              </label>
              <input
                type="text"
                placeholder=""
                onChange={(e) => setNombre(e.target.value)}
                id="title"
                className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <div classNameName="flex flex-row justify-between">
              <label itemType="email" for="name" className="font-bold text-lx ">
                Correo:
              </label>
              <input
                type="email"
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
                id="name"
                className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <div classNameName="flex flex-row justify-between">
              <label for="name" className="font-bold text-lx ">
                Rol:
              </label>
              <input
                type="text"
                placeholder=""
                id="role"
                onChange={(e) => setRole(e.target.value)}
                className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <div classNameName="flex flex-row justify-between">
              <label for="email" className="font-bold text-lx ">
                Contraseña:
              </label>
              <input
                placeholder=""
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <button
              onClick={(e) => {editarUsuario(e)}}
              className=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  "
            >
              Actualizar
            </button>
          </div>
        </div>
        {/* </div> */}
      </form>
    </>
  );
};

export default Edit;
