import React from 'react'
import { NavLink } from 'react-router-dom'

function UserMenu() {
  return (
    <>
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">DASHBOARD</h2>
      <ul className="">
        <li  className="py-4 ">
            <div className="flex space-x-4 w-56">
                <div className="text-xl w-full active:bg-indigo-500 font-semibold border p-4"><NavLink to='/dashboard/user/profile'  >Profile</NavLink></div>
            </div>
        </li>
        <li  className="py-4">
            <div className="flex space-x-4 w-56">
                <div className="text-xl w-full active:bg-indigo-500 font-semibold border p-4"><NavLink to='/dashboard/user/orders'  > Orders</NavLink></div>
            </div>
        </li>
      </ul>
    </div>
    </>
  )
}

export default UserMenu