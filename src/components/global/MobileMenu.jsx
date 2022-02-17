import React from "react";
import { Link } from "react-router-dom";

const MobileMenu = (props) => {
  const { isLanding, menuFlag } = props;
  return (
    <>
      <nav
        className={`${
          menuFlag ? "flex justify-center" : "hidden"
        } w-10/12 mx-auto md:2/3 lg:1/3`}
      >
        <ul className="w-full text-center">
          <li className="my-1">
            <Link to="/" className="uppercase">
              Home
            </Link>
          </li>
          {isLanding && (
            <>
              <li className="my-1">
                <Link
                  to={{ pathname: "/", hash: "#about" }}
                  className="uppercase"
                >
                  quienes somos
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to={{ pathname: "/", hash: "#contact" }}
                  className="uppercase"
                >
                  contacto
                </Link>
              </li>
            </>
          )}

          <li className="my-1">
            <Link to="/register" className="uppercase">
              Registrarse
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileMenu;
