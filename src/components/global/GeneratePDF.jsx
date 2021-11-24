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
      <button onClick={print}>Generar PDF</button>
    </>
  );
};

export default GeneratePDF;
