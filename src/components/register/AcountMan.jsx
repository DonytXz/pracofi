import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { RegisterService } from "../../services/";
import { alerForm, samePass } from "../../helpers";

const AcountMan = () => {
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
        RegisterService(name, email, pasword, "CONTADOR")
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
    } else {
      samePass();
    }
    // history.push("/bookings");
    // setSenFlag(true);
  };

  return (
    <>
      <div className="bg-blue-dark shadow-md rounded p-8 flex flex-col m-auto w-10/12 h-2/3 lg:w-1/2 lg:h-3/4 mt-2">
        <div className="w-full lg:w-3/4 m-auto">
          <span className="text-white text-xl mx-auto mb-1">
            Registrarse como Contador!
          </span>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="Name">
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
              id="Name"
              type="text"
              placeholder="Ingresa tu nombre"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="LastName"
            >
              Apellido
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
              id="LastName"
              type="text"
              placeholder="Ingresa tu apellido"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="username"
            >
              Correo Electronico
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
              id="username"
              type="text"
              placeholder="Ingresa tu correo electronico"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraeña
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-black"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setPasword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="ConfirmPassword"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-black"
              id="ConfirmPassword"
              type="password"
              placeholder="******************"
              onChange={(e) => setPaswordConfirm(e.target.value)}
            />
          </div>
          <p className="text-white text-xs italic"></p>
          <div className="flex items-center justify-between">
            <button
              // to="/bookings"
              onClick={submit}
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            >
              Registrar
            </button>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-white hover:text-blue-darker"
            >
              inicia sesion con una cuenta
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcountMan;
