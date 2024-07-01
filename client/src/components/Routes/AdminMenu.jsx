import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">ADMIN PANEL</h2>
      <ul className="space-y-4">
        <li>
          <NavLink to="/dashboard/admin/create-category">
            <button className="text-xl active:bg-indigo-500 w-full font-semibold border p-4">Create Category</button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/create-product">
            <button className="text-xl active:bg-indigo-500 w-full font-semibold border p-4">Create Product</button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/users">
            <button className="text-xl active:bg-indigo-500 w-full font-semibold border p-4">Users</button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/products">
            <button className="text-xl active:bg-indigo-500 w-full font-semibold border p-4">Products</button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/orders">
            <button className="text-xl active:bg-indigo-500 w-full font-semibold border p-4">Orders</button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminMenu;
