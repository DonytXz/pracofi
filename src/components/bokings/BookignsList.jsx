import { useState } from "react";
import { Booking } from "./";


const BookignsList = (props) => {
  const { bookings } = props;
  console.log(bookings);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          bookings?.map((booking, index) =>{
            console.log(booking);
            return (
              <Booking key={index} booking={booking} />
            )
          })
        }

      </div>
    </>
  );
};

export default BookignsList;
