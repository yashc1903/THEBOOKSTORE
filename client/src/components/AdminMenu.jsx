import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <>
      <div className="max-w-4xl mx-auto py-8 my-auto ">
        <h2 className="text-2xl font-bold mb-4 text-center">ADMIN PANEL</h2>
        <div className="flex justify-center">
          <ul className=" space-y-4">
            <li className="py-4 ">
              <div className="flex space-x-4 w-56">
                <button className="text-xl w-full active:bg-indigo-500 font-semibold border p-4">
                  <NavLink to="/dashboard/admin/create-category">
                    {" "}
                    Create Category
                  </NavLink>
                </button>
              </div>
            </li>
            <li className="py-4">
              <div className="flex space-x-4 w-56">
                <button className="text-xl w-full active:bg-indigo-500 font-semibold border p-4">
                  <NavLink to="/dashboard/admin/create-product">
                    {" "}
                    Create Product
                  </NavLink>
                </button>
              </div>
            </li>
            <li className="py-4 ">
              <div className="flex w-56 space-x-4">
                <button className="text-xl w-full active:bg-indigo-500  font-semibold border p-4">
                  <NavLink to="/dashboard/admin/users"> Users</NavLink>
                </button>
              </div>
            </li>
            <li className="py-4 ">
              <div className="flex w-56 space-x-4">
                <button className="text-xl w-full active:bg-indigo-500  font-semibold border p-4">
                  <NavLink to="/dashboard/admin/products"> Products</NavLink>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminMenu;
