import React from "react";
import { List } from "../components/users";
import { HeaderAdmin, GeneratePDF } from "../components/global/";

const Users = () => {
  return (
    <>
      <div id="pdf" className="w-full h-full">
        <HeaderAdmin />
        <GeneratePDF />
        <div className="flex flex-col w-10/12 m-auto">
          <List />
        </div>
      </div>
    </>
  );
};

export default Users;
