import React, { useEffect, useState } from "react";
import { BookingCard } from "../components/bookingDetails/BookingCard";
import { HeaderUser } from "../components/global/";
import { getBookingsById } from "../services/";
import { useParams } from "react-router-dom";

const BookingDetail = () => {
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(true);
  // const { id } = props.location.state;
  // const { id } = props?.location;
  // console.log(props.value.location.state);
  const { id } = useParams();

  useEffect(() => {
    getBookingsById(id)
      .then((res) => {
        // console.log(res);
        setBooking(res.data.result);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  // console.log(id);
  return (
    <>
      <div className="w-full h-full flex flex-col">
        {/* <BookingCard /> */}
        <HeaderUser />

        <div className="w-10/12 lg:w-2/3 flex flex-col m-auto bg-gray-200 p-8">
          {!loading && (
            <>
              {/* <div classNamew="w-1/2 mx-auto flex flex-col bg-gray-200 "> */}
              <div className="mr-auto text-2xl font-semibold">
                <span className="font-bold">Area: </span>
                {booking.area}
              </div>
              <div className="mr-auto text-2xl font-semibold">
                <span className="font-bold">Fecha: </span>
                {booking.fecha_cita}
              </div>
              <div className="mr-auto text-2xl font-semibold">
                <span className="font-bold">Hora: </span>
                {booking.hora}
              </div>
              <div className="mr-auto text-2xl font-semibold">
                <span className="font-bold">Motivo: </span>
                {booking.motivo}
              </div>
              <div className="mr-auto text-2xl font-semibold">
                <span className="font-bold">RFC: </span>
                {booking.rfc}
              </div>
              {/* </div> */}
            </>
          )}
        </div>
      <div className="w-10/12 lg:w-2/3 flex flex-col m-auto py-8 bg-blue-400 text-center  text-2xl text-white">Enlace</div>
      </div>
    </>
  );
};

export default BookingDetail;
