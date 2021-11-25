import React, { useEffect, useState } from "react";
import { BookingCard } from "../components/bookingDetails/BookingCard";
import { HeaderUser } from "../components/global/";
import { getBookingsById, topics, UpdateBooking, clear } from "../services/";
import { useParams } from "react-router-dom";
import { DatePicker } from "../components/scheduleBooking/";
import { useHistory } from "react-router-dom";
import { success } from "../helpers";

const BookingDetail = () => {
  const history = useHistory();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(true);
  // const [notEmty, setNotEmty] = useState(false);
  const [date, setDate] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [topic, setTopic] = useState("");
  // const [isOnZMG, setIsOnZMG] = useState(false);
  const [area, setArea] = useState("");
  const [rfc, setRfc] = useState("");
  // const [step2, setstep2] = useState(false);
  // const [step3, setStep3] = useState(false);
  const [userId] = useState(localStorage.getItem("id").replaceAll('"', ""));

  const [loadingTopics, setLoadingTopics] = useState(true);
  const [topicsData, setTopics] = useState([]);
  // const { id } = props.location.state;
  // const { id } = props?.location;
  // console.log(props.value.location.state);
  const { id } = useParams();

  const deleteBooking = () => {
    // console.log("entro");
    clear(id)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          history.push("/bookings");
          success();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendUpdate = () => {
    // let concatDate = moment(date);
    // console.log(concatDate);
    UpdateBooking(
      userId,
      topic,
      // "nombrePruebaHardcodeado2",
      // "apellido igual de hardcodeado2",
      // concatDate,
      date,
      dateTime,
      area,
      rfc,
      id
    )
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          // history.push("/bookings");
          success();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(id);
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

  useEffect(() => {
    topics()
      .then((res) => {
        console.log(res);
        setTopics(res.data);
        setLoadingTopics(false);
        // if (res.status === 201) {
        //   history.push("/bookings");
        // } else {
        //   history.push("/");
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(id);
  return (
    <>
      <div className="w-full h-full flex flex-col">
        {/* <BookingCard /> */}
        <HeaderUser />

        <div className="w-10/12 lg:w-2/3 flex flex-col m-auto bg-gray-200 p-8">
          <button onClick={deleteBooking}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="ml-auto"
            >
              <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
            </svg>
          </button>
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
        <div className="w-10/12 lg:w-2/3 flex flex-col m-auto py-4 bg-blue-400 text-center  text-2xl text-white">
          Enlace
        </div>
        <div className="w-10/12 lg:w-2/3 flex flex-col mx-auto mt-4">
          <div class="mt-2">
            <label class=" text-sm block text-gray-600" for="cus_email">
              Area
            </label>
            <input
              class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_email"
              type="text"
              required=""
              placeholder="City"
              aria-label="Email"
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div class="mt-2 flex flex-col">
            <label class=" text-sm block text-gray-600" for="cus_email">
              <span className="d">Fecha</span>
            </label>
            <input
              class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              type="date"
              id="start"
              name="trip-start"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div class="mt-2">
            <label class=" text-sm block text-gray-600" for="cus_email">
              Elige un horario
            </label>
            <input
              id="booking_time"
              name="booking_time"
              type="time"
              step="600"
              required
              placeholder="hh-mm"
              // value={values.booking_time}
              // onChange={handleChange}
              // onBlur={handleBlur}
              class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          <div class="mt-2 flex flex-col">
            <label class=" text-sm block text-gray-600" for="cus_email">
              Motivo
            </label>
            <select
              name="reason"
              class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              // value={values.reason}
              // onChange={handleChange}
              // onBlur={handleBlur}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option disabled>Seleccione</option>

              {!loadingTopics &&
                topicsData?.map((topic, index) => {
                  // console.log(topic);
                  return (
                    <option key={index} value={topic.motivo}>
                      {topic.motivo}
                    </option>
                  );
                })}
              {/* <option>Opcion1</option>
              <option>Opcion2</option> */}
              {/* {loading ? (
                  <option>Cargando...</option>
                ) : (
                  topics.map((topic, index) => (
                    <option key={index} value={topic.id}>
                      {topic.name}
                    </option>
                  ))
                )} */}
            </select>
          </div>
          <div class="mt-2">
            <label class=" text-sm block text-gray-600" for="cus_email">
              RFC
            </label>
            <input
              class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_email"
              type="text"
              required=""
              placeholder="City"
              aria-label="Email"
              onChange={(e) => setRfc(e.target.value)}
            />
          </div>
          <button onClick={sendUpdate} class="p-4 bg-blue-dark my-2 text-white">
            Editar
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingDetail;
