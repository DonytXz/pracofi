import React from "react";
import { Link } from "react-router-dom";
import { HeaderUser } from "../components/global/";

const RegisterAcoutnMan = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col bg-white">
        <HeaderUser />
        <div class="bg-blue-dark shadow-md rounded p-8 flex flex-col m-auto w-10/12 h-2/3 lg:w-1/2 lg:h-3/4">
          <div className="w-full lg:w-3/4 m-auto">
            <div class="mb-4">
              <label class="block text-white text-sm font-bold mb-2" for="Name">
                Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-white"
                id="Name"
                type="text"
                placeholder="Name"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-white text-sm font-bold mb-2"
                for="LastName"
              >
                Last Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-white"
                id="LastName"
                type="text"
                placeholder="LastName"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-white text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-white"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-white text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-white"
                id="password"
                type="password"
                placeholder="******************"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-white text-sm font-bold mb-2"
                for="ConfirmPassword"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-white"
                id="ConfirmPassword"
                type="password"
                placeholder="******************"
              />
            </div>
            <p class="text-white text-xs italic">Comfirm the password.</p>
            <div class="flex items-center justify-between">
              <Link
                to="/bookings"
                class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              >
                Registrar contador
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterAcoutnMan;
