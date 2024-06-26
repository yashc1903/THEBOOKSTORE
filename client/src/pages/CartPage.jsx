import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";



function CartPage() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken,setClientToken] = useState("")
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
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

  // get payment gateway
 
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


  return (
    <>
      <Layout>
        <div className="min-w-full text-center p-4">
          <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
          <h1 className="text-2xl mb-4">
            <span className=" text-emerald-600 text-3xl">
              {auth?.token && auth?.user?.name}{" "}
            </span>{" "}
            {cart?.length >= 1
              ? `You have ${cart.length} items in the cart`
              : "Your cart is empty"}
          </h1>
        </div>

        <div className="min-w-full flex min-h-screen p-4">
          <div className="w-full md:w-1/2 text-center p-4">
            <h1 className="text-4xl font-bold mb-4">Cart Items</h1>
            <div>
              {cart?.map((item) => (
                <div
                  className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 rounded-md shadow-2xl w-full bg-white"
                  key={item._id}
                >
                  <img
                    src={`http://localhost:8080/product/product-photo/${item._id}`}
                    alt={item.name}
                    className="h-48 w-full md:w-1/3 rounded-md mb-4 md:mb-0 mr-0 md:mr-4"
                  />
                  <div className="flex flex-col text-start w-full md:w-2/3">
                    <ul>
                      <li className="text-3xl font-bold mb-4">{item.name}</li>
                      <li className="text-indigo-500 text-xl mb-4">
                        <span className="text-black">By:</span> {item.author}
                      </li>
                      <li className="text-2xl font-bold text-red-500 mb-4">
                        ₹ {item.price}
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center md:justify-start items-center mt-4 md:mt-0">
                    <button
                      onClick={() => removeCartItem(item._id)}
                      className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-red-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center text-sm font-semibold text-black bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center p-4 bg-white rounded-md shadow-md">
            <h1 className="text-4xl font-bold mb-4">Cart Summary</h1>
            <p className="text-xl mb-4">TOTAL | CHECKOUT | PAYMENT</p>
            <hr className="mb-4" />
            <h1 className="text-3xl font-bold">Total: ₹ {totalPrice()} </h1>
            {auth?.user?.address ? (
              <>
                <div className="bg-white shadow-md rounded p-6">
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
                <div className="bg-white shadow-md rounded p-6">
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
                      className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition-colors"
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
               
              </>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
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
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default CartPage;
