import React from 'react';
import jsPDF from 'jspdf';

const GeneratePDF = () => {
    const jPDF=()=>{
        var documento=new jsPDF('p','pt');
        var variable=("chale");
        documento.text(50,50,variable);
        documento.save("reporte.pdf");
    };
    return (
        <>
            <button onClick={jPDF}>Generar PDF</button>
        </>
    )
}

export default GeneratePDF