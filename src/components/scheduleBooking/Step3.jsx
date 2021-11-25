import React from "react";
import { StepIndicator } from "./";

const Step3 = (props) => {
  const { setRfc, setArea } = props;

  // const handleIsOnZMG = (type) => () => {
  //   {
  //     // console.log(type);
  //     if (type === "si") {
  //       setIsOnZMG(true);
  //     } else if (type === "no") {
  //       setIsOnZMG(false);
  //     }
  //   }
  // };

  return (
    <>
      <StepIndicator step={3} />
      <span className="text-4xl mx-auto mb-4">Nosotros nos encargamos 📝</span>
      <p className="text-2xl">En breve revisaremos su caso.</p>
      <div className="flex flex-col p-4">
        <div className="flex flex-col">
          <div className="flex flex-col border-2 p-4 w-3/4 mx-auto my-4">
            {/* <p className="my-auto">
              ¿Se encuaentra dentro de la Zona Metropolitana de Guadalajara, MX?
            </p>
            <div className="flex flex-col">
              <button
                // disabled="disabled"
                onClick={handleIsOnZMG("si")}
                className=" p-4 rounded-2xl border-2 my-2"
              >
                Si
              </button>
              <button
                // disabled="disabled"
                onClick={handleIsOnZMG("no")}
                className=" p-4 rounded-2xl border-2 my-2"
              >
                No
              </button>
            </div> */}
            <label class="block text-white mx-auto text-xl mb-2" for="cus_name">
              Area
            </label>
            <input
              class="w-full px-5 py-1 text-gray-700  rounded"
              id="cus_name"
              name="cus_name"
              type="text"
              required=""
              placeholder="Area"
              aria-label="Name"
              onChange={(e) => setArea(e.target.value)}
            />
            <label class="block text-white mx-auto text-xl my-2" for="cus_name">
              RFC
            </label>
            <input
              class="w-full px-5 py-1 text-gray-700  rounded"
              id="cus_name"
              name="cus_name"
              type="text"
              required=""
              placeholder="RFC"
              aria-label="Name"
              onChange={(e) => setRfc(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="inline-flex items-center">
              <input type="checkbox" className="" />
              <span className="ml-2">Apruebo que se envie mi informacion.</span>
            </label>
            {/* <label className="inline-flex items-center">
              <input type="checkbox" className="" />
              <span className="ml-2">
                Estoy interezado en continuar con el proceso.
              </span>
            </label> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3;
