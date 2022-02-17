import React from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "../../assets/img/icons/hamburgerMenu.svg";

const Menu = (props) => {
  const { isLanding, menuFlag, setMenuFlag } = props;

  return (
    <>
      <img
        className="block lg:hidden p-6"
        src={HamburgerMenu}
        alt=""
        srcSet=""
        onClick={() => setMenuFlag(!menuFlag)}
      />
      <nav className="hidden lg:block">
        <ul className="lg:grid grid-cols-4 gap-2 h-full place-content-center justify-items-center">
          <li class="text-white">
            <Link to="/" className="uppercase font-semibold hover:text-blue-dark">
              Home
            </Link>
          </li >
          {isLanding && (
            <>
              <li class="text-white">
                <Link
                  to={{ pathname: "/", hash: "#about" }}
                  className="uppercase font-semibold hover:text-blue-dark"
                >
                  quienes somos
                </Link>
              </li>
              <li class="text-white">
                <Link
                  to={{ pathname: "/", hash: "#contact" }}
                  className="uppercase font-semibold hover:text-blue-dark"
                >
                  contacto
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/register" className="uppercase bg-blue-dark rounded-full p-4 text-white font-semibold hover:bg-blue-light">
              Registrarse
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
