import React from "react";
import { NavLink } from "react-router-dom";

function UserMenu() {
  return (
    <>
      <div className="max-w-4xl mx-auto py-8 top-10">
        <h2 className="text-2xl font-bold mb-4 text-center">USER DASHBOARD</h2>
        <div className="flex justify-center"><ul className="">
          <li className="py-4 ">
            <div className="flex space-x-4 w-56">
                <NavLink to="/dashboard/user/profile">
                  <button className="text-xl  active:bg-indigo-500 w-56 font-semibold border p-4">Profile</button>
                </NavLink>
            </div>
          </li>
          <li className="py-4 ">
            <div className="flex space-x-4 w-56">
                <NavLink to="/dashboard/user/sell-product">
                  <button className="text-xl  active:bg-indigo-500 w-56 font-semibold border p-4">Sell Product</button>
                </NavLink>
            </div>
          </li>
          <li className="py-4">
            <div className="flex space-x-4 w-56">
                <NavLink to="/dashboard/user/orders"> <button className="text-xl  active:bg-indigo-500 w-56 font-semibold border p-4">Orders</button></NavLink>
            </div>
          </li>
        </ul></div>
      </div>
    </>
  );
}

export default UserMenu;
