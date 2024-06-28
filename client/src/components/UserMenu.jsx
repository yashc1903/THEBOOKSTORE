import React from "react";
import { NavLink } from "react-router-dom";

function UserMenu() {
  return (
    <>
      <div className="max-w-4xl mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">USER DASHBOARD</h2>
        <ul className="">
          <li className="py-4 ">
            <div className="flex space-x-4 w-56">
              <button className="text-xl w-full active:bg-indigo-500 font-semibold border p-4">
                <NavLink to="/dashboard/user/profile">Profile</NavLink>
              </button>
            </div>
          </li>
          <li className="py-4 ">
            <div className="flex space-x-4 w-56">
              <button className="text-xl w-full active:bg-indigo-500 font-semibold border p-4">
                <NavLink to="/dashboard/user/sell-product">
                  Sell Product
                </NavLink>
              </button>
            </div>
          </li>
          <li className="py-4">
            <div className="flex space-x-4 w-56">
              <button className="text-xl w-full active:bg-indigo-500 font-semibold border p-4">
                <NavLink to="/dashboard/user/orders"> Orders</NavLink>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserMenu;
