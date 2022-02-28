import { useState, useEffect } from "react";
import { Booking } from "./";
import moment from "moment";
import { BookignsList } from "../components/bokings/";
import { GeneratePDF, HeaderAdmin } from "../components/global/";
import { getToken, getBookings } from "../services/";
import { useHistory } from "react-router-dom";
import { notPresentToken } from "../helpers";
import { List } from "../components/bookingsAdmin";

const BookingsAdmin = () => {
  const history = useHistory();
  const [bookings, setBookings] = useState([]);
  const [openModal, setOpenModal] = useState(true);
  const [oldBookingsLoad, setOldBookingsLoad] = useState(false);
  const [newBookingsLoad, setNewBookingsLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  // const [loading, setLoading] = useState(true);

  let is_lawyer;
  moment.locale("es");
  let currentDate = moment().format();
  let newBookings = [];
  let oldBookings = [];

  function oldOrNewDate(bookings, currentD) {
    let date;
    bookings.map((element) => {
      console.log(element, "asdsad");
      date = moment(element.fecha_cita).format();
      if (!moment(date).isSameOrAfter(currentD)) {
        oldBookings.push(element);
      } else {
        newBookings.push(element);
      }
    });
  }

  useEffect(() => {
    getBookings()
      .then((res) => {
        // console.log(res);
        setBookings(res.data);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  if (!loading) oldOrNewDate(bookings, currentDate);

  // useEffect(() => {
  //   oldOrNewDate(bookings, currentDate);
  //   // console.log(oldBookings, newBookings);
  //   // if (oldBookings.length > 0) {
  //   //   setOldBookingsLoad(true);
  //   // }
  //   // if (newBookings.length > 0) {
  //   //   setNewBookingsLoad(true);
  //   // }
  // }, [bookings]);
  return (
    <>
      <div id="pdf" className="w-full h-full">
        <HeaderAdmin />
        <GeneratePDF />
        <List bookings={bookings}/>
      </div>
    </>
  );
};

export default BookingsAdmin;
