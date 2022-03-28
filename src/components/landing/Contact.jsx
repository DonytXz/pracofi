import React from "react";
import { useForm, ValidationError } from '@formspree/react';
const Contact = () => {
  function ContactForm() {
    const [state, handleSubmit] = useForm("xknywojb");
    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    }
  }
  return (
    <section id="contact" className="w-full mx-auto blue pt-12 bg-black">
      <div className="w-full h-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2  lg:relative p-10">
          <div className="w-full lg:w-2/3 lg:relative lg:float-right ">
            <h2 className="my-2   font-semibold w-full text-2xl lg:text-5xl text-white ">
            En PRACOFI nos interesa lo que piensa
            </h2>
            <p className="text-white   font-normal">
              <strong className="font-semibold " > Contacte con nosotros ahora mismo llenando este sencillo formulario </strong>
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-full flex lg:p-10 ">

          <form
            action="https://formspree.io/f/xknywojb"
            method="POST"
            className="w-full h-full float-left"
          >
            <div className="w-full lg:w-2/3 h-full p-10 bg-white flex flex-col self-start">
              <label className="mt-4 font-gray-form" htmlFor="">
                Nombre
              </label>
              <input
                className="font-gray-form border-2 rounded bg-gray-200 px-4 py-2"
                placeholder="Escriba aqui su nombre"
                type="text"
                name="Nombre"
                id="Nombre"
                required
              />
              
              <label className="font-gray-form mt-4" htmlFor="email">
              Correo electronico
              </label>
              <input
               className="font-gray-form border-2 rounded bg-gray-200 px-4 py-2"
               placeholder="Escriba aqui su correo"
                id="email"
              type="email" 
                name="email"
                required
               />
               <ValidationError 
              prefix="Email" 
              field="email"
              errors={"001".errors}
         />
              <label className="font-gray-form mt-4" htmlFor="">
                Teléfono
              </label>
              <input
                className=" font-gray-formborder-2 rounded bg-gray-200 px-4 py-2"
                placeholder="Escriba aqui"
                type="tel"
                name="telefono"
                id="telefono"
required
              />
          
              <button
                type="submit"
                onclick="submitted()"
                className="hover:opacity-50 mt-6 bg-pinkCustom w-full lg:w-2/4 text-black  bg-aqua p-2 self-end border_red border-2 rounded"
              >
                ENVIAR 
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
