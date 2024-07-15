import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const headerStyle = {
    backgroundImage: 'linear-gradient(to right, #757F9A , #D6A4A1)', // Replace with your image path
    backgroundSize: 'cover', // Adjusts image to cover the whole background
    backgroundPosition: 'center', // Centers the background image
  };

  return (
    <>
      <footer className="dark:bg-gray-900 bg-opacity-70" style={headerStyle}>
        <div className="container px-4 py-4 mx-auto">
          <div className="flex flex-col items-center text-center md:flex-row md:justify-between">
            <Link to="/" className="flex items-center mb-4 md:mb-0">
              <img
                className="w-auto h-7"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8f2qlmQft8PNyJKr6YWqN9X7tz_c3ev5cqQ&s"
                alt=""
              />
              <h1 className="ml-2 text-black text-3xl font-bold transition-colors duration-300 transform hover:text-blue-500 dark:hover:text-blue-400">
                THE BOOK STORE
              </h1>
            </Link>

            <div className="flex flex-wrap justify-center mt-2 md:mt-0">
              <Link
                to="/about"
                className="mx-2 text-lg text-black transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="About"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="mx-2 text-lg text-black transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Contact"
              >
                Contact
              </Link>

              <Link
                to="/privacy"
                className="mx-2 text-lg text-black transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Privacy"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-lg text-black">
              © Copyright 2024. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
