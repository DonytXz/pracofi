import React from "react";
// import Hero from "../../assets/img/figure1.svg";
// import Header from "../Global/Header";
import Pattern from "../../assets/img/pattern.png";
import BrandLogo from "../../assets/img/logo.png";

const About = () => {
  return (
    <>
      <div className="bg__about_img h-full">
        <div className="flex flex-row content-center h-full my-auto">
          <div className="text-white my-auto px-8 flex flex-col">
            <img className="w-1/2 " src={BrandLogo} alt="" srcSet="" />
            <p className="my-4" class="text-blue-900 font-semibold">
          
            </p>
      
            <ul className="list-disc" class="text-blue-900 font-semibold">
              <li className="text-center uppercase text-2xl text-blue-regular mb-2">Mision</li>
              <li align="justify">Somos un grupo de personas profesionistas dedicadas a brindar servicios contables, fiscales y administrativos, comprometidos para proporcionar al sector empresarial un alto nivel de confianza, conocimiento y experiencia laboral.</li>
              <li className="text-center uppercase text-2xl text-blue-regular mb-2">Vision</li>
              <li align="justify">Permanecer en el sector empresarial como una organización líder, generando confianza, seguridad y proyecciones a largo plazo, además de ser reconocidos por nuestro compromiso, responsabilidad y formalidad en el área contable, fiscal y administrativa.</li>
            </ul>
            <button className="w-2/4 mx-auto my-4 uppercase p-6 bg-blue-regular text-white bg-black">
              registrate
            </button>
          </div>
          <img className="h-3/4 mt-auto hidden xl:block" src={Pattern} alt="" srcSet="" />
          {/* <div>
            <img src={Pattern} alt="" srcSet="" />
          </div> */}
        </div>
        {/** Removed because is a landing page, I am not sure how this dessing supouses to work */}
        {/* <Header isAbout={true}/> */}
      </div>
    </>
  );
};

export default About;
