import React, { useEffect, useState } from "react";
import { HeaderForms } from "../components/global/";
import { Link, useHistory } from "react-router-dom";
import { login } from "../services/AutService";
import { alerForm, worngLogin } from "../helpers";

const Login = () => {
  // const [sendFlag, setSenFlag] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pasword, setPasword] = useState("");

  // useEffect(() => {
  //   login("arianagrande@gmail.com", "12345");
  // }, [sendFlag === true]);
  const submit = () => {
    // console.log("click");

    if (email != "" && pasword != "") {
      login(email, pasword)
        .then((res) => {
          // console.log(res);
          if (res.ok) {
            history.push("/bookings");
          }else if(!res) {
            worngLogin();
          }
        })
        .catch((error) => {
          // console.log(error);
        });
      // setSenFlag(true);
    } else {
      alerForm();
    }
    //comentario
    //comentario
  };

  return (
    <>
      <div className="w-screen h-full min-h-screen flex flex-col bg-white">
        <HeaderForms />
        <div class="bg-blue-dark shadow-md rounded p-8 flex flex-col mx-auto w-10/12  lg:w-1/2 h-full mb-auto ">
          <div className="w-full lg:w-3/4 m-auto">
            <div class="mb-4">
              <label
                class="block text-white text-sm font-bold mb-2"
                for="username"
              >
                Correo Resgistrado
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                id="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-white text-sm font-bold mb-2"
                for="password"
              >
                Contraseña
              </label>
              <input
                class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-black mb-3"
                id="password"
                type="password"
                placeholder="******************"
                onChange={(e) => setPasword(e.target.value)}
              />
              <p class="text-white text-xs italic">
              </p>
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={submit}
              >
                Iniciar sesión
              </button>
              <Link
                to="/register"
                class="inline-block align-baseline font-bold text-sm text-white hover:text-blue-darker"
              >
                ¿Deseas crear una cuenta?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
