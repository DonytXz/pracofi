import React, { useState } from "react";
import { HeaderForms } from "../components/global";
// import { Link } from "react-router-dom";
import { Client, AcountMan } from "../components/register";

const Register = () => {
  const [registerType, setRegisterType] = useState("client");
  const handleClick = (param) => setRegisterType(param);
  return (
    <>
      <div className="w-full h-full min-h-screen flex flex-col bg-white">
        <HeaderForms />
        <div className="w-1/2 flex flex-row mx-auto">
          <button
            className="w-1/2 mx-auto  uppercase bg-blue-dark rounded-full p-4 text-white font-semibold hover:bg-blue-light"
            onClick={() => handleClick("client")}
          >
            cliente
          </button>
          <button
            className="w-1/2  mx-auto uppercase bg-blue-dark rounded-full p-4 text-white font-semibold hover:bg-blue-light"
            onClick={() => handleClick("acountMan")}
          >
            contador
          </button>
        </div>

        {registerType != "" && registerType == "client" ? <Client /> : <></>}
        {registerType != "" && registerType == "acountMan" ? (
          <AcountMan />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Register;
