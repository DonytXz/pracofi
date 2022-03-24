import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Edit from "../../assets/img/icons/edit.svg";
import Trash from "../../assets/img/icons/trash.svg";
import { deleteUser, getUsers } from "../../services/Bookings";
import { deleteUsuario, fakeDeleteUser } from "../../helpers/Alerts";

// EDIT USEER 
const List = () => {


  const [user, setUser] = useState([]);
  function toggle(source) {
    console.log(source.target.checked);
    let checkboxes = document.getElementsByClassNameName("checkbox-table");
    console.log(checkboxes);
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      checkboxes[i].checked = source.target.checked;
    }
  }
    useEffect(() => {
      getUsers()
        .then((res) => {
          console.log(res.data?.result, 'MALLLLLLL, SSZUSER');
          setUser(res.data.result);
         
          setLoading(false);
        })
        .catch((error) => {
          // console.log(error);
        });
    }, []);  

    const DeleteUser =  (id) => {
      deleteUser(id)
      .then((res) => {
        console.log(res, 'RES');
        deleteUsuario()
        getUsers()
     })
     .catch((error) => {
       console.log(error, 'ERROR');
      fakeDeleteUser(); 
     }); 
  }
   
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-aut  o shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="pt-6 min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          {/* setSetCheckboxAll(e.target.checked) */}
                          
                         
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Correo
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Rol
                      </th>
                      <th scope="col" className="p-4">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {user.map((item, index, array) => {
                      // let checkFlag = checkBoxAll;
                      console.log(item, 'ITME');
                     // const [checked, setChecked] = useState();
                      return (
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                        {/*       <input
                                id="checkbox-table"
                                type="checkbox"
                                onClick={(e) => setChecked(e.target.checked)}
                                checked={checked}
                                className="checkbox-table w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              /> */}
                            
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.nombre}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                            {item.email}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.role}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            <div className="flex flex-row">
                              <Link to={`/edit-user?${item._id}`}>
                                <img src={Edit} alt="" />
                              </Link>
                              <img src={Trash} onClick={() => DeleteUser(item._id)} alt="" />
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
