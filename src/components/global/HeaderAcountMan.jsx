import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserIcon from "../../assets/img/icons/user.svg";
import Logo from "../../assets/img/logo.png";
import { logout } from "../../services/";

const HeaderAcountMan = () => {
  const history = useHistory();
  const [openNav, setOpenNav] = useState(false);
  const [openDropDnw, setOpenDropDnw] = useState(false);
  const [hoverDates, setHoverDates] = useState(false);
  const [hoverSchedule, setHoverSchedule] = useState(false);
  const [hoverProfile, setHoverProfile] = useState(false);
  const [userName, setUserName] = useState(
    localStorage.getItem("name").replaceAll('"', "")
  );
  //   const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);

  const handleNav = () => {
    setOpenNav(!openNav);
  };
  const handleDropDwn = () => {
    setOpenDropDnw(!openDropDnw);
  };
  const handleHoverDates = () => {
    setHoverDates(!hoverDates);
  };
  const handleHoverSchedule = () => {
    setHoverSchedule(!hoverSchedule);
  };

  const handleHoverProfile = () => {
    setHoverProfile(!hoverProfile);
  };
  const logoutSession = () => {
    logout();
    history.push("/");
  };
  return (
    <>
      <div className="flex flex-row w-11/12 mx-auto my-2">
        <img className="h-24 my-auto" src={Logo} alt="" srcSet="" />
        <div className="w-full flex flex-row lg:hidden">
          <button
            type="button"
            onClick={handleNav}
            className={`w-full rounded-md inline-flex items-center justify-center`}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6 my-auto ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="hidden lg:block md:w-6/12 lg:w-4/12 xl:w-3/12 ml-auto my-auto">
          <div className="inline-block w-32 mr-10">
            <div
              onClick={handleDropDwn}
              onMouseOver={handleDropDwn}
              className=" w-full overflow-hidden focus:outline-none ml-8 whitespace-nowrap inline-flex items-center justify-center px-0.5 py-2 border border-transparent shadow-sm text-base font-medium text-white bg-mattBlack bg-opacity-75 hover:bg-opacity-100"
            >
              Mi Cuenta
              {/* <img className="ml-2 w-3 h-3" src={ArrowDonw} alt="" /> */}
            </div>
          </div>

          <div className="inline-block w-32">
            <button
              // to="/"
              onClick={logoutSession}
              className="w-full ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium text-white bg-blue-dark bg-opacity-75 hover:bg-opacity-100"
            >
              Cerrar Sesión
            </button>
          </div>

          <div
            onMouseLeave={() => setOpenDropDnw(false)}
            className={`absolute w-32 ml-8 mr-10  z-10  bg-gray-200 ${
              openDropDnw ? "absolute" : "hidden"
            }`}
          >
            <div
              onMouseOver={handleHoverDates}
              onMouseLeave={() => setHoverDates(false)}
              className={`bg-gray-200 w-full h-1/2 block ${
                hoverDates ? "bg-gray-800 text-white" : ""
              }   box-border`}
            >
              <Link to="/bookings-acountMan" className="block">
                <p className="block text-center p-2">Citas</p>
              </Link>
            </div>

            <div
              onMouseOver={handleHoverSchedule}
              onMouseLeave={() => setHoverSchedule(false)}
              className={`bg-gray-200 w-full h-1/2 block ${
                hoverSchedule ? "bg-gray-800 text-white" : ""
              }   box-border`}
            >
              <Link to="/my-bookings-acountMan" className="block">
                <p className="block text-center p-2">Mis Citas</p>
              </Link>
            </div>

            <div
              onMouseOver={handleHoverProfile}
              onMouseLeave={() => setHoverProfile(false)}
              className={`bg-gray-200 w-full h-1/2 block ${
                hoverProfile ? "bg-gray-800 text-white" : ""
              }  box-border`}
            ></div>
          </div>
        </div>
      </div>

      <div
        onMouseLeave={() => setOpenNav(false)}
        className={`w-full lg:hidden bg-gray-200 ${
          openNav ? "block" : "hidden"
        }`}
      >
        <div
          onMouseOver={handleHoverDates}
          onMouseLeave={() => setHoverDates(false)}
          className={`bg-gray-200 w-full h-1/2 block ${
            hoverDates ? "bg-gray-800 text-white" : ""
          }   box-border`}
        >
          <Link to="/bookings-acountMan" className="block">
            <p className="block text-center p-2">Citas</p>
          </Link>
        </div>

        <div
          onMouseOver={handleHoverSchedule}
          onMouseLeave={() => setHoverSchedule(false)}
          className={`bg-gray-200 w-full h-1/2 block ${
            hoverSchedule ? "bg-gray-800 text-white" : ""
          }   box-border`}
        >
          <Link to="/my-bookings-acountMan" className="block">
            <p className="block text-center p-2">Mis Citas</p>
          </Link>
        </div>

        <div
          onMouseOver={handleHoverProfile}
          onMouseLeave={() => setHoverProfile(false)}
          className={`bg-gray-200 w-full h-1/2 block ${
            hoverProfile ? "bg-gray-800 text-white" : ""
          }  box-border`}
        >
          <button
            // to="/"
            onClick={logoutSession}
            className="w-full  whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium text-white bg-blue-dark bg-opacity-75 hover:bg-opacity-100"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="flex flex-row w-10/12 mx-auto my-2">
        <img className="w-16 mr-6" src={UserIcon} alt="" srcSet="" />
        <p className="my-auto text-2xl py-2">
          <span className="font-bold">Bienvenido: </span>
          {userName}
        </p>
      </div>
    </>
  );
};

export default HeaderAcountMan;
