import React from "react";
import { Link } from "react-router-dom";

const Booking = (props) => {
  const { booking } = props;
  return (
    <>
      <Link to={`/bookingDetails/${booking._id}`}>
        <div className="bg-gray-200 px-6 py-12 flex flex-col">
          <div className="flex flex-row mx-auto flex-nowrap w-full">
            <p className="bold text-xl w-full truncate">
              Motivo de la consulta: {booking.motivo}
            </p>
          </div>
          <div className="flex flex-row mx-auto w-full">
            <span className="bold text-xl">
              Fecha: {booking.fecha_cita}
            </span>
          </div>
          <div className="flex flex-row mx-auto w-full">
            <span className="bold text-xl">Hora: {booking.hora}</span>
          </div>
          <div className="flex flex-row mx-auto w-full">
            <span className="bold text-xl">Area: {booking.area}</span>
          </div>
        </div>
        
      </Link>
    </>
  );
};

export default Booking;
