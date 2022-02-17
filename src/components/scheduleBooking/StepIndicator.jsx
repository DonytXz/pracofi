import React from "react";

const StepIndicator = (props) => {
  const { step } = props;
  return (
    <>
      <div className="flex md:p-10 w-1/2 mx-auto">
        <div className="w-1/3">
          <div className="relative mb-2">
            <div
              className={`w-10 h-10 mx-auto ${
                step === 1 ? "bg-black" : ""
              } text-lg text-white flex items-center`}
            >
              <span className="text-center text-white w-full">1</span>
            </div>
          </div>
          <div className="text-xs text-center md:text-base">Elegir fecha</div>
        </div>
        <div className="w-1/3">
          <div className="relative mb-2">
            <div
              className={`w-10 h-10 mx-auto ${
                step === 2 ? "bg-black" : ""
              } text-lg text-white flex items-center`}
            >
              <span className="text-center text-white w-full">2</span>
            </div>
          </div>
          <div className="text-xs text-center md:text-base">
            Explicacion del caso
          </div>
        </div>
        <div className="w-1/3">
          <div className="relative mb-2">
            <div
              className={`w-10 h-10 mx-auto ${
                step === 3 ? "bg-black" : ""
              } text-lg text-white flex items-center`}
            >
              <span className="text-center text-white w-full">3</span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">
            Aceptar terminos
          </div>
        </div>
      </div>
    </>
  );
};

export default StepIndicator;
