import React, { useState, useEffect } from "react";

const DatePicker = (props) => {
  const { setNotEmty, date, setDate, setDateTime } = props;
  // const [date, setDate] = useState("");

  useEffect(() => {
    setNotEmty(false);
    if (date !== "") {
      setNotEmty(true);
    }
  }, [date]);
  //   console.log(date, "date")

  return (
    <>
      <label className="block mx-auto mb-2">
        <span className="text-white  font-semibold">Fecha</span>
      </label>
      <input
        className="bg-white text-black border-2 rounded-lg p-2 w-2/3 lg:w-1/2 mx-auto my-1"
        type="date"
        id="start"
        name="trip-start"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className="flex flex-col my-1">
        <label
          htmlFor="booking_time"
          className="text-white mx-auto mb-2 font-semibold"
        >
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
          className="bg-white text-black border-2 rounded-lg p-2 w-2/3 lg:w-1/2 mx-auto"
          onChange={(e) => setDateTime(e.target.value)}
        />
      </div>
    </>
  );
};

export default DatePicker;
