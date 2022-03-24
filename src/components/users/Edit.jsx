import React, { useState } from "react";
import { success } from "../../helpers";
import { editUser } from "../../services/Bookings";
// EDITAR USUARIO


const Edit = () => {

  const [nombre, setNombre] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [role, setRole] = useState(""); 
  const [password, setPassword] = useState(""); 


const editarUsuario = () => {
  editUser(nombre, email, role, password)
  .then((res)=> {
    console.log(res, 'res editar usuario')
    success()
  })
  .catch((error) => {
    // console.log(error);
  });
  
};

  return (
    <>
      <form>
        {/* <div class="bg-indigo-50 min-h-screen md:px-20 pt-6"> */}
        <div class=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto flex flex-col">
          <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">
            Editar usuario
          </h1>
          <div class="space-y-4 mx-auto">
            <div className="flex flex-row justify-between">
              <label for="title" class="font-bold text-lx">
                Nombre:
              </label>
              <input
                type="text"
                placeholder=""
                onChange={(e) => setNombre(e.target.value)}
                id="title"
                class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <div className="flex flex-row justify-between">
              <label itemType="email" for="name" class="font-bold text-lx ">
                Correo:
              </label>
              <input
                type="email"
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
                id="name"
                class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <div className="flex flex-row justify-between">
              <label for="name" class="font-bold text-lx ">
                Rol:
              </label>
              <input
                type="text"
                placeholder=""
                id="role"
                onChange={(e) => setRole(e.target.value)}
                class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <div className="flex flex-row justify-between">
              <label for="email"  class="font-bold text-lx ">
                Contraseña:
              </label>
              <input
                placeholder=""
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <button 
            onClick={editarUsuario}
             class=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">
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
