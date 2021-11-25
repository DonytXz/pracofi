import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../assets/img/figure1.png";
import Logo from "../../assets/img/logoOnly.png";
import Header from "../global/Header";

const Home = () => {
  return (
    <>
      <div className="lg:h-screen flex flex-col">
        <Header />
        <div className="flex flex-col lg:flex-row w-10/12 mx-auto h-1/2 my-4 lg:my-auto">
          <div className="h-full m-auto">
            <img
              className="h-full"
              src={Hero}
              alt=""
              srcSet=""
            />
          </div>
          <div className="flex flex-col w-10/12 mt-4 lg:my-auto lg:w-1/2 justify-center mx-auto">
            <div className="flex flex-row mx-auto mb-6">
              <h1 className="text-center text-4xl font-bold text-blue-regular mr-6">
                ¡Bienvenido a Pracofi!
              </h1>
              <img className="" src={Logo} alt="" srcSet="" />
            </div>

            <span  className="my-4" class="text-blue-900 font-semibold" align="justify">
            La empresa PRACOFI, Asesoría, Contable Fiscal, es un despacho de contadores dedicados a brindar asesoría contables y fiscales, así como servicios administrativos, siendo reconocidos por su compromiso y dedicación para llevarlos a cabo.
Actualmente, ha laborando en el sector empresarial durante 15 años. A lo largo de este tiempo, ha demostrado un gran compromiso con sus clientes de manera que la empresa constantemente está creciendo y realizando nuevos cambios, uno de ellos fue en su imagen corporativa, como fue el cambio de su nombre comercial que anteriormente era PR Contadores.

            </span>
            <p className="w-10/12 mx-auto text-lg text-blue-regular mb-4">
              ¿Como podemos ayudarte? en Pracofi nos preocupamos por ti. ¡Agenda
              tu cita y comencemos ahora!
            </p>
            <Link
              to="/scheduleBooking"
              className="w-3/4 mx-auto uppercase p-6 bg-black hover:bg-blue-dark text-white text-center"
            >
              Agendar una cita
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
