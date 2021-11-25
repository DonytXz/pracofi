import React from "react";
import { useForm, ValidationError } from '@formspree/react';
const Contact = () => {
  
  return (
    <section id="contact" class="w-full mx-auto blue pt-12 bg-black">
      <div class="w-full h-full flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/2  lg:relative p-10">
          <div class="w-full lg:w-2/3 lg:relative lg:float-right ">
            <h2 class="my-2   font-semibold w-full text-2xl lg:text-5xl text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h2>
            <h3 class="hover:opacity-50 my-2 text-white  ">
              <button>{"ENVIANOS TUS DATOS ->"}</button>
            </h3>
            <p class="text-white   font-normal">
              <strong class="  font-semibold">Credifan</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nemo tenetur eligendi dignissimos dolorem distinctio, minima quasi eaque non consequuntur?
            </p>
          </div>
        </div>
        <div class="w-full lg:w-1/2 h-full flex lg:p-10 ">

          <form
            action="https://formspree.io/f/xknywojb"
            method="POST"
            class="w-full h-full float-left"
          >
            <div class="w-full lg:w-2/3 h-full p-10 bg-white flex flex-col self-start">
              <label class="mt-4 font-gray-form" for="">
                Nombre
              </label>
              <input
                class="font-gray-form border-2 rounded bg-gray-200 px-4 py-2"
                placeholder="Escriba aqui"
                type="text"
                name="nombre"
                id="nombre"
              />
              <label class="font-gray-form mt-4" htmlFor="email">
              Correo electronico
              </label>
              <input
               class="font-gray-form border-2 rounded bg-gray-200 px-4 py-2"
               placeholder="Escriba aqui here"
                id="email"
              type="email" 
                name="email"
               />
              <label class="font-gray-form mt-4" for="">
                Teléfono
              </label>
              <input
                class=" font-gray-formborder-2 rounded bg-gray-200 px-4 py-2"
                placeholder="Escriba aqui"
                type="tel"
                name="telefono"
                id="telefono"
              />
              <button
                type="submit"
                onclick="submitted()"
                class="hover:opacity-50 mt-6 bg-pinkCustom w-full lg:w-2/4 text-black  bg-aqua p-2 self-end border_red border-2 rounded"
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
