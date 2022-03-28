import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Edit from "../../assets/img/icons/edit.svg";
import Trash from "../../assets/img/icons/trash.svg";
import Moment from "react-moment";
import { deleteBookingById, citaPut } from "../../services/Bookings";
import { success } from "../../helpers/Alerts";


const List = (props) => {
  const { bookings, setFlag } = props;
  let idUser = localStorage.getItem("id").replaceAll('"', "");
  let role = localStorage.getItem("role").replaceAll('"', "");
  // const [state, setState] = useState([]);
  // const [flag, setFlag] = useState(false);

  const deleteBooking = (id) => {
    deleteBookingById(id)
      .then((res) => {
        // setFlag(true);
        setFlag(true);
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  };

const cita = (idCita) => {
  citaPut(idUser,  idCita)
  .then((res) => {
    console.log(res);
    success()
  })
  .catch((error) => {
  console.log(error)
  })
  
}

  let arrary = [
    {
      name: "asd",
      mail: "a@g.com",
      rol: "cliente",
    },
    {
      name: "asd2",
      mail: "a@g.com",
      rol: "cliente",
    },
    {
      name: "asd3",
      mail: "a@g.com",
      rol: "cliente",
    },
  ];
  function toggle(source) {
    console.log(source.target.checked);
    let checkboxes = document.getElementsByClassName("checkbox-table");
    console.log(checkboxes);
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      checkboxes[i].checked = source.target.checked;
    }
  }
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-aut  o shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          {/* setSetCheckboxAll(e.target.checked) */}
                          <input
                            id="checkbox-all"
                            type="checkbox"
                            onClick={toggle}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="checkbox-all" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Area
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Hora
                      </th>
                      <th scope="col" className="p-4">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {bookings.map((item, index, array) => {
                      // let checkFlag = checkBoxAll;
                      const [checked, setChecked] = useState();
                      return (
                        <tr key={item._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table"
                                type="checkbox"
                                onClick={(e) => setChecked(e.target.checked)}
                                checked={checked}
                                className="checkbox-table w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label htmlFor="checkbox-table-1" className="sr-only">
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.area}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                            <Moment format="YYYY/MM/DD">
                              {item.fecha_cita}
                            </Moment>
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.hora}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            <div className="flex flex-row">
                              {role === "ADMIN" ? (
                                <>
                                  <Link to={`/bookingDetailsAdmin${item._id}`}>
                                    <img src={Edit} alt="" />
                                  </Link>
                                  <div onClick={() => deleteBooking(item._id)}>
                                    <img src={Trash} alt="" />
                                  </div>
                                </>
                              ) : (
                                <>
                                <button className=" ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium text-white bg-blue-dark bg-opacity-75 hover:bg-opacity-100" onClick={() => cita(item._id)}>Tomar cita</button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
