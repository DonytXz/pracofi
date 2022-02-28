import React, { useState } from "react";
import Edit from "../../assets/img/icons/edit.svg";
import Trash from "../../assets/img/icons/trash.svg";

const List = () => {
  const [checkBoxAll, setSetCheckboxAll] = useState(false);
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
      <div class="max-w-2xl mx-auto">
        <div class="flex flex-col">
          <div class="overflow-x-aut  o shadow-md sm:rounded-lg">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden ">
                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead class="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          {/* setSetCheckboxAll(e.target.checked) */}
                          <input
                            id="checkbox-all"
                            type="checkbox"
                            onClick={toggle}
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-all" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Correo
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Rol
                      </th>
                      <th scope="col" class="p-4">
                        <span class="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {arrary.map((item, index, array) => {
                      // let checkFlag = checkBoxAll;
                      const [checked, setChecked] = useState();
                      return (
                        <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td class="p-4 w-4">
                            <div class="flex items-center">
                              <input
                                id="checkbox-table"
                                type="checkbox"
                                onClick={(e) => setChecked(e.target.checked)}
                                checked={checked}
                                className="checkbox-table w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label for="checkbox-table-1" class="sr-only">
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.name}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                            {item.mail}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.rol}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            <div className="flex flex-row">
                              <img src={Edit} alt="" />
                              <img src={Trash} alt="" />
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
