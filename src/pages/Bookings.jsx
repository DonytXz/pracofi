import { useState, useEffect } from "react";
import { Booking } from "./";
import moment from "moment";
import { BookignsList } from "../components/bokings/";
import { HeaderUser, GeneratePDF } from "../components/global/";
import { getToken, getBookingsUser } from "../services/";
import { useHistory } from "react-router-dom";
import { notPresentToken } from "../helpers";

const Bookings = () => {
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
  let userId = localStorage.getItem("id").toString();
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
    console.log(userId, "User id");
    getBookingsUser(userId)
      .then((res) => {
        console.log(res);
        setBookings(res.data.citas);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
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

  useEffect(() => {
    if (!getToken()) {
      notPresentToken();
      history.push("/login");
    }
  }, [getToken()]);

  return (
    <>
      <div id="pdf" className="w-full h-full">
        <HeaderUser />
        <GeneratePDF />
        <div className="flex flex-col w-10/12 m-auto">
          <div className="space-x-4 flex h-14 inline-block flex-row flex-row mb-7">
            <div className="flex-grow-0 mt-auto">
              <h3>Pr??ximas citas</h3>
            </div>
            <div className="flex-grow h-0.5 bg-gray-300 mt-auto m-2"></div>
          </div>
          {!loading ? <BookignsList bookings={newBookings} /> : <></>}

          <div className="space-x-4 flex h-14 inline-block flex-row mb-7">
            <div className="flex-grow-0 mt-auto">
              <h3>Citas pasadas</h3>
            </div>
            <div className="flex-grow h-0.5 bg-gray-300 mt-auto m-2"></div>
          </div>
          {!loading ? <BookignsList bookings={oldBookings} /> : <></>}
        </div>
      </div>
    </>
  );
};

export default Bookings;
