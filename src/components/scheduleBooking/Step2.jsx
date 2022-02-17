import React from "react";
import { StepIndicator } from "./";

const Step2 = (props) => {
  const { text, setTxt } = props;
  return (
    <>
      <StepIndicator step={2} />
      <span className="text-4xl mx-auto mb-4">
        Informacion necesaria para continuar
      </span>
     
      <div className="flex flex-col p-4">
        {/* <CountryPicker /> */}
        <textarea
          className="bg-blue-dark border-2 rounded-xl my-4 text-center"
          placeholder="Ingrese mas detalles de su caso"
          name=""
          onChange={(e) => setTxt(e.target.value)}
          value={text}
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </>
  );
};

export default Step2;
