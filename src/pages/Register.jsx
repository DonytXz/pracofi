import React, { useState } from "react";
import { HeaderForms } from "../components/global";
// import { Link } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { RegisterService } from "../services";
import { alerForm, samePass } from "../helpers";

const Register = () => {
  // const [userName, setUserName] = useState("");
  const history = useHistory();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pasword, setPasword] = useState("");
  const [paswordConfirm, setPaswordConfirm] = useState("");

  // console.log(userName, name, lastName, email, pasword, paswordConfirm);
  const submit = () => {
    // console.log("click");
    if (pasword === paswordConfirm) {
      if (
        name != "" &&
        lastName != "" &&
        email != "" &&
        pasword != "" &&
        paswordConfirm != ""
      ) {
        RegisterService(name, email, pasword)
          .then((res) => {
            // console.log(res);
            if (res.ok) {
              history.push("/login");
            }
          })
          .catch((error) => {
            // console.log(error);
          });
      } else {
        alerForm();
      }
    }else{
      samePass();
    }
    // history.push("/bookings");
    // setSenFlag(true);
  };

  return (
    <>
      <div className="w-screen h-full min-h-screen flex flex-col bg-white">
        <HeaderForms />
        <div class="bg-blue-dark shadow-md rounded p-8 flex flex-col m-auto w-10/12 h-2/3 lg:w-1/2 lg:h-3/4">
          <div className="w-full lg:w-3/4 m-auto">
            <div class="mb-4">
              <label class="block text-white text-sm font-bold mb-2" for="Name">
                Nombre
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                id="Name"
                type="text"
                placeholder="Ingresa tu nombre"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-white text-sm font-bold mb-2"
                for="LastName"
              >
                Apellido
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                id="LastName"
                type="text"
                placeholder="Ingresa tu apellido"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-white text-sm font-bold mb-2"
                for="username"
              >
                Correo Electronico
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                id="username"
                type="text"
                placeholder="Ingresa tu correo electronico"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-white text-sm font-bold mb-2"
                for="password"
              >
                Contraeña
              </label>
              <input
                class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-black"
                id="password"
                type="password"
                placeholder="******************"
                onChange={(e) => setPasword(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-white text-sm font-bold mb-2"
                for="ConfirmPassword"
              >
                Contraseña
              </label>
              <input
                class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-black"
                id="ConfirmPassword"
                type="password"
                placeholder="******************"
                onChange={(e) => setPaswordConfirm(e.target.value)}
              />
            </div>
            <p class="text-white text-xs italic">Confirma la contraseña</p>
            <div class="flex items-center justify-between">
              <button
                // to="/bookings"
                onClick={submit}
                class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              >
                Registrar
              </button>
              <Link
                to="/login"
                class="inline-block align-baseline font-bold text-sm text-white hover:text-blue-darker"
              >
                ¿inicia sesion con una cuenta?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
