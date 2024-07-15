import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { CiShoppingCart, CiHeart } from "react-icons/ci";
import { useAuth } from "../context/auth.jsx";
import toast from "react-hot-toast";
import SearchInput from "./Form/SearchInput";
import useCategory from "../hooks/useCategory";
import { useCart } from "../context/cart.jsx";
import { Badge } from "antd";
import { useWishlist } from "../context/wishllist";


function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart] = useCart();
  const [wishlist] = useWishlist();
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);
  const categories = useCategory();
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged Out Successfullt");
  };

  const headerStyle = {
    backgroundImage: 'linear-gradient(to right, #757F9A , #D6A4A1)', // Replace with your image path
    backgroundSize: 'cover', // Adjusts image to cover the whole background
  // Prevents repeating the image
    backgroundPosition: 'center', // Centers the background image
     // Ensures the background covers the full height of the viewport
  };

  return (
    <>
      <nav className="relative bg-white h-28 dark:bg-gray-800 flex items-center justify-between px-8 " style={headerStyle}> 
        <Link to="/">
          <div className="flex justify-center items-center">
            <img
              className="h-14 sm:h-7"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8f2qlmQft8PNyJKr6YWqN9X7tz_c3ev5cqQ&s"
              alt="Logo"
            />
            <h1 className="my-2 ml-4 font-bold text-3xl transition-colors duration-300 transform text-black hover:text-blue-500 dark:hover:text-blue-400 md:mx-2 md:my-0">
              THE BOOK STORE
            </h1>
          </div>
        </Link>

        <div className="flex-1 mx-2">
          <SearchInput />
        </div>

        <div className="flex items-center justify-center space-x-2 md:space-x-4 ">
          <li className="inline-block text-black text-3xl font-semibold  transition-colors duration-300 transform  hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">
            <NavLink to="/" exact="true">Home</NavLink>
          </li>
          <li className="inline-block text-black text-3xl font-semibold  transition-colors duration-300 transform  hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">
            <NavLink to="/rent" exact="true">Rent</NavLink>
          </li>
          

          <div className="relative inline-block">
            <button
              onClick={() => setCategoryIsOpen(!categoryIsOpen)}
              className="text-3xl transition-colors duration-300 font-semibold transform text-black hover:text-blue-500 dark:hover:text-blue-400 md:mx-2 md:my-0"
            >
              Categories
              <svg  className="w-6 h-6 inline ml-1"  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg" >
                <path  d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"  fill="currentColor"  ></path>
              </svg>
            </button>

            {categoryIsOpen && (
              <div className="absolute right-0 mt-10 w-56 h-96 overflow-auto bg-white dark:bg-gray-800 rounded-md shadow-xl z-10 ">
                <Link  to={`/categories`}  className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" >  All Categories  </Link>
                {categories.map((c) => (
                  <Link  key={c.name} to={`/category/${c.slug}`} className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">  {c.name}  </Link>
                ))}
              </div>
            )}
          </div>
         

          {!auth.user ? (
            <>
              <NavLink  to="/register"  className=" text-3xl font-bold transition-colors duration-300 transform dark:text-black hover:text-blue-500 dark:hover:text-blue-400"  >  SignUp </NavLink>
              <NavLink  to="/login"  className=" text-3xl font-bold transition-colors duration-300 transform dark:text-black hover:text-blue-500 dark:hover:text-blue-400"  >  Login  </NavLink>
            </>
          ) : (
            <div className="relative inline-block">
              <button  onClick={() => setIsOpen(!isOpen)}  className="text-black text-3xl  font-semibold transition-colors duration-300 transform  hover:text-blue-500 dark:hover:text-blue-400"  >
                {auth?.user?.name}
                <svg  className="w-6 h-6 inline ml-1"  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg"  >
                  <path  d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"  fill="currentColor"  ></path>
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-10 w-48 text-black dark:bg-gray-800 rounded-md shadow-xl z-10">
                  <NavLink  to={`/dashboard/${  auth?.user?.role === 1 ? "admin" : "user"  }`}  className="block px-4 py-2 text-white hover:bg-gray-100 dark:hover:bg-gray-700"  >  Dashboard </NavLink>
                  <NavLink  to="/login"  onClick={handleLogout}  className="block px-4 py-2 text-white hover:bg-gray-100 dark:hover:bg-gray-700" >  Logout </NavLink>
                
                </div>
              )}
            </div>
          )}

          {auth?.user?.role !== 1 && (
            <Badge count={wishlist.length} showZero>
              <NavLink to={"/wishlist"}>
                <CiHeart className="w-10 h-10 text-black font-bold " />
              </NavLink>
            </Badge>
          )}

          {auth?.user?.role !== 1 && (
            <Badge count={cart.length} showZero>
              <NavLink to={"/cart"}>
                <CiShoppingCart className="w-10 h-10 text-black" />
              </NavLink>
            </Badge>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
