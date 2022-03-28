import React, { useEffect, useState } from "react";
import {
  getBookingsById,
  topics,
  UpdateBooking,
  clear,
  areas,
} from "../../services";
import { useParams } from "react-router-dom";
import { DatePicker } from "../../components/scheduleBooking/";
import { useHistory } from "react-router-dom";
import { success } from "../../helpers";
import moment from "moment";
import "moment/locale/es";

const Edit = () => {
  const [areaData, setAreas] = useState([]);
  const [area, setArea] = useState("");
  const [areaLoading, setAreaLoading] = useState(true);
  const history = useHistory();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(true);
  // const [notEmty, setNotEmty] = useState(false);
  const [date, setDate] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [topic, setTopic] = useState("");
  // const [isOnZMG, setIsOnZMG] = useState(false);
  // const [area, setArea] = useState("");
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
        // console.log(res);
        if (res.status === 200) {
          history.push("/bookings");
          success();
        }
      })
      .catch((error) => {
        // console.log(error);
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
        // console.log(res);
        if (res.status === 204) {
          history.push("/bookings");
          success();
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    // console.log(id);
    getBookingsById(id)
      .then((res) => {
        // console.log(res);
        setBooking(res.data);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  useEffect(() => {
    topics()
      .then((res) => {
        // console.log(res);
        setTopics(res.data);
        setLoadingTopics(false);
        // if (res.status === 201) {
        //   history.push("/bookings");
        // } else {
        //   history.push("/");
        // }
      })
      .catch((error) => {
        // console.log(error);
      });
    areas()
      .then((res) => {
        // console.log(res);
        setAreas(res.data);
        setAreaLoading(false);
        // if (res.status === 201) {
        //   history.push("/bookings");
        // } else {
        //   history.push("/");
        // }
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  // console.log(id);
  console.log(booking);
  return (
    <div>
      <div className="w-10/12 lg:w-2/3 flex flex-col mx-auto mt-4">
        <div className="mt-2">
          <label className=" text-sm block text-gray-600" htmlFor="cus_email">
            Area
          </label>
          <select
            name="reason"
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            // value={values.reason}
            // onChange={handleChange}
            // onBlur={handleBlur}
            onChange={(e) => setArea(e.target.value)}
          >
            <option disabled>Seleccione</option>

            {!areaLoading &&
              areaData?.map((area, index) => {
                console.log(area);
                return (
                  <option key={index} value={area.area}>
                    {area.area}
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
        <div className="mt-2 flex flex-col">
          <label className=" text-sm block text-gray-600" htmlFor="cus_email">
            <span className="d">Fecha</span>
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            type="date"
            id="start"
            name="trip-start"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label className=" text-sm block text-gray-600" htmlFor="cus_email">
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
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label className=" text-sm block text-gray-600" htmlFor="cus_email">
            Motivo
          </label>
          <select
            name="reason"
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
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
                  <option key={index} value={topic.motivos}>
                    {topic.motivos}
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
        <div className="mt-2">
          <label className=" text-sm block text-gray-600" htmlFor="cus_email">
            RFC
          </label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_email"
            name="cus_email"
            type="text"
            required=""
            placeholder="RFC"
            aria-label="Email"
            onChange={(e) => setRfc(e.target.value)}
          />
        </div>
        <button onClick={sendUpdate} className="p-4 bg-blue-dark my-2 text-white">
          Editar
        </button>
      </div>
    </div>
  );
};

export default Edit;
