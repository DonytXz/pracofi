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

  // let role = storage.getItem("role");
  // useEffect(() => {
  //   login("arianagrande@gmail.com", "12345");
  // }, [sendFlag === true]);
  const submit = () => {
    // console.log("click");

    if (email != "" && pasword != "") {
      login(email, pasword)
        .then((res) => {
          // console.log(res, "adasd");

          // const initialValue = JSON.parse(saved);

          if (res.ok) {
            const saved = localStorage.getItem("role");
            const initialValue = JSON.parse(saved);
            console.log(initialValue, typeof(initialValue), typeof("ADMIN"), initialValue == "ADMIN");
            // if (initialValue == "ADMIN") {
            //   console.log("entro al admin");
            //   history.push("/bookings-admin");
            // }
            if (initialValue == "USER") {
              console.log("entro al user");
              history.push("/bookings");
            } else if (initialValue == "CONTADOR") {
              console.log("entro al contador");
              history.push("/bookings-acountMan");
            } else if (initialValue == "ADMIN") {
              console.log("entro al admin");
              history.push("/bookings-admin");

            }
          } else if (!res) {
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
        <div className="bg-blue-dark shadow-md rounded p-8 flex flex-col mx-auto w-10/12  lg:w-1/2 h-full mb-auto ">
          <div className="w-full lg:w-3/4 m-auto">
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="username"
              >
                Correo Resgistrado
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                id="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-black mb-3"
                id="password"
                type="password"
                placeholder="******************"
                onChange={(e) => setPasword(e.target.value)}
              />
              <p className="text-white text-xs italic"></p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={submit}
              >
                Iniciar sesión
              </button>
              <Link
                to="/register"
                className="inline-block align-baseline font-bold text-sm text-white hover:text-blue-darker"
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
