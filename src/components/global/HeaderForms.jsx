import React from "react";
import BrandLogo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

const HeaderForms = () => {
  return (
    <>
      <div className="h-1/6 flex flex-col py-8 mb-4">
        <Link to="/">
          <img
            className="w-3/4 lg:w-1/4 m-auto"
            src={BrandLogo}
            alt=""
            srcSet=""
          />
        </Link>
      </div>
    </>
  );
};

export default HeaderForms;
