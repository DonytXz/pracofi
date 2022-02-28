import React from "react";

const Edit = () => {
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
                <label for="title" class="text-lx font-serif">
                  Nombre:
                </label>
                <input
                  type="text"
                  placeholder="title"
                  id="title"
                  class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              {/* <div>
                <label for="description" class="block mb-2 text-lg font-serif">
                  Description:
                </label>
                <textarea
                  id="description"
                  cols="30"
                  rows="10"
                  placeholder="whrite here.."
                  class="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
                ></textarea>
              </div> */}
             <div className="flex flex-row justify-between">
                <label for="name" class="text-lx font-serif">
                  Correo:
                </label>
                <input
                  type="text"
                  placeholder="name"
                  id="name"
                  class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div className="flex flex-row justify-between">
                <label for="email" class="text-lx font-serif">
                  Contraseñá:
                </label>
                <input
                  type="text"
                  placeholder="name"
                  id="email"
                  class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <button class=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">
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
