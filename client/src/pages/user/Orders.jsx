import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import emptyBoxImage from "../Admin/emptybox.png"; 

const { Option } = Select;


function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("Filter");
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/orders");
      const sortedData = data.sort((a, b) => moment(b.createdAt) - moment(a.createdAt)); 
      setOrders(sortedData);
      setFilteredOrders(sortedData); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

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
        filtered = orders.filter((order) => order.payment.success);
        break;
      case "payment-failed":
        filtered = orders.filter((order) => !order.payment.success);
        break;
      default:
        filtered = orders;
        break;
    }

    setFilteredOrders(filtered);
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col md:flex-row justify-between items-start w-full min-h-screen">
          <div className="w-1/4 p-4 lg:p-6 flex justify-center">
            <UserMenu style={{position: 'absolute',top: '160px', width: '100%',}} />
          </div>
          <div className="flex flex-col justify-center items-center  w-3/4">
            <div className="flex items-center justify-around w-full px-4 py-2">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center mt-10">ORDERS</h1>
              <Select value={filter} onChange={handleFilterChange} style={{ width: 200 }} className="h-14 " placeholder="Filter">
                <Option value="All-Orders">All Orders</Option>
                <Option value="1-month">Last Month</Option>
                <Option value="6-months">Last 6 Months</Option>
                <Option value="1-year">Last Year</Option>
                <Option value="payment-success">Payment Successful</Option>
                <Option value="payment-failed">Payment Failed</Option>
              </Select>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              {filteredOrders.length === 0 ? (
                <div className="text-center mt-10">
                  <img src={emptyBoxImage} alt="Empty Box" className="mx-auto mb-1" style={{ width: '50vw' }} />
                  <p className="text-lg font-medium text-gray-600">Sorry! Orders not found.</p>
                  <p className="text-sm text-gray-500">Try using a different filter or go back to orders.</p>
                </div>
              ) : (
                filteredOrders.map((o, i) => (
                  <section className="container px-4 mx-auto" key={o._id}>
                    <div className="flex flex-col mt-6">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                          <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
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
                              <tbody>
                                <tr className="bg-white">
                                  <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                    <div>
                                      <h2 className="font-medium text-black">{i + 1}</h2>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                    <div className={`inline px-3 py-3 text-sm font-normal rounded-full  text-green-300 bg-emerald-900 `}>
                                      {o?.status }
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div>
                                      <h4 className="text-gray-700">{o.buyer.name}</h4>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div>
                                      <h4 className="text-gray-700">{moment(o.createdAt).format('MMMM Do YYYY')}</h4>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div>
                                      <h4 className="text-gray-700">{moment(o.createdAt).format('h:mm A')}</h4>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div className="text-gray-700">{o.payment.success ? 'Successful' : 'Failed'}</div>
                                  </td>
                                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div>
                                      <span className="px-2 py-1 text-gray-500 bg-gray-100 rounded-md">{o.products.length}</span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div>
                              {o.products.map((p) => (
                                <div key={p._id} className="flex items-center bg-opacity-45 justify-between p-4 mb-4 rounded-md shadow-2xl bg-white">
                                  <img src={`http://localhost:8080/product/product-photo/${p._id}`} alt={p.name} className="h-48 w-full md:w-1/3 rounded-md object-contain mb-4 md:mb-0 mr-0 md:mr-4" />
                                  <div className="flex flex-col w-full md:w-2/3 text-start">
                                    <div className="text-3xl font-bold mb-4">{p.name}</div>
                                    <div className="text-indigo-900 text-xl mb-4"><span className="text-black">By:</span> {p.author}</div>
                                    <div className="text-2xl font-bold text-red-500 mb-4">₹ {p.price}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ))
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Orders;
