import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useWishlist } from "../context/wishllist.jsx";

function RentBook() {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [wishlist, setWishlist] = useWishlist();
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/get-rentable-products`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const isInWishlist = (productId) =>
    wishlist.some((item) => item._id === productId);

  const toggleWishlist = (product) => {
    const index = wishlist.findIndex((item) => item._id === product._id);
    if (index === -1) {
      setWishlist([...wishlist, product]);
      localStorage.setItem("wishlist", JSON.stringify([...wishlist, product]));
      toast.success(`${product.name} added to the wishlist`);
    } else {
      const updatedWishlist = wishlist.filter(
        (item) => item._id !== product._id
      );
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast.success(`${product.name} removed from the wishlist`);
    }
  };

  return (
    <Layout>
      <div className="py-4">
        <h1 className="text-center text-4xl font-semibold text-black mb-8">
          Products Available for Rent
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4"
            >
              <div className="card bg-gradient-to-tr from-rose-100 to-teal-100 border-2 border-gray-800 shadow-lg rounded-lg flex flex-col justify-between p-4 gap-4 h-full transform transition-transform duration-300 hover:scale-110 hover:z-10">
                <div className="card-img">
                  <img
                    src={`http://localhost:8080/product/product-photo/${product._id}`}
                    alt="Product"
                    className="w-full h-80 object-contain rounded-lg"
                  />
                </div>
                <div className="card-title text-center text-xl font-bold text-gray-800">
                  {product.name}
                </div>
                <div className="card-title text-center text-lg font-semibold text-gray-800">
                  {product.author}
                  <span className="text-sm text-blue-500 ml-1">(Author)</span>
                </div>
                <div className="card-subtitle text-sm line-clamp-3 text-gray-600">
                  {product.description}
                </div>
                <div className="card-footer flex justify-between items-center mt-auto">
                  <div className="card-price text-xl font-semibold text-gray-800">
                    <span className="text-gray-600">₹</span>{" "}
                    {product.rentPrice} per day
                  </div>
                  <button
                    onClick={() => navigate(`/product/${product.slug}`)}
                    className="w-full md:w-auto h-10 rounded-md p-2 border-2 border-black font-sm text-gray-800 bg-transparent cursor-pointer transition-all duration-300 shadow-inner shadow-gray-400 hover:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    More Details
                  </button>
                  {auth?.user?.role !== 1 && (
                    <FontAwesomeIcon
                      icon={isInWishlist(product._id) ? solidHeart : regularHeart}
                      className={`cursor-pointer ${
                        isInWishlist(product._id) ? "text-red-500" : ""
                      } text-2xl ml-2`}
                      onClick={() => {
                        toggleWishlist(product);
                      }}
                    />
                  )}
                  {auth?.user?.role !== 1 && (
                    <button
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success(`"${product.name}" added to the cart`);
                      }}
                      className="w-10 h-10 rounded-md p-2 border-2 border-black font-sm text-gray-800 bg-transparent cursor-pointer transition-all duration-300 shadow-inner shadow-gray-400 hover:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-gray-800 transition-all duration-300 hover:fill-blue-500"
                      >
                        <path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path>
                        <path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                        <path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                        <path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default RentBook;
