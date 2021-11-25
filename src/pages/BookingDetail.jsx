import React from "react";
import { BookingCard } from "../components/bookingDetails/BookingCard";
import { HeaderUser } from "../components/global/";
import { getBookingsById } from "../services/";

const BookingDetail = (props) => {
  console.log(props);
  // const { id } = props.match.params;
  // console.log(id);
  return (
    <>
      <div className="w-full h-full flex flex-col">
        {/* <BookingCard /> */}
        <HeaderUser />
        <div className="w-10/12 lg:w-1/2 flex flex-col m-auto bg-gray-200">
          <div>Lorem ipsum dolor sit amet.</div>
          <div>Lorem ipsum dolor sit amet.</div>
          <div>Lorem ipsum dolor sit amet.</div>
          <div>Lorem ipsum dolor sit amet.</div>
        </div>
      </div>
    </>
  );
};

export default BookingDetail;
