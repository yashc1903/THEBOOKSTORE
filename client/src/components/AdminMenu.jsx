import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu( {style}) {
  return (
    <>
      <div className="max-w-4xl mx-auto py-8 my-auto  top-10" style={style}>
        <h2 className="text-2xl font-bold mb-4 text-black text-center">ADMIN PANEL</h2>
        <div className="flex justify-center">
          <ul className=" space-y-4">
            <li className="py-4 ">
              <div className="flex space-x-4 w-56">          
                  <NavLink to="/dashboard/admin/create-category">
                    <button className="text-xl  bg-white bg-opacity-60 text-black rounded-full w-56 font-semibold border p-4">Create Category</button>
                  </NavLink>
              </div>
            </li>
            <li className="py-4">
              <div className="flex space-x-4 w-56">
                  <NavLink to="/dashboard/admin/create-product">
                   
                    <button className="text-xl  bg-white bg-opacity-60 text-black rounded-full w-56 font-semibold border p-4">Create Product</button>
                  </NavLink>
              </div>
            </li>
            <li className="py-4">
              <div className="flex space-x-4 w-56">
                  <NavLink to="/dashboard/admin/users">
                   
                    <button className="text-xl  bg-white bg-opacity-60 text-black rounded-full w-56 font-semibold border p-4">Users</button>
                  </NavLink>
              </div>
            </li>
            {/* <li className="py-4 ">
              <div className="flex w-56 space-x-4">               
                  <NavLink to="/dashboard/admin/users"> <button className="text-xl  active:bg-indigo-500 w-56 font-semibold border p-4">Users</button></NavLink>
              </div>
            </li> */}
            <li className="py-4 ">
              <div className="flex w-56 space-x-4">
                  <NavLink to="/dashboard/admin/products"><button className="text-xl  bg-white bg-opacity-60 text-black rounded-full w-56 font-semibold border p-4">Products</button></NavLink>
              </div>
            </li>
            <li className="py-4 ">
              <div className="flex w-56 space-x-4">
                  <NavLink to="/dashboard/admin/orders"><button className="text-xl  bg-white bg-opacity-60 text-black rounded-full w-56 font-semibold border p-4">Orders</button></NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminMenu;
