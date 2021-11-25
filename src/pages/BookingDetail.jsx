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

        <div className="w-10/12 lg:w-1/2 flex flex-col m-auto bg-gray-200">
          {!loading && (
            <>
              <div>{booking.area}</div>
              <div></div>
              <div></div>
              <div></div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingDetail;
