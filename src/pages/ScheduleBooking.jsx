import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Pattern2 from "../assets/img/pattern2.png";
import {
  Step1,
  Step2,
  Step3,
  // StepIndicator,
} from "../components/scheduleBooking/";
import { getToken, RegisterBooking, topics, logout, areas } from "../services/";
import { notPresentToken } from "../helpers";
import moment from "moment";

const ScheduleBooking = () => {
  const history = useHistory();
  const [notEmty, setNotEmty] = useState(false);
  const [date, setDate] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [topic, setTopic] = useState("");
  // const [area, setArea] = useState("");
  // const [isOnZMG, setIsOnZMG] = useState(false);

  const [rfc, setRfc] = useState("");
  const [step2, setstep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [userId] = useState(localStorage.getItem("id").replaceAll('"', ""));

  const [loadingTopics, setLoadingTopics] = useState(true);
  const [areaLoading, setAreaLoading] = useState(true);
  const [topicsData, setTopics] = useState([]);
  const [areaData, setAreas] = useState([]);
  const [area, setArea] = useState("");
  const [text, setTxt] = useState("");
  const [txt, setText] = useState("");

  // console.log(userId);

  //stepData logs

  //step1Data
  // console.log(date, dateTime, topic, " Step1 Data");

  //step2Data
  // console.log(text, " Step2 Data");

  //step3Data
  // console.log(area, rfc, " Step3 Data");

  const senBooking = () => {
    // let concatDate = moment(date);
    // console.log(concatDate);
    RegisterBooking(
      userId,
      topic,
      // "nombrePruebaHardcodeado2",
      // "apellido igual de hardcodeado2",
      // concatDate,
      date,
      dateTime,
      area,
      rfc
    )
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          history.push("/bookings");
        } else {
          history.push("/");
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    if (!getToken()) {
      notPresentToken();
      history.push("/login");
    }
  }, [getToken()]);

  const exit = () => {
    logout();
    notPresentToken();
    history.push("/login");
  };

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

  useEffect(() => {
    setText(text);
  }, [text]);
  // console.log(text);
  const handeProced = () => {
    if (notEmty) {
      setstep2(true);
      setText("");
    }
    if (txt !== "") {
      // setstep2(false);
      setStep3(true);
    }
  };
  const prev = () => {
    if (step3) {
      setStep3(!step3);
    } else if (step2) {
      setstep2(!step2);
    }
  };
  // console.log(topicsData);
  return (
    <>
      <div className="lg:h-screen w-screen bg-blue-dark flex flex-row min-h-screen">
        <div className="hidden h-full w-full lg:w-1/2 bg__quote_img lg:flex">
          <img className="w-full h-full" src={Pattern2} alt="" srcSet="" />
          <div className="mt-auto p-6"></div>
        </div>

        <div className="text-white flex flex-col pt-6 w-full mx-4">
          {!step2 && (
            <Step1
              loadingTopics={loadingTopics}
              topicsData={topicsData}
              setDate={setDate}
              date={date}
              setDateTime={setDateTime}
              setTopic={setTopic}
              setNotEmty={setNotEmty}
            />
          )}
          {step2 && !step3 && <Step2 text={text} setTxt={setTxt} />}
          {step3 && <Step3 setArea={setArea} areaData={areaData} areaLoading={areaLoading} setRfc={setRfc} />}
          <div className="flex flex-row mt-auto p-6 ">
            <div className=" mr-auto ">
              {/* <button
                // to="/"
                disabled={step2}
                className={`${
                  !step2 ? "block" : "hidden"
                } p-6 border-2 rounded-2xl capitalize text-white`}
              >
                Cancelar
              </button>
              <button
                // disabled="disabled"
                onClick={prev}
                className={`${
                  !step2 ? "hidden" : "block"
                } p-6 border-2 rounded-2xl capitalize text-white`}
              >
                Anterior
              </button> */}
              {!step2 ? (
                <button
                  // to="/"
                  onClick={exit}
                  disabled={step2}
                  className={` p-6 border-2 rounded-2xl capitalize text-white`}
                >
                  Cancelar
                </button>
              ) : (
                <button
                  // disabled="disabled"
                  onClick={prev}
                  className={`p-6 border-2 rounded-2xl capitalize text-white`}
                >
                  Anterior
                </button>
              )}
            </div>

            <div className="ml-auto ">
              {/* <button
                // disabled="disabled"
                onClick={handeProced}
                className="  p-6 border-2 rounded-2xl capitalize text-white"
              >
                {step3 ? "Enviar" : "next"}
              </button> */}
              {step3 ? (
                <button
                  // disabled="disabled"
                  onClick={senBooking}
                  className="  p-6 border-2 rounded-2xl capitalize text-white"
                >
                  Enviar
                </button>
              ) : (
                <button
                  // disabled="disabled"
                  onClick={handeProced}
                  className="  p-6 border-2 rounded-2xl capitalize text-white"
                >
                  Siguiente
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleBooking;
