import React from 'react'
import { NavLink } from 'react-router-dom'


function AdminMenu() {
  return (
    <>
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">ADMIN PANEL</h2>
      <ul className="">
        <li  className="py-4 ">
            <div className="flex space-x-4 w-56">
                <div className="text-xl w-full active:bg-indigo-500 font-semibold border p-4"><NavLink to='/dashboard/admin/create-category'  > Create Category</NavLink></div>
            </div>
        </li>
        <li  className="py-4">
            <div className="flex space-x-4 w-56">
                <div className="text-xl w-full active:bg-indigo-500 font-semibold border p-4"><NavLink to='/dashboard/admin/create-product'  > Create Product</NavLink></div>
            </div>
        </li>
        <li  className="py-4 ">
            <div className="flex w-56 space-x-4">
                <div className="text-xl w-full active:bg-indigo-500  font-semibold border p-4"><NavLink to='/dashboard/admin/users'  > Users</NavLink></div>
            </div>
        </li>
      </ul>
    </div>
    </>
  )
}

export default AdminMenu