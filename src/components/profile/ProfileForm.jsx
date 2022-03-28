import React, { useState } from "react";
import { RegisterProfileData } from "../../services";
import { alerForm, success } from "../../helpers";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [ocupation, setOcupation] = useState("");
  const [userId] = useState(localStorage.getItem("id").replaceAll('"', ""));

  // console.log(name,email,address,city,country,phone,zip,ocupation);
  const send = () => {
    // console.log("click");

    if (
      name != "" &&
      email != "" &&
      address != "" &&
      city != "" &&
      country != "" &&
      zip != "" &&
      phone != "" &&
      ocupation != "" &&
      userId != ""
    ) {
      RegisterProfileData(
        name,
        email,
        address,
        city,
        country,
        zip,
        phone,
        ocupation,
        userId
      )
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            history.push("/bookings");
            success();
          }
        })
        .catch((error) => {
          // console.log(error);
        });
    } 
    else {
      alerForm();
    }
    // history.push("/bookings");
    // setSenFlag(true);
  };

  return (
    <>
      <div className="w-10/12 lg:w-1/2 mx-auto p-10 bg-white rounded shadow-xl">
        <p className="text-gray-800 font-medium mb-4">Datos prersonales</p>
        <div className="">
          <label className="block text-sm text-gray-600" htmlFor="cus_name">
            Nombre
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
            // id="cus_name"
            // name="cus_name"
            type="text"
            // required=""
            placeholder="Su nombre"
            aria-label="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Correo electronico
          </label>
          <input
            className="w-full px-5  py-1 text-gray-700 bg-gray-200 rounded"
            // id="cus_email"
            // name="cus_email"
            type="text"
            // required=""
            placeholder="Su Correo"
            aria-label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label className=" block text-sm text-gray-600" htmlFor="cus_email">
            Address
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            // id="cus_email"
            // name="cus_email"
            type="text"
            // required=""
            placeholder="Direccion de casa"
            aria-label="Email"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label className=" text-sm block text-gray-600" htmlFor="cus_email">
            area
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            // id="cus_email"
            // name="cus_email"
            type="text"
            // required=""
            placeholder="Area"
            aria-label="Email"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="inline-block mt-2 w-1/2 pr-1">
          <label className=" block text-sm text-gray-600" htmlFor="cus_email">
            Country
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            // id="cus_email"
            // name="cus_email"
            type="text"
            // required=""
            placeholder="Ciudad"
            aria-label="Email"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
          <label className=" block text-sm text-gray-600" htmlFor="cus_email">
            Municipio
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            // id="cus_email"
            // name="cus_email"
            type="text"
            // required=""
            placeholder="Municipio"
            aria-label="Email"
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_name">
            Phone
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            // id="cus_name"
            // name="cus_name"
            type="number"
            // required=""
            placeholder="xxx-xxx-xxx-xxx"
            aria-label="Name"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_name">
            Ocupacion
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            // id="cus_name"
            // name="cus_name"
            type="text"
            // required=""
            placeholder="Maestro"
            aria-label="Name"
            onChange={(e) => setOcupation(e.target.value)}
          />
        </div>
        <button
          onClick={send}
          className="w-full text-white bg-blue-dark mt-4 p-4"
        >
          Enviar datos
        </button>
      </div>
    </>
  );
};

export default ProfileForm;
