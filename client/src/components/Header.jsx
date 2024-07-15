import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
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
      token: ''
    });
    localStorage.removeItem("auth");
    toast.success("Logged Out Successfully");
  };

  const headerStyle = {
    backgroundImage: 'linear-gradient(to right, #757F9A , #D6A4A1)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  
  return (  
    <>
      <nav className="relative bg-white dark:bg-gray-800 h-28 flex items-center justify-between px-4 md:px-8" style={headerStyle}>
        <Link to="/" className="flex items-center">
          <img
            className="h-14 sm:h-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8f2qlmQft8PNyJKr6YWqN9X7tz_c3ev5cqQ&s"
            alt="Logo"
          />
          <h1 className="ml-4 text-2xl sm:text-3xl font-bold text-black transition-colors duration-300 transform hover:text-teal-500  md:mx-2 md:my-0">
            THE BOOK STORE
          </h1>
        </Link>

        <div className="flex-1 mx-4 md:mx-0">
          <SearchInput />
        </div>

        <div className="flex items-center space-x-4 md:space-x-8">
          <NavLink
            to="/"
            exact={true}
            className="text-xl sm:text-3xl font-semibold text-black transition-colors duration-300 transform hover:text-gray-700"
          >
            Home
          </NavLink>
          <NavLink
            to="/rent"
            exact={true}
            className="text-xl sm:text-3xl font-semibold text-black transition-colors duration-300 transform hover:text-gray-700"
          >
            Rent
          </NavLink>

          <div className="relative inline-block">
            <button
              onClick={() => setCategoryIsOpen(!categoryIsOpen)}
              className="text-xl sm:text-3xl font-semibold text-black transition-colors duration-300 transform hover:text-gray-700"
            >
              Categories
              <svg className="w-6 h-6 sm:w-8 sm:h-8 inline ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
              </svg>
            </button>

            {categoryIsOpen && (
              <div className="absolute right-0 mt-10 w-56 sm:w-72 h-auto max-h-80 overflow-y-auto bg-white dark:bg-gray-800 rounded-md shadow-xl z-10">
                <Link to={`/categories`} className="block px-4 py-2 font-semibold text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  All Categories
                </Link>
                {categories.map((c) => (
                  <Link key={c.name} to={`/category/${c.slug}`} className="block px-4 py-2 font-semibold text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {!auth.user ? (
            <>
              <NavLink to="/register" className="text-xl sm:text-3xl font-bold transition-colors duration-300 transform dark:text-black hover:text-gray-700">
                Register
              </NavLink>
              <NavLink to="/login" className="text-xl sm:text-3xl font-bold transition-colors duration-300 transform dark:text-black hover:text-gray-700">
                Login
              </NavLink>
            </>
          ) : (
            <div className="relative inline-block">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-xl sm:text-3xl text-black font-semibold transition-colors duration-300 transform hover:text-gray-700"
              >
                {auth?.user?.name}
                <svg className="w-6 h-6 sm:w-8 sm:h-8 inline ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-10 w-48 sm:w-56 text-black dark:bg-gray-800 rounded-md shadow-xl z-10">
                  <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="block px-4 py-2 text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    Dashboard
                  </NavLink>
                  <NavLink to="/login" onClick={handleLogout} className="block px-4 py-2 text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    Logout
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {auth?.user?.role !== 1 && (
            <Badge count={wishlist.length} showZero>
              <NavLink to={"/wishlist"}>
                <CiHeart className="w-10 h-10 text-black font-bold" />
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
