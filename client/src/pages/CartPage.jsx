import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/cart.jsx";
import { useAuth } from "../context/auth.jsx";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

function CartPage() {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + (item.renting ? item.rentPrice * item.rentDays : item.price);
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:8080/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const toggleRenting = (index) => {
    let newCart = [...cart];
    newCart[index].renting = !newCart[index].renting;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateRentDays = (index, days) => {
    let newCart = [...cart];
    newCart[index].rentDays = days;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <Layout>
      <div className="min-w-full text-center p-4">
        <h1 className="text-center text-4xl mx-auto font-semibold text-black bg-white rounded-full bg-opacity-60 w-96 mb-4">Your Cart</h1>
        {!clientToken || !cart?.length ? (
          <h1 className="text-center text-2xl mx-auto font-semibold text-indigo-600 rounded-full  w-96 mb-4">Your Cart is Empty</h1>
        ):("")}
      </div>

      <div className="min-w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 text-center p-4  bg-opacity-60 rounded-md ">
          {!clientToken || !cart?.length  ? ('') :(
            <h1 className="text-center text-4xl mx-auto font-semibold text-black  rounded-full  w-96 mb-4">Cart Items</h1>
          )}
          <div>
            {cart?.map((item, index) => (
              <div className="flex flex-col md:flex-row items-center bg-opacity-60 justify-between p-4 mb-4 rounded-md shadow-xl w-full bg-white" key={item._id}>
                <img
                  src={`http://localhost:8080/product/product-photo/${item._id}`}
                  alt={item.name}
                  className="h-48 w-full md:w-1/3 object-contain rounded-md mb-4 md:mb-0 mr-0 md:mr-4"
                />
                <div className="flex flex-col text-start w-full md:w-2/3">
                  <ul>
                    <li className="text-3xl font-bold mb-4">{item.name}</li>
                    <li className="text-indigo-500 text-xl mb-4">
                      <span className="text-black">By:</span> {item.author}
                    </li>
                    <li className="text-2xl font-bold text-red-500 mb-4">
                       {item.renting ? (!item.rentPrice ? "not available for rent " : `₹ ${item.rentPrice * item.rentDays}` ) : `₹ ${item.price}`}
                    </li>
                  </ul>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRenting(index)}
                      className={`relative px-8 py-2 rounded-md ${item.renting ? "bg-green-500" : "bg-blue-500"} text-white font-semibold`}
                    >
                      {item.renting ? "Switch to Buy" : "Switch to Rent"}
                    </button>
                    {item.renting && (
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={item.rentDays}
                          onChange={(e) => updateRentDays(index, e.target.value)}
                          min="1"
                          className="px-2 py-2 border rounded-lg w-20 h-9  text-xl"
                          placeholder="Days"
                        />
                        <span className="ml-2">Days</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center md:justify-start items-center mt-4 md:mt-0">
                  <button
                    onClick={() => removeCartItem(item._id)}
                    className="relative px-8 py-2 rounded-md bg-white border-2 border-red-700 hover:text-red-600 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center text-sm font-semibold text-black bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {!clientToken || !cart?.length ?(""):(
          <div className="w-full md:w-1/2 text-center p-4 bg-white bg-opacity-60 rounded-md shadow-md">
          <h1 className="text-4xl font-bold mb-4">Cart Summary</h1>
          <p className="text-xl mb-4">TOTAL | CHECKOUT | PAYMENT</p>
          <hr className="mb-4" />
          <h1 className="text-3xl font-bold">Total: ₹ {totalPrice()} </h1>
          {auth?.user?.address ? (
            <>
              <div className="shadow-md rounded p-6">
                <h1 className="text-xl font-bold mb-2">Current Address</h1>
                <h1 className="text-lg mb-4">{auth?.user?.address}</h1>
                <button
                  onClick={() => navigate(`/dashboard/user/profile`)}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                  Update Address
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white bg-opacity-45 shadow-md rounded p-6">
                {auth?.token ? (
                  <button
                    onClick={() => navigate(`/dashboard/user/profile`)}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login", { state: "/cart" })}
                    className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-sky-500 transition-colors"
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            </>
          )}
          <div className="mt-2">
            {!clientToken || !cart?.length || !auth.user ?  (
              ""
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                  className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition-colors"
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </>
            )}
          </div>
        </div>
        )}
      </div>
    </Layout>
  );
}

export default CartPage;
