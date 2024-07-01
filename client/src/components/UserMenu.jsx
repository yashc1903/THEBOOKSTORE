import React from 'react';
import { NavLink } from 'react-router-dom';

function UserMenu() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 mt-4 text-center">USER DASHBOARD</h2>
      <div className="flex flex-col items-center">
        <NavLink to='/dashboard/user/profile' className="text-xl active:bg-indigo-500 font-semibold border p-4 mb-4 w-56">Profile</NavLink>
        <NavLink to='/dashboard/user/sell-product' className="text-xl active:bg-indigo-500 font-semibold border p-4 mb-4 w-56">Sell Product</NavLink>
        <NavLink to='/dashboard/user/orders' className="text-xl active:bg-indigo-500 font-semibold border p-4 mb-4 w-56">Orders</NavLink>
      </div>
    </div>
  );
}

export default UserMenu;
