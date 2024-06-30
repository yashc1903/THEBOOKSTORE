import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";

function AdminOrders() {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async(orderId,value) => {
    try {
        const {data} = await axios.put(`http://localhost:8080/order-status/${orderId}`, {status:value})
        getOrders()
    } catch (error) {
        console.log(error)
    }

  }



  return (
    <>
      <Layout>
        <div className="flex justify-center  min-w-full  items-center relative">
          <div className=" w-1/3  ">
            <AdminMenu  className=" " />
          </div>
          <div className=" w-2/3 border min-h-full ">
            <h1 className="text-3xl w-full mt-10 text-center">All Orders</h1>
            {orders.map((o, i) => {
              return (
                <section className="container px-4 mx-auto" key={o._id}>
                  <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                  <button className="flex items-center gap-x-3 focus:outline-none">
                                    <span>Order No:</span>
                                  </button>
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5  text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                  Status
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                  Buyer
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                  Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                  Payment
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                  Quantity
                                </th>
                                <th
                                  scope="col"
                                  className="relative py-3.5 px-4"
                                >
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                              <tr>
                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                      {" "}
                                      {i + 1}{" "}
                                    </h2>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div className="inline -ml-8  px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                    <Select onChange={(value)=>handleChange( o._id, value)} defaultValue = {o?.status} >
                                        {status.map((s,i)=>(
                                            <Option key ={i} value={s} >{s}</Option>
                                        ))}

                                    </Select>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      {o?.buyer?.name}
                                    </h4>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      {moment(o?.createAt).fromNow()}
                                    </h4>
                                  </div>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div className=" ">
                                    <h4 className="  text-gray-700 dark:text-gray-200">
                                      {o?.payment?.success
                                        ? "Successfull"
                                        : "Failed"}
                                    </h4>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    {o?.products?.length}
                                  </button>
                                </td>
                                <td className=" text-sm whitespace-nowrap"></td>
                              </tr>
                              {/* Repeat rows as needed */}
                            </tbody>
                          </table>
                          <div>
                            {o?.products.map((p, i) => (
                              <div
                                className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 rounded-md shadow-2xl w-full bg-white"
                                key={p._id}
                              >
                                <img
                                  src={`http://localhost:8080/product/product-photo/${p._id}`}
                                  alt={p.name}
                                  className="h-48 w-full md:w-1/3 rounded-md mb-4 md:mb-0 mr-0 md:mr-4"
                                />
                                <div className="flex flex-col text-start w-full md:w-2/3">
                                  <ul>
                                    <li className="text-3xl font-bold mb-4">
                                      {p.name}
                                    </li>
                                    <li className="text-indigo-500 text-xl mb-4">
                                      <span className="text-black">By:</span>{" "}
                                      {p.author}
                                    </li>
                                    <li className="text-2xl font-bold text-red-500 mb-4">
                                      ₹ {p.price}
                                    </li>
                                  </ul>
                                </div>
                                <div className="flex justify-center md:justify-start items-center mt-4 md:mt-0"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AdminOrders;
