import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import emptyBoxImage from "./emptybox.png"; 

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
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("Filter");
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/all-orders`);
      const sortedOrders = data.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
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

  const handleFilterChange = (value) => {
    setFilter(value);
    let filtered = [];

    switch (value) {
      case "All-Orders":
        filtered = orders.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
        break;
      case "1-month":
        filtered = orders.filter((order) => moment(order.createdAt).month() === moment().month() - 1);
        break;
      case "6-months":
        filtered = orders.filter((order) => {
          const orderMonth = moment(order.createdAt).month();
          const sixMonthsAgo = moment().subtract(6, 'months').month();
          return orderMonth <= sixMonthsAgo;
        });
        break;
      case "1-year":
        filtered = orders.filter((order) => moment(order.createdAt).isBefore(moment().startOf('year')));
        break;
      case "payment-success":
        filtered = orders.filter((order) => order.payment.success).sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
        break;
      case "payment-failed":
        filtered = orders.filter((order) => !order.payment.success).sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredOrders(filtered);
  };

  return (
    <Layout>
      <div className="flex min-h-screen">
        <div className="w-1/4 p-4 lg:p-6">
          <AdminMenu />
        </div>
        <div className="w-3/4 border min-h-full p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl mt-4 mb-8 text-center">All Orders</h1>
            <Select value={filter} onChange={handleFilterChange} className="w-1/3">
                <Option value="All-Orders">All Orders</Option>
                <Option value="1-month">Last Month</Option>
                <Option value="6-months">Last 6 Months</Option>
                <Option value="1-year">Last Year</Option>
                <Option value="payment-success">Payment Successful</Option>
                <Option value="payment-failed">Payment Failed</Option>
            </Select>
          </div>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((o, i) => (
              <section key={o._id}>
                <div className="overflow-hidden border rounded-lg mb-8">
                  <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Order No:</th>
                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Buyer</th>
                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Date</th>
                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Time</th>
                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Payment</th>
                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Quantity</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div>
                            <h2 className="font-medium text-gray-800">{i + 1}</h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Select
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o.status}
                            className="inline-block px-3 py-1 text-sm font-normal rounded-full text-emerald-500 bg-emerald-100"
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>{s}</Option>
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
                            <h4 className="text-gray-700">{moment(o.createdAt).format('MMMM Do YYYY')}</h4>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div>
                            <h4 className="text-gray-700">{moment(o.createdAt).format('h:mm:ss a')}</h4>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div>
                            <h4 className="text-gray-700">{o.payment.success ? "Successful" : "Failed"}</h4>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <button className="px-1 py-1 text-gray-500 rounded-lg hover:bg-gray-100">{o.products.length}</button>
                        </td>
                        <td className="px-4 py-4"></td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    {o.products.map((p) => (
                      <div key={p._id} className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 rounded-md shadow-lg bg-white">
                        <img
                          src={`http://localhost:8080/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="h-48 w-full md:w-1/3 rounded-md mb-4 md:mb-0 mr-0 md:mr-4 object-cover"
                        />
                        <div className="flex flex-col text-left w-full md:w-2/3">
                          <ul>
                            <li className="text-3xl font-bold mb-4">{p.name}</li>
                            <li className="text-indigo-500 text-xl mb-4"><span className="text-black">By:</span> {p.author}</li>
                            <li className="text-2xl font-bold text-red-500">₹ {p.price}</li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))
          ) : (
            <div className="text-center mt-8">
              <img src={emptyBoxImage} alt="Empty Box" className="mx-auto mb-4" style={{ width: '400px' }} />
              <h2 className="text-2xl text-gray-500">Sorry! Orders not found.</h2>
              <p className="text-gray-500">Try using a different filter or go back to orders.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AdminOrders;
