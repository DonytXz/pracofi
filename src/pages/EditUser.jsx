import React from "react";
import { HeaderAdmin, GeneratePDF } from "../components/global/";
import { Edit } from "../components/users";

const EditUser = () => {
  return (
    <>
      <div id="pdf" className="w-full h-full">
        <HeaderAdmin />
        <GeneratePDF />
        <div className="flex flex-col w-10/12 m-auto">
          <Edit />
        </div>
      </div>
    </>
  );
};

export default EditUser;
