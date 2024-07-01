import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu"; // Import the AdminMenu component
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

function AdminOrders() {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
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

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
      toast.success("Status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen">
        <div className="w-1/4 p-4 lg:p-6">
          <AdminMenu /> {/* Render AdminMenu component here */}
        </div>
        <div className="w-3/4 border min-h-full p-4 overflow-y-auto">
          <h1 className="text-3xl mt-4 mb-8 text-center">All Orders</h1>
          {orders.map((o, i) => (
            <section key={o._id}>
              <div className="overflow-hidden border rounded-lg mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-gray-500">
                        Order No:
                      </th>
                      <th className="px-4 py-3 text-left text-gray-500">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-gray-500">
                        Buyer
                      </th>
                      <th className="px-4 py-3 text-left text-gray-500">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-gray-500">
                        Payment
                      </th>
                      <th className="px-4 py-3 text-left text-gray-500">
                        Quantity
                      </th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800">
                            {i + 1}
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Select
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o.status}
                          className="inline-block px-3 py-1 text-sm font-normal rounded-full text-emerald-500 bg-emerald-100"
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <h4 className="text-gray-700">{o.buyer.name}</h4>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <h4 className="text-gray-700">
                            {moment(o.createAt).fromNow()}
                          </h4>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <h4 className="text-gray-700">
                            {o.payment.success ? "Successfull" : "Failed"}
                          </h4>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button className="px-1 py-1 text-gray-500 rounded-lg hover:bg-gray-100">
                          {o.products.length}
                        </button>
                      </td>
                      <td className="px-4 py-4"></td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  {o.products.map((p) => (
                    <div
                      key={p._id}
                      className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 rounded-md shadow-lg bg-white"
                    >
                      <img
                        src={`http://localhost:8080/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="h-48 w-full md:w-1/3 rounded-md mb-4 md:mb-0 mr-0 md:mr-4 object-cover"
                      />
                      <div className="flex flex-col text-left w-full md:w-2/3">
                        <ul>
                          <li className="text-3xl font-bold mb-4">{p.name}</li>
                          <li className="text-indigo-500 text-xl mb-4">
                            <span className="text-black">By:</span> {p.author}
                          </li>
                          <li className="text-2xl font-bold text-red-500">
                            ₹ {p.price}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default AdminOrders;
