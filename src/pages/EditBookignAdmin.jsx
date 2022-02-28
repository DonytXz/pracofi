import React from "react";
import { GeneratePDF, HeaderAdmin } from "../components/global/";
import { Edit } from "../components/editBookingAdmin";

const EditBookignAdmin = () => {
  return (
    <>
      <div id="pdf" className="w-full h-full">
        <HeaderAdmin />
        <GeneratePDF />
        <Edit />
      </div>
    </>
  );
};

export default EditBookignAdmin;
