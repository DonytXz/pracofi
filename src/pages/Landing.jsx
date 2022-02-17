import React, { useEffect } from "react";
import { Home, About, Contact } from "../components/landing";
import { useLocation } from "react-router-dom";

const Landing = () => {
  let location = useLocation();

  //Using hash in location to scrol like an interal url
  useEffect(() => {
    const hash = location.hash;
    // Check if there is a hash and if an element with that id exists
    const el = hash && document.getElementById(hash.substr(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <>
      <div className="bg-gray-100">
        <Home />
        <div className="bg-blue-regular" id="about">
          <About />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </div>
    </>
  );
};

export default Landing;
