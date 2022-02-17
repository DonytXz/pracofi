import React from "react";
import { print } from "react-pdf-print";

const GeneratePDF = () => {
  const print = () => {
    // var documento=new jsPDF('p','pt');
    // var variable=("chale");
    // documento.text(50,50,variable);
    // documento.save("reporte.pdf");
    window.print();
  };
  return (
    <>
      <div className="flex flex-row w-full my-4">
        <button className="mx-auto p-4 bg-blue-light text-white" onClick={print}>
          Generar PDF
        </button>
      </div>
    </>
  );
};

export default GeneratePDF;
